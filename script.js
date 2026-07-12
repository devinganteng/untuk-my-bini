// ======================================
// LOADING SCREEN
// ======================================

window.addEventListener("load", () => {
    const loading = document.getElementById("loading-screen");
    if (!loading) return;

    setTimeout(() => {
        loading.style.transition = "opacity 1s";
        loading.style.opacity = "0";

        setTimeout(() => loading.remove(), 1000);
    }, 1800);
});

// ======================================
// TYPEWRITER
// ======================================

let text = "Time we've spend together";
const typing = document.getElementById("typing");
let index = 0;

function typeWriter() {
    if (!typing) return;
    if (index < text.length) {
        typing.innerHTML += text.charAt(index);
        index += 1;
        setTimeout(typeWriter, 90);
    }
}
typeWriter();

// ======================================
// MUSIC
// ======================================

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
let playing = false;

if (music) {
    music.volume = 0.4;
}

function clampVolume(value) {
    return Math.min(1, Math.max(0, value));
}

function fadeMusic(target, callback) {
    if (!music) {
        callback?.();
        return;
    }

    const interval = setInterval(() => {
        const delta = target - music.volume;
        if (Math.abs(delta) < 0.02) {
            music.volume = clampVolume(target);
            clearInterval(interval);
            callback?.();
            return;
        }

        music.volume = clampVolume(music.volume + Math.sign(delta) * 0.02);
    }, 80);
}

function toggleMusic() {
    if (!music || !musicBtn) return;

    if (playing) {
        fadeMusic(0, () => {
            music.pause();
            musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
        });
    } else {
        music.play().catch(() => {});
        musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        fadeMusic(0.4);
    }

    playing = !playing;
}

if (musicBtn) {
    musicBtn.addEventListener("click", toggleMusic);
}

document.addEventListener("click", () => {
    if (music && !playing) {
        music.play().catch(() => {});
        playing = true;
        if (musicBtn) {
            musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        fadeMusic(0.4);
    }
}, { once: true });

// ======================================
// LOVE LETTER
// ======================================

const popup = document.getElementById("letterPopup");
const openLetter = document.getElementById("openLetter");
const closeLetter = document.getElementById("closeLetter");

if (openLetter && popup) {
    openLetter.addEventListener("click", () => {
        popup.style.display = "flex";
        if (typeof confetti === "function") {
            confetti({
                particleCount: 180,
                spread: 90,
                origin: { y: 0.6 }
            });
        }
    });
}

if (closeLetter && popup) {
    closeLetter.addEventListener("click", () => {
        popup.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === popup) {
        popup.style.display = "none";
    }
});

// ======================================
// IMAGE VIEWER
// ======================================

const images = document.querySelectorAll(".gallery-image");
const viewer = document.getElementById("imageViewer");
const preview = document.getElementById("previewImage");
const closeImage = document.getElementById("closeImage");

images.forEach((img) => {
    img.addEventListener("click", () => {
        if (!viewer || !preview) return;
        viewer.style.display = "flex";
        preview.src = img.src;
    });
});

if (viewer && closeImage) {
    closeImage.addEventListener("click", () => {
        viewer.style.display = "none";
    });

    viewer.addEventListener("click", (e) => {
        if (e.target === viewer) {
            viewer.style.display = "none";
        }
    });
}

// ======================================
// DAYS COUNTER
// ======================================

// CHANGE THIS DATE

const anniversary = new Date("2026-03-11");

function updateCounter() {
    const counter = document.getElementById("daysCounter");
    if (!counter) return;

    const diff = Date.now() - anniversary.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    counter.innerHTML = `${days} Days ❤️`;
}
updateCounter();

// ======================================
// STARS
// ======================================

const starsContainer = document.getElementById("stars");
if (starsContainer) {
    for (let i = 0; i < 250; i += 1) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 4}s`;
        star.style.opacity = Math.random().toString();
        starsContainer.appendChild(star);
    }
}

// ======================================
// SHOOTING STARS
// ======================================

function shootingStar() {
    const container = document.getElementById("shooting-stars");
    if (!container) return;

    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 40}vh`;
    container.appendChild(star);
    setTimeout(() => star.remove(), 2200);
}

(function scheduleShootingStar() {
    shootingStar();
    setTimeout(scheduleShootingStar, 3500 + Math.random() * 2500);
})();

// ======================================
// FLOATING HEARTS
// ======================================

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    const hearts = ["❤️", "💖", "💕", "💗", "🤍"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.fontSize = `${18 + Math.random() * 22}px`;
    heart.style.animationDuration = `${6 + Math.random() * 5}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 11000);
}
setInterval(createHeart, 600);

// ======================================
// SAKURA PETALS
// ======================================

function createPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.textContent = "🌸";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${7 + Math.random() * 5}s`;
    petal.style.fontSize = `${16 + Math.random() * 18}px`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 12000);
}
setInterval(createPetal, 700);

// ======================================
// FIREFLIES
// ======================================

for (let i = 0; i < 40; i += 1) {
    const fly = document.createElement("div");
    fly.className = "firefly";
    fly.style.left = `${Math.random() * 100}vw`;
    fly.style.top = `${Math.random() * 100}vh`;
    fly.animate(
        [
            { transform: "translateY(0px)" },
            { transform: "translateY(-120px)" }
        ],
        {
            duration: 5000 + Math.random() * 5000,
            iterations: Infinity,
            direction: "alternate",
            easing: "ease-in-out"
        }
    );
    document.body.appendChild(fly);
}

