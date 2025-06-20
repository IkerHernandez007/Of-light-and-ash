// Espera a que todo el DOM (la página HTML) esté completamente cargado y listo.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA PARA NAVEGACIÓN DINÁMICA ---
    
    const mainContent = document.getElementById('main-content');
    
    const highlightActiveLink = () => {
        // La ruta puede ser '/', '/about.html', '/articles/page.html', etc.
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Comprueba si el href del enlace coincide con la ruta actual
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
        // Caso especial para la página de inicio
        if (currentPath === '/' || currentPath === '/index.html') {
            document.querySelector('.nav-link[href="/index.html"]').classList.add('active');
        }
    };

    const loadContent = async (url) => {
        try {
            document.body.classList.add('fade-out');
            await new Promise(resolve => setTimeout(resolve, 400));

            const response = await fetch(url);
            if (!response.ok) throw new Error('Respuesta de red no fue ok.');
            
            const newContentHTML = await response.text();
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(newContentHTML, 'text/html');
            const newMainContent = newDoc.querySelector('#main-content').innerHTML;

            mainContent.innerHTML = newMainContent;
            window.history.pushState({}, '', url);
            document.title = newDoc.title;
            highlightActiveLink();
            document.body.classList.remove('fade-out');
        } catch (error) {
            console.error('Error al cargar la página:', error);
            link.href="/index.html";
            mainContent.innerHTML = `<p>Error al cargar el contenido. Por favor, intenta de nuevo.</p>`;
            document.body.classList.remove('fade-out');
        }
    };

    document.body.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (link && link.href.startsWith(window.location.origin) && !link.href.includes('#')) {
            event.preventDefault();
            if (link.href !== window.location.href) {
                loadContent(link.href);
            }
        }
    });

    window.addEventListener('popstate', () => {
        loadContent(window.location.href);
    });

    highlightActiveLink();


    // --- LÓGICA PARA EL BOTÓN DE VOLVER ARRIBA ---

    // Ahora estamos SEGUROS de que el botón existe antes de intentar encontrarlo
    const btnScrollTop = document.getElementById('btn-scroll-top');

    // Verificamos que el botón realmente exista antes de añadirle eventos
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

}); // Fin del addEventListener 'DOMContentLoaded'