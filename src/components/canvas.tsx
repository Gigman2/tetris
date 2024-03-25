import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'
import { BLOCK_SIZE, COLS, ROWS } from '../core/constant';

const Canvas = (
  {canvasRef, setContext}: 
  {
    canvasRef:RefObject<HTMLCanvasElement>, 
    setContext: Dispatch<SetStateAction<CanvasRenderingContext2D | undefined>>
  }) => {
  useEffect(() => {
      const ctx = canvasRef.current?.getContext('2d');

      if(ctx){
        // Calculate size of canvas from constants.
        ctx.canvas.width = COLS * BLOCK_SIZE;
        ctx.canvas.height = ROWS * BLOCK_SIZE;

        // Scale blocks
        ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
        setContext(ctx)
      }
  },[canvasRef])

  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default Canvas