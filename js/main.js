// ============================================
// MOBILE NAVIGATION
// ============================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

const contactForm = document.getElementById("contactForm");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuToggle.textContent =
            navMenu.classList.contains("active") ? "✕" : "☰";

    });

}


// Close mobile menu when clicking a link

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }

    });

});


// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-link").forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("active");
    }

});


// ============================================
// DARK / LIGHT MODE
// ============================================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("tns-theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀";
    }

}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "tns-theme",
            isLight ? "light" : "dark"
        );

        themeToggle.textContent =
            isLight ? "☀" : "☾";

    });

}


// ============================================
// SCROLL REVEAL
// ============================================

const revealElements = document.querySelectorAll(
    ".hero-content > *, .hero-visual, .page-hero > *, " +
    ".card, .section-heading, .stat, .cta-section, .two-column, " +
    ".contact-grid > *, .footer-container > *"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -24px 0px"
        }
    );

    revealElements.forEach((element, index) => {

        element.style.setProperty(
            "--reveal-delay",
            `${(index % 4) * 70}ms`
        );

        element.classList.add("reveal");

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {
        element.classList.add("visible");
    });

}


// ============================================
// NAVBAR GLASS EFFECT ON SCROLL
// ============================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    let scrollUpdateScheduled = false;

    const updateNavbar = () => {

        navbar.classList.toggle("scrolled", window.scrollY > 12);

        scrollUpdateScheduled = false;

    };

    updateNavbar();

    window.addEventListener("scroll", () => {

        if (!scrollUpdateScheduled) {

            window.requestAnimationFrame(updateNavbar);

            scrollUpdateScheduled = true;

        }

    }, { passive: true });

}


// ============================================
// CONTACT FORM - WHATSAPP
// ============================================

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("service").value;
        const message = document.getElementById("message").value.trim();

        // WhatsApp business number
        const whatsappNumber = "919342916754";

        // Create WhatsApp message
        const whatsappMessage =
`Hello Tech New Softwares!

Name: ${name}
Email: ${email}
Service: ${service}

Message:
${message}`;

        // Encode message
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create WhatsApp URL
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

    });

}

// =========================================
// LOAD GLOBAL FOOTER
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const footerContainer = document.getElementById("footer-container");

    if (footerContainer) {

        fetch("footer.html")
            .then(response => response.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(error => {
                console.error("Footer loading error:", error);
            });

    }

});