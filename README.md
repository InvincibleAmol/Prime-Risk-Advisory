
/* HAMBURGER */
.hamburger {
    display: none;
}

.hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #ffffff;
    margin: 5px 0;
    border-radius: 2px;
}

@media (max-width: 1200px) and (min-width: 769px) {
     .hamburger {
        display: block;
        position: absolute;
        right: 18px;
        top: 18px;
        cursor: pointer;
        z-index: 1200;
    }

   .nav-links {
        position: fixed;
        top: 0;
        right: 0;
        width: 85vw;
        max-width: 320px;
        height: 100vh;
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(16px);
        display: flex;
        flex-direction: column;
        padding-top: 88px;
        transform: translate3d(100%, 0, 0);
        transition: transform 0.35s ease;
        overflow-x: hidden;
        box-sizing: border-box;
        z-index: 1000;
    }

    .nav-links.open {
        transform: translate3d(0, 0, 0);
    }

    .nav-links::before {
        content: "";
        position: absolute;
        top: 64px;
        left: 24px;
        right: 24px;
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
    }

    .nav-links li {
        text-align: center;
    }

    .nav-links a {
        padding: 10px 0;
        letter-spacing: 0.3px;
        color: #e5e7eb;
        font-size: 16px;
        display: block;
        align-items: center;
    }

    .nav-links a:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.06);
    }

    body.menu-open::before {
        content: "";
        position: fixed;
        inset: 0;
        background: rgba(2, 8, 23, 0.65);
        backdrop-filter: blur(8px);
        z-index: 900;
    }
}


/* MOBILE */
@media (max-width: 768px) {
    .navbar-wrapper {
        position: sticky !important;
        top: 0 !important;
        will-change: transform;
    }

    .navbar {
        max-width: 100%;
        padding: 0 10px;
    }

    .hamburger {
        display: block;
        position: absolute;
        right: 18px;
        top: 18px;
        cursor: pointer;
        z-index: 1200;
    }

    .nav-links {
        position: fixed;
        top: 0;
        right: 0;
        width: 35vw;
        max-width: 300px;
        height: 100vh;
        background: rgba(15, 23, 42, 0.92);
        backdrop-filter: blur(16px);
        display: flex;
        flex-direction: column;
        padding-top: 70px;
        transform: translate3d(100%, 0, 0);
        transition: transform 0.35s ease;
        overflow-x: hidden;
        box-sizing: border-box;
        z-index: 1000;
    }

    .nav-links.open {
        transform: translate3d(0, 0, 0);
    }

    .nav-links::before {
        content: "";
        position: absolute;
        top: 54px;
        left: 24px;
        right: 24px;
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
    }

    .nav-links li {
        text-align: center;
    }

    .nav-links a {
        padding: 16px 24px; /* 44px+ touch target */
        min-height: 48px;
        letter-spacing: 0.3px;
        color: #e5e7eb;
        font-size: 18px;
        display: block;
        align-items: center;
    }

    .nav-links a:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.06);
    }

    body.menu-open::before {
        content: "";
        position: fixed;
        inset: 0;
        background: rgba(2, 8, 23, 0.65);
        backdrop-filter: blur(8px);
        z-index: 900;
    }

    section {
        max-width: 100%;
        margin: 40px 16px;
        padding: 24px;
    }

    .site-header {
        padding-left: 16px;
        padding-right: 16px;
    }
}

@media (max-width: 640px) {
    .services-grid {
        grid-template-columns: 1fr;
    }
}
