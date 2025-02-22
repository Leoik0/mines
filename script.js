const inputQuantilyMoney = document.querySelector(".input-quantily-money");
const cash = document.querySelector(".value-cash");
const inputQuantilyMine = document.querySelector(".input-quantily-mine");
const divQuantilyMines = document.querySelector(".quantily-mines");
const dimasMines = document.querySelector(".dimas-minas");
const mines = document.querySelector(".input-mines");
const dimas = document.querySelector(".input-dimas");
const pMoney = document.querySelector(".p-money");
const inputsMultiplicator = document.querySelector(".inputs-multiplicator");
const multiplicatorActual = document.querySelector(".multiplique-atualy");
const nextMultiplicator = document.querySelector(".next-multiplique");
const btnHalfValue = document.querySelector(".btn-half-value");
const btnDoubleValue = document.querySelector(".btn-double-value");
const btnStart = document.querySelector(".start-game");
const btnCashOut = document.querySelector(".cash-out");
const gameBoard = document.querySelector(".game-board");
const gameOver = document.querySelector(".game-over");
const btnAgain = document.querySelector(".btn-again");
const volume = document.querySelector(".volume");
const ative = document.querySelector(".ative");
const mute = document.querySelector(".mute");
const totalCells = 25; // 5x5

const bombAudio = new Audio("/assets/bomb.mp3");
const songAudio = new Audio("/assets/song.mp3");
songAudio.loop = true; // Faz a música tocar em loop

let bombPositions = new Set();
let diamondPositions = new Set();
let click = 0;
let initialBet = 10.0;
let gameActive = true;
let savedMoney = localStorage.getItem("money");
let moneyValue = savedMoney ? parseFloat(savedMoney) : initialBet;
let money = document.createElement("span");
money.classList.add("money");
money.textContent = moneyValue.toFixed(2); // Agora exibe o valor salvo
pMoney.appendChild(money);

const saveMoneyToLocalStorage = () => {
  localStorage.setItem("money", money.textContent);
};

// Garantindo que o saldo carregue ao reiniciar a página
window.addEventListener("load", () => {
  let savedMoney = localStorage.getItem("money");
  if (savedMoney) {
    money.textContent = parseFloat(savedMoney).toFixed(2);
  }
});

const addBonusEveryMinute = () => {
  setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Só adiciona bônus exatamente quando for um múltiplo de 6 horas e os minutos e segundos forem 0
    if (hours % 6 === 0 && minutes === 0 && seconds === 0) {
      let currentBalance = parseFloat(money.textContent);
      currentBalance += 5;
      money.textContent = currentBalance.toFixed(2);
      saveMoneyToLocalStorage();
    }
  }, 1000); // Verifica a cada segundo
};

// Inicia a função quando a página carregar
addBonusEveryMinute();

