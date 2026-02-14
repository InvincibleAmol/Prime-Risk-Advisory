document.addEventListener("DOMContentLoaded", () => {
    // ===== ELEMENTS =====
    const navbar = document.querySelector(".navbar-wrapper");
    const serviceCards = document.querySelectorAll(".service-card");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    const openModalBtn = document.getElementById("openContactModal");

    // Preload DNS hints (runs once)
    if ("link" in document.createElement("link")) {
        ["https://fonts.googleapis.com", "https://www.googletagmanager.com", "https://script.google.com"]
            .forEach(href => {
                const link = document.createElement("link");
                link.rel = "dns-prefetch";
                link.href = href;
                document.head.appendChild(link);
            });
    }

    // ===== SCROLL EFFECT =====
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle("scrolled", window.scrollY > 40);
                
                serviceCards.forEach(card => {
                    if (card.getBoundingClientRect().top < window.innerHeight - 50) {
                        card.classList.add("visible");
                    }
                });
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ===== HAMBURGER MENU =====
    const toggleMenu = () => {
        const isOpen = navLinks.classList.contains("open");
        hamburger.setAttribute("aria-expanded", !isOpen);
        navLinks.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    };

    hamburger.addEventListener("click", toggleMenu);

    // Close menu handlers (delegated)
    document.addEventListener("click", e => {
        if (!e.target.closest(".navbar-wrapper") && !e.target.closest(".nav-links a")) {
            navLinks.classList.remove("open");
            document.body.classList.remove("menu-open");
        }
    });

    // ===== CONTACT MODAL =====
    openModalBtn.addEventListener("click", async e => {
        e.preventDefault();
        
        let modal = document.getElementById("contactModal");
        if (!modal) {
            const response = await fetch("contact-form.html");
            document.body.insertAdjacentHTML("beforeend", await response.text());
            modal = document.getElementById("contactModal");
        }

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        
        resetForm(modal);
        initContactModal(modal);
    });
});

// ===== UTILITY FUNCTIONS =====
const resetForm = modal => {
    const form = modal.querySelector(".contact-form");
    const feedback = modal.querySelector("#formFeedback");
    
    if (form) form.reset();
    if (feedback) {
        feedback.style.display = "none";
        feedback.textContent = "";
    }
};

const closeModalFunc = modal => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
};

// ===== CONTACT MODAL FUNCTIONS =====
function initContactModal(modal) {
    const closeBtns = modal.querySelectorAll("#closeModal, #modalCloseBtn");
    const form = modal.querySelector(".contact-form");
    const feedback = modal.querySelector("#formFeedback");

    // Close handlers
    closeBtns.forEach(btn => btn.addEventListener("click", () => closeModalFunc(modal)));

    // Trap focus
    trapFocus(modal);

    // Form submission
    form.addEventListener("submit", handleFormSubmit.bind(null, modal, form, feedback));
}

const handleFormSubmit = async (modal, form, feedback) => {
    event.preventDefault();

    // Honeypot check
    if (form.hp_email.value) {
        showFeedback(feedback, "⚠️ Submission blocked (spam detected).", "red");
        return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn.querySelector(".btn-text");
    
    setLoadingState(submitBtn, btnText, true);

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: { Accept: "application/json" }
        });

        const data = await response.json();

        if (data.status === "success") {
            showSuccessAnimation(modal);
            return;
        }

        if (data.status === "duplicate") {
            showFeedback(feedback, "⚠️ We already received your request recently.", "#b45309");
        } else {
            throw new Error("Submission failed. Please try again.");
        }
    } catch (err) {
        showFeedback(feedback, `⚠️ ${err.message}`, "red");
    } finally {
        setLoadingState(submitBtn, submitBtn.querySelector(".btn-text"), false);
    }
};

const setLoadingState = (btn, textEl, loading) => {
    btn.disabled = loading;
    btn.classList.toggle("loading", loading);
    textEl.textContent = loading ? "Submitting…" : "Submit Secure Request";
};

const showFeedback = (el, message, color) => {
    el.textContent = message;
    el.style.color = color;
    el.style.display = "block";
};

function showSuccessAnimation(modal) {
    const form = modal.querySelector("form");
    const success = modal.querySelector(".success-state");
    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn.querySelector(".btn-text");

    form.style.display = "none";
    submitBtn.disabled = false;
    submitBtn.classList.remove("loading");
    btnText.textContent = "Submit Secure Request";

    success.hidden = false;
    success.querySelector(".success-close").onclick = () => {
        success.hidden = true;
        form.style.display = "";
        closeModalFunc(modal);
    };
}

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
        } else if (e.key === "Escape") {
            closeModalFunc(modal);
        }
    });

    first?.focus();
}
