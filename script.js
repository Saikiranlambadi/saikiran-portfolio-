/* ===================================
   TYPING ANIMATION
=================================== */

const typingElement = document.getElementById("typing");

const words = [
    "Full Stack Developer"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 120;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!isDeleting) {

        typingElement.textContent = currentWord.substring(0, charIndex++);
    } else {

        typingElement.textContent = currentWord.substring(0, charIndex--);
    }

    if (!isDeleting && charIndex === currentWord.length + 1) {

        isDeleting = true;
        typingSpeed = 1800;

    } else if (isDeleting && charIndex === 0) {

        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 300;

    } else {

        typingSpeed = isDeleting ? 60 : 120;

    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();


/* ===================================
   STICKY NAVBAR SHADOW
=================================== */

const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.boxShadow = "0 5px 25px rgba(255,98,71,.35)";
        navbar.style.background = "rgba(8,17,31,.96)";

    } else {

        navbar.style.boxShadow = "none";
        navbar.style.background = "rgba(8,17,31,.92)";
    }

});


/* ===================================
   SMOOTH ACTIVE NAVIGATION
=================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* ===================================
   SCROLL REVEAL ANIMATION
=================================== */

const revealItems = document.querySelectorAll(
    ".skill-card,.project-card,.about-box,.title,form"
);

function reveal() {

    const trigger = window.innerHeight * 0.85;

    revealItems.forEach(item => {

        const top = item.getBoundingClientRect().top;

        if (top < trigger) {

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

        }

    });

}

revealItems.forEach(item => {

    item.style.opacity = "0";
    item.style.transform = "translateY(40px)";
    item.style.transition = "0.8s";

});

window.addEventListener("scroll", reveal);
reveal();


/* ===================================
   BUTTON RIPPLE EFFECT
=================================== */

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mousemove", e => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        button.style.setProperty("--x", x + "px");
        button.style.setProperty("--y", y + "px");

    });

});


/* ===================================
   PROJECT CARD HOVER TILT
=================================== */

const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 18;
        const rotateY = (rect.width / 2 - x) / 18;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) scale(1)";

    });

});


/* ===================================
   CONTACT FORM SUBMISSION
=================================== */

const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        if (formStatus) {
            formStatus.textContent = "";
            formStatus.className = "form-status loading";
            formStatus.textContent = "Sending your message...";
        }

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            const data = await response.json().catch(() => null);

            if (response.ok && data && (data.success === "true" || data.success === true)) {
                contactForm.reset();
                if (formStatus) {
                    formStatus.textContent = "Message sent successfully! Thank you for contacting me.";
                    formStatus.className = "form-status success";
                }
            } else if (data && data.message) {
                if (formStatus) {
                    formStatus.textContent = data.message;
                    formStatus.className = "form-status info";
                }
            } else if (!response.ok) {
                throw new Error("Form submission failed");
            } else {
                contactForm.reset();
                if (formStatus) {
                    formStatus.textContent = "Message sent successfully! Please check your Gmail (including Spam) to activate FormSubmit if this is your first time.";
                    formStatus.className = "form-status success";
                }
            }
        } catch (error) {
            console.error("Contact form error:", error);

            if (formStatus) {
                formStatus.textContent = "Unable to send message via AJAX. Please check your Gmail inbox/spam for FormSubmit activation, or email lambadisaikiran@gmail.com directly.";
                formStatus.className = "form-status error";
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }
        }
    });
}


/* ===================================
   HERO IMAGE FLOATING (DISABLED)
=================================== */


/* ===================================
   CONSOLE MESSAGE
=================================== */

console.log(
    "%cWelcome to Saikiran's Cyberpunk Portfolio",
    "color:#ff6247;font-size:18px;font-weight:bold;"
);