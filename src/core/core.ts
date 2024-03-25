import { IShape } from "../components/board";
import Board from "./board.class";
import { KEY } from "./constant";
import { boardMoves } from "./controls";
import Piece from "./piece.class";


export function draw(board?: Board, context?: CanvasRenderingContext2D) {
    const brd = board
    if (context) {
        const { width, height } = context.canvas;
        context.clearRect(0, 0, width, height);

        brd && brd.draw();
        brd && brd.piece.draw();
    }
}


export function drop(board: Board, context?: CanvasRenderingContext2D) {
    const moves = boardMoves(board)

    let p = moves[KEY.DOWN](board.piece as unknown as IShape);

    if (board.valid(p)) {
        board.piece.move(p);
    } else {
        board.freeze();
        board.clearLines();
        if (board.piece.y === 0) {
            // Game over
            return false;
        }
        board.piece = new Piece(board.ctx);
    }
    return true;
}

export function gameOver(board: Board, requestId: number) {
    cancelAnimationFrame(requestId);
    board.ctx.fillStyle = 'black';
    board.ctx.fillRect(1, 3, 8, 1.2);
    board.ctx.font = '1px Arial';
    board.ctx.fillStyle = 'red';
    board.ctx.fillText('GAME OVER', 1.8, 4);
}