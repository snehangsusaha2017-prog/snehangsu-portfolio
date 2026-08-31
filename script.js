document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Toggle Logic ---
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('portfolio-theme');
  
  // Determine initial theme: stored preference -> system settings -> light
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcons(initialTheme);

  // Toggle theme click events
  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    themeToggleButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-regular fa-sun'; // Sun icon to switch to light mode
        } else {
          icon.className = 'fa-regular fa-moon'; // Moon icon to switch to dark mode
        }
      }
    });
  }

  // --- ScrollSpy Logic for Right-Side List View ---
  const sections = document.querySelectorAll('.module-section');
  const navItems = document.querySelectorAll('.sidebar-item');

  if (sections.length > 0 && navItems.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the active middle portion of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // --- Mobile Sidebar Drawer ---
  const floatingTocBtn = document.querySelector('.floating-toc-btn');
  const sidebarNav = document.querySelector('.sidebar-nav');
  
  if (floatingTocBtn && sidebarNav) {
    floatingTocBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebarNav.classList.toggle('open');
      const icon = floatingTocBtn.querySelector('i');
      if (icon) {
        if (sidebarNav.classList.contains('open')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-list-ul';
        }
      }
    });

    // Close mobile sidebar when clicking on a sidebar navigation link
    const sidebarLinks = sidebarNav.querySelectorAll('.sidebar-item a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebarNav.classList.remove('open');
        const icon = floatingTocBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-list-ul';
      });
    });

    // Close mobile sidebar when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
      if (sidebarNav.classList.contains('open') && !sidebarNav.contains(e.target) && e.target !== floatingTocBtn && !floatingTocBtn.contains(e.target)) {
        sidebarNav.classList.remove('open');
        const icon = floatingTocBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-list-ul';
      }
    });
  }

  // --- Contact Me Modal Logic ---
  const contactTriggers = document.querySelectorAll('.contact-me-trigger');
  const contactModal = document.getElementById('contactModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  if (contactModal) {
    // Open Modal
    contactTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        contactModal.classList.add('open');
      });
    });

    // Close Modal via close button
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        contactModal.classList.remove('open');
      });
    }

    // Close Modal via clicking on the background overlay
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('open');
      }
    });

    // Close Modal via Esc key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactModal.classList.contains('open')) {
        contactModal.classList.remove('open');
      }
    });
  }

  // --- Homepage Interaction Transition ---
  const isHomepage = document.querySelector('.home-bg-container') !== null;
  if (isHomepage) {
    const triggerActivity = () => {
      document.body.classList.add('active-state');
      document.documentElement.classList.add('active-state');
      
      // Clean up event listeners so they only trigger once
      window.removeEventListener('mousemove', triggerActivity);
      window.removeEventListener('click', triggerActivity);
      window.removeEventListener('scroll', triggerActivity);
      window.removeEventListener('keydown', triggerActivity);
      window.removeEventListener('touchstart', triggerActivity);
    };

    // Add event listeners for various screen activities
    window.addEventListener('mousemove', triggerActivity);
    window.addEventListener('click', triggerActivity);
    window.addEventListener('scroll', triggerActivity);
    window.addEventListener('keydown', triggerActivity);
    window.addEventListener('touchstart', triggerActivity);
  }
});
