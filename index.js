Array.prototype.unique = function () {
    return this.filter(function (a, b, c) { return c.indexOf(a, b + 1) < 0 })
};

let difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

const initialGame = [
    [
        [
            [5, null, 7],
            [3, 9, 4],
            [null, null, null]
        ],
        [
            [null, null, 1],
            [7, null, null],
            [null, null, 5]
        ],
        [
            [null, 8, null],
            [null, null, null],
            [null, 9, null]
        ]
    ],
    [
        [
            [null, null, 2],
            [null, null, null],
            [null, null, 5]
        ],
        [
            [5, null, null],
            [null, 2, null],
            [6, null, null]
        ],
        [
            [3, null, 8],
            [null, null, 6],
            [9, null, 1]
        ]
    ],
    [
        [
            [null, null, 3],
            [null, 6, null],
            [8, null, 9]
        ],
        [
            [null, null, 6],
            [4, null, null],
            [null, null, 3]
        ],
        [
            [null, 7, null],
            [null, null, null],
            [null, 1, null]
        ]
    ]
]

const boardWithPossibleNumbers = JSON.parse(JSON.stringify(initialGame));

function numbersThatCanBeHere(boardRowIndex, quadrantIndex, quadrantRowIndex, cellIndex) {

    const possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const numbersThatCannotBeHere = [];

    const boardRowToSearch = initialGame[boardRowIndex];

    // Busco en filas, como ya sé en que fila del tablero se encuentra entonces busco en todos los cuadrantes de esa fila, lo mismo con las filas del cuadrante
    boardRowToSearch.forEach(quadrant => {

        quadrant[quadrantRowIndex].forEach(cell => {

            if (cell != null)
                numbersThatCannotBeHere.push(cell)

        });
        
    });

    // Busco en columnas, en este caso ya sé cuál es el index del cuadrante, por lo que en cada fila del cuadrante selecciono ese cuadrante y busco, lo mismo con la celda, en la fila del cuadrante busco en el index de la celda (que sería la columna)

    initialGame.forEach(boardRow => {
        
        boardRow[quadrantIndex].forEach(quadrantRow => {

            const cell = quadrantRow[cellIndex];

            if (cell != null)
                numbersThatCannotBeHere.push(cell)

        });

    })

    // Busco en el cuadrante, aquí ya sé cuál es el idnex del cuadrante y en qué fila del tablero se encuentra, así que simplemente lo recorro bidimensionalmente como cualquier matriz
    boardRowToSearch[quadrantIndex].forEach(quadrantRow => {

        quadrantRow.forEach(cell => {

            if (cell != null)
                numbersThatCannotBeHere.push(cell)

        })

    })

    return difference(possibleNumbers, numbersThatCannotBeHere.unique());
    
}

for (const boardRowIndex in initialGame) {

    const boardRow = initialGame[boardRowIndex];

    for (const quadrantIndex in boardRow) {

        const quadrant = boardRow[quadrantIndex];

        for (const quadrantRowIndex in quadrant) {

            const quadrantRow = quadrant[quadrantRowIndex];
            
            for (const cellIndex in quadrantRow) {

                let cell = quadrantRow[cellIndex];
                
                if (cell === null) {
                    boardWithPossibleNumbers[boardRowIndex][quadrantIndex][quadrantRowIndex][cellIndex] = numbersThatCanBeHere(boardRowIndex, quadrantIndex, quadrantRowIndex, cellIndex)
                }

            }

        }
        
    }
    
}

// console.log(boardWithPossibleNumbers);
// debugger

    function removeNumberFromCells(boardRowIndex, quadrantIndex, quadrantRowIndex, cellIndex, numberToRemove) {

        // debugger
        
        const boardRowToSearch = boardWithPossibleNumbers[boardRowIndex];
    
        // Busco en filas, como ya sé en que fila del tablero se encuentra entonces busco en todos los cuadrantes de esa fila, lo mismo con las filas del cuadrante
        for (const key in boardRowToSearch) {
    
            const quadrant = boardRowToSearch[key];
    
            for (const key2 in quadrant[quadrantRowIndex]) {
    
                const cell = quadrant[quadrantRowIndex][key2];
    
                if (typeof cell == "object"){

                    const indexOf = cell.indexOf(numberToRemove);

                    if (indexOf != -1)
                        boardWithPossibleNumbers[boardRowIndex][key][quadrantRowIndex][key2].splice(indexOf, 1)

                }
                    
    
            }
    
        }
    
        // Busco en columnas, en este caso ya sé cuál es el index del cuadrante, por lo que en cada fila del cuadrante selecciono ese cuadrante y busco, lo mismo con la celda, en la fila del cuadrante busco en el index de la celda (que sería la columna)
    
        for (const key in boardWithPossibleNumbers) {
    
            const boardRow = boardWithPossibleNumbers[key];
    
            for (const key2 in boardRow[quadrantIndex]) {
    
                const quadrantRow = boardRow[quadrantIndex][key2];
    
                const cell = quadrantRow[cellIndex];
    
                if (typeof cell == "object") {

                    const indexOf = cell.indexOf(numberToRemove);

                    if (indexOf != -1)
                        boardWithPossibleNumbers[key][quadrantIndex][key2][cellIndex].splice(indexOf, 1)
        
                }

            }
    
        }
    
        // Busco en el cuadrante, aquí ya sé cuál es el idnex del cuadrante y en qué fila del tablero se encuentra, así que simplemente lo recorro bidimensionalmente como cualquier matriz
    
        for (const key in boardRowToSearch[quadrantIndex]) {
    
            const quadrantRow = boardRowToSearch[quadrantIndex][key];
    
            for (const key2 in quadrantRow) {
    
                const cell = quadrantRow[key2];
    
                if (typeof cell == "object") {

                    const indexOf = cell.indexOf(numberToRemove);

                    if (indexOf != -1)

                        boardWithPossibleNumbers[boardRowIndex][quadrantIndex][key][key2].splice(indexOf, 1)
                }
    
            }
    
        }
    
    
    }
    
    // Ahora toca ir quitando numeros
    function searchSingleNumbers() {

        
        
        for (const boardRowIndex in boardWithPossibleNumbers) {
    
            const boardRow = boardWithPossibleNumbers[boardRowIndex];
        
            for (const quadrantIndex in boardRow) {
        
                const quadrant = boardRow[quadrantIndex];
        
                for (const quadrantRowIndex in quadrant) {
        
                    const quadrantRow = quadrant[quadrantRowIndex];
                    
                    for (const cellIndex in quadrantRow) {
        
                        let cell = quadrantRow[cellIndex];
                        
                        if (!isNaN(cell) && cell.length == 1) {
                            boardWithPossibleNumbers[boardRowIndex][quadrantIndex][quadrantRowIndex][cellIndex] = cell[0];

                            removeNumberFromCells(boardRowIndex, quadrantIndex, quadrantRowIndex, cellIndex, cell[0]);

                            //console.log(boardWithPossibleNumbers);
                            // debugger

                            searchSingleNumbers()
                            return true;
    
                        }
        
                    }
        
                }
                
            }
            
        }
    
        return false;
    
    }
    
    searchSingleNumbers();
    
    console.log(boardWithPossibleNumbers);







    /*

    I know, this is smell code, but it works. I programed this code fast to get a solution. This only work with easy and logic Sudokus. To solve hard and non-logic sudokus we need to make test with the possible numbers and check the solutions. If the test ends with some empty quadrant it means that that number cannot be there, so there must be the other possibility number. Then that number that cannot be there must be moved to another cell of the quadrant. It's use to be easier to test with quadrants with only two posibilities. That's weird, I know.
     
    */