const prompt = require('prompt-sync')();

console.log("-------- Bem-vindo ao Batalha Naval!--------");
console.log("");
console.log("Cada navio ocupa uma célula.");
console.log("Tente afundar os navios do oponente adivinhando suas posições.")
console.log("Você tem 10 tentativas para afundar todos os navios do oponente.");
console.log(" --------------------------------------- ");
console.log("Qual a dificuldade que gostaria?");
console.log("--- Fácil --- Médio --- Dificil ---");
console.log(" --- 3x3 -- -- 5x5 -- --- 6x6 --- ");
console.log("Digite: facil, medio ou dificil");

let opcao = prompt("");
let tamanhoTabuleiro;

switch (opcao){
    case 'facil':
        tamanhoTabuleiro = 3;
        break;

    case 'medio':
        tamanhoTabuleiro = 5;
        break;
    
    case 'dificil':
        tamanhoTabuleiro = 6;
        break;
}

// Tabuleiro "real" (onde estão os navios)
let tabuleiroReal = [];
// Tabuleiro visível para o jogador
let tabuleiroVisivel = [];

for (let i = 0; i < tamanhoTabuleiro; i++){
    tabuleiroReal[i]=[];
    tabuleiroVisivel[i]=[];
    for (let j = 0; j < tamanhoTabuleiro;j++){
        tabuleiroReal[i][j] = "~";      // oceano
        tabuleiroVisivel[i][j] = "~";   // jogador só vê água no início
    }
}

let tiros = 10;
let navios = 3;

// Posicionando os navios
function posicionarNavios (){
    let posicoesNavios = 0;
    while (posicoesNavios < navios){
        let linha = Math.floor(Math.random() * tamanhoTabuleiro);
        let coluna = Math.floor(Math.random() * tamanhoTabuleiro);
    
        if (tabuleiroReal[linha][coluna] === "~"){
            tabuleiroReal[linha][coluna] = "N"; // Navio só no tabuleiro REAL
            posicoesNavios++;
        }
    }
}

posicionarNavios();

function atirar(linha, coluna){
    if (linha < 0 || linha >= tamanhoTabuleiro || coluna < 0 || coluna >= tamanhoTabuleiro){
        console.log("Tiro para fora do tabuleiro, tente novamente.");
        return false;
    }
    if (tabuleiroVisivel[linha][coluna] === 'X' || tabuleiroVisivel[linha][coluna] === 'O'){
        console.log("Você já atirou nessa posição, tente novamente.");
        return false;
    }
    if (tabuleiroReal[linha][coluna] === "N"){
        console.log("Você afundou uma embarcação!");
        tabuleiroVisivel[linha][coluna] = "X"; // Marca no tabuleiro do jogador
        tabuleiroReal[linha][coluna] = "X";    // Marca também no real
        navios--;
        tiros--;
        return true;
    } else {
        console.log("Você errou o tiro.");
        tabuleiroVisivel[linha][coluna] = "O"; // Marca o erro
        tiros--;
        return false;
    }
}

while (tiros > 0 && navios > 0){
    console.log(`\nVocê tem ${tiros} tiros restantes e ${navios} navios para afundar.`);
    for (let i = 0; i < tabuleiroVisivel.length; i++) {
        console.log(tabuleiroVisivel[i].join(" "));
    }
    let linha = parseInt(prompt("Digite a linha para atirar (0 a " + (tamanhoTabuleiro - 1) + "): "));
    let coluna = parseInt(prompt("Digite a coluna para atirar (0 a " + (tamanhoTabuleiro - 1) + "): "));
    atirar(linha, coluna);
    
}

if (navios === 0){
    console.log("Parabéns! Você afundou todos os navios!");
} else {
    console.log("Fim de jogo! Você não conseguiu afundar todos os navios.");
}
