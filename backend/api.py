from bs4 import BeautifulSoup
from libgen_api import LibgenSearch
from libgen_api.libgen_search import filter_results
from libgen_api.search_request import SearchRequest
import requests


class SearchRequestModified(SearchRequest):
    col_names = col_names = [
        "ID",
        "Author",
        "Title",
        "ISBN",
        "Publisher",
        "Year",
        "Pages",
        "Language",
        "Size",
        "Extension",
        "Mirror_1",
        "Mirror_2",
        "Mirror_3",
        "Mirror_4",
        "Mirror_5",
        "Edit",
    ]

    def get_search_page(self):
        query_parsed = "%20".join(self.query.split(" "))
        if self.search_type.lower() == "title":
            search_url = (
                f"http://gen.lib.rus.ec/search.php?req={query_parsed}"
            )
        elif self.search_type.lower() == "author":
            search_url = (
                f"http://gen.lib.rus.ec/search.php?req={query_parsed}&column=author"
            )
        search_page = requests.get(search_url)
        return search_page

    def process_td(self, td):
        isbn = ""
        if (td.find("a") and td.find("a").has_attr("title") and td.find(
                "a")["title"] != ""):
            return td.a["href"]

        if(td.find("font")):
            isbn = "".join(td.find("font").stripped_strings)
            isbn = isbn.split(",")[0]
            if(str(isbn).isnumeric()):
                isbn = isbn
            else:
                isbn = ""
        if(list(td.strings) and isbn):
            return list(td.strings)[0], isbn
        if(list(td.strings)):
            return list(td.strings)[0]

    def aggregate_request_data(self):
        search_page = self.get_search_page()
        soup = BeautifulSoup(search_page.text, "lxml")

        # Libgen results contain 3 tables
        # Table2: Table of data to scrape.
        information_table = soup.find_all("table")[2]

        # Determines whether the link url (for the mirror) or link text (for the title) should be preserved.
        # Both the book title and mirror links have a "title" attribute, but only the mirror links have it filled. (title vs title="libgen.io")
        raw_data = [
            [
                self.process_td(td)
                for td in row.find_all("td")
            ]
            for row in information_table.find_all("tr")[
                1:
            ]  # Skip row 0 as it is the headings row
        ]
        raw_data_with_correct_entries = []  # contains only entries that have isbn
        for row in raw_data:
            title = row[2]
            isbn = ""
            if(len(title) == 2):
                title, isbn = title[0], title[1]
                new_row = row[:2]
                new_row.append(title)
                if(isbn):
                    new_row.append(isbn)
                new_row += row[3:]
                raw_data_with_correct_entries.append(new_row)
                continue

        output_data = [dict(zip(self.col_names, row))
                       for row in raw_data_with_correct_entries]
        return output_data


class LibgenSearchModified(LibgenSearch):
    def search_title(self, query):
        search_request = SearchRequestModified(query, search_type="title")
        return search_request.aggregate_request_data()

    def search_title_filtered(self, query, filters, exact_match=True):
        search_request = SearchRequestModified(query, search_type="title")
        results = search_request.aggregate_request_data()

        filtered_results = filter_results(
            results=results, filters=filters, exact_match=exact_match
        )

        return filtered_results


