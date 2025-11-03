// Mobile nav toggle (used by pages)
(function(){
  function initNavToggle(){
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    if(btn && menu){
      btn.addEventListener('click', ()=> menu.classList.toggle('hidden'));
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initNavToggle);
  } else {
    initNavToggle();
  }
})();
