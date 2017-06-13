// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var authKey = "e66f7d8f44cc4b8a985ebe6b9d34eb77";

// Helper functions for making API Calls
var helper = {

    // This function runs the query (changed from locatoin)
    runQuery: function(queryTerm) {

        console.log(queryTerm);

        var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

        // Find articles based on the query
        var queryURL = queryURLBase + "&q=" + queryTerm;
        return axios.get(queryURL).then(function(response) {

            return response.data.response.docs;
        });
    },

    // get saved articles from db
    getSaved: function() {
        return axios.get("/api/saved").then(function(response) {

            return response.data;
        })

    },

    // save new article
    postArticle: function(artObject) {

        return axios.post("/api", { title: artObject.headline.main, url: artObject.web_url });
    },

    //Delete a saved article from the db
    deleteArticle: function(articleId) {

        return axios.delete("/api/saved/" + articleId);

    }
};
// We export the API helper
module.exports = helper;
