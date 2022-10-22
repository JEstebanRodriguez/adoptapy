// Funcion Shorthand: Obtencion de todos los elementos del dom por su id
const getById = element => document.getElementById(element);
// declaracion de los elementos del dom
const header = getById('header');
const headerMenu = getById('header-menu');
const headerBurger = getById('header-burger');
const contactForm = getById('contact-form');
const nameInput = getById('name');
const emailInput = getById('email');
const messageTextarea = getById('message');

// Listener en el cual se muestra u oculta el sidebar en el responsive
headerBurger.addEventListener('click', () => {
    headerBurger.classList.toggle('header__burger--active');
    headerMenu.classList.toggle('header__menu--active');
});
// Listener donde se obtiene el evento de scroll de la pagina y aplica el blur al header
document.addEventListener('scroll', () => (scrollY >= 280) ? header.classList.add('header--mask') : header.classList.remove('header--mask'));
// Evento de envio del formulario
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Pequeña validacion de los campos obligatorios que pregunta si los campos vienen o no vacios
    if (nameInput.value == '' || emailInput.value == '' || messageTextarea.value == '') {
        // Libreria sweetalert para notificaciones de error
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Campos vacios',
            text: 'Todos los campos son obligatorios',
            showConfirmButton: false,
            timer: 2000
        });
    } else {
        // Libreria sweetalert para notificaciones de exito
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Mensaje enviado con exito',
            text: 'En breve nos comunicaremos contigo',
            showConfirmButton: false,
            timer: 2000
        });
    }
})