// Funcion Shorthand: Obtencion de todos los elementos del dom por su id
const getById = element => document.getElementById(element);
// declaracion de los elementos del dom
const header = getById('header');
const headerMenu = getById('header-menu');
const headerBurger = getById('header-burger');

// Listener en el cual se muestra u oculta el sidebar en el responsive
headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger--active');
    headerMenu.classList.toggle('header__menu--active');
});
// Listener donde se obtiene el evento de scroll de la pagina y aplica el blur al header
document.addEventListener('scroll', () => (scrollY >= 280) ? header.classList.add('header--mask') : header.classList.remove('header--mask'));