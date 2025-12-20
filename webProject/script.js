const products = [
    { id: 1, name: "Laptop", price: 999, image: "images/lap.jpg", description: "A powerful laptop with cutting-edge performance and stunning display." },
    { id: 2, name: "IPhone", price: 1000, image: "images/Phone.jpg", description: "Latest smartphone with advanced camera system and all-day battery life." },
    { id: 3, name: "Headphones", price: 199, image: "images/Headphone.jpg", description: "Premium noise cancelling headphones with crystal-clear audio." },
    { id: 4, name: "Smart Watch", price: 300, image: "images/Smartwatch.jpg", description: "Track fitness, receive notifications, and stay connected." },
    { id: 5, name: "Gaming Keyboard", price: 100, image: "images/Keybored.jpg", description: "RGB mechanical keyboard with customizable lighting." },
    { id: 6, name: "Wireless Mouse", price: 50, image: "images/Mouse.jpg", description: "Ergonomic wireless mouse with precision tracking." },
    { id: 7, name: "Nintendo Switch", price: 299, image: "images/64ca7a422bc0012cc6514736-nintendo-switch-console-with-gray.jpg", description: "Portable gaming console with detachable controllers and stunning graphics." },
    { id: 8, name: "Leica Camera", price: 2500, image: "images/LEI0440_Leica_IIIf_chrom_-_Sn._580566_1951-52-M39_Blitzsynchron_front_view-6531_hf-.jpg", description: "Vintage Leica camera with exceptional build quality and precision optics." },
    { id: 9, name: "Samsung Monitor", price: 450, image: "images/شاشة-سامسونج.jpg", description: "Ultra-wide Samsung monitor with crisp display and vibrant colors." },
    { id: 10, name: "ps5", price: 350, image: "images/gm511-min_1.jpg", description: "High refresh rate ps5 for smooth gameplay experience." },
    { id: 11, name: "xbox one", price: 399, image: "images/61D3AuT--xL.jpg", description: "Versatile xbox one perfect for work, entertainment, and creativity." },
    { id: 12, name: "xbox", price: 129, image: "images/71aBXvHYUpL._AC_UF1000,1000_QL80_.jpg", description: "Voice-controlled xbox with premium sound quality." },
    { id: 13, name: "ps4", price: 149, image: "images/14497202-cc4c-48fb-a9d7-3d2b695aaaf6.__CR0,0,300,300_PT0_SX300_V1___.jpg", description: "True ps4 with noise cancellation and long battery life." },
    { id: 14, name: "xbox controller", price: 799, image: "images/images.jpg", description: "4K Ultra HD xbox controller with streaming capabilities and voice control." },
    { id: 15, name: "Digital Camera", price: 599, image: "images/istockphoto-185278433-612x612.jpg", description: "Professional digital camera with advanced features and high resolution." },
    { id: 16, name: "ps5 controller", price: 179, image: "images/WFQ21_SQ1_0000000088_NO_COLOR_SLf.jpg", description: "Premium ps5 controller with surround sound and comfortable design." }
];

const features = {
    "Laptop": ["High Performance Processor", "512GB SSD Storage", "Full HD Display", "10+ Hours Battery Life"],
    "IPhone": ["48MP Camera System", "A17 Pro Chip", "All-Day Battery Life", "Water Resistant"],
    "Headphones": ["Noise Cancellation", "Premium Sound Quality", "30 Hours Battery Life", "Built-in Microphone"],
    "Smart Watch": ["Heart Rate Monitor", "Fitness Tracking", "Smart Notifications", "5 Days Battery Life"],
    "Gaming Keyboard": ["Mechanical Switches", "RGB Backlighting", "Fast Response Time", "Gaming Mode"],
    "Wireless Mouse": ["Precision Tracking", "12 Months Battery Life", "Wireless Connectivity", "Ergonomic Design"],
    "Nintendo Switch": ["Portable Gaming", "Detachable Controllers", "HD Rumble", "Local Multiplayer"],
    "Leica Camera": ["Precision Optics", "Vintage Design", "Manual Controls", "Premium Build Quality"],
    "Samsung Monitor": ["Ultra-Wide Display", "4K Resolution", "HDR Support", "Multiple Connectivity Options"],
    "ps5": ["144Hz Refresh Rate", "1ms Response Time", "FreeSync Technology", "Ergonomic Stand"],
    "xbox one": ["Large Display", "Long Battery Life", "Stylus Support", "Multiple Apps"],
    "xbox": ["Voice Assistant", "Premium Sound", "Smart Home Control", "Wireless Streaming"],
    "ps4": ["True Wireless", "Noise Cancellation", "Long Battery Life", "Quick Charge"],
    "xbox controller": ["4K Ultra HD", "Smart Platform", "Voice Control", "Multiple HDMI Ports"],
    "Digital Camera": ["High Resolution", "Advanced Autofocus", "4K Video Recording", "Interchangeable Lenses"],
    "ps5 controller": ["Surround Sound", "Noise Cancelling Mic", "Comfortable Design", "RGB Lighting"]
};

