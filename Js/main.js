const API_URL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=b94ca73b7b1b4b91baffaa20762d48ee&language=en-US&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie";

const api_key = "b94ca73b7b1b4b91baffaa20762d48ee";

const form = document.getElementById("form");
const content = document.getElementById("content");
const search = document.getElementById("srch");

let movies = [];

fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    movies = data.results;
    displayMovies(movies);
  });

function getClassByRate(vote_average) {
  if (vote_average >= 8) {
    return "green";
  } else if (vote_average >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = search.value;
  const searchUrl = `${SEARCH_API}?api_key=${api_key}&query="${searchValue}"`;

  content.replaceChildren();

  if (search.value === "") {
    window.location.reload();
  } else {
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        displayMovies(data.results);
      });
  }
});

function displayMovies(dataResults) {
  dataResults.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date } = movie;
    const movieElement = document.createElement("div");
    movieElement.classList.add("box");
    movieElement.innerHTML = `
    <img src="${IMG_PATH + poster_path}" alt="${title}">

    <div class="text">
      <h3>${title}</h3>
      <p>${overview}</p>
      <p>Rate: <span class="${getClassByRate(
        vote_average
      )}">${vote_average}</span></p>
      <p>Date: ${release_date} </p>
      </div>
    `;
    content.appendChild(movieElement);
  });
}
