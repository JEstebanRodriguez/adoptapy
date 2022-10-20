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
// Listener en el cual se muestra u oculta el sidebar en el responsive
headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger--active');
    headerMenu.classList.toggle('header__menu--active');
});
// Listener donde se obtiene el evento de scroll de la pagina y aplica el blur al header
document.addEventListener('scroll', () => (scrollY >= 280) ? header.classList.add('header--mask') : header.classList.remove('header--mask'));