function toast(message, type = 'success') {
    const toastEl = document.createElement('div');
    toastEl.className = `toast toast-${type}`;
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    
    setTimeout(() => {
        toastEl.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toastEl.classList.remove('show');
        setTimeout(() => toastEl.remove(), 300);
    }, 3000);
}

function addToCart(id, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.id === id);
    if (!product) return;

    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast(`${product.name} added to cart!`);
    updateCartBadge();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-badge').forEach(b => b.remove());
    
    if (total > 0) {
        document.querySelectorAll('.cart-icon').forEach(icon => {
            const badge = document.createElement('span');
            badge.className = 'cart-badge';
            badge.textContent = total > 99 ? '99+' : total;
            icon.appendChild(badge);
        });
    }
}

const productsContainer = document.getElementById("products");
if (productsContainer) {
    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.image}" alt="${p.name}" loading="lazy">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="add-cart-btn">Add to Cart</button>
        `;
        
        div.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-cart-btn')) {
                window.location.href = `product.html?id=${p.id}`;
            }
        });
        
        div.querySelector('.add-cart-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(p.id);
        });
        
        productsContainer.appendChild(div);
    });
}

const navSearch = document.getElementById("nav-search");
const searchResults = document.getElementById("search-results");
if (navSearch && searchResults) {
    navSearch.addEventListener('input', () => {
        const value = navSearch.value.toLowerCase().trim();
        searchResults.innerHTML = "";
        
        if (!value) {
            searchResults.style.display = "none";
            return;
        }
        
        const matched = products.filter(p => 
            p.name.toLowerCase().includes(value) || 
            p.description.toLowerCase().includes(value)
        );
        
        if (matched.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results">No products found</div>';
            searchResults.style.display = "block";
            return;
        }
        
        matched.forEach(p => {
            const div = document.createElement("div");
            div.className = "search-item";
            div.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <div>
                    <div class="search-name">${p.name}</div>
                    <div class="search-price">$${p.price}</div>
                </div>
            `;
            div.addEventListener('click', () => {
                window.location.href = `product.html?id=${p.id}`;
            });
            searchResults.appendChild(div);
        });
        
        searchResults.style.display = "block";
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-search')) {
            searchResults.style.display = "none";
        }
    });
}

