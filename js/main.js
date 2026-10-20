  // Мобильное меню
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');

  // Следим за мобильной шириной, чтобы синхронизировать состояние меню
  const mobileQuery = window.matchMedia('(max-width: 720px)');

  function syncMenuState() {
    const isMobile = mobileQuery.matches;
    const isOpen = nav.classList.contains('open');

    // Закрытое мобильное меню скрываем от скринридеров
    // (визуально и из фокуса его исключает CSS через visibility)
    nav.setAttribute('aria-hidden', String(isMobile && !isOpen));

    // На десктопе меню видно всегда — сбрасываем «открытое» состояние
    if (!isMobile && isOpen) {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
    }
  }

  burger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    syncMenuState();
  });

  // Закрывать меню при клике по ссылке
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
      syncMenuState();
    });
  });

  // Инициализация и реакция на изменение ширины окна
  syncMenuState();
  mobileQuery.addEventListener('change', syncMenuState);
