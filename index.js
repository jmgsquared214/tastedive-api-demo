'use strict';
const apiKey = '349471-DeBug-8WXSS1JO';
const searchURL = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar`;

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the articles array, stopping at the max number of results
    for (let i = 0; i < responseJson.Similar.length && i<maxResults ; i++){
        // for each video object in the articles
        //array, add a list item to the results
        //list with the article title, source, author,
        //description, and image
        $('#results-list').append(
            `<li><h3><a href="${responseJson.Similar[i].Results}">${responseJson.Similar[i].Info}</a></h3>
  >
      <p>By ${responseJson.Similar[i].Results}</p>
      <p>${responseJson.Results[i].Name}</p>
      </li>`
        )};
    //display the results section
    $('#results').removeClass('hidden');
};

function getResults(query, maxResults=10) {
    const params = {
        q: query,
        language: "en",
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);
    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey})
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getResults(searchTerm, maxResults);
    });
}
// $(watchForm);


// function queryParamsToString(artist) {
//     if (artist.includes(' ') === true) {
//        let res = artist.replace(' ', '+');
//     console.log(res);
//     return res;
//     } else {
//         console.log(artist);
//         return artist;
//     }
// }
//
// function getRecommendation(artist) {
//
//     const queryString = queryParamsToString(artist);
//     const url = baseUrl + '?q=' + queryString;
//     console.log(url);
//
//     fetch(url)
//     .then(response => response.json())
//     .then(responseJson => renderLyrics(responseJson))
//     .catch(error => alert('Something went wrong.'))
//
// }
//
//
// function renderLyrics(responseJson) {
//     console.log(responseJson);
//     $('.api-content').empty();
//
//     for (let i = 0; i <= responseJson.length; i++) {
//
//         let artistName = responseJson.Similar.Results[i].Name;
//
//         $('.api-content').append(`
//         <p>${responseJson[i].artistName}</p>
//         `);
//     }
// }
//
// function watchForm() {
//     $('form').submit(event => {
//         event.preventDefault();
//         let artist = $('.query').val();
//
//         getRecommendation(artist);
//
//
//
// function() {
//     watchForm();
// });