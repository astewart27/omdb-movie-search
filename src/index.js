import "./styles.scss";

const init = function() {

    /* Get our app root */
    const root = document.getElementById("app");

    /* Create app wrapper */
    const movieWrapper = document.createElement("div");
    movieWrapper.setAttribute("class", "movie-wrapper");

    /* Create <header></header> element */
    const header = document.createElement("header");
    const title = document.createElement("h1");
    title.setAttribute("class", "movie-header");
    title.innerHTML = "Vanilla JS - OMDb Movie Search";
    header.append(title);
    movieWrapper.append(header);

    /* Create <form></form> element */
    const formWrapper = document.createElement("div");
    formWrapper.setAttribute("class", "form-wrapper");

    const form = document.createElement("form");
    const input = document.createElement("input");
    input.setAttribute("type", "text")
    input.setAttribute("name", "query");
    const button = document.createElement("button");
    button.setAttribute("class", "btn-submit");
    button.innerHTML = "Search";

    /* Append elements */
    form.append(input, button);
    formWrapper.append(form);
    movieWrapper.append(formWrapper);

    /* Append our app to the root */
    root.append(movieWrapper);

    function handleResults(res) {
        const moviesOutput = document.createElement("div");
        moviesOutput.setAttribute("class", "movies");
        movieWrapper.append(moviesOutput);
        res.Search.map(item => {
            const movie = document.createElement("div");
            movie.setAttribute("class", "movie");
            const poster = item.Poster;
            const title = item.Title;
            const year = item.Year;
            const movieImg = document.createElement("img");
            movieImg.setAttribute("src", poster);
            const movieTitle = document.createElement("h2");
            movieTitle.innerHTML = title;
            const movieYear = document.createElement("div");
            movieYear.setAttribute("class", "date");
            movieYear.innerHTML = year;
            movie.append(movieImg, movieTitle, movieYear);
            moviesOutput.append(movie);
        });
    }

    async function handleSearch(query) {
        const API_KEY = "f712d347";
        const request = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
        const response = await request.json();
        handleResults(response);
    }

    var submitButton = document.querySelector("button.btn-submit");
    submitButton.addEventListener("click", function(e) {
        e.preventDefault();
        const moviesWrapper = document.querySelector(".movies");
        if (moviesWrapper) {
            moviesWrapper.parentNode.removeChild(moviesWrapper);
        }
        var inputField = document.querySelector("input[name=query]");
        if(inputField && inputField.value !== "") {
            handleSearch(inputField.value);
        }
    });
}

init();