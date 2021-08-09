from bs4.builder import TreeBuilder
from api import LibgenSearchModified
from flask import Flask, jsonify, request

app = Flask(__name__)

s = LibgenSearchModified()


@app.route("/d/", methods=["GET"])
def getDownloadLink():
    mirror_1 = request.args.get('url')
    download_link = s.resolve_download_links(mirror_1)
    response = jsonify(message=download_link)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/<title>", methods=["GET"])
def getBooks(title):
    print(title)

    search_by = request.args.get('search_by')
    results = {}
    if(search_by == "Author"):
        results = s.search_author_filtered(
            title,  {"Extension": "epub"}, exact_match=True)
    elif(search_by == "ISBN"):
        results = s.search_isbn_filtered(
            title,  {"Extension": "epub"}, exact_match=True)
    else:
        results = s.search_title_filtered(
            title, {"Extension": "epub"}, exact_match=True)
    for i in range(len(results)):
        results[i]["Image"] = s.resolve_image(results[i])
    response = jsonify(message=results)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
