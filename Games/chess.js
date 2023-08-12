const board = [
    // 0 represents an empty square, other values represent pieces
    [5, 4, 3, 2, 6, 3, 4, 5], // 8th row (black pieces)
    [1, 1, 1, 1, 1, 1, 1, 1], // 7th row (black pawns)
    [0, 0, 0, 0, 0, 0, 0, 0], // 6th row (empty)
    [0, 0, 0, 0, 0, 0, 0, 0], // 5th row (empty)
    [0, 0, 0, 0, 0, 0, 0, 0], // 4th row (empty)
    [0, 0, 0, 0, 0, 0, 0, 0], // 3rd row (empty)
    [7, 7, 7, 7, 7, 7, 7, 7], // 2nd row (white pawns)
    [11, 10, 9, 8, 12, 9, 10, 11], // 1st row (white pieces)
];

let selectedPiece = null;
const chessboard = document.getElementById('chessboard');
renderBoard();

function renderBoard() {
    const table = document.createElement('table');
    for (let row = 0; row < 8; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 8; col++) {
            const td = document.createElement('td');
            if ((row + col) % 2 === 0) {
                td.classList.add('white');
            } else {
                td.classList.add('black');
            }

            if (board[row][col] !== 0) {
                td.innerHTML = getPieceSymbol(board[row][col]);
                td.addEventListener('click', () => selectSquare(row, col));
            }

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    chessboard.innerHTML = '';
    chessboard.appendChild(table);
}

function getPieceSymbol(piece) {
    const symbols = ['&#9817;', '&#9816;', '&#9815;', '&#9814;', '&#9813;', '&#9812;',
        '&#9823;', '&#9822;', '&#9821;', '&#9820;', '&#9819;', '&#9818;'];
    return symbols[Math.abs(piece) - 1];
}

function selectSquare(row, col) {
    if (selectedPiece === null) {
        // Selecting a piece
        const piece = board[row][col];
        if (piece !== 0) {
            selectedPiece = { row, col };
            highlightValidMoves(row, col, piece);
        }
    } else {
        // Attempting to move the selected piece
        const { row: fromRow, col: fromCol } = selectedPiece;
        if (isValidMove(fromRow, fromCol, row, col)) {
            // Move the piece
            board[row][col] = board[fromRow][fromCol];
            board[fromRow][fromCol] = 0;
            selectedPiece = null;
            renderBoard();
        }
    }
}

function highlightValidMoves(fromRow, fromCol, piece) {
    // Here, you'd implement the logic to determine valid moves for the selected piece
    // For simplicity, let's just highlight the available adjacent squares (not considering piece rules)
    const possibleMoves = [
        { row: fromRow - 1, col: fromCol },
        { row: fromRow + 1, col: fromCol },
        { row: fromRow, col: fromCol - 1 },
        { row: fromRow, col: fromCol + 1 },
    ];

    for (const move of possibleMoves) {
        const { row, col } = move;
        if (isValidSquare(row, col)) {
            const td = document.querySelector(`#chessboard tr:nth-child(${row + 1}) td:nth-child(${col + 1})`);
            td.classList.add('valid-move');
            td.addEventListener('click', () => selectSquare(row, col));
        }
    }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
    // Here, you'd implement the full move validation logic
    // For this basic example, we'll allow any move to an empty square
    return;
}