document.addEventListener('DOMContentLoaded', function () {
  const y = new Date().getFullYear();
  document.querySelectorAll('#year').forEach(el => el.textContent = y);

  document.querySelectorAll('.nav-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const nav = document.getElementById('nav-list');
      const show = !nav.classList.contains('show');
      nav.classList.toggle('show', show);
      btn.setAttribute('aria-expanded', show ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function(e){
    const nav = document.getElementById('nav-list');
    const toggle = document.querySelector('.nav-toggle');
    if (!nav.contains(e.target) && toggle && !toggle.contains(e.target)) {
      nav.classList.remove('show');
      if (toggle) toggle.setAttribute('aria-expanded','false');
    }
  });

  const form = document.getElementById('contact-form');
  if (form) {
    const status = document.getElementById('form-status');

    const fields = {
      name: {el: document.getElementById('name'), err: document.getElementById('error-name')},
      email: {el: document.getElementById('email'), err: document.getElementById('error-email')},
      subject: {el: document.getElementById('subject'), err: document.getElementById('error-subject')},
      message: {el: document.getElementById('message'), err: document.getElementById('error-message')}
    };

    function clearErrors(){
      Object.values(fields).forEach(f => { f.err.textContent=''; f.el.removeAttribute('aria-invalid'); });
      status.textContent = '';
    }

    function validate() {
      clearErrors();
      let ok = true;
      if (!fields.name.el.value || fields.name.el.value.trim().length < 2) {
        fields.name.err.textContent = 'Please enter your name.';
        fields.name.el.setAttribute('aria-invalid','true');
        ok = false;
      }
      if (!fields.email.el.value || !/^\S+@\S+\.\S+$/.test(fields.email.el.value)) {
        fields.email.err.textContent = 'Please enter a valid email address.';
        fields.email.el.setAttribute('aria-invalid','true');
        ok = false;
      }
      if (!fields.subject.el.value) {
        fields.subject.err.textContent = 'Please select a subject.';
        fields.subject.el.setAttribute('aria-invalid','true');
        ok = false;
      }
      if (!fields.message.el.value || fields.message.el.value.trim().length < 10) {
        fields.message.err.textContent = 'Please enter a longer message.';
        fields.message.el.setAttribute('aria-invalid','true');
        ok = false;
      }
      return ok;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validate()) {
        status.textContent = 'Thank you — your message has been recorded locally for demonstration. No messages are sent from this demo.';
        status.style.color = 'var(--muted)';
        form.reset();
      } else {
        status.textContent = 'Please correct the errors above.';
        status.style.color = '#b04545';
      }
    });

    document.getElementById('btn-reset').addEventListener('click', function(){
      form.reset();
      clearErrors();
    });
  }
});
