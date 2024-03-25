import { COLORS, SHAPES } from "./constant"

export default class Piece {
    private color
    public shape: number[][]
    public x: number = 0
    public y: number = 0

    private ctx: CanvasRenderingContext2D
    constructor(ctx: CanvasRenderingContext2D | undefined) {
        this.ctx = ctx as CanvasRenderingContext2D;

        const typeId = this.randomizeTetrominoType(COLORS.length);
        this.shape = SHAPES[typeId];
        this.color = COLORS[typeId];

        console.log(typeId)

        // Starting position.  
        this.x = 3;
        this.y = 0;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
                }
            });
        });
    }

    move(p: { x: number, y: number, shape: number[][] }) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }

    randomizeTetrominoType(noOfTypes: number) {
        return Math.floor(Math.random() * noOfTypes);
    }
}