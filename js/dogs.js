/*
Mis definiciones:
Funcion shorthand: Funcion que creo para refactorizar, para no repetir ciertos codigos dentro del archivo.

*/
// Funcion shorthand: Para obtener todos los elementos por su id
const getById = element => document.getElementById(element);
// Declaracion de los elementos del dom por su id
const header = getById('header');
const headerMenu = getById('header-menu');
const headerBurger = getById('header-burger');
const animal = getById('animal');
const dogsArea = getById('dogs-area');
const cardBtn = getById('card-btn');
const loader = document.querySelector('.loader');
// Declaracion de variable para mostrar una imagen por defecto de la mascota, en caso de que la api no la provea.
let placeholderImg;
// Funcion shorthand: para pasar elementos padres y hacerle un appendchild
const elementToAppend = (elementFather, elementChildren) => elementFather?.appendChild(elementChildren);
// Funcion para crear las cards de mascotas (perros/gatos)
const listItemCreator = (data) => {
    loader.style.display = 'none';
    // loop del parametro que trae un array de objetos con los datos de la api
    data.map(el => {
        // Consulta para preguntar por el tipo de animal y cargar su imagen por defecto si la api no la provee
        if (el.type === 'Dog') {
            placeholderImg = 'img/dog-placeholder.svg'
        } else {
            placeholderImg = 'img/cat-placeholder.svg'
        }
        let photo = el.photos.length ? el.photos[0]?.medium : placeholderImg;
        const listElement = document.createElement('div')
        listElement.innerHTML = `<div class="card">
                    <img src="${photo}" class="card__img" alt="dog">
                    <div class="card__body">
                        <h1 class="card__body-title">${el.name}</h1>
                        <div class="card__body-info">
                        <span class="card__body-gender"><strong>Sexo:</strong> ${el.gender === 'female' ? 'Hembra' : 'Macho'} </span>
                        <span class="card__body-age"><strong>Edad:</strong> ${el.age}</span>
                        <span class="card__body-status"><strong>Estado:</strong> ${el.status}</span>
                        </div>
                        </div>
                        <div class="card__actions">
                        <a class="btn btn--primary w-full" id="card-btn" href="animal.html?id=${el.id}">Ver perfil</a>
                    </div>
                </div>`;
        el.type === 'Dog' ? elementToAppend(dogsArea, listElement) : elementToAppend(catsArea, listElement);
    });

}
const getDataDogs = async (accesToken) => {
    const resp = await fetch('https://api.petfinder.com/v2/animals?type=dog', {
        headers: {
            Authorization: `Bearer ${accesToken}`
        }
    });
    const { animals } = await resp.json();
    console.log(animals);
    listItemCreator(animals);
}
// Peticion post en la cual se envian las credenciales para generar un nuevo token para las peticiones
const refreshTokenGenerator = async () => {
    const resp = await fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            grant_type: 'client_credentials',
            client_id: 'V2ZwO4ktGa5dnNkXzSYEiuLPGxJvs2jqaKwWT9cpVcVSMsYlfm',
            secret_id: 'NaYhIo6dYFHJK7Vg07lPdGpYeVhe4heBhPQHlkd0'
        })
    });
    const data = await resp.json();
    // funcion para llamar la carga de los perros
    getDataDogs(data.access_token);

    localStorage.setItem('token', data.access_token);

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

// Listener al cargar el dom
document.addEventListener('DOMContentLoaded', () => {
    // se genera el access token para poder hacer peticiones a la api
    refreshTokenGenerator();
    // se vuelve a generar un nuevo access token cuando el anterior se vence. Se vuelve a ejecutar la peticion para generar un nuevo token en intervalos de una hora. Para que se pueda probar.
    loader.style.display = 'block';
    setInterval(() => {
        refreshTokenGenerator();
    }, 3600000);
});