const multiplicadoresMines = [
  {
    minas: 2,
    valores: [
      1.0, 1.08, 1.17, 1.29, 1.41, 1.56, 1.74, 1.94, 2.18, 2.47, 2.83, 3.26,
      3.81, 4.5, 5.4, 6.6, 8.25, 10.61, 14.14, 19.8, 29.7, 49.5, 99, 297,
    ],
  },
  {
    minas: 3,
    valores: [
      1.0, 1.12, 1.29, 1.48, 1.71, 2.0, 2.35, 2.79, 3.35, 4.07, 5.0, 6.26, 7.96,
      10.35, 13.8, 18.97, 27.11, 40.66, 65.06, 113.85, 227.7, 569.3, 2277,
    ],
  },
  {
    minas: 4,
    valores: [
      1.0, 1.18, 1.41, 1.71, 2.01, 2.58, 3.23, 3.95, 5.15, 6.88, 9.17, 12.51,
      17.52, 25.35, 37.95, 59.64, 99.39, 178.91, 357.81, 834.9, 2504, 12523,
    ],
  },
  {
    minas: 5,
    valores: [
      1.0, 1.24, 1.56, 2.0, 2.58, 3.39, 4.52, 6.14, 8.5, 12.04, 17.52, 26.77,
      40.87, 66.41, 113.85, 208.72, 417.45, 939.26, 2504, 52598,
    ],
  },
  {
    minas: 6,
    valores: [
      1.0, 1.3, 1.74, 2.35, 3.23, 4.52, 6.46, 9.44, 14.17, 21.89, 35.03, 58.38,
      102.17, 189.75, 379.5, 834.9, 25047, 175329,
    ],
  },
  {
    minas: 7,
    valores: [
      1.0, 1.37, 1.94, 2.79, 3.95, 6.14, 9.44, 14.17, 24.47, 44.05, 83.2, 166.4,
      356.56, 831.98, 2163, 6489, 23794,
    ],
  },
  {
    minas: 8,
    valores: [
      1.0, 1.46, 2.18, 3.35, 5.15, 8.5, 14.17, 24.47, 44.05, 83.2, 176.8, 404.1,
      1010, 2828, 9193, 36773, 202254,
    ],
  },
  {
    minas: 9,
    valores: [
      1.0, 1.55, 2.47, 4.07, 6.88, 12.04, 21.89, 44.05, 83.2, 176.8, 404.1,
      1010, 2828, 9193, 49031, 294188, 3236072,
    ],
  },
  {
    minas: 10,
    valores: [
      1.0, 1.65, 2.83, 5.0, 9.17, 17.52, 35.03, 83.2, 176.8, 404.1, 1010, 2828,
      9193, 49031, 367735, 5148297,
    ],
  },
  {
    minas: 11,
    valores: [
      1.0, 1.77, 3.26, 6.26, 12.51, 26.77, 58.38, 138.66, 356.56, 1010, 3223,
      12123, 56574, 396022, 5148297,
    ],
  },
  {
    minas: 12,
    valores: [
      1.0, 1.9, 3.81, 7.96, 17.52, 40.87, 102.17, 277.83, 831.98, 2828, 11314,
      56574, 390622, 5148297,
    ],
  },
  {
    minas: 13,
    valores: [
      1.0, 2.06, 4.5, 10.35, 25.35, 66.41, 189.75, 600.87, 2133, 9193, 49031,
      367735, 4412826,
    ],
  },
  {
    minas: 14,
    valores: [
      1.0, 2.25, 5.4, 13.8, 37.95, 113.85, 379.5, 1442, 6489, 36773, 294188,
      4412826,
    ],
  },
  {
    minas: 15,
    valores: [
      1.0, 2.47, 6.6, 18.97, 59.64, 208.7, 834.9, 3965, 23794, 202254, 3236072,
    ],
  },
  {
    minas: 16,
    valores: [1.0, 2.75, 8.25, 27.11, 99.39, 3965, 23794, 202254, 3236072],
  },
  {
    minas: 17,
    valores: [1.0, 3.09, 10.61, 40.66, 178.91, 6261, 59486, 1070759],
  },
  { minas: 18, valores: [1.0, 3.54, 14.14, 65.06, 357.81, 25047, 475893] },
  { minas: 19, valores: [1.0, 4.12, 19.8, 113.85, 834.9, 175329] },
  { minas: 20, valores: [1.0, 4.95, 29.7, 227.7, 2504, 52598] },
  { minas: 21, valores: [1.0, 6.19, 49.5, 569.3, 1523] },
  { minas: 22, valores: [1.0, 8.25, 99, 2277] },
  { minas: 23, valores: [1.0, 12.37, 297] },
  { minas: 24, valores: [1.0, 24.75] },
];

// Gera as opções de 2 a 24 dinamicamente
for (let i = 2; i <= 24; i++) {
  let option = document.createElement("option");
  option.value = i;
  option.textContent = i;
  inputQuantilyMine.appendChild(option);
}

// Cria as células do tabuleiro
for (let i = 0; i < totalCells; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  gameBoard.appendChild(cell);
}

const cells = [...document.querySelectorAll(".cell")]; // Transforma NodeList em array

// Função para atualizar o multiplicador com base nos acertos
const multiplique = (bomb, click, valueMoney) => {
  // Encontra o objeto correspondente no array multiplicadoresMines
  const objMultiplicador = multiplicadoresMines.find(
    (item) => item.minas === bomb
  );

  if (!objMultiplicador) {
    console.error("Nenhum multiplicador encontrado para esse número de minas.");
    return;
  }

  // Pega o multiplicador correspondente ao número de cliques
  const valores = objMultiplicador.valores;
  const multi = valores[click] || valores[valores.length - 1]; // Evita erro e usa o último valor se o click for maior
  const nextMulti = valores[click + 1] || valores[valores.length - 1];

  // Atualiza na interface

  multiplicatorActual.value = multi.toFixed(2);
  nextMultiplicator.value = nextMulti.toFixed(2);
  cash.textContent = (
    valueMoney * parseFloat(multiplicatorActual.value || 1)
  ).toFixed(2);
};

// Evento de clique nas células
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.classList.contains("revealed")) return; // Bloqueia clique se o jogo não começou
    click++;
    cell.classList.add("revealed");

    if (bombPositions.has(index)) {
      // O usuário encontrou uma bomba
      cell.classList.add("bomb");
      bombAudio.play();
      songAudio.pause();
      gameActive = false;
      setTimeout(() => {
        again();
      }, 1000);
    } else if (diamondPositions.has(index)) {
      // O usuário encontrou um diamante
      cell.classList.add("diamond");
      new Audio("/assets/diamond.mp3").play();
      let bombNumbers = parseInt(inputQuantilyMine.value);
      multiplique(bombNumbers, click, inputQuantilyMoney.value);
    }
  });
});

// Formata dinheiro
const formatMoney = () => {
  return parseFloat(money.textContent.replace(",", ".")).toFixed(2);
};

// Botão de dobrar valor
btnDoubleValue.addEventListener("click", () => {
  const moneyFormated = formatMoney();
  let currentValue = parseFloat(inputQuantilyMoney.value) || 0;
  let newValue = currentValue * 2;

  if (newValue > moneyFormated) {
    inputQuantilyMoney.placeholder = "Não ultrapasse seu limite";
    inputQuantilyMoney.value = moneyFormated; // Define o máximo possível
  } else {
    inputQuantilyMoney.value = newValue.toFixed(2); // Mantém formato de duas casas
  }
});