function loadCart() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon"></div>
                <h3>Your cart is empty</h3>
                <p>Start adding products to your cart!</p>
                <a href="index.html" class="continue-shopping-btn">Continue Shopping</a>
            </div>
        `;
        const totalEl = document.getElementById("total");
        if (totalEl) totalEl.textContent = "";
        const checkoutBtn = document.getElementById("checkout-btn");
        if (checkoutBtn) checkoutBtn.style.display = "none";
        return;
    }

    container.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <strong>${item.name}</strong>
                <p>$${item.price} each</p>
                <div>Quantity: <span class="qty">${item.quantity}</span></div>
                <div>Subtotal: <span class="subtotal">$${(item.price * item.quantity).toFixed(2)}</span></div>
            </div>
            <div class="cart-actions">
                <button class="qty-btn increase" data-index="${index}">+</button>
                <button class="qty-btn decrease" data-index="${index}">-</button>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        
        div.querySelector('.increase').addEventListener('click', () => updateQuantity(index, 1));
        div.querySelector('.decrease').addEventListener('click', () => updateQuantity(index, -1));
        div.querySelector('.remove-btn').addEventListener('click', () => removeItem(index));
        
        container.appendChild(div);
    });

    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const totalEl = document.getElementById("total");
    if (totalEl) {
        totalEl.innerHTML = `
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>${shipping === 0 ? '<span class="free-shipping">FREE</span>' : '$' + shipping.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax:</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row total-row">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
            </div>
        `;
    }
    
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) checkoutBtn.style.display = "block";
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartBadge();
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const item = cart[index];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast(`${item.name} removed from cart`);
    loadCart();
    updateCartBadge();
}

const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = "Processing...";
        setTimeout(() => {
            toast("Order placed successfully!", "success");
            localStorage.removeItem("cart");
            loadCart();
            updateCartBadge();
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = "Checkout";
        }, 1500);
    });
}

const productDetailsEl = document.getElementById("product-details");
if (productDetailsEl) {
    const id = parseInt(new URLSearchParams(window.location.search).get("id"));
    const product = products.find(p => p.id === id);
    
    if (product) {
        const qty = 1;
        productDetailsEl.innerHTML = `
            <div class="product-image-section">
                <img src="${product.image}" alt="${product.name}">
                <div class="badges">
                    <span class="badge">Best Seller</span>
                    <span class="badge">Free Shipping</span>
                </div>
            </div>
            <div class="product-info-section">
                <h1>${product.name}</h1>
                <div class="rating">Rating: 4.5 (${Math.floor(Math.random() * 200) + 50} reviews)</div>
                <div class="price-section">
                    <span class="price">$${product.price}</span>
                    <span class="savings">Save $${Math.floor(product.price * 0.1)}</span>
                </div>
                <p class="description">${product.description}</p>
                ${features[product.name] ? `
                <div class="features">
                    <h3>Key Features</h3>
                    <ul>
                        ${features[product.name].map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                <div class="qty-section">
                    <label>Quantity:</label>
                    <div class="qty-selector">
                        <button id="qty-dec">-</button>
                        <input type="number" id="qty-input" value="1" min="1" max="10">
                        <button id="qty-inc">+</button>
                    </div>
                </div>
                <div class="actions">
                    <button class="btn-primary" id="add-btn">Add to Cart</button>
                    <button class="btn-secondary" id="buy-btn">Buy Now</button>
                </div>
                <div class="shipping-info">
                    <div>Free shipping on orders over $50</div>
                    <div>30-day return policy</div>
                    <div>Secure checkout</div>
                </div>
            </div>
        `;
        
        const qtyInput = document.getElementById('qty-input');
        const qtyDec = document.getElementById('qty-dec');
        const qtyInc = document.getElementById('qty-inc');
        const addBtn = document.getElementById('add-btn');
        const buyBtn = document.getElementById('buy-btn');
        
        qtyDec.addEventListener('click', () => {
            if (qtyInput.value > 1) qtyInput.value--;
        });
        
        qtyInc.addEventListener('click', () => {
            if (qtyInput.value < 10) qtyInput.value++;
        });
        
        addBtn.addEventListener('click', () => {
            addToCart(product.id, parseInt(qtyInput.value));
        });
        
        buyBtn.addEventListener('click', () => {
            localStorage.setItem("cart", JSON.stringify([{ ...product, quantity: parseInt(qtyInput.value) }]));
            updateCartBadge();
            window.location.href = "cart.html";
        });
    } else {
        productDetailsEl.innerHTML = `
            <div class="product-not-found">
                <h2>Product not found</h2>
                <p>The product you're looking for doesn't exist.</p>
                <a href="index.html" class="back-btn">Back to Home</a>
            </div>
        `;
    }
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const statusDiv = document.getElementById('form-status');
        
        btn.disabled = true;
        btn.textContent = "Sending...";
        if (statusDiv) {
            statusDiv.textContent = "";
            statusDiv.className = "form-status";
        }
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                toast("Message sent successfully!", "success");
                contactForm.reset();
                if (statusDiv) {
                    statusDiv.textContent = "Message sent successfully!";
                    statusDiv.className = "form-status success";
                }
            } else {
                const data = await response.json();
                if (data.errors) {
                    toast("Error: " + Object.values(data.errors).join(", "), "error");
                    if (statusDiv) {
                        statusDiv.textContent = "Error: " + Object.values(data.errors).join(", ");
                        statusDiv.className = "form-status error";
                    }
                } else {
                    toast("There was an error sending your message. Please try again.", "error");
                    if (statusDiv) {
                        statusDiv.textContent = "There was an error sending your message. Please try again.";
                        statusDiv.className = "form-status error";
                    }
                }
            }
        } catch (error) {
            toast("There was an error sending your message. Please try again.", "error");
            if (statusDiv) {
                statusDiv.textContent = "There was an error sending your message. Please try again.";
                statusDiv.className = "form-status error";
            }
        } finally {
            btn.disabled = false;
            btn.textContent = "Send Message";
        }
    });
}

loadCart();
updateCartBadge();
