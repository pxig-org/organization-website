document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(year);
  });

  const nav = document.getElementById("nav-list");
  const toggle = document.querySelector(".nav-toggle");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const fields = {
    name: {
      el: document.getElementById("name"),
      err: document.getElementById("error-name"),
    },
    email: {
      el: document.getElementById("email"),
      err: document.getElementById("error-email"),
    },
    subject: {
      el: document.getElementById("subject"),
      err: document.getElementById("error-subject"),
    },
    message: {
      el: document.getElementById("message"),
      err: document.getElementById("error-message"),
    },
  };

  function clearErrors() {
    Object.values(fields).forEach(({ el, err }) => {
      err.textContent = "";
      el.removeAttribute("aria-invalid");
    });
    status.textContent = "";
    status.className = "form-status";
    status.hidden = true;
  }

  function validate() {
    clearErrors();
    let valid = true;

    if (!fields.name.el.value.trim() || fields.name.el.value.trim().length < 2) {
      fields.name.err.textContent = "Please enter your name (at least 2 characters).";
      fields.name.el.setAttribute("aria-invalid", "true");
      valid = false;
    }

    const email = fields.email.el.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fields.email.err.textContent = "Please enter a valid email address.";
      fields.email.el.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!fields.subject.el.value) {
      fields.subject.err.textContent = "Please select an inquiry type.";
      fields.subject.el.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!fields.message.el.value.trim() || fields.message.el.value.trim().length < 10) {
      fields.message.err.textContent = "Please enter a message of at least 10 characters.";
      fields.message.el.setAttribute("aria-invalid", "true");
      valid = false;
    }

    return valid;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validate()) {
      status.hidden = false;
      status.className = "form-status is-success";
      status.textContent =
        "Thank you. This is a frontend demonstration only — your message was not sent. Connect a backend when you are ready to receive inquiries.";
      form.reset();
    } else {
      status.hidden = false;
      status.className = "form-status is-error";
      status.textContent = "Please correct the errors below and try again.";
    }
  });

  const resetBtn = document.getElementById("btn-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      clearErrors();
    });
  }
});
