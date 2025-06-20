document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA RESALTAR EL ENLACE ACTIVO ---
    // Esto se ejecuta una vez en cada carga de página para saber dónde estamos.
    const highlightActiveLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');

            // Activa el enlace si la ruta coincide exactamente
            // O si estamos en la raíz ('/') y el enlace es para la página de inicio.
            if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
                link.classList.add('active');
            }
        });
    };

    // --- LÓGICA PARA EL BOTÓN DE VOLVER ARRIBA ---
    // Esto no cambia y funciona perfectamente.
    const btnScrollTop = document.getElementById('btn-scroll-top');
    if (btnScrollTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btnScrollTop.classList.add('show');
            } else {
                btnScrollTop.classList.remove('show');
            }
        });

        btnScrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Ejecutamos la función para resaltar el enlace al cargar la página.
    highlightActiveLink();

});
