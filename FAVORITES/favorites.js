function displayFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let favoriteContainer = document.querySelector("#FavoriteCharacters");
    favoriteContainer.innerHTML = ""; // Clear previous content

    favorites.forEach(async (characterId) => {
        try {
            let response = await fetch(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=b8ffec201008949c2422b84410b608ac&hash=2612f31a32ed1f9e9146bce6cfcca5b5`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            let characterData = await response.json();
            let character = characterData.data.results[0];

            if (character && character.thumbnail && character.thumbnail.path && character.thumbnail.extension) {
                let characterHtml = `
                    <div class="favorite-character-card">
                        <img src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" alt="${character.name}" class="character-image">
                        <h3 class="character-name">${character.name}</h3>
                        <button class="about" data-character-id="${character.id}">Details</button>
                        <button class="remove-from-favorites" data-character="${characterId}">Remove From Favorite</button>
                    </div>`;
                favoriteContainer.innerHTML += characterHtml;
            } else {
                console.error('Invalid character data:', character);
            }
        } catch (error) {
            console.error('Error fetching character data:', error);
        }
    });

}

document.addEventListener('DOMContentLoaded', function() {
    displayFavorites();
});

                                               // Function to "Remove" character to favorites
function removeFromFavorites(characterId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // console.log('Current favorites:', favorites);
    let updatedFavorites = favorites.filter(favorite => favorite.toString() !== characterId.toString());
    // console.log('Updated favorites:', updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    displayFavorites(); // Update the displayed favorites after removal
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-favorites')) {
        let characterId = event.target.getAttribute('data-character');
        removeFromFavorites(characterId);
    }
});


                                               // Logic to handle "Details" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('about')) {
        let characterId = event.target.getAttribute('data-character-id');
        window.location.href = `../superhero.html?id=${characterId}`;
    }
});
