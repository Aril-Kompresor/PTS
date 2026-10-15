let products = [],
	favs = JSON.parse(localStorage.getItem('favs') || '[]');

const listEl = document.getElementById('list'),
	statEl = document.getElementById('stat'),
	msgEl = document.getElementById('msg');

async function loadData() {
	listEl.innerHTML = '<p>Memuat data produk...</p>';
	try {
		const res = await fetch('https://dummyjson.com/products?limit=12');
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const data = await res.json();
		products = data.products;
		render(products);
	} catch (err) {
		listEl.innerHTML = `<p class="err">Gagal: ${err.message}</p>`;
	}
}

function render(items) {
	if (!items.length) return (listEl.innerHTML = '<p>Tidak ada produk yang cocok.</p>');
	const avg = (items.reduce((s, p) => s + p.price, 0) / items.length).toFixed(1);
	const max = Math.max(...items.map(p => p.price));
	statEl.innerHTML = `<strong>Statistik:</strong> Total: ${items.length} | Rata-rata: $${avg} | Termahal: $${max}`;
	listEl.innerHTML = items.map(p => `
    <div class="card">
      <img src="${p.thumbnail}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>Harga: $${p.price} | Rating: ${p.rating}</p>
      <button onclick="toggleFav(${p.id})">${favs.includes(p.id) ? '❤️ Favorit' : '🤍 Tambah Favorit'}</button>
    </div>`).join('');
}

function toggleFav(id) {
	favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
	localStorage.setItem('favs', JSON.stringify(favs));
	render(products);
}

function setView(mode) {
	listEl.className = mode;
	localStorage.setItem('viewMode', mode);
}

document.getElementById('formFilter').addEventListener('submit', e => {
	e.preventDefault();

	const min = parseFloat(document.getElementById('minPrice').value), max = parseFloat(document.getElementById('maxPrice').value);
	if (isNaN(min) || isNaN(max)) return (msgEl.textContent = 'Peringatan: Kedua harga wajib diisi angka!');
	if (max < min) return (msgEl.textContent = 'Validasi Gagal: Harga Maksimal harus >= Harga Minimal!');

	msgEl.textContent = `Sukses: Menampilkan produk rentang $${min} - $${max}`;
	render(products.filter(p => p.price >= min && p.price <= max));
});

setView(localStorage.getItem('viewMode') || 'grid');
loadData();
