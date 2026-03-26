/* ==========================================
   1. GERENCIAMENTO DE ACESSIBILIDADE
   ========================================== */
const accBtn = document.getElementById('acc-toggle');
const accMenu = document.getElementById('acc-menu');
let currentFontSize = 16;

// Abrir/Fechar Menu de Acessibilidade
accBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Impede o fechamento imediato pelo clique no window
    accMenu.classList.toggle('hidden');
});

// Alterar Tamanho da Fonte (Global)
function changeFontSize(delta) {
    currentFontSize += delta;
    // Garante um limite mínimo de 12px e máximo de 24px para não quebrar o layout
    if (currentFontSize < 12) currentFontSize = 12;
    if (currentFontSize > 24) currentFontSize = 24;
    document.documentElement.style.fontSize = currentFontSize + 'px';
}

// Alternar Temas (Dark Mode e Contraste)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function toggleContrast() {
    document.body.classList.toggle('high-contrast');
}

// Resetar todas as configurações de acessibilidade
function resetAccessibility() {
    currentFontSize = 16;
    document.documentElement.style.fontSize = '16px';
    document.body.classList.remove('dark-mode');
    document.body.classList.remove('high-contrast');
}

// Fechar menu de acessibilidade ao clicar fora dele
window.addEventListener('click', (event) => {
    if (!accBtn.contains(event.target) && !accMenu.contains(event.target)) {
        accMenu.classList.add('hidden');
    }
});


/* ==========================================
   2. LÓGICA DO CARRINHO (RE IMPORTADOS)
   ========================================== */
let cart = [];
const cartCountElement = document.getElementById('cart-count');
const toast = document.getElementById('cart-toast');

// Função para exibir o Toast (notificação)
function showToast() {
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    // Esconde após 3 segundos
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hidden');
    }, 3000);
}

// Função para adicionar ao carrinho e atualizar interface
function addToCart(productName, price) {
    // Adiciona o objeto do produto ao array
    cart.push({ name: productName, price: price });
    
    // Atualiza o contador visual
    cartCountElement.innerText = cart.length;
    
    // Feedback visual de "pulo" no ícone do carrinho
    const cartIcon = document.querySelector('.icon-link[href="#"]');
    cartIcon.style.transform = "scale(1.2)";
    setTimeout(() => cartIcon.style.transform = "scale(1)", 200);

    showToast();


}

// Inicializa os eventos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Pega o nome e preço direto do HTML do card pai
            const card = button.closest('.product-card');
            const name = card.querySelector('.product-name').innerText;
            const price = card.querySelector('.price').innerText;

            addToCart(name, price);
        });
    });
});

/* ==========================================
   3. CONTROLE DA SIDEBAR DO CARRINHO
   ========================================== */
const cartSidebar = document.getElementById('cart-sidebar');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const overlay = document.getElementById('cart-overlay');

// Abrir Carrinho
openCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartSidebar.classList.add('open');
    overlay.classList.add('show');
    renderCart(); // Atualiza a lista sempre que abrir
});

// Fechar Carrinho
[closeCartBtn, overlay].forEach(el => {
    el.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('show');
    });
});

