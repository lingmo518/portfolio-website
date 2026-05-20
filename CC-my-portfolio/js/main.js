/* ============================================
   主脚本 — 导航、滚动动画、辅助功能
   作品集：铃默
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 移动端导航切换 ── */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu   = document.querySelector('[data-nav-menu]');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });

    // 点击链接后关闭菜单（移动端）
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── 滚动显示动画（IntersectionObserver） ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // 降级：直接显示所有内容
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 当前页面导航高亮 ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── 页面进入动画 ── */
  document.body.classList.add('page-enter');

  /* ── 平滑页面切换（淡出过渡） ── */
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // 仅处理本地 HTML 链接
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity .25s ease';
      setTimeout(() => { window.location.href = href; }, 260);
    });
  });

});
