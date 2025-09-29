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
// Criando o tabuleiro
let tabuleiro =[];

for (let i = 0; i < tamanhoTabuleiro; i++){
    tabuleiro[i]=[];
    for (let j = 0; j < tamanhoTabuleiro;j++){
        tabuleiro[i][j] = "~";
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
    
        if (tabuleiro[linha][coluna] === "~"){
            tabuleiro[linha][coluna] = "Navio";
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
    if (tabuleiro[linha][coluna] === 'X' || tabuleiro[linha][coluna] === 'O'){
        console.log("Você já atirou nessa posição, tente novamente.");
        return false;
    }
    if (tabuleiro[linha][coluna] ==="Navio"){
        console.log("Você afundou uma embarcação!");
        tabuleiro[linha][coluna] = "X";
        navios--;
        tiros--;
        return true;
    } else {
        console.log("Você errou o tiro.");
        tabuleiro[linha][coluna] = "O";
        tiros--;
        return false;
    }
}

while (tiros > 0 && navios > 0){
    console.log(`Você tem ${tiros} tiros restantes e ${navios} navios para afundar.`);
    for (let i = 0; i < tabuleiro.length; i++) {
    console.log(tabuleiro[i]);
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