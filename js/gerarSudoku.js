// let sudokuTab = [[[[1]*3]*3]*9]
const sudokuTab = Array.from({ length: 9 }, () => new Array(9).fill(0))
const divPrincipal = document.getElementById('div_principal')
const sessoesSudoku = [...divPrincipal.children]


function gerarSudokuInicial() {
    
    for (let i = 0; i < 9; i++) {
        let numeros = Array.from({ length: 9 }, (_, i) => i + 1);
        numeros = shuffle(numeros)
        for (let j = 0; j < 9; j++) {
            if (i === 0) {
                const numeroInteiro = numeros[j]
                sudokuTab[i][j] = numeroInteiro
            } else {
                sudokuTab[i][j] = 0
            }
        }
    }
}


function gerarSudokuTodo() {
    gerarSudokuInicial();
    preencherComBacktracking(1, 0);
}

function preencherComBacktracking(i, j) {
    if (i === 9) return true;

    const proximoJ = (j + 1) % 9;
    const proximoI = proximoJ === 0 ? i + 1 : i;

    for (let numero = 1; numero <= 9; numero++) {
        if (verificarPosicao(i, j, numero)) {
            sudokuTab[i][j] = numero;

            if (preencherComBacktracking(proximoI, proximoJ)) {
                return true;
            }

            sudokuTab[i][j] = 0;
        }
    }

    return false;
}

function verificarPosicao(y, x, numeroDesejado) {
    const xRelativo = x % 3;
    const yRelativo = y % 3;
    const setorPos = [Math.floor(x / 3), Math.floor(y / 3)]

    let coluna = sudokuTab.map((linha, indexL) => linha.filter((numero, index) => index % 3 === xRelativo && indexL % 3 === yRelativo))
    coluna = coluna.filter(item => {return item.length > 0})
    coluna.splice(setorPos[1], 1)
    coluna = coluna.flat(Infinity)

    let linha = sudokuTab.map((linha, indexL) => linha.filter((numero, index) => JSON.stringify([Math.floor(index / 3), Math.floor(indexL / 3)]) === JSON.stringify(setorPos)))
    linha = linha.filter(item => {return item.length > 0})
    linha.splice(yRelativo, 1)
    linha = linha.flat(Infinity)

    // let numeroNoSudoku = sudokuTab[y][x]

    let setorSudoku = structuredClone(sudokuTab[y])
    setorSudoku.splice(x, 1)
    // console.log(`Tem repetido na: \n Coluna?: ${coluna.includes(numeroDesejado)} \n Linha?: ${linha.includes(numeroDesejado)} \n Setor?: ${setorSudoku.includes(numeroDesejado)}`)
    console.log(!(coluna.includes(numeroDesejado) || linha.includes(numeroDesejado) || setorSudoku.includes(numeroDesejado)))
    return !(coluna.includes(numeroDesejado) || linha.includes(numeroDesejado) || setorSudoku.includes(numeroDesejado))
}

function mostrarSudoku() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input')
            input.type = 'number'
            input.value = sudokuTab[i][j]
            input.classList.add('inputSudoku')
            sessoesSudoku[i].append(input)
        }
    }
}

// gerarSudokuInicial()
gerarSudokuTodo()
mostrarSudoku()

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// TODO: adicionar a função para gerar o sudoku incompleto OU deixar o sudoku vazio e checar cada ação do usuário com a verificarPosição