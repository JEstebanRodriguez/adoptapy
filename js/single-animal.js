const getById = (element) => document.getElementById(element);


const header = getById('header');
const headerMenu = getById('header-menu');
const headerBurger = getById('header-burger');

const tokenFromLocalStorage = localStorage.getItem('token');
const path = location.search;
const getIdQueryString = path.split('=');
console.log(getIdQueryString);
let animalId = getIdQueryString[1];
let placeholder;

const setElementsAtDom = (animalParam) => {
    document.querySelector('title').innerText = animalParam.name;
    if (animalParam.photos.length) {
        placeholder = animalParam.photos[0]?.medium;
    } else {
        placeholder = 'img/cat-placeholder.svg';
    }

    const el = `<div class="animal-profile__avatar">
                <img src=${placeholder} alt="Foto de Perfil del animal">
                <span class="badge">${animalParam.status}</span>
            </div>
            <div class="animal-profile__header">
                <h1 class="animal-profile__header-title" id="animal-name">Hola! Soy ${animalParam.name}</h1>
                <ul class="animal-profile__header-info">
                    <li>
                        <span><strong>Edad</strong></span>
                        <span>${ animalParam.age == 'Adult' ? 'Adulto' : 'Cachorro' }</span>
                    </li>
                    <li>
                        <span><strong>Sexo</strong></span>
                        <span>${ animalParam.gender == 'Female' ? 'Hembra' : 'Macho' }</span>
                    </li>
                    <li>
                        <span><strong>Razas</strong></span>
                        <span>${ animalParam.breeds.primary ? animalParam.breeds?.primary : 'No definido' }</span>
                    </li>
                    <li>
                        <span><strong>Color</strong></span>
                        <span>${ animalParam.colors.primary ? animalParam.colors?.primary : 'No definido' }</span>
                    </li>
                </ul>
            </div>
            <div class="animal-profile__body">
                <h2 class="animal-profile__header-desc">Descripción</h2>
                <p id="animal-description">${ animalParam.description ? animalParam.description : 'No tiene descripción'}</p>
                ${animalParam.tags.length ? `<h3> Características</h3>
                <ul class="tags-ul">
                    ${animalParam.tags?.map(tag => `<li>- ${tag}</li>`).join('')}
                </ul>`: '' }
                <h3>Perfil de Sitio de Adopción</h3>
                <a href=${ animalParam.url} class="d-block mt-0-5" target="_blank">Ir al perfil de ${animalParam.name} en petfinder</a>
                <h3 class="mt-2">Mis Fotos</h4>
                ${animalParam.photos.length ? `<div class="animal-profile__grid">
                    ${animalParam.photos?.map(photo => `<div class="animal-profile__grid-item"><img src=${photo.medium} /></div>`).join('')}
                </div>` : `<p>No se encontraron fotos de ${animalParam.name}</p>`}
                <h3 class="mt-2">Contactos para saber más sobre Mi</h3>
                <ul class="tags-ul">
                    <li><strong>Email:</strong> <a href="#">${animalParam.contact.email}</a></li>
                    <li><strong>Telefono:</strong> <a href="#">${animalParam.contact.phone }</a></li>
                </ul>
            </div>`;
    document.getElementById('animal-profile').innerHTML = el;
}

const getAnimalById = async () => {
    const resp = await fetch(`https://api.petfinder.com/v2/animals/${animalId}`, {
        headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`
        }
    });
    const { animal } = await resp.json();
    console.log(animal);
    setElementsAtDom(animal);
}


// Listener en el cual se muestra u oculta el sidebar en el responsive
headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger--active');
    headerMenu.classList.toggle('header__menu--active');
});

// Listener donde se obtiene el evento de scroll de la pagina
document.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY >= 280) {
        // se agrega el efecto de blur al header
        header.classList.add('header--mask');
    } else {
        // se quita el efecto de blur al header
        header.classList.remove('header--mask');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    getAnimalById();
})
