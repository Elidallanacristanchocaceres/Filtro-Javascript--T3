const marvelApiUrl = '/marvel/api.json';  
let allHeroes = [];

document.getElementById('marvel-button').addEventListener('click', () => {
  fetchHeroes(marvelApiUrl, 'MARVEL');
});

document.getElementById('cd-button').addEventListener('click', () => {
  fetchHeroes(marvelApiUrl, 'DC');
});

function fetchHeroes(apiUrl, type) {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      allHeroes = type === 'MARVEL' ? data.MARVEL : data.DC; 
      displayHeroes(allHeroes);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud Fetch:', error);
    });
}

function displayHeroes(heroes) {
  const heroList = document.getElementById('hero-list');
  heroList.innerHTML = '';  

  heroes.forEach(hero => {
    const heroDiv = document.createElement('div');
    heroDiv.classList.add('hero-item');

    const heroName = document.createElement('h2');
    heroName.textContent = `Héroe: ${hero.Heroe || hero.nombre || 'Nombre no disponible'}`; 
    heroDiv.appendChild(heroName);

    const heroDetails = `
      <p><strong>Nombre:</strong> ${hero.nombre || 'No disponible'}</p>
      <p><strong>Aparición:</strong> ${hero.Aparicion || hero.publicado || 'No disponible'}</p>
      <p><strong>Biografía:</strong> ${hero.biografia || 'No disponible'}</p>
      <p><strong>Resistencia:</strong> ${hero.resistencia || 'No disponible'}</p>
      <p><strong>Fuerza-Ataque:</strong> ${hero['fuerza_ataque'] || 'No disponible'}</p>
    `;

    heroDiv.innerHTML += heroDetails;

    if (hero.imagen) {
      const heroImage = document.createElement('img');
      heroImage.src = hero.imagen;
      heroImage.alt = `${hero.nombre} Imagen`;
      heroDiv.appendChild(heroImage); 
    }

    heroList.appendChild(heroDiv); 
  });
}

document.addEventListener('DOMContentLoaded', () => {
});
