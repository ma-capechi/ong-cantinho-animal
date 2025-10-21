// ===== header.js =====
document.addEventListener('DOMContentLoaded', () => {

  // Insere o header dinamicamente
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerContainer = document.getElementById('header');
      if (headerContainer) {
        headerContainer.innerHTML = data;

        // ======= LINKS ATIVOS (nav) =======
        const links = headerContainer.querySelectorAll('.nav a');
        const currentPage = window.location.pathname.split('/').pop();
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentPage || (href === 'index.html' && currentPage === '')) {
            link.classList.add('active');
          }
        });

        // ====== MENU HAMBURGUER MOBILE ======
        const menuToggle = headerContainer.querySelector('.menu-toggle');
        const mobileMenu = headerContainer.querySelector('.mobile-menu');
        const closeMenu = headerContainer.querySelector('.close-menu');

        if (menuToggle && mobileMenu && closeMenu) {
          // abre menu ao clicar no hamburger
          menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('open');
          });

          // fecha menu ao clicar no X
          closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
          });

          // fecha menu ao clicar fora
          mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
              mobileMenu.classList.remove('open');
            }
          });
        }
      }
    })
    .catch(error => console.error('Erro ao carregar o header:', error));

});
