// Inject FontAwesome for Icons
const faLink = document.createElement('link');
faLink.rel = 'stylesheet';
faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(faLink);

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement){
            const headerOffset = 60; // a height of your fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                 top: offsetPosition,
                 behavior: "smooth"
            });
        }
    });
});

// --- DYNAMIC CONTENT INJECTION & ANIMATION ---

document.addEventListener('DOMContentLoaded', () => {
    const homeContent = document.querySelector('.home-content');
    
    if (homeContent) {
        // 1. Inject Typing Text Element
        const h1 = homeContent.querySelector('h1');
        if (h1) {
            const subtitle = document.createElement('h3');
            subtitle.innerHTML = "I'm a <span class='typing-text'></span>";
            subtitle.style.fontSize = "2rem";
            subtitle.style.marginTop = "10px";
            subtitle.style.minHeight = "40px"; // Prevent layout shift
            h1.after(subtitle);
        }

        // 2. Inject Social Icons
        const socialDiv = document.createElement('div');
        socialDiv.className = 'social-icons';
        socialDiv.innerHTML = `
            <a href="https://github.com/Samriddhlegend" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/samriddh-kamde-1b8169370" target="_blank"><i class="fab fa-linkedin-in"></i></a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=Samriddhkamde1235@gmail.com" target="_blank"><i class="fas fa-envelope"></i></a>
        `;
        homeContent.appendChild(socialDiv);

        // 3. Start Typing Animation
        const txts = ["CSE Student","Web Developer", "AI Explorer", "Tech Learner", "Coder"];
        let txtIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typeElement = document.querySelector('.typing-text');

        const type = () => {
            const current = txts[txtIndex];
            if (isDeleting) {
                typeElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeElement.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                txtIndex = (txtIndex + 1) % txts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };
        
        type();
    }
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .skill-card, .project-card, .about-content').forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Active Link Highlighting (Scroll Spy)
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});

// Scroll to top button
const scrollTopBtn = document.querySelector("#scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) { // Show button after scrolling 300px
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});