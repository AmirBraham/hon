from bs4.builder import TreeBuilder
from api import LibgenSearchModified
from flask import Flask, jsonify

app = Flask(__name__)

s = LibgenSearchModified()


@app.route("/<title>", methods=["GET"])
def hello_world(title):
    results = s.search_title_filtered(
        title, {"Extension": "epub"}, exact_match=True)
    for i in range(len(results)):
        results[i]["Image"] = s.resolve_image(results[i])
        download_links = s.resolve_download_links(
            results[i]) if len(results) > 0 else []
        results[i]["DownloadLinks"] = download_links

    response = jsonify(message=results)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
