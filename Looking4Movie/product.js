document.addEventListener('DOMContentLoaded', function() {

    //afficher l'indicateur de chargement
    document.getElementById('loading').style.display = 'block';

    // Récupérer l'ID du film depuis l'URL
    const params = new URLSearchParams(window.location.search);
    const filmId = params.get('i'); // 'i' est le paramètre qu'on met' dans l'URL

    if (filmId) {
        // construire l'URL de l'API avec l'ID du film
        const url = `http://www.omdbapi.com/?i=${filmId}&apikey=68891af9`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // afficher les détails du film
                displayFilmDetails(data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des détails du film:', error);
            });
    }
});

function displayFilmDetails(film) {

    //cacher l'indicateur de chargement
    document.getElementById('loading').style.display = 'none';

    // ici, on peut utiliser les données du film pour remplir votre HTML
    //afficher les détails du film
    const detailsContainer = document.getElementById('details');
    detailsContainer.style.display = 'flex';
    
    detailsContainer.innerHTML = `
        <h1>${film.Title}</h1>
        <img src="${film.Poster}" alt="${film.Title}">
        <p>Année : ${film.Year}</p>
        <p>Genre : ${film.Genre}</p>
        <p>Réalisateur : ${film.Director}</p>
    `;
}
