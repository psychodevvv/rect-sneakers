const sliderWrapper = document.querySelector('.slider-wrapper');
const dots = document.querySelectorAll('.dot');

setInterval(() => {
    sliderWrapper.classList.toggle('slide-active');

    dots.forEach(dot => {
        dot.classList.toggle('active-dot');
    });
        
}, 3500);

const sneakers = [
    {
        id: 1,
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: '12 999',
        img: '/assets/sneaker-1.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 2,
        title: 'Мужские Кроссовки Nike Air Max 270',
        price: '12 999',
        img: '/assets/sneaker-2.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 3,
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: '8 499',
        img: '/assets/sneaker-3.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 4,
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        price: '8 999',
        img: '/assets/sneaker-4.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 5,
        title: 'Мужские Кроссовки Under Armour Curry 8',
        price: '15 199',
        img: '/assets/sneaker-5.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 6,
        title: 'Мужские Кроссовки Nike Kyrie 7',
        price: '11 299',
        img: '/assets/sneaker-6.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 7,
        title: 'Мужские Кроссовки Jordan Air Jordan 11',
        price: '10 799',
        img: '/assets/sneaker-7.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 8,
        title: 'Мужские Кроссовки Nike LeBron XVIII',
        price: '16 499',
        img: '/assets/sneaker-8.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 9,
        title: 'Мужские Кроссовки Nike LeBron XVIII Low',
        price: '13 999',
        img: '/assets/sneaker-9.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 10,
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: '8 499',
        img: '/assets/sneaker-10.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 11,
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        price: '8 999',
        img: '/assets/sneaker-11.png',
        favoriteStatus: '',
        cartStatus: ''
    },
    {
        id: 12,
        title: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
        price: '11 299',
        img: '/assets/sneaker-12.png',
        favoriteStatus: '',
        cartStatus: ''
    }
]

const cards = document.querySelector('.cards');
const searchInput = document.querySelector('.search input');
const cartOverlay = document.querySelector('.cart-overlay');
const cartModal = document.querySelector('.cart-modal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalEl = document.querySelector('.cart-total');
const cartTaxEl = document.querySelector('.cart-tax');
const headerCart = document.querySelector('.right-header2');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function openCart() {
    cartOverlay.classList.remove('hidden');
    cartModal.classList.remove('hidden');
    renderCart();
}
function closeCart() {
    cartOverlay.classList.add('hidden');
    cartModal.classList.add('hidden');
}
cartOverlay.addEventListener('click', closeCart);

function addToCart(product) {
    cart.push(product);
    saveCart();
    updateCartHeader();
    renderCart();
    updateCartIcons();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartHeader();
    renderCart();
    updateCartIcons();
}

function updateCartHeader() {
    const balanceEl = document.getElementById('balance');
    if (!balanceEl) return;

    const total = cart.reduce(
        (sum, item) => sum + parseInt(item.price.replace(/\s/g, ''), 10),
        0
    );
    balanceEl.textContent = `${total} руб.`;
}

document.addEventListener('DOMContentLoaded', updateCartHeader);

function renderCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="pusto-cart">Корзина пуста</p>';
        cartTotalEl.textContent = '0 руб.';
        cartTaxEl.textContent = '0 руб.';
        return;
    }

    cart.forEach(item => {
        cartItemsContainer.insertAdjacentHTML('beforeend', `
            <div class="cart-item">
                <img src="${item.img}" alt="">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${item.price} руб.</div>
                </div>
                <div class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <div class="cart-item-remove" onclick="removeFromCart(${item.id})">×</div>
                </div>
            </div>
        `);
    });

    const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/\s/g, ''), 10), 0);
    const tax = Math.floor(total * 0.05);

    cartTotalEl.textContent = `${total} руб.`;
    cartTaxEl.textContent = `${tax} руб.`;
}

headerCart.addEventListener('click', openCart);

function renderSneakers(list) {
    cards.innerHTML = '';

    if (list.length === 0) {
        cards.insertAdjacentHTML('beforeend', `<div class="not-found">Товар не найден...</div>`);
        return;
    }

    list.forEach((item) => {
        cards.insertAdjacentHTML('beforeend', `
            <div class="card" data-id="${item.id}">
                <img class="favorite-status" src="/assets/favorite-minus.svg" alt="favorite-status">
                <img src="${item.img}" alt="sneaker">
                <h1>${item.title}</h1>
                <div class="card-bottom">
                    <div class="card-info">
                        <span>ЦЕНА:</span>
                        <p>${item.price} руб.</p>
                    </div>
                    <img class="cart-status" src="/assets/cart-minus.svg" alt="cart-status">
                </div>
            </div>
        `);
    });

    updateCartIcons();
}

function updateCartIcons() {
    document.querySelectorAll('.card').forEach(card => {
        let id = card.getAttribute('data-id');
        let cartIcon = card.querySelector('.cart-status');
        let inCart = cart.find(item => item.id == id);
        if (inCart) {
            cartIcon.src = '/assets/cart-plus.svg';
        } else {
            cartIcon.src = '/assets/cart-minus.svg';
        }
    });
}

cards.addEventListener('click', (e) => {
    if (e.target.classList.contains('cart-status')) {
        let card = e.target.closest('.card');
        let id = Number(card.getAttribute('data-id'));
        let title = card.querySelector('h1').textContent;
        let price = card.querySelector('.card-info p').textContent.replace(' руб.', '');
        let img = card.querySelector('img:nth-child(2)').getAttribute('src');

        let inCart = cart.find(item => item.id === id);
        if (inCart) {
            removeFromCart(id);
        } else {
            addToCart({ id, title, price, img });
        }
    }
});

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = sneakers.filter(item => item.title.toLowerCase().includes(query));
    renderSneakers(filtered);
});

renderSneakers(sneakers);
updateCartHeader();
renderCart();
updateCartIcons();
