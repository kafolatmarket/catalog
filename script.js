const products = [
  {
    id: 1,
    name: "ПЭТ бутылка 0.5 л",
    desc: "Прозрачная пластиковая бутылка для напитков, объём 0.5 литра",
    img: "https://images.unsplash.com/photo-1611078489935-ec60a69e1a37?w=600",
    category: "ПЭТ тара"
  },
  {
    id: 2,
    name: "ПЭТ бутылка 1.5 л",
    desc: "Классическая бутылка из ПЭТ объёмом 1.5 литра",
    img: "https://images.unsplash.com/photo-1582719478170-2f9b6fca4b15?w=600",
    category: "ПЭТ тара"
  },
  {
    id: 3,
    name: "Крышка с дозатором",
    desc: "Удобная крышка для жидкого мыла и шампуня",
    img: "https://images.unsplash.com/photo-1581579188871-df1f0c1d0dfb?w=600",
    category: "Аксессуары"
  },
  {
    id: 4,
    name: "Триггер распылитель",
    desc: "Пластиковый распылитель для бытовой химии",
    img: "https://images.unsplash.com/photo-1611078489614-98f7a0f7d5cf?w=600",
    category: "Аксессуары"
  },
  {
    id: 5,
    name: "Бутылка 5 л",
    desc: "Прочная бутылка из ПЭТ для воды и напитков",
    img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=600",
    category: "ПЭТ тара"
  },
  {
    id: 6,
    name: "Флакон 250 мл",
    desc: "Компактный флакон для косметики или химии",
    img: "https://images.unsplash.com/photo-1611078489846-59c0c48dbda8?w=600",
    category: "Флаконы"
  },
  {
    id: 7,
    name: "Крышка стандартная",
    desc: "Обычная пластиковая крышка для бутылок",
    img: "https://images.unsplash.com/photo-1622396481460-6f94c90b4d51?w=600",
    category: "Аксессуары"
  },
  {
    id: 8,
    name: "Флакон 500 мл",
    desc: "Пластиковый флакон среднего объёма",
    img: "https://images.unsplash.com/photo-1611078489422-f54a3e9b5ed5?w=600",
    category: "Флаконы"
  },
  {
    id: 9,
    name: "ПЭТ банка 1 л",
    desc: "Прозрачная банка из ПЭТ для хранения",
    img: "https://images.unsplash.com/photo-1582719478242-7ec982d43f3b?w=600",
    category: "ПЭТ тара"
  },
  {
    id: 10,
    name: "Крышка с защитой",
    desc: "Детская защитная крышка для бытовой химии",
    img: "https://images.unsplash.com/photo-1622396481634-6f94c90b4d52?w=600",
    category: "Аксессуары"
  },
{
    id: 11,
    name: "",
    desc: "",
    img: "https://images.unsplash.com/photo-1622396481634-6f94c90b4d52?w=600",
    category: "Аксессуары"
  }
];

const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll("#filters button");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");
const addToFav = document.getElementById("addToFav");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderProducts(items) {
  catalog.innerHTML = "";
  if (items.length === 0) {
    catalog.innerHTML = "<p>Ничего не найдено</p>";
    return;
  }
  items.forEach(prod => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${prod.img}" alt="${prod.name}">
      <h3>${prod.name}</h3>
      <p>${prod.desc}</p>
      <button class="favorite" onclick="openModal(${prod.id})">Подробнее</button>
    `;
    catalog.appendChild(card);
  });
}

function openModal(id) {
  const product = products.find(p => p.id === id);
  modalImg.src = product.img;
  modalName.textContent = product.name;
  modalDesc.textContent = product.desc;
  addToFav.onclick = () => addFavorite(product);
  modal.classList.remove("hidden");
}

closeModal.onclick = () => modal.classList.add("hidden");
window.onclick = e => { if (e.target === modal) modal.classList.add("hidden"); };

function addFavorite(product) {
  if (!favorites.some(f => f.id === product.id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Добавлено в избранное!");
  }
}

searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  renderProducts(filtered);
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.category;
    if (cat === "all") {
      renderProducts(products);
    } else {
      renderProducts(products.filter(p => p.category === cat));
    }
  });
});

document.getElementById("showFavorites").onclick = () => {
  renderProducts(favorites);
};

renderProducts(products);