// ======================================
// MOUSE GLOW
// ======================================

document.addEventListener("mousemove", (e) => {
    const glow = document.createElement("div");
    glow.style.position = "fixed";
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.style.width = "10px";
    glow.style.height = "10px";
    glow.style.borderRadius = "50%";
    glow.style.background = "rgba(130,200,255,.7)";
    glow.style.boxShadow = "0 0 25px #8fd6ff";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "999";
    document.body.appendChild(glow);

    requestAnimationFrame(() => {
        glow.style.transition = ".6s";
        glow.style.opacity = "0";
        glow.style.transform = "scale(3)";
    });

    setTimeout(() => glow.remove(), 650);
});

// ======================================
// SCROLL FADE
// ======================================

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade");
    observer.observe(section);
});

// ======================================
// GSAP INTRO
// ======================================

if (typeof gsap !== "undefined") {
    gsap.from(".glass-card", {
        opacity: 0,
        y: 80,
        duration: 1.4,
        ease: "power3.out"
    });
    gsap.from(".moon", {
        scale: 0,
        duration: 2,
        ease: "elastic.out(1, 0.5)"
    });
    gsap.from(".gallery-image", {
        scrollTrigger: ".gallery",
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 1
    });
    gsap.from(".timeline-item", {
        scrollTrigger: ".timeline",
        opacity: 0,
        x: -80,
        stagger: 0.2,
        duration: 1
    });
}

// ======================================
// FLOATING PARTICLES
// ======================================

setInterval(() => {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = "4px";
    particle.style.height = "4px";
    particle.style.borderRadius = "50%";
    particle.style.background = "#9fdcff";
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = "100vh";
    particle.style.opacity = "0.8";
    particle.style.pointerEvents = "none";
    particle.animate(
        [
            { transform: "translateY(0)" },
            { transform: "translateY(-120vh)" }
        ],
        {
            duration: 10000,
            easing: "linear"
        }
    );
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 10000);
}, 350);

// ======================================
// RANDOM QUOTES
// ======================================

const quotes = [
    "You are my favorite notification ❤️",
    "Every day with you is my favorite day.",
    "You make my universe brighter.",
    "I'd choose you in every lifetime.",
    "Home is wherever you are."
];
setInterval(() => {
    const quote = document.querySelector(".quote p");
    if (quote) {
        quote.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
    }
}, 8000);

// ======================================
// MUSIC FADE IN / OUT
// ======================================

music.volume = 0.4;

function fadeMusic(target) {
    const interval = setInterval(() => {
        if (Math.abs(music.volume - target) < 0.02) {
            music.volume = target;
            clearInterval(interval);
            return;
        }

        if (music.volume < target) {
            music.volume += 0.02;
        } else {
            music.volume -= 0.02;
        }
    }, 80);
}

musicBtn.addEventListener("click", () => {
    if (playing) {
        fadeMusic(0.4);
    } else {
        fadeMusic(0);
    }
});

// ======================================
// DOUBLE CLICK HEART EXPLOSION
// ======================================

document.addEventListener("dblclick", (e) => {
    if (typeof confetti !== "function") return;
    confetti({
        particleCount: 120,
        spread: 120,
        startVelocity: 40,
        origin: {
            x: e.clientX / window.innerWidth,
            y: e.clientY / window.innerHeight
        }
    });
});

// ======================================
// RANDOM SHOOTING STAR SPEED
// ======================================

setInterval(() => {
    shootingStar();
}, 6000 + Math.random() * 5000);

// ======================================
// PARALLAX MOON
// ======================================

window.addEventListener("mousemove", (e) => {
    const moon = document.querySelector(".moon");
    if (!moon) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    moon.style.transform = `translate(${x}px, ${y}px)`;
});

// ======================================
// SCROLL PROGRESS BAR
// ======================================

const progress = document.createElement("div");
progress.id = "progressBar";
progress.style.position = "fixed";
progress.style.top = "0";
progress.style.left = "0";
progress.style.height = "4px";
progress.style.width = "0";
progress.style.background = "#87d1ff";
progress.style.zIndex = "999999";
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = height ? `${(scroll / height) * 100}%` : "0";

    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.transform = `translateY(${scroll * 0.2}px)`;
    }
});

// ======================================
// KEYBOARD SHORTCUT
// Press L to open the letter
// ======================================

document.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "l" && popup) {
        popup.style.display = "flex";
    }
    if (e.key.toLowerCase() === "f" && typeof confetti === "function") {
        const duration = 3000;
        const end = Date.now() + duration;
        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    }
});

// ======================================
// AUTO CHANGE HERO TEXT
// ======================================

const HERO_TEXTS = [
    "Time we get back again",
    "I Love You ❤️",
    "You Are My Favorite Person",
    "My Forever",
    "You Make Me Smile",
    "My Safe Place"
];
let heroIndex = 0;

setInterval(() => {
    heroIndex = (heroIndex + 1) % HERO_TEXTS.length;
    text = HERO_TEXTS[heroIndex];
    if (typing) typing.innerHTML = "";
    index = 0;
    typeWriter();
}, 12000);

// ======================================
// PREVENT IMAGE DRAG
// ======================================

document.querySelectorAll("img").forEach((img) => {
    img.draggable = false;
});

// ======================================
// SMOOTH REVEAL
// ======================================

document.querySelectorAll(".glass-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-8px)";
        card.style.transition = ".35s";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
    });
});

// ======================================
// INITIAL MESSAGE
// ======================================

console.log("❤️ Website created with love.");