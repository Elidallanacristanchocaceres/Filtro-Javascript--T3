const apiUrl = '/marvel/api.json';  

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);  
    displayHeroes(data.MARVEL);  
  })
  .catch(error => {
    console.error('Error:', error);
  });

function displayHeroes(heroes) {
  const heroList = document.getElementById('hero-list');
  heroList.innerHTML = '';  
  
  heroes.forEach(hero => {
    const heroDiv = document.createElement('div');
    heroDiv.classList.add('hero-item');
    
    const heroName = document.createElement('h2');
    heroName.textContent = `Heroe: ${hero.Heroe}`;
    
    const heroDetails = `
      <p><strong>Nombre:</strong> ${hero.nombre}</p>
      <p><strong>Aparición:</strong> ${hero.Aparicion || hero.publicado}</p>
      <p><strong>Biografía:</strong> ${hero.Biografia}</p>
      <p><strong>Resistencia:</strong> ${hero.Resistencia}</p>
      <p><strong>Fuerza-Ataque:</strong> ${hero['Fuerza-Ataque']}</p>
    `;

    
    if (hero.imagen) {
      const heroImage = document.createElement('img');
      heroImage.src = hero.imagen;
      heroImage.alt = `${hero.Heroe} Imagen`;
      heroImage.style.width = '300px';  
      heroImage.style.marginTop = '10px';
      heroDiv.appendChild(heroImage);
    }

    heroDiv.innerHTML = heroName.outerHTML + heroDetails;
    heroList.appendChild(heroDiv);
  });
}
