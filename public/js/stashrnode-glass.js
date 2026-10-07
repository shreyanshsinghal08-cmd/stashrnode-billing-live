/**
 * STASHRNODE FROSTED GLASS & SIDEBAR HAMBURGER CONTROLLER
 * Vanilla JavaScript - Zero Dependencies
 * Handles off-canvas sliding sidebar, floating hamburger button, backdrop & keyboard shortcuts
 */

(function () {
  'use strict';

  function initStashrNodeGlass() {
    // 1. Ensure Backdrop overlay exists
    let backdrop = document.getElementById('sn-sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.id = 'sn-sidebar-backdrop';
      backdrop.className = 'sn-sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    // 2. Ensure Hamburger Button exists (use header button if present, fallback to floating)
    const headerBtn = document.getElementById('sn-hamburger-btn');
    let floatingBtn = document.getElementById('sn-floating-hamburger');

    if (headerBtn) {
      if (floatingBtn) {
        floatingBtn.remove();
        floatingBtn = null;
      }
    } else if (!floatingBtn) {
      floatingBtn = document.createElement('button');
      floatingBtn.id = 'sn-floating-hamburger';
      floatingBtn.type = 'button';
      floatingBtn.className = 'sn-hamburger-toggle sn-floating-hamburger-fixed';
      floatingBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
      floatingBtn.setAttribute('title', 'Toggle Navigation Menu');
      floatingBtn.innerHTML = `
        <svg class="sn-hamburger-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
      document.body.appendChild(floatingBtn);
    }

    // 3. Define Global Toggle Function
    window.snToggleSidebar = function (force) {
      const body = document.body;
      const willOpen = typeof force === 'boolean' ? force : !body.classList.contains('sn-sidebar-open');

      if (willOpen) {
        body.classList.add('sn-sidebar-open');
      } else {
        body.classList.remove('sn-sidebar-open');
      }

      // Toggle active states on sidebars
      const sidebars = document.querySelectorAll('#main-aside, aside[id="main-aside"], .sn-sidebar-floating, .fi-sidebar');
      sidebars.forEach(el => {
        if (willOpen) {
          el.classList.add('is-open');
        } else {
          el.classList.remove('is-open');
        }
      });

      // Update button aria attributes and active classes
      const buttons = document.querySelectorAll('.sn-hamburger-toggle, #sn-floating-hamburger, #sn-hamburger-btn');
      buttons.forEach(btn => {
        btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        if (willOpen) {
          btn.classList.add('is-active');
        } else {
          btn.classList.remove('is-active');
        }
      });
    };

    // 4. Attach Click Events to Hamburger Buttons
    const allHamburgers = document.querySelectorAll('.sn-hamburger-toggle, #sn-floating-hamburger, #sn-hamburger-btn');
    allHamburgers.forEach(btn => {
      // Remove older listeners by cloning or direct onclick
      btn.onclick = function (e) {
        e.stopPropagation();
        window.snToggleSidebar();
      };
    });

    // 5. Close on Backdrop Click
    if (backdrop) {
      backdrop.onclick = function () {
        window.snToggleSidebar(false);
      };
    }

    // 6. Close Buttons inside Sidebar
    const closeButtons = document.querySelectorAll('.sn-sidebar-close-btn');
    closeButtons.forEach(btn => {
      btn.onclick = function (e) {
        e.stopPropagation();
        window.snToggleSidebar(false);
      };
    });

    // 7. Auto close on link click for mobile
    const sidebarLinks = document.querySelectorAll('#main-aside a, .fi-sidebar a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth < 1024) {
          window.snToggleSidebar(false);
        }
      });
    });
  }

  // 8. Global Keyboard Handler (Escape closes sidebar)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('sn-sidebar-open')) {
      window.snToggleSidebar(false);
    }
  });

  // 9. Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStashrNodeGlass);
  } else {
    initStashrNodeGlass();
  }

  // Livewire SPA & Turbo support
  document.addEventListener('livewire:navigated', initStashrNodeGlass);
  document.addEventListener('turbo:load', initStashrNodeGlass);
})();
