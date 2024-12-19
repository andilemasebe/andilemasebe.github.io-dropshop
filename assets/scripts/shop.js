document.addEventListener('DOMContentLoaded', function() {
    // Load products dynamically
    loadProducts();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize sorting
    initializeSorting();
});

const products = [
    {
        id: 1,
        name: "Premium Wireless Earbuds",
        price: 899,
        image: "images/online-shopping.webp",
        rating: 4.5,
        category: "electronics",
        brand: "Samsung",
        description: "High-quality wireless earbuds with noise cancellation"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 1499,
        image: "images/smart-watch.webp",
        rating: 5,
        category: "electronics",
        brand: "Apple",
        description: "Advanced fitness tracking with heart rate monitor"
    },
    {
        id: 3,
        name: "Designer Handbag",
        price: 2999,
        image: "images/handbag.webp",
        rating: 4.8,
        category: "fashion",
        brand: "Nike",
        description: "Premium leather designer handbag"
    },
    {
        id: 4,
        name: "4K Smart TV",
        price: 8999,
        image: "images/tv.webp",
        rating: 4.7,
        category: "electronics",
        brand: "LG",
        description: "55-inch 4K Ultra HD Smart TV with AI features"
    },
    {
        id: 5,
        name: "Modern Wall Art",
        price: 899,
        image: "images/wall-art.webp",
        rating: 4.3,
        category: "home",
        brand: "Artisan",
        description: "Contemporary abstract wall decoration"
    }
];

function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-badge">New</div>
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <div class="rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${Math.floor(Math.random() * 1000)})</span>
                </div>
                <p class="price">R${product.price}</p>
                <p class="description">${product.description}</p>
                <div class="product-actions">
                    <button class="add-to-cart">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="quick-view">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    return stars;
}
function initializeFilters() {
    // Implementation for filter functionality
}

function initializeSorting() {
    // Implementation for sorting functionality
}


  // Mobile Menu Functionality
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Mobile Menu Functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');
const body = document.body;

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Create/remove overlay
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
    overlay.classList.toggle('active');
});

// Handle dropdowns in mobile menu
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Close menu when clicking overlay
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) {
        navLinks.classList.remove('active');
        body.classList.remove('menu-open');
        e.target.classList.remove('active');
    }
});


// Toggle "Hide Filters" button text
document.querySelector('.filter-btn').addEventListener('click', () => {
const btn = document.querySelector('.filter-btn');
btn.textContent = btn.textContent === "Hide Filters" ? "Show Filters" : "Hide Filters";
});
