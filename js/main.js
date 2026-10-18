(function () {
  'use strict';

  /** Set to your organization name to update all [data-org-name] elements. */
  var ORGANIZATION_NAME = 'Organization';

  document.addEventListener('DOMContentLoaded', function () {
    var year = new Date().getFullYear();
    document.querySelectorAll('#year').forEach(function (el) {
      el.textContent = year;
    });

    if (ORGANIZATION_NAME) {
      document.querySelectorAll('[data-org-name]').forEach(function (el) {
        el.textContent = ORGANIZATION_NAME;
      });
      document.title = document.title.replace(/^Organization/, ORGANIZATION_NAME);
    }

    document.querySelectorAll('.nav-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nav = document.getElementById('nav-list');
        if (!nav) return;
        var show = !nav.classList.contains('show');
        nav.classList.toggle('show', show);
        btn.setAttribute('aria-expanded', show ? 'true' : 'false');
      });
    });

    document.addEventListener('click', function (e) {
      var nav = document.getElementById('nav-list');
      var toggle = document.querySelector('.nav-toggle');
      if (!nav || !toggle) return;
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.querySelectorAll('.nav-list a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        var nav = document.getElementById('nav-list');
        var toggle = document.querySelector('.nav-toggle');
        if (nav) nav.classList.remove('show');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      });
    });

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      var revealEls = document.querySelectorAll('.reveal');
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('is-visible');
      });
    }

    var form = document.getElementById('contact-form');
    if (form) {
      var status = document.getElementById('form-status');
      var fields = {
        name: { el: document.getElementById('name'), err: document.getElementById('error-name') },
        email: { el: document.getElementById('email'), err: document.getElementById('error-email') },
        subject: { el: document.getElementById('subject'), err: document.getElementById('error-subject') },
        message: { el: document.getElementById('message'), err: document.getElementById('error-message') }
      };

      function clearErrors() {
        Object.keys(fields).forEach(function (key) {
          var f = fields[key];
          if (!f.el || !f.err) return;
          f.err.textContent = '';
          f.el.removeAttribute('aria-invalid');
        });
        if (status) status.textContent = '';
      }

      function validate() {
        clearErrors();
        var ok = true;
        if (!fields.name.el.value || fields.name.el.value.trim().length < 2) {
          fields.name.err.textContent = 'Please enter your name.';
          fields.name.el.setAttribute('aria-invalid', 'true');
          ok = false;
        }
        if (!fields.email.el.value || !/^\S+@\S+\.\S+$/.test(fields.email.el.value)) {
          fields.email.err.textContent = 'Please enter a valid email address.';
          fields.email.el.setAttribute('aria-invalid', 'true');
          ok = false;
        }
        if (!fields.subject.el.value) {
          fields.subject.err.textContent = 'Please select a subject.';
          fields.subject.el.setAttribute('aria-invalid', 'true');
          ok = false;
        }
        if (!fields.message.el.value || fields.message.el.value.trim().length < 10) {
          fields.message.err.textContent = 'Please enter a longer message.';
          fields.message.el.setAttribute('aria-invalid', 'true');
          ok = false;
        }
        return ok;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validate()) {
          status.textContent = 'Thank you. Your message was recorded locally for demonstration purposes.';
          status.style.color = 'var(--muted)';
          form.reset();
        } else {
          status.textContent = 'Please correct the errors above.';
          status.style.color = '#8b4040';
        }
      });

      var resetBtn = document.getElementById('btn-reset');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          form.reset();
          clearErrors();
        });
      }
    }
  });
})();
