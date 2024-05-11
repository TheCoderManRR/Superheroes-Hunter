const URL = "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=b8ffec201008949c2422b84410b608ac&hash=2612f31a32ed1f9e9146bce6cfcca5b5";


                                                      // Fetch url and create CARD
const getResults = async (searchTerm = '') => {
    let url = URL;
    if (searchTerm.trim() !== '') {
        url += `&nameStartsWith=${searchTerm}`;
    }
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let jsonData = await response.json();

        let characterContainer = document.querySelector("#CharacterContainer");
        if (!characterContainer) {
            console.error('Character container not found');
            return;
        }

        characterContainer.innerHTML = ""; // Clear previous content

        let characters = jsonData.data.results;

        characters.forEach(character => {
            let characterHtml = `
            <div class="character-card">
                <img src="${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}" alt="${character.name}" class="character-image">
                <div class="character-details">
                    <h3 class="character-name">${character.name}</h3>
                    <button class="about" data-character-id="${character.id}">Details</button>
                    <button class="add-to-favorites" data-character="${character.id}">Add to Favorites</button>
                    
                </div>
            </div>`;
            characterContainer.innerHTML += characterHtml;
        });

        // Call displayFavorites with jsonData as parameter
        displayFavorites();

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

window.onload = () => {
    getResults();
};

                                                // Search Bar Functionality

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener('keyup', function(event) {
    let searchTerm = event.target.value.trim();
    if (searchTerm === '') {
        getResults(); // Show all characters if search is empty
    } else {
        getResults(searchTerm); // Show characters based on search term
    }
});

document.addEventListener('DOMContentLoaded', function() {
    getResults(); // Show all characters on page load
});



                                               // Function to "Add" character to favorites
function addToFavorites(characterId) {
    let favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
    if (!favorites.has(characterId)) {
        favorites.add(characterId);
        localStorage.setItem('favorites', JSON.stringify([...favorites]));
        console.log('Added to favorites:', characterId);
        return true; // Return true if successfully added
    }
    return false; // Return false if already in favorites
}

                                               // Function to "Remove" character from favorites
function removeFromFavorites(characterId) {
    let favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
    favorites.delete(characterId);
    localStorage.setItem('favorites', JSON.stringify([...favorites]));
}

function isFavorite(characterId) {
    let favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
    return favorites.has(characterId);
}

                                                // Logic to handle "Add to Favorites/Remove from Favorites" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-favorites')) {
        let characterId = event.target.getAttribute('data-character');
        if (!isFavorite(characterId)) {
            addToFavorites(characterId);
            event.target.textContent = 'Remove from Favorites';
        } else {
            removeFromFavorites(characterId);
            event.target.textContent = 'Add to Favorites';
        }
    }
});

                                                    // Logic to handle "Details" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('about')) {
        let characterId = event.target.getAttribute('data-character-id');
        window.location.href = `superhero.html?id=${characterId}`;
    }
});


