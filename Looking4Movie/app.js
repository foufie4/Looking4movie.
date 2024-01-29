//searchbar button click 
document.getElementById('searchButton').addEventListener('click', function() {
  var searchTerm = document.getElementById('searchBox').value;
  searchMovies(searchTerm);
});

//searchbar keypress enter
document.getElementById('searchBox').addEventListener('keypress', function(event) {
  //vérifie si la touche enter est pressée
  if (event.key === 'Enter') {
    //empêche l'action par défaut d'enter 
    event.preventDefault();
    //appelle la même focntion que celle déclenchée par le click sur le bouton searchbar
    searchMovies(document.getElementById('searchBox').value);
  }
});

function searchMovies(searchTerm) {
  var apiKey = '68891af9';
  var url = `http://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
      if(data.Response === "True") {
          displayResults(data.Search); // 'search' contient le tableau des films
      } else {
          document.getElementById('results').innerHTML = '<p>Film non trouvé.</p>';
      }
  })
  .catch(error => {
      console.error('Erreur lors de la recherche de films:', error);
  });
}

function displayResults(movies) {
  var resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // effacer les résultats précédents

  movies.forEach(movie => {
      var movieElement = document.createElement('div');
      movieElement.classList.add('film-item');
      movieElement.innerHTML = `
          <img src="${movie.Poster}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
          <a href="product.html?i=${movie.imdbID}">Voir les détails</a>
      `;
      // movieElement.className = 'film-item';
      resultsContainer.appendChild(movieElement);
  });
}

