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
                sudokuTab[i][j] = j+1
            }
        }
        console.log(sudokuTab[i])
    }
}


function gerarSudokuTodo() {
    let numeros = Array.from({ length: 10 }, (_, i) => i);
    for (let i = 1; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            console.log('vai ter')
        }
    }
}

function verificarPosicao(y, x) {
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

    let numeroNoSudoku = sudokuTab[y][x]

    let setorSudoku = structuredClone(sudokuTab[y])
    setorSudoku.splice(x, 1)
    console.log(`Tem repetido na: \n Coluna?: ${coluna.includes(numeroNoSudoku)} \n Linha?: ${linha.includes(numeroNoSudoku)} \n Setor?: ${setorSudoku.includes(numeroNoSudoku)}`)
    return !(coluna.includes(numeroNoSudoku) || linha.includes(numeroNoSudoku) || setorSudoku.includes(numeroNoSudoku))
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

gerarSudokuInicial()
gerarSudokuTodo()
mostrarSudoku()
console.log(verificarPosicao(0, 3))

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// TODO: adicionar a função para gerar o sudoku usando a função verificarPosicao (linha 25)