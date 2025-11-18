// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');

        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (mobileMenuToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip empty href
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const animateOnScroll = document.querySelectorAll('.feature-card, .step, .team-member');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Navbar Scroll Effect & Active Link
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');

// Add scrolled class to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Logo click to scroll to top
document.querySelector('.logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Typing Animation for Chat Demo
function animateChatDemo() {
    const botMessages = document.querySelectorAll('.chat-message.bot');

    botMessages.forEach((message, index) => {
        if (message.classList.contains('success')) {
            // Show success message after typing indicator
            setTimeout(() => {
                message.style.display = 'block';
                message.style.animation = 'slideIn 0.5s ease-out';
            }, 2000);

            // Hide typing indicator before showing success
            const typingIndicator = message.previousElementSibling;
            if (typingIndicator && typingIndicator.querySelector('.typing-indicator')) {
                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                }, 1900);
            }
        }
    });
}

// Run chat demo animation when page loads
window.addEventListener('load', () => {
    animateChatDemo();
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        // Format number
        let displayValue = Math.floor(current);
        if (target >= 1000) {
            displayValue = (displayValue / 1000).toFixed(1) + 'K';
        }
        if (element.textContent.includes('%')) {
            displayValue = Math.floor(current) + '%';
        }
        if (element.textContent.includes('+')) {
            displayValue = displayValue + '+';
        }

        element.textContent = displayValue;
    }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const statNumbers = entry.target.querySelectorAll('.stat-number');

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                let target = parseInt(text.replace(/\D/g, ''));

                // Handle different formats
                if (text.includes('K')) {
                    target = target * 1000;
                }

                animateCounter(stat, target);
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Button Click Effects
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Skip if it's the mobile menu toggle
        if (this.classList.contains('mobile-menu-toggle')) {
            return;
        }

        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    /* Mobile Menu Styles */
    @media (max-width: 968px) {
        .nav-menu {
            position: fixed;
            top: 68px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 16px 24px 24px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            gap: 0;
            max-height: calc(100vh - 68px);
            overflow-y: auto;
        }

        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }

        .nav-menu li {
            width: 100%;
            border-bottom: 1px solid #F3F4F6;
        }

        .nav-menu li:last-child {
            border-bottom: none;
        }

        .nav-menu a {
            padding: 16px 12px;
            width: 100%;
            border-radius: 8px;
            font-size: 16px;
        }

        .nav-menu a::after {
            display: none;
        }

        .nav-menu a.active {
            background: #6366F1;
            color: white;
        }

        .cta-button {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Form Validation (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Lazy Loading Images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Interactive Demo Logic
let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

// Parse transaction message
function parseTransaction(message) {
    const lowerMessage = message.toLowerCase();

    // Detect transaction type
    let type = null;
    if (lowerMessage.includes('jual') || lowerMessage.includes('terima') || lowerMessage.includes('masuk')) {
        type = 'income';
    } else if (lowerMessage.includes('beli') || lowerMessage.includes('bayar') || lowerMessage.includes('keluar')) {
        type = 'expense';
    }

    if (!type) {
        return null;
    }

    // Extract numbers
    const numbers = message.match(/(\d+(?:\.\d+)?)\s*(rb|ribu|jt|juta|k)?/gi);
    if (!numbers || numbers.length === 0) {
        return null;
    }

    let quantity = 1;
    let price = 0;

    // Parse quantity and price
    if (numbers.length >= 2) {
        // Format: "15 pcs @200rb"
        quantity = parseInt(numbers[0].replace(/\D/g, ''));
        const priceStr = numbers[1];
        price = parsePrice(priceStr);
    } else {
        // Format: "500rb" or "1.5jt"
        price = parsePrice(numbers[0]);
    }

    const total = quantity * price;

    // Extract item name
    let item = 'Item';
    if (lowerMessage.includes('sepatu')) item = 'Sepatu';
    else if (lowerMessage.includes('baju')) item = 'Baju';
    else if (lowerMessage.includes('bahan')) item = 'Bahan Baku';
    else if (lowerMessage.includes('pembayaran')) item = 'Pembayaran';

    return {
        type,
        quantity,
        price,
        total,
        item,
        originalMessage: message
    };
}

function parsePrice(priceStr) {
    const num = parseFloat(priceStr.replace(/[^\d.]/g, ''));
    if (priceStr.toLowerCase().includes('jt') || priceStr.toLowerCase().includes('juta')) {
        return num * 1000000;
    } else if (priceStr.toLowerCase().includes('rb') || priceStr.toLowerCase().includes('ribu') || priceStr.toLowerCase().includes('k')) {
        return num * 1000;
    }
    return num;
}

function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
}

function addMessage(text, isUser = false, isSuccess = false) {
    const messagesContainer = document.getElementById('demoMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `demo-message ${isUser ? 'user' : 'bot'}`;

    const avatar = document.createElement('div');
    avatar.className = `message-avatar ${isUser ? 'user-avatar' : 'bot-avatar'}`;
    avatar.textContent = isUser ? 'U' : 'AI';

    const content = document.createElement('div');
    content.className = `message-content ${isSuccess ? 'success' : ''}`;
    content.innerHTML = text;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    messagesContainer.appendChild(messageDiv);

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addTransaction(transaction) {
    transactions.push(transaction);

    // Update totals
    if (transaction.type === 'income') {
        totalIncome += transaction.total;
    } else {
        totalExpense += transaction.total;
    }

    updateDashboard();
}

function updateDashboard() {
    // Update stats
    document.getElementById('totalIncome').textContent = formatRupiah(totalIncome);
    document.getElementById('totalExpense').textContent = formatRupiah(totalExpense);
    document.getElementById('totalProfit').textContent = formatRupiah(totalIncome - totalExpense);

    // Update transaction list
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    if (transactions.length === 0) {
        transactionList.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#9CA3AF" stroke-width="2"/>
                    <path d="M12 8V12L15 15" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>Belum ada transaksi</p>
            </div>
        `;
        return;
    }

    // Show latest 5 transactions
    transactions.slice(-5).reverse().forEach(trans => {
        const transItem = document.createElement('div');
        transItem.className = 'transaction-item';

        const typeLabel = trans.type === 'income' ? 'Pemasukan' : 'Pengeluaran';
        const sign = trans.type === 'income' ? '+' : '-';

        transItem.innerHTML = `
            <div class="transaction-info">
                <p class="transaction-type">${typeLabel} - ${trans.item}</p>
                <p class="transaction-details">${trans.quantity} × ${formatRupiah(trans.price)}</p>
            </div>
            <div class="transaction-amount ${trans.type}">
                ${sign}${formatRupiah(trans.total)}
            </div>
        `;

        transactionList.appendChild(transItem);
    });
}

function processMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, true);

    // Disable input temporarily
    const input = document.getElementById('demoInput');
    const sendBtn = document.getElementById('demoSend');
    input.disabled = true;
    sendBtn.disabled = true;

    // Show typing indicator
    setTimeout(() => {
        const transaction = parseTransaction(message);

        if (transaction) {
            const typeText = transaction.type === 'income' ? 'Pemasukan' : 'Pengeluaran';
            const successMsg = `
                <p>✓ Tercatat: ${typeText} ${formatRupiah(transaction.total)}</p>
                <small>${transaction.quantity} unit × ${formatRupiah(transaction.price)}</small>
            `;
            addMessage(successMsg, false, true);
            addTransaction(transaction);
        } else {
            addMessage(
                '<p>Maaf, saya tidak bisa memahami pesan Anda. Coba gunakan format seperti:</p>' +
                '<ul><li>"Jual 10 pcs @50rb"</li><li>"Beli bahan 500rb"</li></ul>',
                false
            );
        }

        // Re-enable input
        input.disabled = false;
        sendBtn.disabled = false;
        input.focus();
    }, 1000);
}

// Demo event listeners
const demoInput = document.getElementById('demoInput');
const demoSend = document.getElementById('demoSend');
const quickBtns = document.querySelectorAll('.quick-btn');

if (demoSend) {
    demoSend.addEventListener('click', () => {
        processMessage(demoInput.value);
        demoInput.value = '';
    });
}

if (demoInput) {
    demoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            processMessage(demoInput.value);
            demoInput.value = '';
        }
    });
}

quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const message = btn.dataset.message;
        demoInput.value = message;
        processMessage(message);
        demoInput.value = '';
    });
});

// Console Welcome Message
console.log('%c🚀 SmartBook - Pembukuan UMKM Berbasis AI', 'color: #6366F1; font-size: 20px; font-weight: bold;');
console.log('%cTertarik bergabung dengan tim kami? Email: info@smartbook.id', 'color: #6B7280; font-size: 14px;');

// Performance Monitoring
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`⚡ Page loaded in ${loadTime}ms`);
});