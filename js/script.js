let lastFocusedTrigger = null;

document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar-wrapper");
    const serviceCards = document.querySelectorAll(".service-card");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
    const openModalBtn = document.getElementById("openContactModal");

    const dropdownToggle = document.querySelector(".nav-dropdown-toggle");
    const dropdownItem = document.querySelector(".has-dropdown");
    const dropdownMenu = document.getElementById("servicesDropdown");

    if ("link" in document.createElement("link")) {
        [
            "https://fonts.googleapis.com",
            "https://www.googletagmanager.com",
            "https://script.google.com"
        ].forEach((href) => {
            const link = document.createElement("link");
            link.rel = "dns-prefetch";
            link.href = href;
            document.head.appendChild(link);
        });
    }

    const openMenu = () => {
        if (!navLinks || !hamburger) return;
        navLinks.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
        if (!navLinks || !hamburger) return;
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    const closeDropdown = () => {
        if (!dropdownItem || !dropdownToggle) return;
        dropdownItem.classList.remove("open");
        dropdownToggle.setAttribute("aria-expanded", "false");
    };

    const toggleDropdown = () => {
        if (!dropdownItem || !dropdownToggle) return;
        const isOpen = dropdownItem.classList.contains("open");
        dropdownItem.classList.toggle("open");
        dropdownToggle.setAttribute("aria-expanded", String(!isOpen));
    };

    let ticking = false;

    const handleScroll = () => {
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 40);
        }

        serviceCards.forEach((card) => {
            if (card.getBoundingClientRect().top < window.innerHeight - 50) {
                card.classList.add("visible");
            }
        });

        ticking = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        },
        { passive: true }
    );

    handleScroll();

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("open");

            if (isOpen) {
                closeMenu();
                closeDropdown();
            } else {
                openMenu();
            }
        });
    }

    if (dropdownToggle && dropdownItem) {
        dropdownToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        dropdownToggle.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleDropdown();
            }

            if (e.key === "Escape") {
                closeDropdown();
                dropdownToggle.focus();
            }
        });

        dropdownMenu?.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeDropdown();
                dropdownToggle.focus();
            }
        });
    }

    document.addEventListener("click", (e) => {
        const clickedInsideNavbar = e.target.closest(".navbar-wrapper");
        const clickedDropdown = e.target.closest(".has-dropdown");
        const clickedNavLink = e.target.closest(".nav-links a");

        if (!clickedDropdown) {
            closeDropdown();
        }

        if (!clickedInsideNavbar && navLinks?.classList.contains("open")) {
            closeMenu();
        }

        if (clickedNavLink) {
            closeMenu();
            closeDropdown();
        }
    });

    if (dropdownItem) {
        dropdownItem.addEventListener("focusout", () => {
            requestAnimationFrame(() => {
                if (!dropdownItem.contains(document.activeElement)) {
                    closeDropdown();
                }
            });
        });
    }

    if (openModalBtn) {
        openModalBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            lastFocusedTrigger = openModalBtn;

            let modal = document.getElementById("contactModal");

            try {
                if (!modal) {
                    const response = await fetch("contact-form.html");
                    if (!response.ok) throw new Error("Unable to load contact form.");
                    document.body.insertAdjacentHTML("beforeend", await response.text());
                    modal = document.getElementById("contactModal");
                }

                if (!modal) {
                    throw new Error("Contact modal not found.");
                }

                if (!modal.dataset.initialized) {
                    initContactModal(modal);
                    modal.dataset.initialized = "true";
                }

                resetForm(modal);
                modal.classList.add("active");
                modal.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
                document.getElementById("modalCloseBtn")?.focus();
            } catch (error) {
                alert(error.message || "Something went wrong while opening the contact form.");
            }
        });
    }
});

const resetForm = (modal) => {
    const form = modal.querySelector(".contact-form");
    const feedback = modal.querySelector("#formFeedback");
    const success = modal.querySelector(".success-state");

    if (form) {
        form.reset();
        form.style.display = "";
    }

    if (feedback) {
        feedback.style.display = "none";
        feedback.textContent = "";
    }

    if (success) {
        success.hidden = true;
        success.setAttribute("aria-hidden", "true");
    }

    const submitBtn = form?.querySelector("button[type='submit']");
    const btnText = submitBtn?.querySelector(".btn-text");

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
    }

    if (btnText) {
        btnText.textContent = "Submit Confidential Request";
    }
};

const closeModalFunc = (modal) => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastFocusedTrigger) {
        lastFocusedTrigger.focus();
    }
};

function initContactModal(modal) {
    const closeBtns = modal.querySelectorAll("#closeModal, #modalCloseBtn");
    const overlay = modal.querySelector(".modal-overlay");
    const form = modal.querySelector(".contact-form");
    const feedback = modal.querySelector("#formFeedback");

    closeBtns.forEach((btn) => {
        btn.addEventListener("click", () => closeModalFunc(modal));
    });

    if (overlay) {
        overlay.addEventListener("click", () => closeModalFunc(modal));
    }

    trapFocus(modal);

    if (form) {
        form.addEventListener("submit", (e) => {
            handleFormSubmit(e, modal, form, feedback);
        });
    }
}

const handleFormSubmit = async (e, modal, form, feedback) => {
    e.preventDefault();

    if (form.hp_email && form.hp_email.value) {
        showFeedback(feedback, "⚠️ Submission blocked (spam detected).", "red");
        return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    const btnText = submitBtn?.querySelector(".btn-text");

    if (!submitBtn || !btnText) return;

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
        setLoadingState(submitBtn, btnText, false);
    }
};

const setLoadingState = (btn, textEl, loading) => {
    btn.disabled = loading;
    btn.classList.toggle("loading", loading);
    if (textEl) {
        textEl.textContent = loading ? "Submitting…" : "Submit Confidential Request";
    }
};

const showFeedback = (el, message, color) => {
    if (!el) return;
    el.textContent = message;
    el.style.color = color;
    el.style.display = "block";
};

function showSuccessAnimation(modal) {
    const form = modal.querySelector("form");
    const success = modal.querySelector(".success-state");
    const submitBtn = form?.querySelector("button[type='submit']");
    const btnText = submitBtn?.querySelector(".btn-text");

    if (form) form.style.display = "none";
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
    }
    if (btnText) {
        btnText.textContent = "Submit Confidential Request";
    }

    if (success) {
        success.hidden = false;
        success.setAttribute("aria-hidden", "false");

        const closeSuccessBtn = success.querySelector(".success-close");
        if (closeSuccessBtn) {
            closeSuccessBtn.onclick = () => {
                success.hidden = true;
                success.setAttribute("aria-hidden", "true");
                if (form) form.style.display = "";
                closeModalFunc(modal);
            };
        }
    }
}

function trapFocus(modal) {
    if (modal.dataset.focusTrapBound === "true") return;

    modal.addEventListener("keydown", (e) => {
        const focusable = modal.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

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

    modal.dataset.focusTrapBound = "true";
}
