document.addEventListener("DOMContentLoaded", () => {
    // ===== ELEMENTS =====
    const navbar = document.querySelector(".navbar-wrapper");
    const serviceCards = document.querySelectorAll(".service-card");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    const openModalBtn = document.getElementById("openContactModal");

    // ===== SCROLL EFFECT =====
    window.addEventListener("scroll", () => {
        // Navbar shadow / scrolled style
        navbar.classList.toggle("scrolled", window.scrollY > 40);

        // Animate service cards when visible
        serviceCards.forEach(card => {
            if (card.getBoundingClientRect().top < window.innerHeight - 50) {
                card.classList.add("visible");
            }
        });
    });

    // ===== HAMBURGER MENU =====
    hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.contains("open");
        hamburger.setAttribute("aria-expanded", !isOpen);
        navLinks.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    });

    // Close menu on outside click
    document.addEventListener("click", e => {
        if (!e.target.closest(".navbar-wrapper")) {
            navLinks.classList.remove("open");
            document.body.classList.remove("menu-open");
        }
    });

    // Close menu on link click
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            document.body.classList.remove("menu-open");
        });
    });

    // ===== CONTACT MODAL =====
    openModalBtn.addEventListener("click", async e => {
        e.preventDefault();

        // Load modal HTML if not already in DOM
        let modal = document.getElementById("contactModal");
        if (!modal) {
            const response = await fetch("contact-form.html");
            const html = await response.text();
            document.body.insertAdjacentHTML("beforeend", html);
            modal = document.getElementById("contactModal");
        }

        // Show modal
        modal.classList.add("active");
        document.body.style.overflow = "hidden";

        initContactModal(modal);
    });
});

// ===== CONTACT MODAL FUNCTIONS =====
function initContactModal(modal) {
    const closeOverlay = modal.querySelector("#closeModal");
    const closeBtn = modal.querySelector("#modalCloseBtn");
    const form = modal.querySelector(".contact-form");
    const feedback = modal.querySelector("#formFeedback");

    // Close modal handlers
    [closeOverlay, closeBtn].forEach(btn => {
        btn.addEventListener("click", () => closeModalFunc(modal));
    });

    // Trap focus inside modal
    trapFocus(modal);

    // Form submit
    form.addEventListener("submit", async e => {
        e.preventDefault();
        feedback.style.display = "none";
        feedback.textContent = "";

        // Honeypot spam check
        const honeypot = form.hp_email.value;
        if (honeypot) {
            feedback.style.color = "red";
            feedback.textContent = "⚠️ Submission blocked (spam detected).";
            feedback.style.display = "block";
            return;
        }

        const formData = new FormData(form);
        const submitBtn = form.querySelector("button[type='submit']");
        submitBtn.disabled = true;

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                feedback.style.color = "green";
                feedback.textContent = "✅ Thank you! Your request has been submitted securely.";
                feedback.style.display = "block";
                form.reset();
                setTimeout(() => closeModalFunc(modal), 3000);
            } else {
                const data = await response.json();
                throw new Error(data?.error || "Submission failed. Please try again.");
            }
        } catch (err) {
            feedback.style.color = "red";
            feedback.textContent = `⚠️ ${err.message}`;
            feedback.style.display = "block";
        } finally {
            submitBtn.disabled = false;
        }
    });
}

// Close modal function
function closeModalFunc(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
}

// Trap focus inside modal for accessibility
function trapFocus(modal) {
    const focusable = modal.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    modal.addEventListener("keydown", e => {
        if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }

        if (e.key === "Escape") {
            closeModalFunc(modal);
        }
    });

    first.focus();
}
