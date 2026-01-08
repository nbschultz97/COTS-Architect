/**
 * UI Feedback System
 * Toast notifications, loading spinners, and visual feedback for user actions
 */

const UIFeedback = (() => {
  /**
   * Toast notification system
   */
  const Toast = {
    container: null,

    init() {
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'toast-container';
        this.container.setAttribute('aria-live', 'polite');
        this.container.setAttribute('aria-atomic', 'true');
        document.body.appendChild(this.container);
      }
    },

    show(message, type = 'info', duration = 4000) {
      this.init();

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.setAttribute('role', 'status');

      // Icon based on type
      const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ',
        sync: '🔄'
      };

      toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close notification">×</button>
      `;

      const closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', () => this.hide(toast));

      this.container.appendChild(toast);

      // Animate in
      requestAnimationFrame(() => {
        toast.classList.add('toast-show');
      });

      // Auto-hide
      if (duration > 0) {
        setTimeout(() => this.hide(toast), duration);
      }

      return toast;
    },

    hide(toast) {
      toast.classList.remove('toast-show');
      toast.classList.add('toast-hide');

      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    },

    success(message, duration) {
      return this.show(message, 'success', duration);
    },

    error(message, duration) {
      return this.show(message, 'error', duration);
    },

    warning(message, duration) {
      return this.show(message, 'warning', duration);
    },

    info(message, duration) {
      return this.show(message, 'info', duration);
    },

    sync(message, duration) {
      return this.show(message, 'sync', duration);
    }
  };

  /**
   * Loading spinner overlay
   */
  const Spinner = {
    overlay: null,

    show(message = 'Loading...') {
      if (!this.overlay) {
        this.overlay = document.createElement('div');
        this.overlay.className = 'spinner-overlay';
        this.overlay.innerHTML = `
          <div class="spinner-content">
            <div class="spinner"></div>
            <p class="spinner-message">${message}</p>
          </div>
        `;
        document.body.appendChild(this.overlay);
      } else {
        this.overlay.querySelector('.spinner-message').textContent = message;
        this.overlay.style.display = 'flex';
      }

      requestAnimationFrame(() => {
        this.overlay.classList.add('spinner-show');
      });
    },

    hide() {
      if (this.overlay) {
        this.overlay.classList.remove('spinner-show');
        setTimeout(() => {
          if (this.overlay) {
            this.overlay.style.display = 'none';
          }
        }, 300);
      }
    }
  };

  /**
   * Highlight element with fade animation
   */
  const highlight = (element, color = 'var(--accent-yellow)') => {
    if (!element) return;

    const originalBg = element.style.backgroundColor;
    element.style.transition = 'background-color 0.3s ease';
    element.style.backgroundColor = color;

    setTimeout(() => {
      element.style.backgroundColor = originalBg;
    }, 1500);
  };

  /**
   * Pulse animation for badges
   */
  const pulseBadge = (element) => {
    if (!element) return;

    element.classList.add('pulse-animation');

    setTimeout(() => {
      element.classList.remove('pulse-animation');
    }, 2000);
  };

  /**
   * Success checkmark animation
   */
  const showSuccessCheckmark = (parentElement) => {
    if (!parentElement) return;

    const checkmark = document.createElement('div');
    checkmark.className = 'success-checkmark';
    checkmark.innerHTML = `
      <svg class="checkmark-svg" viewBox="0 0 52 52">
        <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
        <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg>
    `;

    parentElement.appendChild(checkmark);

    setTimeout(() => {
      checkmark.classList.add('checkmark-show');
    }, 10);

    setTimeout(() => {
      checkmark.classList.remove('checkmark-show');
      setTimeout(() => {
        if (checkmark.parentNode) {
          checkmark.parentNode.removeChild(checkmark);
        }
      }, 300);
    }, 2000);
  };

  /**
   * Badge counter update with animation
   */
  const updateBadge = (badgeElement, count) => {
    if (!badgeElement) return;

    badgeElement.textContent = count;

    if (count > 0) {
      badgeElement.style.display = 'inline-block';
      pulseBadge(badgeElement);
    } else {
      badgeElement.style.display = 'none';
    }
  };

  /**
   * Confirm dialog (better than native confirm)
   */
  const confirm = (message, options = {}) => {
    return new Promise((resolve) => {
      const modal = document.createElement('div');
      modal.className = 'confirm-modal';
      modal.innerHTML = `
        <div class="confirm-content">
          <h3>${options.title || 'Confirm'}</h3>
          <p>${message}</p>
          <div class="confirm-actions">
            <button class="btn ghost confirm-cancel">${options.cancelText || 'Cancel'}</button>
            <button class="btn primary confirm-ok">${options.confirmText || 'Confirm'}</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);

      const okBtn = modal.querySelector('.confirm-ok');
      const cancelBtn = modal.querySelector('.confirm-cancel');

      const cleanup = (result) => {
        modal.classList.add('confirm-hide');
        setTimeout(() => {
          if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        }, 300);
        resolve(result);
      };

      okBtn.addEventListener('click', () => cleanup(true));
      cancelBtn.addEventListener('click', () => cleanup(false));

      requestAnimationFrame(() => {
        modal.classList.add('confirm-show');
      });
    });
  };

  // Public API
  return {
    Toast,
    Spinner,
    highlight,
    pulseBadge,
    showSuccessCheckmark,
    updateBadge,
    confirm
  };
})();

// Export for browser global scope
window.UIFeedback = UIFeedback;
