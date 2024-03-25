import { IShape } from "../components/board";
import Board from "./board.class";
import { KEY } from "./constant";

export const boardMoves = (board: Board) => {
    return {
        [KEY.LEFT]: (p: IShape) => ({ ...p, x: p.x - 1 }),
        [KEY.RIGHT]: (p: IShape) => ({ ...p, x: p.x + 1 }),
        [KEY.DOWN]: (p: IShape) => ({ ...p, y: p.y + 1 }),
        [KEY.UP]: (p: IShape) => board && board.rotate(p),
        [KEY.SPACE]: (p: IShape) => ({ ...p, y: p.y + 1 })
    };
}

const handleKeyPress = (e: KeyboardEvent, board: Board) => {
    e.preventDefault();
    const moves = boardMoves(board)

    if (moves[e.keyCode] && board) {
        // Get new state of piece
        let p = moves[e.keyCode](board.piece as unknown as IShape);

        if (e.keyCode === KEY.SPACE) {
            while (board.valid(p)) {
                board.piece.move(p)
                p = moves[e.keyCode](board.piece as unknown as IShape);
            }
        }
        if (board.valid(p)) {
            board.piece.move(p);
        }
        return true
    }
    return false;
}

export default handleKeyPress