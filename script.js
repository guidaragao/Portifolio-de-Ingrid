// ============================================
// INGRID ARAGÃO - PORTFÓLIO
// ============================================

// ===== TOGGLE TEMA =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== MENU MOBILE =====
const menuHamburger = document.getElementById('menu-hamburger');
const nav = document.getElementById('nav');

menuHamburger.addEventListener('click', () => {
    menuHamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuHamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ===== HEADER SCROLL =====
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== FILTRO DE PORTFOLIO =====
const filtros = document.querySelectorAll('.filtro-btn');
const sections = document.querySelectorAll('.portfolio-section');
const masonryItems = document.querySelectorAll('.masonry-item');

filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
        // Update active button
        filtros.forEach(f => f.classList.remove('active'));
        filtro.classList.add('active');
        
        const categoria = filtro.getAttribute('data-filter');
        
        // Filter sections
        sections.forEach(section => {
            const sectionCategory = section.getAttribute('data-category');
            
            if (categoria === 'todos') {
                section.style.display = 'block';
            } else if (sectionCategory === categoria) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});

// ===== LIGHTBOX PARA FOTOS =====
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImageIndex = 0;
let galleryImages = [];

// Collect all masonry images
document.querySelectorAll('.masonry-item').forEach((item, index) => {
    const img = item.querySelector('img');
    galleryImages.push(img.src);
    
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    lightboxImage.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    lightboxImage.src = galleryImages[currentImageIndex];
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

// Close on background click
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
});

// ===== ANIMAÇÃO AO SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.projeto-card, .app-card, .video-card, .expertise-item, .contato-item, .masonry-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});
// ===== VIDEO MODAL =====
const videoModal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('video-player');
const videoModalClose = document.getElementById('video-modal-close');
const videoCards = document.querySelectorAll('.video-card[data-video]');

videoCards.forEach(card => {
    card.addEventListener('click', () => {
        const videoSrc = card.getAttribute('data-video');
        if (videoSrc && videoModal && videoPlayer) {
            videoPlayer.src = videoSrc;
            videoModal.classList.add('active');
            videoPlayer.play();
            document.body.style.overflow = 'hidden';
        }
    });
});

function closeVideoModal() {
    if (videoModal && videoPlayer) {
        videoModal.classList.remove('active');
        videoPlayer.pause();
        videoPlayer.src = '';
        document.body.style.overflow = '';
    }
}

if (videoModalClose) {
    videoModalClose.addEventListener('click', closeVideoModal);
}

if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('active')) {
        closeVideoModal();
    }
});

// Classe visible
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
