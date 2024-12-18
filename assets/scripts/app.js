// Dynamic product loading and cart functionality
const products = [
    {
        id: 1,
        name: "Wireless Earbuds",
        price: 59.99,
        image: "earbuds.jpg",
        category: "Electronics"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 129.99,
        image: "smartwatch.jpg",
        category: "Electronics"
    },
    // Add more products
];

const cart = {
    items: [],
    total: 0
};

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    products.forEach(product => {
        const productCard = `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

function setupEventListeners() {
    // Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.product-card').dataset.id;
            addToCart(productId);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        filterProducts(e.target.value);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    cart.items.push(product);
    cart.total += product.price;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.items.length;
}

function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        // Reuse product card creation logic
        const productCard = `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add this to your existing JavaScript
document.querySelectorAll('.filter-group select').forEach(select => {
    select.addEventListener('change', (e) => {
        const category = document.querySelector('select[name="category"]').value;
        const price = document.querySelector('select[name="price"]').value;
        const sort = document.querySelector('select[name="sort"]').value;
        
        // Filter products based on selected criteria
        filterAndSortProducts(category, price, sort);
    });
});

function filterAndSortProducts(category, price, sort) {
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
        filteredProducts = filteredProducts.filter(product => 
            product.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    // Filter by price range
    if (price) {
        const [min, max] = price.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            }
            return product.price >= min;
        });
    }
    
    // Sort products
    if (sort) {
        filteredProducts.sort((a, b) => {
            if (sort === 'price-low') return a.price - b.price;
            if (sort === 'price-high') return b.price - a.price;
            if (sort === 'newest') return b.id - a.id;
            return 0;
        });
    }
    
    // Update product display
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        // Reuse existing product card creation logic
        const productCard = `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}
