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
                <h2 class="animal-profile__header-desc">Descripcion</h2>
                <p id="animal-description">${ animalParam.description }</p>
                ${ animalParam.tags.length ? `<h3> Atributos</h3>
        <ul class="tags-ul">
            ${animalParam.tags?.map(tag => `<li> ${tag}</li>`)}
        </ul>`: '' }
                <h3>Perfil de Sitio de Adopcion</h3>
                <a href="">Perfil de Nombre en petfinder</a>
                <h3>Mis Fotos</h4>
                <div class="animal-profile__grid">
                    <div class="animal-profile__grid-item">asda</div>
                    <div class="animal-profile__grid-item">asda</div>
                    <div class="animal-profile__grid-item">asda</div>
                    <div class="animal-profile__grid-item">asda</div>
                </div>
                <h3>Contactos para saber mas sobre Mi</h3>
                <ul>
                    <li>dasdasd</li>
                    <li>asdasda</li>
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

document.addEventListener('DOMContentLoaded', () => {
    getAnimalById();
})