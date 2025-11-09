// Mobile nav toggle (used by pages)
(function(){
  function initNavToggle(){
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    if(btn && menu){
      // ensure ARIA state is present
      if(!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded','false');
      btn.addEventListener('click', ()=>{
        const isHidden = menu.classList.toggle('hidden');
        // when classList.toggle returns true it's now hidden; invert for expanded
        btn.setAttribute('aria-expanded', (!isHidden).toString());
        if(!isHidden){
          // focus first focusable element in the menu for keyboard users
          const firstLink = menu.querySelector('a, button, [tabindex]');
          if(firstLink) firstLink.focus();
        }
      });
    }
  }

  // Theme (dark mode) toggle
  function applyTheme(theme){
    const root = document.documentElement;
    if(theme === 'dark'){
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  function initThemeToggle(){
    const buttons = Array.from(document.querySelectorAll('#theme-toggle, #theme-toggle-mobile'));
    if(!buttons.length) return;

    // initialize from localStorage or system preference
    const stored = localStorage.getItem('ptp-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ? stored : (prefersDark ? 'dark' : 'light');
    applyTheme(initial);
    // update all toggle icons
    buttons.forEach(b => updateToggleIcon(b, initial));

    // attach listeners to all toggles and keep icons in sync
    buttons.forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem('ptp-theme', next);
        buttons.forEach(b => updateToggleIcon(b, next));
      });
    });
  }

  function updateToggleIcon(btn, theme){
    // simple icon swap: use FontAwesome classes if present, otherwise text
    const icon = btn.querySelector('i');
    if(icon){
      if(theme === 'dark'){
        icon.className = 'fas fa-sun';
        btn.setAttribute('aria-label','Switch to light mode');
      } else {
        icon.className = 'fas fa-moon';
        btn.setAttribute('aria-label','Switch to dark mode');
      }
    } else {
      btn.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }
  }

  // Mark the current page link with aria-current="page" so screen readers know the active page
  function initActiveLink(){
    const currentFile = location.pathname.split('/').pop() || 'index.html';
    const navLinks = Array.from(document.querySelectorAll('nav a'));
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      if(!href) return;
      // consider links like 'index.html' or './index.html' or '/pages/index.html'
      const linkFile = href.split('/').pop();
      if(linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')){
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initNavToggle);
  } else {
    initNavToggle();
  }

  // also initialize theme toggle after DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initThemeToggle);
    document.addEventListener('DOMContentLoaded', initActiveLink);
  } else {
    initThemeToggle();
    initActiveLink();
  }
})();