// Função para renderizar os itens na tela
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Limpa antes de desenhar
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach((item, index) => {
            // Converte o preço de string "R$ 169,99" para número
            const priceValue = parseFloat(item.price.replace('R$', '').replace(',', '.'));
            total += priceValue;

            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <span>${item.price}</span>
                </div>
                <button onclick="removeItem(${index})" style="background:none; border:none; cursor:pointer; color:red;">Remover</button>
            `;
            cartItemsContainer.appendChild(div);
        });
    }

    cartTotalElement.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para remover item
function removeItem(index) {
    cart.splice(index, 1); // Remove do array
    document.getElementById('cart-count').innerText = cart.length; // Atualiza contador
    renderCart(); // Redesenha a lista
}

/* ==========================================
   4. SIDEBAR DE DETALHES DO PRODUTO
   ========================================== */

// Função para abrir a sidebar de detalhes
function openProductDetails(card) {
    // 1. Capturar os elementos da sidebar (dentro da função é mais seguro)
    const detailsSidebar = document.getElementById('product-details-sidebar');
    const detailsName = document.getElementById('details-product-name');
    const detailsImage = document.getElementById('details-product-image');
    const detailsPrice = document.getElementById('details-product-price');
    const detailsDesc = document.getElementById('details-product-description');
    const detailsAddToCartBtn = document.getElementById('details-add-to-cart');
    const overlay = document.getElementById('cart-overlay');

    console.log("Tentando abrir detalhes do produto..."); // Teste no F12

    // 2. Capturar as informações do card clicado
    const name = card.querySelector('.product-name').innerText;
    const imageSrc = card.querySelector('img').src;
    const price = card.querySelector('.price').innerText;

    // 3. Preencher a sidebar
    detailsName.innerText = name;
    detailsImage.src = imageSrc;
    detailsPrice.innerText = price;
    
    // Verifica se a descrição existe no seu objeto 'productDescriptions'
    if (typeof productDescriptions !== 'undefined') {
        detailsDesc.innerText = productDescriptions[name] || "Descrição detalhada disponível em breve.";
    }

    // 4. Configurar botão de compra da sidebar
    detailsAddToCartBtn.onclick = (e) => {
        e.stopPropagation(); // Evita conflitos de clique
        addToCart(name, price);
    };

    // 5. Abrir visualmente
    detailsSidebar.classList.add('open');
    overlay.classList.add('show');
}

// Inicializa os eventos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // FECHAMENTO (Coloquei aqui dentro para garantir que os IDs existam)
    const closeDetailsBtn = document.getElementById('close-details');
    const detailsSidebar = document.getElementById('product-details-sidebar');
    const overlay = document.getElementById('cart-overlay');

    if(closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', () => {
            detailsSidebar.classList.remove('open');
            overlay.classList.remove('show');
        });
    }

    // Fechar ao clicar no fundo escuro (overlay)
    if(overlay) {
        overlay.addEventListener('click', () => {
            detailsSidebar.classList.remove('open');
            // Aproveita e fecha o carrinho também se estiver aberto
            const cartSidebar = document.getElementById('cart-sidebar');
            if(cartSidebar) cartSidebar.classList.remove('open');
            overlay.classList.remove('show');
        });
    }

    // CLIQUE NA FOTO OU NO NOME DO PRODUTO
    document.querySelectorAll('.product-card img, .product-card .product-name').forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e) => {
            // Se clicar na imagem do carrinho (o ícone), não abre os detalhes
            if (element.classList.contains('cart-btn-icon')) return;
            
            const card = element.closest('.product-card');
            openProductDetails(card);
        });
    });

    // BOTÃO DE COMPRA ORIGINAL
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede de abrir a sidebar de detalhes ao clicar no botão de comprar
            const card = button.closest('.product-card');
            const name = card.querySelector('.product-name').innerText;
            const price = card.querySelector('.price').innerText;
            addToCart(name, price);
        });
    });
});

// Lógica do Dropdown de Marcas
const marcasLink = document.getElementById('marcas-link');
const marcasMenu = document.getElementById('marcas-menu');

marcasLink.addEventListener('click', (e) => {
    e.preventDefault(); // Não recarrega a página
    marcasMenu.classList.toggle('hidden');
});

// Fechar se clicar em qualquer outro lugar da tela
window.addEventListener('click', (e) => {
    if (!marcasLink.contains(e.target)) {
        marcasMenu.classList.add('hidden');
    }
});

// Função para filtrar (futura implementação)
function filterByBrand(brand) {
    console.log("Filtrando por: " + brand);
    alert("Você selecionou a marca: " + brand + ". Em breve listaremos apenas esses produtos!");
    marcasMenu.classList.add('hidden');
}