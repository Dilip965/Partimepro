// Mobile nav toggle (used by pages)
(function(){
  function initNavToggle(){
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    if(btn && menu){
      btn.addEventListener('click', ()=> menu.classList.toggle('hidden'));
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

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initNavToggle);
  } else {
    initNavToggle();
  }

  // also initialize theme toggle after DOM ready
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
