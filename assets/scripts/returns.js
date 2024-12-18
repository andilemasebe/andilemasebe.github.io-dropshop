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
