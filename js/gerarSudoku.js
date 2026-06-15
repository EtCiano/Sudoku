// let sudokuTab = [[[[1]*3]*3]*9]
const sudokuTab = Array.from({ length: 9 }, () => new Array(9).fill(0))
const divPrincipal = document.getElementById('div_principal')
const sessoesSudoku = [...divPrincipal.children]
let elementosSudoku = []


function gerarSudokuInicial() {
    
    for (let i = 0; i < 9; i++) {
        let numeros = Array.from({ length: 9 }, (_, i) => i + 1);
        numeros = shuffle(numeros)
        for (let j = 0; j < 9; j++) {
            if (i === 0) {
                const numeroInteiro = numeros[j]
                sudokuTab[i][j] = numeroInteiro
            } else {
                sudokuTab[i][j] = NaN
            }
        }
    }
}


function gerarSudokuTodo() {
    gerarSudokuInicial();
    preencherComBacktracking(1, 0);
    revelarParcialmente(3)
    mostrarSudoku()
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
    
    // console.log(linha)
    // console.log(coluna)
    // console.log(setorSudoku)
    // console.log(`Tem repetido na: \n Coluna?: ${coluna.includes(numeroDesejado)} \n Linha?: ${linha.includes(numeroDesejado)} \n Setor?: ${setorSudoku.includes(numeroDesejado)}`)
    console.log(!(coluna.includes(numeroDesejado) || linha.includes(numeroDesejado) || setorSudoku.includes(numeroDesejado)))
    return !(coluna.includes(numeroDesejado) || linha.includes(numeroDesejado) || setorSudoku.includes(numeroDesejado))
}

function revelarParcialmente(visivelPorSessao) {
    for (let blocoY = 0; blocoY < 3; blocoY++) {
        for (let blocoX = 0; blocoX < 3; blocoX++) {

            let posicoes = [];
            for (let dy = 0; dy < 3; dy++) {
                for (let dx = 0; dx < 3; dx++) {
                    posicoes.push([blocoY * 3 + dy, blocoX * 3 + dx]);
                }
            }

            posicoes = shuffle(posicoes);
            for (let k = visivelPorSessao; k < 9; k++) {
                const [i, j] = posicoes[k];
                sudokuTab[i][j] = NaN;
            }
        }
    }
    console.log(sudokuTab)
}

function mostrarSudoku() {
    for (let i = 0; i < 9; i++) {
        elementosSudoku.push([])
        for (let j = 0; j < 9; j++) {
            const input = document.createElement('input')
            input.type = 'number'
            input.value = sudokuTab[i][j]
            input.classList.add('inputSudoku')
            sessoesSudoku[i].append(input)
            elementosSudoku[i].push(input)
            
            input.addEventListener('change', function() {
                let valor = parseInt(input.value)
                if (!verificarPosicao(i, j, valor)) {
                    input.style.backgroundColor = 'red'
                } else {
                    input.style.backgroundColor = 'white'
                }
                sudokuTab[i][j] = valor
            })
        }
    }
    console.log(elementosSudoku)
}

gerarSudokuTodo()

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// TODO: adicionar a função para gerar o sudoku parcialmente completo