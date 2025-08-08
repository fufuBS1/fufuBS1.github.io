// Slider Manuel
const manualSlider = (function() {
    const images = [
        "image/IMG-20250625-WA0001.jpg",
        "image/IMG-20250625-WA00001.jpg",
        "image/IMG-20250625-WA0002.jpg",
        "image/IMG-20250625-WA0003.jpg"
    ];
    const container = document.getElementById("slides");
    let currentIndex = 0;

    function init() {
        if (!container) {
            console.error("L'élément #slides n'a pas été trouvé pour le slider manuel.");
            return;
        }
        images.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.alt = "Menu City Kebab";
            container.appendChild(img);
        });
        showSlide(0);
    }

    function showSlide(index) {
        currentIndex = (index + images.length) % images.length;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    return {
        init: init,
        next: () => showSlide(currentIndex + 1),
        prev: () => showSlide(currentIndex - 1)
    };
})();

// Slider Automatique et Menu Burger
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation du slider manuel
    manualSlider.init();

    // --- Gestion du Slider Automatique ---
    const autoSliderWrapper = document.getElementById('autoSliderWrapper');
    const autoSliderImages = autoSliderWrapper.querySelectorAll('img');
    const totalAutoImages = autoSliderImages.length;
    let currentAutoIndex = 0;
    const slideInterval = 4000;

    const autoSliderProgress = document.getElementById('autoSliderProgress');

    let intervalId;
    let timeoutId;

    function resetProgressBar() {
        autoSliderProgress.style.transition = 'width 0s linear';
        autoSliderProgress.style.width = '0%';
        void autoSliderProgress.offsetWidth;
    }

    function startProgressBar() {
        autoSliderProgress.style.transition = `width ${slideInterval / 1000}s linear`;
        autoSliderProgress.style.width = '100%';
    }

    function moveAutoSlider() {
        resetProgressBar(); 
        currentAutoIndex = (currentAutoIndex + 1) % totalAutoImages;
        autoSliderWrapper.style.transform = `translateX(-${currentAutoIndex * 100}%)`;
        
        timeoutId = setTimeout(startProgressBar, 50); 
    }

    function startAutoSlider() {
        startProgressBar();
        intervalId = setInterval(moveAutoSlider, slideInterval);
    }

    startAutoSlider();

    // --- Gestion du Menu Burger ---
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks.querySelectorAll('li a'); // Sélectionne tous les liens dans le menu

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('active'); // Ajoute la classe 'active' au bouton pour l'animation X
            document.body.classList.toggle('no-scroll'); // Empêche le défilement quand le menu est ouvert
        });

        // Ferme le menu lorsque l'on clique sur un lien
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                burgerMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    } else {
        console.error("Éléments du menu burger non trouvés.");
    }
});