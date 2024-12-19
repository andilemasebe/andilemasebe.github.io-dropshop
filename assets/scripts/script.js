// Add this to your existing JavaScript
document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        alert('Thank you for subscribing!');
        e.target.reset();
    }
});

let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    showAddedToCartNotification();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    cartCount.classList.add('bounce');
    setTimeout(() => cartCount.classList.remove('bounce'), 300);
}

function showAddedToCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
}

// Add click event listeners to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const product = {
            id: Date.now(),
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('.price').textContent,
            image: productCard.querySelector('img').src
        };
        addToCart(product);
    });
});


document.querySelector('.read-more-btn').addEventListener('click', function() {
    const fullContent = document.querySelector('.content-full');
    const btnText = this;
    
    if (fullContent.classList.contains('hidden')) {
        fullContent.classList.remove('hidden');
        btnText.textContent = 'Read Less';
    } else {
        fullContent.classList.add('hidden');
        btnText.textContent = 'Read More';
    }
});


document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('blockquote');
        const shortText = card.querySelector('.short-text');
        const fullText = card.querySelector('.full-text');
        
        if (fullText.classList.contains('hidden')) {
            fullText.classList.remove('hidden');
            shortText.classList.add('hidden');
            this.textContent = 'Read Less';
        } else {
            fullText.classList.add('hidden');
            shortText.classList.remove('hidden');
            this.textContent = 'Read More';
        }
    });
});

// Modal functionality
document.querySelectorAll('[href="#login"], [href="#register"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = link.getAttribute('href').replace('#', '') + '-modal';
        document.getElementById(modalId).style.display = 'block';
    });
});

