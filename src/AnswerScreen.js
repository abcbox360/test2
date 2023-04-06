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
overflow-y:scroll;
scrollbar-color:blue;
&::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
&::-webkit-scrollbar-thumb {
      background: rgba(256, 256, 256, 0.6);
    }
&::-webkit-scrollbar-thumb:hover {
    background: rgb(256, 256, 256);
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
& *:nth-child(3) {
    order: -1
}
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
`

const Title = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
color: rgba(256, 256, 256, 0.6);
font-size: 4cqw;
`
function AnswerScreen(props) {
const { active, setStage, setActive, game } = props
const ref = useRef(); 
const { events } = useDraggable(ref);

  return (
    <Container $active={active}>
        <Title>顯示答案</Title>
        <AnswerContainer className="flex max-w-xl space-x-3 overflow-x-scroll scrollbar-hide"
      {...events}
      ref={ref}>
            {game === 1 && text.game1.map((ts,i)=>
            <Answer key={i}>
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
        </AnswerContainer>
        <ReturnButton onClick={() => { setStage(2); setActive(2) }}>返回</ReturnButton>
    </Container>
  );
}

export default AnswerScreen;
