from libgen_api import LibgenSearch
from libgen_api.libgen_search import filter_results
from libgen_api.search_request import SearchRequest
import requests


class SearchRequestModified(SearchRequest):
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


s = LibgenSearchModified()

title_filters = {"Extension": "epub"}

results = s.search_title_filtered(
    "Sapiens Yuval Noah Harari", title_filters, exact_match=True)
print(results)
download_links = s.resolve_download_links(
    results[0]) if len(results) > 0 else []