document.querySelectorAll('.close-modal').forEach(close => {
    close.addEventListener('click', () => {
        close.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// Cart functionality
const cartBtn = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
const closeCart = document.querySelector('.close-cart');

function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

cartBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Add to cart functionality
function addToCart(product) {
    const cartItems = document.querySelector('.cart-items');
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="item-details">
            <h4>${product.name}</h4>
            <p class="item-price">${product.price}</p>
        </div>
        <div class="item-quantity">
            <button class="quantity-btn minus">-</button>
            <span>1</span>
            <button class="quantity-btn plus">+</button>
        </div>
    `;
    cartItems.appendChild(cartItem);
    updateCartTotal();
}


// Cart calculation functions
// let cartItems = [];

// function updateCartTotal() {
//     const subtotal = calculateSubtotal();
//     const shipping = calculateShipping(subtotal);
//     const total = subtotal + shipping;

    // Update display
//     document.querySelector('.subtotal').textContent = `R${subtotal.toFixed(2)}`;
//     document.querySelector('.shipping').textContent = `R${shipping.toFixed(2)}`;
//     document.querySelector('.total-amount').textContent = `R${total.toFixed(2)}`;
// }

// function calculateSubtotal() {
//     return cartItems.reduce((sum, item) => {
//         return sum + (item.price * item.quantity);
//     }, 0);
// }

// function calculateShipping(subtotal) {
//     if (subtotal === 0) return 0;
//     if (subtotal >= 1000) return 0; // Free shipping over R1000
//     return 150; // Standard shipping fee
// }

// function addToCart(product) {
//     const existingItem = cartItems.find(item => item.id === product.id);
    
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cartItems.push({
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             quantity: 1,
//             image: product.image
//         });
//     }
    
//     renderCartItems();
//     updateCartTotal();
// }

// function updateItemQuantity(itemId, change) {
//     const item = cartItems.find(item => item.id === itemId);
//     if (item) {
//         item.quantity += change;
//         if (item.quantity <= 0) {
//             cartItems = cartItems.filter(item => item.id !== itemId);
//         }
//         renderCartItems();
//         updateCartTotal();
//     }
// }

// function renderCartItems() {
//     const cartContainer = document.querySelector('.cart-items');
//     cartContainer.innerHTML = cartItems.map(item => `
//         <div class="cart-item" data-id="${item.id}">
//             <img src="${item.image}" alt="${item.name}">
//             <div class="item-details">
//                 <h4>${item.name}</h4>
//                 <p class="item-price">R${item.price.toFixed(2)}</p>
//             </div>
//             <div class="item-quantity">
//                 <button class="quantity-btn minus" onclick="updateItemQuantity(${item.id}, -1)">-</button>
//                 <span>${item.quantity}</span>
//                 <button class="quantity-btn plus" onclick="updateItemQuantity(${item.id}, 1)">+</button>
//             </div>
//         </div>
//     `).join('');
// }

// Search functionality
// const searchInput = document.querySelector('.search-bar input');
// const searchButton = document.querySelector('.search-bar button');
// let products = []; // Will store all products

// Fetch products (example data)
//products = [
 //   { id: 1, name: 'Smart Watch Pro', category: 'Electronics', price: 1499, description: 'Premium smartwatch' },
   // { id: 2, name: 'Luxury Handbag', category: 'Fashion', price: 2999, description: 'Designer handbag' },
   // { id: 3, name: 'Modern Wall Art', category: 'Home & Living', price: 899, description: 'Contemporary art' }
    // Add more products as needed
//];

// function searchProducts(query) {
//     const searchResults = products.filter(product => {
//         const searchTerm = query.toLowerCase();
//         return (
//             product.name.toLowerCase().includes(searchTerm) ||
//             product.category.toLowerCase().includes(searchTerm) ||
//             product.description.toLowerCase().includes(searchTerm)
//         );
//     });
//     displaySearchResults(searchResults);
// }

// function displaySearchResults(results) {
//     const productGrid = document.querySelector('.product-grid');
    
//     if (results.length === 0) {
//         productGrid.innerHTML = `
//             <div class="no-results">
//                 <i class="fas fa-search"></i>
//                 <p>No products found</p>
//             </div>
//         `;
//         return;
//     }

//     productGrid.innerHTML = results.map(product => `
//         <div class="product-card">
//             <div class="product-badge">New</div>
//             <img src="images/product-${product.id}.jpg" alt="${product.name}">
//             <div class="product-details">
//                 <h3>${product.name}</h3>
//                 <div class="rating">
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star"></i>
//                     <i class="fas fa-star-half-alt"></i>
//                 </div>
//                 <p class="price">R${product.price}</p>
//                 <p class="description">${product.description}</p>
//                 <div class="product-actions">
//                     <button class="add-to-cart" onclick="addToCart(${JSON.stringify(product)})">
//                         <i class="fas fa-shopping-cart"></i> Add to Cart
//                     </button>
//                     <button class="quick-view"><i class="fas fa-eye"></i></button>
//                 </div>
//             </div>
//         </div>
//     `).join('');
// }

// // Event listeners
// searchInput.addEventListener('input', (e) => {
//     if (e.target.value.length >= 2) {
//         searchProducts(e.target.value);
//     }
// });

// searchButton.addEventListener('click', () => {
//     if (searchInput.value.length >= 2) {
//         searchProducts(searchInput.value);
//     }
// });

// // Add some CSS for search results
// const styles = `
// .no-results {
//     text-align: center;
//     padding: 40px;
//     color: #718096;
// }

// .no-results i {
//     font-size: 3rem;
//     margin-bottom: 15px;
// }

// .search-bar input:focus {
//     border-color: #4a5568;
//     box-shadow: 0 0 0 3px rgba(74, 85, 104, 0.2);
// }
// `;

// document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);



// Chatbot functionality
const chatResponses = {
    'returns': 'You can initiate a return through our Returns Portal. <a href="returns.html" class="chat-link">Click here to access the Returns Portal</a>',
    'track order': 'To track your order, please enter your order number.',
    'shipping': 'We offer free shipping on orders over R1000. Standard delivery takes 3-5 business days.',
    'product': 'Our products are carefully selected for quality. What specific information do you need?',
    'default': "I'm not sure about that. Would you like to speak with a customer service representative?"
};

// Add styling for chat links
const styles = `
.chat-link {
    color: #4a5568;
    text-decoration: underline;
    font-weight: 500;
    transition: color 0.3s ease;
}

.chat-link:hover {
    color: #2d3748;
}
`;

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);

function initChatbot() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatbot = document.querySelector('.chatbot-container');
    const closeChat = document.querySelector('.close-chat');
    const minimizeChat = document.querySelector('.minimize-chat');
    const sendButton = document.querySelector('.send-message');
    const chatInput = document.querySelector('.chat-input input');
    const quickResponses = document.querySelectorAll('.quick-responses button');

    chatToggle.addEventListener('click', () => {
        chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
    });

    closeChat.addEventListener('click', () => {
        chatbot.style.display = 'none';
    });

    minimizeChat.addEventListener('click', () => {
        chatbot.classList.toggle('minimized');
    });

    function addMessage(message, isUser = false) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        messageDiv.innerHTML = `
            ${isUser ? '' : '<i class="fas fa-robot"></i>'}
            <div class="message-content">${message}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = chatResponses.default;
        
        for (const [key, value] of Object.entries(chatResponses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        setTimeout(() => addMessage(response), 500);
    }

    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            processMessage(message);
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });

    quickResponses.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.textContent;
            addMessage(message, true);
            processMessage(message);
        });
    });
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', initChatbot);

// Returns Portal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const sections = document.querySelectorAll('.form-section');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const returnForm = document.querySelector('.returns-form');
    let currentStep = 0;

    // Sample order data (replace with actual database/API call)
    const orderData = {
        items: [
            { id: 1, name: 'Smart Watch Pro', price: 1499, image: 'images/product-1.jpg' },
            { id: 2, name: 'Luxury Handbag', price: 2999, image: 'images/product-2.jpg' }
        ]
    };

    function updateSteps(step) {
        steps.forEach((s, index) => {
            if (index <= step) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }

    function showSection(step) {
        sections.forEach((section, index) => {
            section.classList.toggle('hidden', index !== step);
        });
    }

    function loadOrderItems(orderNumber) {
        const returnItems = document.querySelector('.return-items');
        returnItems.innerHTML = orderData.items.map(item => `
            <div class="return-item">
                <input type="checkbox" id="item-${item.id}" name="return_items[]" value="${item.id}">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>R${item.price}</p>
                </div>
            </div>
        `).join('');
    }

    function updateSummary() {
        const selectedItems = document.querySelectorAll('input[name="return_items[]"]:checked');
        const reason = document.querySelector('select').value;
        const comments = document.querySelector('textarea').value;

        const summaryHtml = `
            <div class="summary-items">
                <h4>Selected Items:</h4>
                ${Array.from(selectedItems).map(input => {
                    const item = orderData.items.find(i => i.id === parseInt(input.value));
                    return `<p>${item.name} - R${item.price}</p>`;
                }).join('')}
            </div>
            <div class="summary-reason">
                <h4>Return Reason:</h4>
                <p>${reason}</p>
            </div>
            ${comments ? `
                <div class="summary-comments">
                    <h4>Additional Comments:</h4>
                    <p>${comments}</p>
                </div>
            ` : ''}
        `;

        document.querySelector('.return-summary').innerHTML = summaryHtml;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateSection(currentStep)) {
                currentStep++;
                updateSteps(currentStep);
                showSection(currentStep);
                if (currentStep === 1) {
                    loadOrderItems(document.querySelector('input[type="text"]').value);
                } else if (currentStep === 2) {
                    updateSummary();
                }
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            updateSteps(currentStep);
            showSection(currentStep);
        });
    });

    returnForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(returnForm);
        
        try {
            // Replace with actual API endpoint
            const response = await fetch('/api/returns', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showSuccessMessage();
            } else {
                showErrorMessage();
            }
        } catch (error) {
            showErrorMessage();
        }
    });

    function validateSection(step) {
        const currentSection = sections[step];
        const requiredFields = currentSection.querySelectorAll('[required]');
        let valid = true;

        requiredFields.forEach(field => {
            if (!field.value) {
                valid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        return valid;
    }

    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Return Request Submitted</h3>
            <p>You will receive a confirmation email with your shipping label shortly.</p>
        `;
        returnForm.innerHTML = '';
        returnForm.appendChild(message);
    }

    function showErrorMessage() {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <h3>Something went wrong</h3>
            <p>Please try again or contact customer support.</p>
        `;
        document.querySelector('.returns-form').appendChild(message);
    }
});


const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});


// Add this JavaScript to handle the search bar expansion
document.querySelector('.search-icon').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    searchInput.classList.toggle('expanded');
    searchInput.classList.toggle('collapsed');
    if (searchInput.classList.contains('expanded')) {
        searchInput.focus();
    }
});

// Close search on click outside
document.addEventListener('click', function(e) {
    const searchBar = document.querySelector('.search-bar');
    const searchInput = document.querySelector('.search-input');
    if (!searchBar.contains(e.target)) {
        searchInput.classList.remove('expanded');
        searchInput.classList.add('collapsed');
    }
});
