const marvelApiUrl = '/marvel/api.json';  
let allHeroes = { MARVEL: [], DC: [] }; // Almacena héroes de ambas categorías
let currentPage = 1; 
const heroesPerPage = 3; 

document.getElementById('marvel-button').addEventListener('click', () => {
  fetchHeroes(marvelApiUrl, 'MARVEL');
});

document.getElementById('cd-button').addEventListener('click', () => {
  fetchHeroes(marvelApiUrl, 'DC');
});

// Agregar el evento para el botón de comparación
document.getElementById('compare-button').addEventListener('click', () => {
  compareHeroes();
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
      // Guardar los héroes en el objeto allHeroes
      if (type === 'MARVEL') {
        allHeroes.MARVEL = data.MARVEL;
        displayHeroes(allHeroes.MARVEL); // Mostrar héroes de Marvel
      } else {
        allHeroes.DC = data.DC;
        displayHeroes(allHeroes.DC); // Mostrar héroes de DC
      }
      setupPagination(allHeroes[type].length); // Configurar paginación para el tipo actual
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
      <p><strong>Nombre:</strong> ${hero.nombre}</p>
      <p><strong>Aparición:</strong> ${hero.Aparicion || hero.publicado || 'No disponible'}</p>
      <p><strong>Biografía:</strong> ${hero.Biografia || 'No disponible'}</p>
      <p><strong>Resistencia:</strong> ${hero.Resistencia || 'No disponible'}</p>
      <p><strong>Fuerza-Ataque:</strong> ${hero.FuerzaAtaque || 'No disponible'}</p>
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
      displayHeroes(allHeroes.MARVEL.length > 0 ? allHeroes.MARVEL : allHeroes.DC); // Mostrar héroes de Marvel o DC según sea necesario
    });

    pagination.appendChild(pageButton);
  }
}

// Nueva función para comparar héroes
function compareHeroes() {
  // Asegúrate de que haya héroes disponibles
  if (allHeroes.MARVEL.length === 0 || allHeroes.DC.length === 0) {
    console.warn('No hay héroes disponibles para comparar.');
    return; // Salir si no hay héroes
  }

  const marvelHero = allHeroes.MARVEL[Math.floor(Math.random() * allHeroes.MARVEL.length)]; // Selecciona un héroe de Marvel
  const dcHero = allHeroes.DC[Math.floor(Math.random() * allHeroes.DC.length)]; // Selecciona un héroe de DC

  const heroList = document.getElementById('hero-list');
  heroList.innerHTML = '';  // Borra todos los héroes

  // Mostrar el héroe de Marvel
  const marvelDiv = document.createElement('div');
  marvelDiv.classList.add('hero-item');

  const marvelName = document.createElement('h2');
  marvelName.textContent = `Héroe de Marvel: ${marvelHero.Heroe || marvelHero.nombre || 'Nombre no disponible'}`; 
  marvelDiv.appendChild(marvelName);

  const marvelDetails = `
    <p><strong>Nombre:</strong> ${marvelHero.nombre}</p>
    <p><strong>Aparición:</strong> ${marvelHero.Aparicion || marvelHero.publicado || 'No disponible'}</p>
    <p><strong>Biografía:</strong> ${marvelHero.Biografia || 'No disponible'}</p>
    <p><strong>Resistencia:</strong> ${marvelHero.Resistencia || 'No disponible'}</p>
    <p><strong>Fuerza-Ataque:</strong> ${marvelHero.FuerzaAtaque || 'No disponible'}</p>
  `;

  marvelDiv.innerHTML += marvelDetails;

  if (marvelHero.imagen) {
    const marvelImage = document.createElement('img');
    marvelImage.src = marvelHero.imagen;
    marvelImage.alt = `${marvelHero.nombre} Imagen`;
    marvelDiv.appendChild(marvelImage); 
  }

  heroList.appendChild(marvelDiv); // Muestra el héroe de Marvel

  // Mostrar el héroe de DC
  const dcDiv = document.createElement('div');
  dcDiv.classList.add('hero-item');

  const dcName = document.createElement('h2');
  dcName.textContent = `Héroe de DC: ${dcHero.Heroe || dcHero.nombre || 'Nombre no disponible'}`; 
  dcDiv.appendChild(dcName);

  const dcDetails = `
    <p><strong>Nombre:</strong> ${dcHero.nombre}</p>
    <p><strong>Aparición:</strong> ${dcHero.Aparicion || dcHero.publicado || 'No disponible'}</p>
    <p><strong>Biografía:</strong> ${dcHero.Biografia || 'No disponible'}</p>
    <p><strong>Resistencia:</strong> ${dcHero.Resistencia || 'No disponible'}</p>
    <p><strong>Fuerza-Ataque:</strong> ${dcHero.FuerzaAtaque || 'No disponible'}</p>
  `;

  dcDiv.innerHTML += dcDetails;

  if (dcHero.imagen) {
    const dcImage = document.createElement('img');
    dcImage.src = dcHero.imagen;
    dcImage.alt = `${dcHero.nombre} Imagen`;
    dcDiv.appendChild(dcImage); 
  }

  heroList.appendChild(dcDiv); // Muestra el héroe de DC

  // Determina el ganador
  let marvelScore = (parseInt(marvelHero.FuerzaAtaque) || 0) + (parseInt(marvelHero.Resistencia) || 0);
  let dcScore = (parseInt(dcHero.FuerzaAtaque) || 0) + (parseInt(dcHero.Resistencia) || 0);

  const resultDiv = document.createElement('div');
  resultDiv.classList.add('result');

  // Comparar las puntuaciones
  if (marvelScore > dcScore) {
    resultDiv.innerHTML = `<h2>¡Ganador: ${marvelHero.Heroe || marvelHero.nombre} de Marvel!</h2>`;
  } else if (dcScore > marvelScore) {
    resultDiv.innerHTML = `<h2>¡Ganador: ${dcHero.Heroe || dcHero.nombre} de DC!</h2>`;
  } else {
    // Si los puntajes son iguales, se elige un ganador aleatorio
    const randomWinner = Math.random() < 0.5 ? marvelHero : dcHero;
    resultDiv.innerHTML = `<h2>¡Es un empate! Pero el ganador aleatorio es: ${randomWinner.Heroe || randomWinner.nombre}.</h2>`;
  }

  heroList.appendChild(resultDiv); // Muestra el resultado
}

