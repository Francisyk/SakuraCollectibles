let totalGeral = 0;
let carrinhoProdutos = {};

limpar();

function adicionar() {
    const produtoSelect = document.getElementById('produto');
    const produtoTexto = produtoSelect.value;

    const nomeProduto = produtoTexto.split('-')[0].trim();

    const valorUnitario = Number(
        produtoTexto.replace(/[^\d]/g, '')
    );

    const quantidade = Number(document.getElementById('quantidade').value);

    if (!quantidade || quantidade <= 0) return;

    if (carrinhoProdutos[nomeProduto]) {
        carrinhoProdutos[nomeProduto].quantidade += quantidade;
    } else {
        carrinhoProdutos[nomeProduto] = {
            quantidade,
            valorUnitario
        };
    }

    atualizarCarrinho();
    document.getElementById('quantidade').value = '';
}

function atualizarCarrinho() {
    const carrinho = document.getElementById('lista-produtos');
    carrinho.innerHTML = '';
    totalGeral = 0;

    for (let produto in carrinhoProdutos) {
        const item = carrinhoProdutos[produto];
        const preco = item.quantidade * item.valorUnitario;

        totalGeral += preco;

        carrinho.innerHTML += `
            <section class="carrinho__produtos__produto">
                <span class="texto-azul">${item.quantidade}x</span> ${produto}
                <span class="texto-azul">${formatarJPY(preco)}</span>
            </section>
        `;
    }

    document.getElementById('valor-total').textContent = formatarJPY(totalGeral);
}

function limpar() {
    totalGeral = 0;
    carrinhoProdutos = {};
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = formatarJPY(0);
}

function formatarJPY(valor) {
    return valor.toLocaleString('ja-JP', {
        style: 'currency',
        currency: 'JPY'
    });
}

const selectProduto = document.getElementById('produto');
const preview = document.getElementById('preview-produto');

let hoverTimeout;

const produtosInfo = {
  "Momo(Dandadan)": {
    preco: "8,980 JPY",
    img: "./assets/dandandan.jpg"
  },
  "Kaguya(Love Is War?)": {
    preco: "6,780 JPY",
    img: "./assets/kaguya.jpg"
  },
  "Spike(Cowboy Bepop)": {
    preco: "6,800 JPY",
    img: "./assets/spike.jpg"
  },
  "Shoyo(Haikyuu!!)": {
    preco: "8,800 JPY",
    img: "./assets/haikyuu.jpg"
  },
  "Asuka(NEON GENESIS EVANGELION)": {
    preco: "23,100 JPY",
    img: "./assets/asuka.jpg"
  },
  "Kurapika(Hunter x Hunter)": {
    preco: "11,680 JPY",
    img: "./assets/kurapika.jpg"
  }
};

selectProduto.addEventListener('mouseenter', () => {
  hoverTimeout = setTimeout(() => {
    mostrarPreview();
  }, 1300);
});

selectProduto.addEventListener('mouseleave', () => {
  clearTimeout(hoverTimeout);
  esconderPreview();
});

selectProduto.addEventListener('change', mostrarPreview);

function mostrarPreview() {
  const nome = selectProduto.value.split('-')[0].trim();
  const produto = produtosInfo[nome];

  if (!produto) return;

  document.getElementById('preview-img').src = produto.img;
  document.getElementById('preview-nome').textContent = nome;
  document.getElementById('preview-preco').textContent = produto.preco;

  preview.classList.remove('hidden');
  requestAnimationFrame(() => preview.classList.add('show'));
}

function esconderPreview() {
  preview.classList.remove('show');
  setTimeout(() => preview.classList.add('hidden'), 300);
}
