const products = [
    { id: 1, name: 'AOKA', price: 5000, img: 'img/AOKA.png' },
    { id: 2, name: 'LOTTE', price: 5000, img: 'img/LOTTE.jpg' },
    { id: 3, name: 'CHITATO LITE', price: 2000, img: 'img/CHITATO LITE.png' },
    { id: 4, name: 'MAXI', price: 10000, img: 'img/MAXI.jpg' },
    { id: 5, name: 'QTELA', price: 4000, img: 'img/qtela.jpg' },
    { id: 6, name: 'SARI ROTI', price: 3000, img: 'img/SARI ROTI.png' }
];

let cart = [];

// Menampilkan produk
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <img src="${product.img}"
                 alt="${product.name}"
                 onerror="this.style.display='none';
                 this.nextElementSibling.style.display='block';">

            <div class="no-image" style="display:none;">
                Gambar ${product.name} tidak ditemukan
            </div>

            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString('id-ID')}</p>

            <button onclick="addToCart(${product.id})">
                Tambah ke keranjang
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

// Menambahkan produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Menampilkan keranjang
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');

        listItem.textContent =
            `${item.name} x ${item.quantity} - Rp ${
                (item.price * item.quantity).toLocaleString('id-ID')
            }`;

        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent =
        totalPrice.toLocaleString('id-ID');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong.');
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const paymentInput = prompt(
        `Total belanja Rp ${total.toLocaleString('id-ID')}.
Masukkan jumlah pembayaran:`
    );

    if (paymentInput === null || paymentInput.trim() === '') return;

    const payment = Number(paymentInput);

    if (!Number.isFinite(payment) || payment < 0) {
        alert('Masukkan jumlah pembayaran yang valid.');
        return;
    }

    if (payment >= total) {
        const change = payment - total;

        alert(
            `Pembayaran berhasil!
Total: Rp ${total.toLocaleString('id-ID')}
Bayar: Rp ${payment.toLocaleString('id-ID')}
Kembalian: Rp ${change.toLocaleString('id-ID')}`
        );

        cart = [];
        updateCart();
    } else {
        alert('Uang Anda tidak mencukupi.');
    }
}

// Jalankan program setelah HTML siap
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    updateCart();

    document.getElementById('checkout-btn')
        .addEventListener('click', checkout);
});