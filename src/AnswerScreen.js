import styled  from 'styled-components'
import { useRef } from 'react'
import frontimage1 from './img/front1.webp'
import frontimage2 from './img/front2.webp'
import frontimage3 from './img/front3.webp'
import leaf1 from './img/leaf1.webp'
import leaf2 from './img/leaf2.webp'
import leaf3 from './img/leaf3.webp'
import text from './text/text.json';
import { useDraggable } from "react-use-draggable-scroll";
import { TiTick, TiTimes } from "react-icons/ti";
const leafImage = [leaf1, leaf2, leaf3]
const frontImage = [frontimage1,frontimage2,frontimage3]
const Container = styled.div`
width: 100%;
aspect-ratio: 800 / 530;
position: absolute;
z-index: 1;
margin: 0 auto;
user-select: none;
font-weight: 600;
height: 100%;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
${prop => !prop.$active && `
display: none;
`}
`
const AnswerContainer = styled.div`
width: 90%;
height: 70%;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
overflow-y: scroll;
&::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
&::-webkit-scrollbar-thumb {
      background: rgba(256, 256, 256, 0.6);
${prop=>prop.game===3 && `
background: rgba(0, 0, 0, 0.6);
`}
    }
&::-webkit-scrollbar-thumb:hover {
    background: rgb(256, 256, 256);
    ${prop=>prop.game===3 && `
    background: rgb(0, 0, 0);
    `}
  }
`

const Answer = styled.div`
width: 100%;
height: 40%;
margin: 10px;
display: flex;
justify-content: center;
align-items: center;
position: relative;
${prop=>prop.game===1&&`
& *:nth-child(3) {
    order: -1
}
`}
`
const TextContainer = styled.div`
position: relative;
height: 100%;
aspect-ratio: 1;
display: flex;
justify-content: center;
align-items: center;
`
const FontImage = styled.img`
position: absolute;
height: 100%;
width: 100%;
`
const Text = styled.div`
position: absolute;
height: 80%;
width: 80%;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
${prop=>prop.$color ==='white' && `
color: white;
`}
`
const ReturnButton = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 30%;
height: 10%;
color: rgba(256, 256, 256, 0.6);
border: 2px solid;
border-radius: 5px;
font-size: 4cqw;
cursor: pointer;
&:hover {
    background: rgba(256, 256, 256, 0.4);
}
${prop=>prop.game===3 && `
color: rgba(0, 0, 0, 0.6);
&:hover {
  background: rgba(0, 0, 0, 0.2);
}
`}
`

const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
color: rgba(256, 256, 256, 0.6);
font-size: 4cqw;
${prop=>prop.game===3 && `
color: rgba(0, 0, 0, 0.6);
`}
`
const Game3Container = styled.div`
width: 80%;
height: 100%;
border: 1px solid rgba(0, 0, 0, 0.2);
display: flex;
justify-content: space-around;
align-items: center;
text-align: center;
font-size: 2cqw;
`
const Game3QuestContainer = styled.div`
width: 45%;
`
const Game3AnswerContainer = styled.div`
position: relative;
width: 15%;
height: 60%;
background: gray;
color: white;
display: flex;
justify-content: center;
align-items: center;
border-radius: 5px;
${prop=>prop.$answer && `
background: #2894FF;
`}
`
const TiclContainer = styled.div`
position: absolute;
bottom: 0;
`
function AnswerScreen(props) {
const { active, setStage, setActive, game } = props
const ref = useRef(); 
const { events } = useDraggable(ref);

  return (
    <Container $active={active}>
        <Title game={game}>顯示答案</Title>
        <AnswerContainer game={game} className="flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide"
      {...events}
      ref={ref}>
            {game === 1 && text.game1.map((ts,i)=>
            <Answer key={i} game={1}>
                {ts.map((t,j)=>
                <TextContainer key={"t"+j}>
                    <FontImage src={frontImage[j]}/>
                    {j===2?
                        t===1?
                            <Text><div>{j+1}</div>O</Text>:
                            <Text><div>{j+1}</div>X</Text>:
                        <Text>{t}</Text>}
                </TextContainer>
                    )}
            </Answer>
                )
            }
            {game === 2 && text.game2.map((ts,i)=>
            <Answer key={i}>
              {ts.map((t,j)=>
                <TextContainer key={"t"+j}>
                    <FontImage src={leafImage[j]}/>
                    <Text $color='white'>{t}</Text>
                </TextContainer>
                    )}
            </Answer>
            )}
            {game === 3 && text.game3.map((ts,i)=>
            <Answer key={i}>
              <Game3Container>
                {i+1}.
                <Game3QuestContainer>[{ts[0][0]}]的華語是什麼?</Game3QuestContainer>
                {ts[1].map((t,j)=>
                  <Game3AnswerContainer key={t} $answer={ts[0][1]===t}>
                    {t}
                    {ts[0][1]===t && <TiclContainer><TiTick></TiTick></TiclContainer>}
                  </Game3AnswerContainer>
                )}
              </Game3Container>
            </Answer>
            )}
        </AnswerContainer>
        <ReturnButton game={game} onClick={() => { setStage(2); setActive(2) }}>返回</ReturnButton>
    </Container>
  );
}

export default AnswerScreen;