// Botão de dividir valor por 2
btnHalfValue.addEventListener("click", () => {
  let currentValue = parseFloat(inputQuantilyMoney.value) || 0;
  let newValue = currentValue / 2;

  inputQuantilyMoney.value = (newValue < 1 ? 1 : newValue).toFixed(2);
  inputQuantilyMoney.blur();
});

// Impede valores acima do saldo
inputQuantilyMoney.addEventListener("input", (e) => {
  const value = e.target.value;
  e.target.value = value.match(/^\d+(\.\d{0,2})?/)?.[0] || "";
  const moneyFormated = formatMoney();
  console.log(moneyFormated);
  if (parseFloat(e.target.value) > moneyFormated) {
    e.target.value = moneyFormated;
    console.log(e.target.value);
  }
});

// Sorteia as minas aleatoriamente
const randomMines = (mines) => {
  bombPositions.clear(); // Resetar as bombas antes de sortear
  while (bombPositions.size < mines) {
    const randomIndex = Math.floor(Math.random() * cells.length);
    bombPositions.add(randomIndex);
  }
};

// Sorteia os diamantes nas células que não são bombas
const randomDiamonds = () => {
  diamondPositions.clear();
  cells.forEach((_, index) => {
    if (!bombPositions.has(index)) {
      diamondPositions.add(index);
    }
  });
};

// Inicia o jogo
btnStart.addEventListener("click", () => {
  const valueMoney = parseFloat(inputQuantilyMoney.value);
  const bombNumbers = parseInt(inputQuantilyMine.value);

  const currentBalance = parseFloat(money.textContent);

  if (valueMoney > currentBalance || currentBalance <= 0) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Descobrir o próximo horário múltiplo de 6 (0h, 6h, 12h ou 18h)
    let nextBonusHour = Math.ceil(currentHour / 6) * 6;

    // Se já passou da hora exata, ir para o próximo ciclo
    if (nextBonusHour <= currentHour) {
      nextBonusHour += 6;
    }

    // Se passar de 24h, volta para 0h
    if (nextBonusHour >= 24) {
      nextBonusHour = 0;
    }

    // Calcular horas e minutos restantes
    let hoursLeft = (nextBonusHour - currentHour + 24) % 24;
    let minutesLeft = 60 - currentMinute;
    if (minutesLeft === 60) {
      minutesLeft = 0;
    }

    alert(
      `Saldo insuficiente para iniciar o jogo! Próximo bônus de R$5 em ${hoursLeft}h e ${minutesLeft}min.`
    );

    return;
  }

  mines.value = bombNumbers;
  dimas.value = 25 - bombNumbers;
  gameActive = true;

  // Apenas subtrai o valor da aposta do saldo atual
  money.textContent = (currentBalance - valueMoney).toFixed(2);
  saveMoneyToLocalStorage();

  // Reseta tabuleiro
  cells.forEach((cell) => {
    cell.classList.remove("bomb", "diamond", "revealed");
  });

  click = 0;

  volume.style.display = "flex";
  songAudio.play();

  multiplique(bombNumbers, click, valueMoney);

  randomMines(bombNumbers);
  randomDiamonds();

  inputQuantilyMoney.style.pointerEvents = "none";
  btnStart.style.display = "none";
  btnCashOut.style.display = "block";
  divQuantilyMines.style.display = "none";
  multiplicatorActual.textContent = "Multiplicador: 1x";
  btnStart.disabled = true;
  btnStart.style.cursor = "not-allowed";
  inputsMultiplicator.style.display = "block";
  dimasMines.style.display = "flex";
});

btnCashOut.addEventListener("click", () => {
  money.textContent = (
    parseFloat(cash.textContent) + parseFloat(money.textContent)
  ).toFixed(2);

  saveMoneyToLocalStorage();

  gameActive = false;
  songAudio.pause();
  volume.style.display = "none"; // Esconde ícone de mutado

  cells.forEach((cell) => {
    cell.classList.remove("bomb", "diamond", "revealed");
  });

  click = 0;

  inputQuantilyMoney.style.pointerEvents = "auto";
  btnStart.style.display = "block";
  btnCashOut.style.display = "none";
  divQuantilyMines.style.display = "flex";
  btnStart.disabled = false;
  btnStart.style.cursor = "pointer";
  inputsMultiplicator.style.display = "none";
  dimasMines.style.display = "none";
});

const again = () => {
  gameOver.style.display = "flex";
  gameOver.classList.add("show");
};

volume.addEventListener("click", () => {
  if (songAudio.paused) {
    songAudio.play();
    ative.style.display = "flex"; // Mostra ícone de ativar
    mute.style.display = "none"; // Esconde ícone de mutado
  } else {
    songAudio.pause();

    ative.style.display = "none"; // Esconde ícone de ativar
    mute.style.display = "flex"; // Mostra ícone de mutado
  }
});

btnAgain.addEventListener("click", () => {
  location.reload();
});
