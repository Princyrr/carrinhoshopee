// carrinho-terminal.js

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let carrinho = [];


function listarCarrinho() {
  if (carrinho.length === 0) {
    console.log('\nCarrinho vazio.\n');
    return;
  }
  console.log('\nItens no carrinho:');
  carrinho.forEach((item, i) => {
    console.log(
      `${i + 1}. ${item.nome} - R$${item.preco.toFixed(2)} x ${item.quantidade} = R$${(item.preco * item.quantidade).toFixed(2)}`
    );
  });
  console.log(`Total: R$${calcularTotal().toFixed(2)}\n`);
}

function calcularTotal() {
  return carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
}

function adicionarProduto() {
  rl.question('Nome do produto: ', (nome) => {
    rl.question('Preço do produto (ex: 10.50): ', (precoStr) => {
      const preco = parseFloat(precoStr);
      if (isNaN(preco) || preco <= 0) {
        console.log('Preço inválido. Tente novamente.');
        return mainMenu();
      }
      rl.question('Quantidade: ', (qtdStr) => {
        const quantidade = parseInt(qtdStr);
        if (isNaN(quantidade) || quantidade <= 0) {
          console.log('Quantidade inválida. Tente novamente.');
          return mainMenu();
        }
     
        const index = carrinho.findIndex((p) => p.nome.toLowerCase() === nome.toLowerCase());
        if (index !== -1) {
          carrinho[index].quantidade += quantidade;
          console.log(`Quantidade atualizada para ${carrinho[index].quantidade}`);
        } else {
          carrinho.push({ nome, preco, quantidade });
          console.log('Produto adicionado ao carrinho.');
        }
        mainMenu();
      });
    });
  });
}

function removerProduto() {
  if (carrinho.length === 0) {
    console.log('Carrinho vazio, nada para remover.');
    return mainMenu();
  }
  listarCarrinho();
  rl.question('Número do produto para remover: ', (numStr) => {
    const num = parseInt(numStr);
    if (isNaN(num) || num < 1 || num > carrinho.length) {
      console.log('Número inválido.');
      return mainMenu();
    }
    const removido = carrinho.splice(num - 1, 1);
    console.log(`Produto "${removido[0].nome}" removido.`);
    mainMenu();
  });
}

function atualizarQuantidade() {
  if (carrinho.length === 0) {
    console.log('Carrinho vazio, nada para atualizar.');
    return mainMenu();
  }
  listarCarrinho();
  rl.question('Número do produto para atualizar: ', (numStr) => {
    const num = parseInt(numStr);
    if (isNaN(num) || num < 1 || num > carrinho.length) {
      console.log('Número inválido.');
      return mainMenu();
    }
    rl.question('Nova quantidade: ', (qtdStr) => {
      const quantidade = parseInt(qtdStr);
      if (isNaN(quantidade) || quantidade <= 0) {
        console.log('Quantidade inválida.');
        return mainMenu();
      }
      carrinho[num - 1].quantidade = quantidade;
      console.log(`Quantidade atualizada para ${quantidade}.`);
      mainMenu();
    });
  });
}

function mainMenu() {
  console.log('\n=== Carrinho de Compras Shopee (Terminal) ===');
  console.log('1. Listar carrinho');
  console.log('2. Adicionar produto');
  console.log('3. Remover produto');
  console.log('4. Atualizar quantidade');
  console.log('5. Mostrar total');
  console.log('0. Sair');
  rl.question('Escolha uma opção: ', (op) => {
    switch (op) {
      case '1':
        listarCarrinho();
        mainMenu();
        break;
      case '2':
        adicionarProduto();
        break;
      case '3':
        removerProduto();
        break;
      case '4':
        atualizarQuantidade();
        break;
      case '5':
        console.log(`\nTotal do carrinho: R$${calcularTotal().toFixed(2)}\n`);
        mainMenu();
        break;
      case '0':
        console.log('Saindo... Obrigado por usar o carrinho!');
        rl.close();
        break;
      default:
        console.log('Opção inválida.');
        mainMenu();
        break;
    }
  });
}


mainMenu();
