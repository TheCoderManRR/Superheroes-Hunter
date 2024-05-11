const params = new URLSearchParams(window.location.search);
const superheroId = params.get('id');

const getSuperheroDetails = async () => {
    const url = `https://gateway.marvel.com/v1/public/characters/${superheroId}?ts=1&apikey=b8ffec201008949c2422b84410b608ac&hash=2612f31a32ed1f9e9146bce6cfcca5b5`;
    const response = await fetch(url);
    const jsonData = await response.json();
    const superhero = jsonData.data.results[0];
    const comicsAvailable = superhero.comics.available;
    const seriesAvailable = superhero.series.available;
    const storiesAvailable = superhero.stories.available;


    document.getElementById('superhero-name').textContent = superhero.name;
    document.getElementById('comics').textContent = `Total Number of Comics: ${comicsAvailable}`;
    document.getElementById('series').textContent = `Total Number of Series: ${seriesAvailable}`;
    document.getElementById('stories').textContent = `Total Number of Stories: ${storiesAvailable}`;
    document.getElementById('superhero-description').textContent = superhero.description || 'N/A';
    document.getElementById('superhero-image').src = `${superhero.thumbnail.path}/portrait_fantastic.${superhero.thumbnail.extension}`;

};

window.onload = getSuperheroDetails;
