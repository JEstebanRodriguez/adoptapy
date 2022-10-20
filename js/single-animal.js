// Funcion shorthand: Declaracion de los elementos del dom por su id
const getById = (element) => document.getElementById(element);
// Elementos del dom
const header = getById('header');
const headerMenu = getById('header-menu');
const headerBurger = getById('header-burger');
const animalProfile = getById('animal-profile');
const modal = getById('modal');
const cancelAdoptBtn = getById('cancel-adopt');
const adoptForm = getById('adopt-form');
// Obtencion del access token de la api petfinder para realizar la peticion
const tokenFromLocalStorage = localStorage.getItem('token');

//Obtencion del query string de la url donde viene el id del animal
const path = location.search;
// separacion en un array del query string
const getIdQueryString = path.split('=');
// Obtencion del segundo valor del array en donde se encuentra el string con el id del animal
let animalId = getIdQueryString[1];
// declaracion de la variable placeholder que contendra la imagen del perfil del animal
let placeholder;

// Creacion del elemento del perfil para insertar en el dom con los datos del animal por su id
const setElementsAtDom = (animalParam) => {
    document.querySelector('title').innerText = animalParam.name;
    (animalParam.photos.length) ? placeholder = animalParam.photos[0]?.medium : placeholder = 'img/cat-placeholder.svg';
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
                    <li><strong>Email:</strong> <a href="#">${animalParam.contact.email ? animalParam.contact.email : 'No definido'}</a></li>
                    <li><strong>Telefono:</strong> <a href="#">${animalParam.contact.phone ? animalParam.contact.phone : 'No definido' }</a></li>
                </ul>
                <button class="btn btn--primary" id="adopt-form">Formulario de adopción</button>
            </div>`;
    animalProfile.innerHTML = el;
    document.getElementById('adopt-form').addEventListener('click', () => {
        modal.style.display = 'grid';
    });
}
// Peticion a la api de petfinder para la obtencion de los datos del animal por su id
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
// Listener donde se obtiene el evento de scroll de la pagina y aplica el blur al header
document.addEventListener('scroll', () => (scrollY >= 280) ? header.classList.add('header--mask') : header.classList.remove('header--mask'));
document.addEventListener('DOMContentLoaded', () => {
    getAnimalById();
});

cancelAdoptBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
});

adoptForm.addEventListener('submit', e => {
    e.preventDefault();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Petición realizada con exito',
        text: 'En breve nos comunicaremos contigo',
        showConfirmButton: false,
        timer: 2000
    });
    modal.style.display = 'none';
});