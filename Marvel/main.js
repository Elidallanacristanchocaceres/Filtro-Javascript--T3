const marvelApiUrl = '/marvel/api.json';  
let allHeroes = [];
let currentPage = 1; 
const heroesPerPage = 3; 

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
      currentPage = 1; 
      displayHeroes(allHeroes);
      setupPagination(allHeroes.length);
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud Fetch:', error);
    });
}

function displayHeroes(heroes) {
  const heroList = document.getElementById('hero-list');
  heroList.innerHTML = '';  

  const startIndex = (currentPage - 1) * heroesPerPage;
  const endIndex = startIndex + heroesPerPage;
  const heroesToDisplay = heroes.slice(startIndex, endIndex);

  heroesToDisplay.forEach(hero => {
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

function setupPagination(totalHeroes) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; 

  const totalPages = Math.ceil(totalHeroes / heroesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = 'page-button';
    pageButton.addEventListener('click', () => {
      currentPage = i;
      displayHeroes(allHeroes);
    });

    pagination.appendChild(pageButton);
  }
}

document.addEventListener('DOMContentLoaded', () => {
});
