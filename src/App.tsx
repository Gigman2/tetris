import GoogleFontLoader from 'react-google-font-loader'
import './App.css'
import { ChakraBaseProvider, Flex } from '@chakra-ui/react'
import Board from './components/board'
import { theme } from './assets/theme'

function App() {

  return (
    <ChakraBaseProvider theme={theme}>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Press Start 2P',
            weights: [400],
          },
          {
            font: 'Roboto',
            weights: [400],
          },
        ]}
      />
      <Flex justify={"center"} align={"center"} w="100%" h="100vh" bg={'#1a1920'} >
        <Board />
      </Flex>
    </ChakraBaseProvider>
  )
}

export default App
