
// =================================
// MENÚ PARA CELULARES
// =================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const menuIcon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const menuAbierto = navLinks.classList.contains("show");

    menuToggle.setAttribute("aria-expanded", menuAbierto);

    if (menuAbierto) {
        menuIcon.classList.replace("fa-bars", "fa-xmark");
    } else {
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    }
});

// Cerrar menú al seleccionar una sección

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuIcon.classList.replace("fa-xmark", "fa-bars");
    });
});


// =================================
// FILTROS DE PROYECTOS Y SELECTOR DE AÑO
// =================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const yearMenuButton = document.getElementById("year-menu-btn");
const yearMenu = document.getElementById("year-menu");
const yearButtons = document.querySelectorAll(".year-menu button");
const selectedYearText = document.getElementById("selected-year");

let categoriaActual = "todos";
let anioActual = 6;

// Aplicar los filtros de año y categoría.

function filtrarProyectos() {
    projectCards.forEach(card => {
        const categorias = card.dataset.category.split(" ");
        const mismoAnio = Number(card.dataset.year) === anioActual;

        const mismaCategoria =
            categoriaActual === "todos" ||
            categorias.includes(categoriaActual);

        card.classList.toggle(
            "hidden",
            !(mismoAnio && mismaCategoria)
        );
    });

    selectedYearText.textContent = `Proyectos de ${anioActual}° año`;
}

// Cambiar categoría sin perder el año seleccionado.

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        categoriaActual = button.dataset.filter;
        filtrarProyectos();
    });
});

// Abrir y cerrar el menú de años.

yearMenuButton.addEventListener("click", () => {
    const abierto = yearMenu.classList.toggle("show");
    yearMenuButton.setAttribute("aria-expanded", abierto);
});

// Cambiar de año y conservar el filtro actual.

yearButtons.forEach(button => {
    button.addEventListener("click", () => {
        anioActual = Number(button.dataset.year);

        yearButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

        yearMenu.classList.remove("show");
        yearMenuButton.setAttribute("aria-expanded", "false");

        filtrarProyectos();
    });
});

// Cerrar el menú al hacer clic afuera.

document.addEventListener("click", event => {
    if (!event.target.closest(".year-selector")) {
        yearMenu.classList.remove("show");
        yearMenuButton.setAttribute("aria-expanded", "false");
    }
});

// Cerrar el menú con Escape.

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        yearMenu.classList.remove("show");
        yearMenuButton.setAttribute("aria-expanded", "false");
    }
});

// Mostrar inicialmente los proyectos del año seleccionado.

filtrarProyectos();


// =================================
// NAVEGACIÓN, PROGRESO Y VOLVER ARRIBA
// =================================

const sections = document.querySelectorAll("main section");
const navigationLinks = document.querySelectorAll(".nav-link");
const progressBar = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");

function actualizarNavegacion() {
    const desplazamiento = window.scrollY;
    const recorrido =
        document.documentElement.scrollHeight - window.innerHeight;

    const progreso = recorrido > 0
        ? (desplazamiento / recorrido) * 100
        : 0;

    progressBar.style.width = progreso + "%";

    backToTop.classList.toggle("show", desplazamiento > 350);

    let seccionActual = "inicio";

    sections.forEach(section => {
        if (desplazamiento >= section.offsetTop - 180) {
            seccionActual = section.id;
        }
    });

    navigationLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + seccionActual
        );
    });
}

window.addEventListener("scroll", actualizarNavegacion, {
    passive: true
});

window.addEventListener("resize", actualizarNavegacion);

actualizarNavegacion();

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// =================================
// APARICIÓN PROGRESIVA DE SECCIONES
// =================================

const elementosAnimados = document.querySelectorAll(
    ".section-heading, .about-text, .about-cards, .skills-group, .skills-quote, .projects-header, .project-card, .timeline-item, .education-quote, .contact-details, .contact-form"
);

elementosAnimados.forEach(elemento => {
    elemento.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    elementosAnimados.forEach(elemento => {
        observador.observe(elemento);
    });

} else {
    elementosAnimados.forEach(elemento => {
        elemento.classList.add("visible");
    });
}


// =================================
// FORMULARIO DE CONTACTO
// =================================

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const correo = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("message").value.trim();

    // Comprobar que los campos estén completos.

    if (!nombre || !correo || !mensaje) {
        alert("Completá todos los campos.");
        return;
    }

    // Preparar el mensaje para el correo.

    const destinatario = "TU_CORREO@gmail.com";

    const asunto = encodeURIComponent(
        "Mensaje desde mi portafolio"
    );

    const cuerpo = encodeURIComponent(
        "Nombre: " + nombre +
        "\nCorreo: " + correo +
        "\n\nMensaje:\n" + mensaje
    );

    // Abrir el programa de correo.

    window.location.href =
        "mailto:" + destinatario +
        "?subject=" + asunto +
        "&body=" + cuerpo;
});
