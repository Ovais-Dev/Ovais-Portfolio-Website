// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio cards data
const portfolioCards = [
     {
        name: 'Pong +',
        description: 'Brief description of your game. What makes it unique and fun to play?',
        thumbnail: 'src/images/thumbnails/Pong-Thumbnail.png',
        url: 'https://blazing-game.itch.io/pong',
        tags: ['2D', 'Arcade', 'Local Multiplayer']
    },
    {
        name: 'Run: Core',
        description: 'Save your 2D Mechanical Kingdom from endless upcoming enemies!',
        thumbnail: 'src/images/thumbnails/RunCore-Thumbnail.png',
        url: 'https://blazing-game.itch.io/run-core',
        tags: ['2D', 'Top-Down', 'Shooter', 'Endless Waves']
    },
    {
        name: 'On the Tower',
        description: 'Brief description of your game. What makes it unique and fun to play?',
        thumbnail: 'src/images/thumbnails/OnTheTower-Thumbnail.png',
        url: 'https://blazing-game.itch.io/on-the-tower',
        tags: ['2D', 'Platformer', 'Adventure', 'Thematic']
    },
    {
        name: 'Octomoto',
        description: 'Brief description of your game. What makes it unique and fun to play?',
        thumbnail: 'src/images/thumbnails/Octomoto-Thumbnail.png',
        url: 'https://blazing-game.itch.io/octomoto',
        tags: ['2D', 'Top-Down', 'Action', 'Endless Waves', 'Boss Battle', 'Power-System']
    },
    {
        name: 'Lost UFO',
        description: 'Brief description of your game. What makes it unique and fun to play?',
        thumbnail: 'src/images/thumbnails/LostUFO-Thumbnail.png',
        url: 'https://blazing-game.itch.io/lost-ufo',
        tags: ['2D', 'Shooter', 'Space', 'Top-Down', 'Multiple Levels', 'Boss Battle', 'Multiple Weapons']
    },
    {
        name: 'Snake Killer',
        description: 'Brief description of your game. What makes it unique and fun to play?',
        thumbnail: 'src/images/thumbnails/SnakeKiller-Thumbnail.gif',
        url: 'https://blazing-game.itch.io/snake-killer',
        tags: ['2D', 'Shooter', 'Solver']
    },
     {
        name: 'Jump Up',
        description: 'Brief description of your game. What makes it unique and fun to play?',
        thumbnail: 'src/images/thumbnails/JumpUp-Thumbnail.png',
        url: 'https://blazing-game.itch.io/jump-up',
        tags: ['2D', 'Platformer', 'Local Multiplayer']
    },
    {
        name: 'Solar Installer',
        description: 'Brief description of your game. What makes it unique and fun to play?',
        thumbnail: 'src/images/thumbnails/SolarInstaller-Thumbnail.png',
        url: 'https://blazing-game.itch.io/solar-installer',
        tags: ['2D', 'Simulation', 'Resource Management', ]
    }
];

// Function to generate portfolio cards
function renderPortfolioCards() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    portfolioGrid.innerHTML = ''; // Clear existing content

    portfolioCards.forEach(card => {
        // Create card link element
        const cardLink = document.createElement('a');
        cardLink.className = 'portfolio-card';
        cardLink.href = card.url;
        cardLink.target = '_blank';
        cardLink.rel = 'noopener noreferrer';
        
        // Create tags HTML
        const tagsHTML = card.tags.map(tag => `<span class="game-tag">${tag}</span>`).join('');
        
        // Set card content
        cardLink.innerHTML = `
            <div class="card-image">
                <img src="${card.thumbnail}" alt="${card.name}">
            </div>
            <div class="card-content">
                <h3>${card.name}</h3>
                <p>${card.description}</p>
                <div class="tags-container">
                    ${tagsHTML}
                </div>
            </div>
        `;
        
        // Append to grid
        portfolioGrid.appendChild(cardLink);
    });

    // Set up intersection observer for newly created cards
    setupCardObserver();
}

// Add scroll animation effect to portfolio cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

function setupCardObserver() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all portfolio cards
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Mobile menu toggle (optional - for future mobile menu expansion)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Dynamic navbar color based on section background
function updateNavbarColor() {
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const navbarMiddle = navbarHeight + 50; // Point to check (slightly below navbar)
    
    // Get all sections with background colors
    const sections = document.querySelectorAll('.hero-section, .about-section, .portfolio-section, .contact-section');
    
    let isLightSection = false;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = section.offsetTop + section.offsetHeight;
        
        // Check if navbar is over this section
        if (window.scrollY + navbarMiddle >= sectionTop && window.scrollY + navbarMiddle < sectionBottom) {
            const bgColor = window.getComputedStyle(section).backgroundColor;
            
            // Check if section background is light
            // Light sections: about-section (#fff), portfolio-section (light)
            // Dark sections: hero-section (dark), contact-section (dark)
            if (section.classList.contains('about-section') || section.classList.contains('portfolio-section')) {
                isLightSection = true;
            } else {
                isLightSection = false;
            }
        }
    });
    
    // Toggle light-mode class on navbar
    if (isLightSection) {
        navbar.classList.add('light-mode');
    } else {
        navbar.classList.remove('light-mode');
    }
}

// Listen to scroll event
window.addEventListener('scroll', updateNavbarColor);

// Call on page load to set initial state
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarColor();
    renderPortfolioCards();
});
