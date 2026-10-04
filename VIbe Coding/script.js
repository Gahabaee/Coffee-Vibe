// --- CART SYSTEM ---
function getCart() {
    const cart = localStorage.getItem('vibe_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('vibe_cart', JSON.stringify(cart));
}

function addToCart(id, name, price, img) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if(existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, name, price, img, qty: 1 });
    }
    saveCart(cart);
    alert(name + " berhasil ditambahkan ke keranjang!");
}

// Chatbot Logic untuk Prototipe HTML Statis
function toggleChat() {
    const aiWindow = document.getElementById('aiWindow');
    aiWindow.classList.toggle('active');
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
}

function sendQuickMessage(text) {
    const input = document.getElementById('userInput');
    input.value = text;
    sendMessage();
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    // Tambahkan pesan user ke UI
    addMessageToChat('user', message);
    input.value = '';

    // Menampilkan indikator loading
    const loadingId = addMessageToChat('bot', '...', true);

    // Simulasi jeda waktu berpikir AI (Mock API)
    setTimeout(() => {
        document.getElementById(loadingId).remove();
        
        let reply = "Maaf, saya belum sepenuhnya mengerti. Bisa diulang?";
        const lowerMsg = message.toLowerCase();

        // 1. Rekomendasi
        if (lowerMsg.includes('rekomendasi') || lowerMsg.includes('pilih') || lowerMsg.includes('manis')) {
            reply = "Berdasarkan selera yang populer, saya sangat merekomendasikan **Vanilla Latte** kami. Rasa manisnya pas dengan ekstrak espresso yang lembut.\n\n<a href='cart.html' class='quick-action-btn'>[+] Tambah ke Keranjang</a>";
        }
        // 2. Info Produk
        else if (lowerMsg.includes('cold brew')) {
            reply = "Cold Brew kami diseduh perlahan selama 18 jam menggunakan biji kopi arabika pilihan. Rasanya sangat smooth dan menyegarkan! Mau pesan?";
        }
        // 3. Checkout
        else if (lowerMsg.includes('bayar') || lowerMsg.includes('pesan') || lowerMsg.includes('checkout')) {
            const cart = getCart();
            if (cart.length === 0) {
                reply = "Keranjang Anda masih kosong. Silakan kunjungi halaman Shop untuk memilih kopi favorit Anda terlebih dahulu!";
            } else {
                const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
                reply = "Baik, saya akan bantu proses pembayaran keranjang Anda. Totalnya **Rp " + total.toLocaleString('id-ID') + "**.\n\nSilakan scan QRIS berikut untuk membayar:\n<img src='https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg' style='width:150px; margin-top:10px; border-radius:10px;'>\n\nJika sudah, ketik 'Sudah Bayar'.";
            }
        }
        // 4. Konfirmasi Bayar
        else if (lowerMsg.includes('sudah bayar')) {
            reply = "Pembayaran berhasil dikonfirmasi! 🎉\n\nNomor Resi / Order ID Anda adalah: **TRXD-9921**.\nAnda bisa melacaknya di menu Cart.";
        }
        // 5. Tracking
        else if (lowerMsg.includes('cek pesanan') || lowerMsg.includes('lacak') || lowerMsg.includes('resi')) {
            reply = "Tentu! Silakan sebutkan Nomor Resi / Order ID Anda (contoh: TRXD-1234).";
        }
        else if (lowerMsg.includes('trxd-')) {
            reply = "Mengecek sistem...\nStatus pesanan " + message.toUpperCase() + " Anda saat ini: **Sedang Dikirim oleh Kurir** 🛵.";
        }
        else if (lowerMsg.includes('halo') || lowerMsg.includes('hai')) {
            reply = "Halo! Saya AI Barista Anda. Mau cari kopi jenis apa hari ini?";
        }

        addMessageToChat('bot', reply);

    }, 1000); // 1 detik loading
}

function addMessageToChat(sender, text, isLoading = false) {
    const chatMessages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    
    // Convert newlines to <br>
    msgDiv.innerHTML = text.replace(/\n/g, '<br>');
    
    const id = 'msg-' + Date.now();
    if(isLoading) msgDiv.id = id;
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return id;
}
