import styled  from 'styled-components'
import { useState } from 'react'
import Game1 from './Game1.js'
import Game2 from './Game2.js'
import Game3 from './Game3.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const Container = styled.div`
background: rgba(240,240,240);
z-index: 0;
position: relative;
`

function App() {
  const [game, setGame] = useState(3)

  return (
    <Container>
    <DndProvider backend={HTML5Backend}>
      {game === 1 && <Game1/>}
      {game === 2 && <Game2/>}
      {game === 3 && <Game3/>}
      <button onClick={()=>setGame(1)}>Game1</button>
      <button onClick={()=>setGame(2)}>Game2</button>
      <button onClick={()=>setGame(3)}>Game3</button>
      </DndProvider>
    </Container>
  );
}

export default App;
