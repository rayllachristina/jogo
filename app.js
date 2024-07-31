let listaDeNumerosSorteados = []; // Inicializa uma lista vazia para armazenar os números sorteados.
let numeroLimite = 10; // Define o limite superior para o número aleatório.
let numeroSecreto = gerarNumeroAleatorio(); // Gera um número aleatório e o armazena como o número secreto.
let tentativas = 1; // Inicializa o contador de tentativas com 1.

function exibirTextoNaTela(tag, texto) { // Define uma função para exibir texto na tela.
    let campo = document.querySelector(tag); // Seleciona o elemento HTML baseado na tag fornecida.
    campo.innerHTML = texto; // Define o conteúdo HTML do elemento selecionado com o texto fornecido.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // Utiliza a biblioteca responsiveVoice para falar o texto.
}

function exibirMensagemInicial() { // Define uma função para exibir a mensagem inicial.
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo.
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10'); // Exibe a instrução inicial do jogo.
}

exibirMensagemInicial(); // Chama a função para exibir a mensagem inicial.


function verificarChute() { // Define uma função para verificar o chute do jogador.
    let chute = document.querySelector('input').value; // Obtém o valor inserido pelo jogador no campo de input.
   
    if (chute == numeroSecreto) { // Verifica se o chute é igual ao número secreto.
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe uma mensagem de acerto.
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Define a palavra correta para tentativas baseado no número de tentativas.
        let mensagemTentativas =` Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Cria uma mensagem informando o número de tentativas.
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem de tentativas.
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar o jogo.
    } else { // Caso o chute não seja igual ao número secreto.
        if (chute > numeroSecreto) { // Verifica se o chute é maior que o número secreto.
            exibirTextoNaTela('p', 'O número secreto é menor'); // Informa que o número secreto é menor.
        } else { // Caso o chute seja menor que o número secreto.
            exibirTextoNaTela('p', 'O número secreto é maior'); // Informa que o número secreto é maior.
        }
        tentativas++; // Incrementa o contador de tentativas.
        limparCampo(); // Limpa o campo de input.
    }
}


function gerarNumeroAleatorio() { // Define uma função para gerar um número aleatório.
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório entre 1 e numeroLimite.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Obtém a quantidade de elementos na lista de números sorteados.

    if (quantidadeDeElementosNaLista == numeroLimite) { // Verifica se a lista de números sorteados está cheia.
        listaDeNumerosSorteados = []; // Se estiver cheia, reinicializa a lista.
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Verifica se o número escolhido já foi sorteado.
        return gerarNumeroAleatorio(); // Se o número já foi sorteado, chama a função novamente para gerar um novo número.
    } else { // Se o número não foi sorteado ainda.
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número escolhido à lista de números sorteados.
        console.log(listaDeNumerosSorteados); // Loga a lista de números sorteados no console.
        return numeroEscolhido; // Retorna o número escolhido.
    }
}

function limparCampo() { // Define uma função para limpar o campo de input.
    chute = document.querySelector('input'); // Seleciona o campo de input.
    chute.value = ''; // Limpa o valor do campo de input.
}

function reiniciarJogo() { // Define uma função para reiniciar o jogo.
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto.
    limparCampo(); // Limpa o campo de input.
    tentativas = 1; // Reseta o contador de tentativas.
    exibirMensagemInicial(); // Exibe a mensagem inicial.
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar.
}
