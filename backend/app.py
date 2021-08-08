from api import LibgenSearchModified
from flask import Flask, jsonify

app = Flask(__name__)

s = LibgenSearchModified()
title_filters = {"Extension": "epub"}

''' download_links = s.resolve_download_links(
    results[0]) if len(results) > 0 else []
 '''


@app.route("/<title>", methods=["GET"])
def hello_world(title):
    results = s.search_title_filtered(
        title, title_filters, exact_match=True)
    response = jsonify(message=results)

    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
