import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import Board from '../core/board.class';
import Canvas from './canvas';
import handleKeyPress from '../core/controls';
import { draw, drop, gameOver } from '../core/core';


export interface IShape {x: number, y: number, shape: number[][]}

const BoardComponent = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [context, setContext] = useState<CanvasRenderingContext2D>()
    const [boardClass, setBoardClass] = useState<Board>()
    const [isReady, setReady] = useState(false);
    const time = { start: 0, elapsed: 0, level: 1000 };
    let requestId: number | null = null;
    

    function play() {
        const board = new Board(context);
        setBoardClass(board)
    }


    function animate(now = 0) {
        // Update elapsed time.
        time.elapsed = now - time.start;

        // If elapsed time has passed time for current level
        if (time.elapsed > time.level) {
            // Restart counting from now
            time.start = now;
            
            if (!drop(boardClass as Board, context)) {
                gameOver(boardClass as Board, requestId as number);
                return;
            }
        }

        draw(boardClass, context);
        requestId = requestAnimationFrame(animate);
    }

    useEffect(() => {
        if(boardClass){
            if (requestId) {
                cancelAnimationFrame(requestId);
            }

            time.start = performance.now();
            animate();
        }
    }, [boardClass])

    useEffect(() => {
        if(context){
            setReady(true)
        }
    }, [context])


    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            const keyEvent = handleKeyPress(e, boardClass as Board)
            if(keyEvent) draw(boardClass, context)
        })

        return document.removeEventListener('keydown', () => null)
    },[boardClass])

    return (
        <Box rounded={12} w="70%" h={"90vh"} backgroundColor={"white"} padding={4}>
            <Grid templateColumns={"41% 60%"} rounded={12} h="100%" overflow={"hidden"} gap={2}>
                <GridItem bgColor={"blue.200"} h="100%" position={"relative"}>
                    {!isReady && <Flex justify={"center"} align={"center"} position={"absolute"} w="100%" h={32} bg={"blackAlpha.200"} paddingLeft={12}>
                        <Text fontFamily={"'Press Start 2P'"}>Loading ...</Text>
                    </Flex>}
                    <Canvas 
                        canvasRef={canvasRef}
                        setContext={setContext}
                    />
                </GridItem>
                <GridItem>
                    <Flex fontFamily={"'Press Start 2P'"} direction={"column"} justifyContent={"space-between"} height={"100%"}>
                        <Box>
                            <Text fontFamily={"Press Start 2P"} fontSize={48}>Tetris</Text>
                            <Box mt={6} fontSize={20}>
                                <Text>Score: <span id="score">0</span></Text>
                                <Text>Lines: <span id="lines">0</span></Text>
                                <Text>Level: <span id="level">0</span></Text>
                            </Box>
                        </Box>

                        <Box>
                            <Box 
                                as={Button} 
                                bg={"green.400"} 
                                rounded={0} px={10} py={7} 
                                _hover={{bgColor:"green.300"}}
                                onClick={() => play()}
                            >Play</Box>
                        </Box>
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
  )
}

export default BoardComponent
