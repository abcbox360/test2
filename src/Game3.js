import styled, { keyframes } from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import StartScreen from './StartScreen.js'
import ListScreen from './ListScreen.js'
import CompleteScreen from './CompleteScreen'
import AnswerScreen from './AnswerScreen'
import text from './text/text.json';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsList, BsFillCaretLeftFill, BsFillCaretRightFill, BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { TiTick, TiTimes } from "react-icons/ti";

const Container = styled.div`
width: 100%;
max-width: 800px;
aspect-ratio: 800 / 530;
position: relative;
margin: 0 auto;
font-weight: 600;
user-select: none;
background: white;
${prop => prop.$full && `
max-width: none;
height: 100%;
`}
`
const FullScreenButton = styled.div`
position: absolute;
bottom: 0;
right: 0;
margin: 5px;
width: 5%;
max-width: 50px;
aspect-ratio: 1;
border-radius: 1cqw;
font-size: 5cqw;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
z-index: 2;
color: rgba(0, 0, 0, 0.6);
& * {
    margin: auto;
}
&:hover {
    color: rgb(0, 0, 0);
}
@media screen and (min-width: 800px) {
    font-size: 40px;
}
`
const ListButton = styled.div`
position: absolute;
bottom: 0;
margin: 5px;
width: 5%;
max-width: 50px;
aspect-ratio: 1;
border-radius: 1cqw;
border: 2px solid rgba(0, 0, 0, 0.6);
font-size: 5cqw;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
color: rgba(0, 0, 0, 0.6);
transition: opacity .5s;
& * {
    margin: auto;
}
&:hover {
    color: rgb(0, 0, 0);
    border: 2px solid rgb(0, 0, 0);
}
@media screen and (min-width: 800px) {
    font-size: 40px;
    border-radius: 8px;
}
${prop => prop.$active && `
opacity: 0;
`}
`
const TopLeft = styled.div`
left: 10px;
justify-content: start;
position: absolute;
top: 10px;
width: 10%;
font-size: 4cqw;
color: rgba(0, 0, 0, 0.6);
display: flex;
align-items: center;
transition: opacity .5s;
@media screen and (min-width: 800px) {
    font-size: 32px;
}
${prop => prop.$completetrans && `
opacity: 0;
`}
`
const TopRight = styled.div`
position: absolute;
right: 0;
top: 10px;
width: 10%;
font-size: 4cqw;
color: rgba(0, 0, 0, 0.6);
display: flex;
justify-content: center;
align-items: center;
transition: opacity .5s;
@media screen and (min-width: 800px) {
    font-size: 32px;
}
${prop => prop.$completetrans && `
opacity: 0;
`}
`
const TopButton = styled.div`
aspect-ratio: 1;
border-radius: 1cqw;
font-size: 6cqw;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
color: rgba(0, 0, 0, 0.6);
&:hover {
    color: rgb(0, 0, 0);
}
${prop => prop.$selectLock && `
pointer-events:none;
`}
`
const TopButtons = styled.div`
margin: auto;
width: 60%;
aspect-ratio: 6;
display: flex;
justify-content: center;
align-items: center;
text-align: center;
transition: opacity .5s;
${prop => prop.$completetrans && `
opacity: 0;
`}
`
const PageText = styled.div`
width: 50%;
font-size: 4cqw;
font-weight: 600;
color: rgba(0, 0, 0, 0.6);
@media screen and (min-width: 800px) {
    font-size: 32px;
}
`
const QuestionContainer = styled.div`
width: 100%;
height: 80%;
position: absolute;
margin: 0 auto;
font-weight: 600;
font-size: 4cqw;
opacity: 1;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
transition: opacity .5s;
${prop => prop.$active && `
opacity: 0;
`}
`
const Question = styled.div`
margin: 20px auto 5% auto;
`
const select = keyframes`
0% {transform:scale(1)}
50% {transform:scale(0.9)}
100% {transform:scale(1)}
`
const anima = keyframes`
0% {transform:scale(1.02)}
50% {transform:scale(0.98)}
100% {transform:scale(1.02)}
`
const Answer = styled.div`
position: relative;
background: #FF5151;
color: white;
width: 30%;
height: 20%;
display: flex;
justify-content: center;
align-items: center;
border-radius: 5px;
margin: 5px;
cursor: pointer;
&:nth-of-type(2) {
    background: #2894FF;
}
&:last-of-type {
    background: #FF8040;
}
&:hover {
    filter: brightness(1.3);
}
animation: ${prop => prop.$anima && anima} 1s infinite, ${prop => prop.$active && select} 1s;
`
const ButtonNum = styled.div`
position: absolute;
left: 5px;
color: rgba(256, 256, 256, 0.6);
`
const AnswerSelected = styled.div`
position: absolute;
right: 5px;
color: rgba(256, 256, 256, 0.6);
`
function Game3() {
    const [stage, setStage] = useState(0)
    const [active, setActive] = useState(0)
    const [time, setTime] = useState(0)
    const [cardNum, setCardNum] = useState(0)
    const [answer, setAnswer] = useState([])
    const [answerAnima, setAnswerAnima] = useState([])
    const [answerCount, setAnswerCount] = useState(0)
    const [lock, setLock] = useState([])
    const complete = useRef(0)
    const buttonNumber = ['A','B','C']
    const fullScreen = useFullScreenHandle()
    const init = () => {
        let A = []
        for (let i in text.game3) {
            A.push([])
        }
        complete.current = 0
        setAnswer(A)
        setAnswerAnima(A)
        setLock(A)
        setAnswerCount(0)
        setCardNum(0)
    }
    useEffect(() => {
        init()
    }, [])
    const handleComplete = () => {
        setActive(2)
        setTimeout(() => setStage(2), 1000)
    }

    const reStart = () => {
        setTime(0)
        init()
    }
    const handleListOpen = () => {
        setActive(1.5)
        setTimeout(() => setStage(1.5), 0)
    }
    useEffect(() => {
        if (stage === 1) {
            let timer = setInterval(() => {
                setTime(time + 1);
            }, 1000);
            return function () {
                clearInterval(timer);
            };
        }
    }, [time, stage]);
    const handleCardChange = (i) => {
        if (i) {
            if (cardNum < text.game3.length - 1) {
                setCardNum(cardNum + 1)
            }
        } else {
            if (cardNum > 0) {
                setCardNum(cardNum - 1)
            }
        }
    }
    const handleSelectAnswer = (e) => {
        if(lock[cardNum] === 1) {
            return
        }
        if(complete.current === 4) {
            setTimeout(()=>setActive(2),1000)
            setTimeout(()=>setStage(2),2000)
        }
        console.log(complete)
        const id = Number(e.target.id)
        let ans = [...answer]
        let lk = [...lock]
        lk[cardNum] = 1
        setLock(lk)
        ans[cardNum] = id
        setAnswer(ans)
        setTimeout(()=>setAnswerAnima(ans),1000)
        complete.current ++
        if (text.game3[cardNum][0][1] === text.game3[cardNum][1][id]) {
            setAnswerCount(answerCount + 1)
        }
    }
    return (
        <FullScreen handle={fullScreen}>
            <Container $full={fullScreen.active}>
                <TopRight $completetrans={active !== 1}><TiTick />{answerCount}</TopRight>
                <StartScreen game={3} reStart={reStart} stage={stage === 0} setStage={setStage} active={active} setActive={setActive} />
                <ListScreen handleComplete={handleComplete} stage={stage === 1.5} setStage={setStage} active={active} setActive={setActive} />
                <CompleteScreen answer={answerCount} game={3} time={time} stage={stage === 2} setStage={setStage} active={active} setActive={setActive} />
                <AnswerScreen game={3} active={stage === 3} setStage={setStage} setActive={setActive}/>
                <ListButton $active={stage !== 1 || active !== 1} onClick={handleListOpen}><BsList /></ListButton>
                <FullScreenButton onClick={() => { fullScreen.active ? fullScreen.exit() : fullScreen.enter() }}>
                    {fullScreen.active ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
                </FullScreenButton>
                <TopLeft $completetrans={active !== 1}>{Math.floor(time / 60)}:{Math.floor(time % 60) > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)}</TopLeft>
                <TopButtons $completetrans={active !== 1}>
                    <TopButton onClick={() => handleCardChange(0)} ><BsFillCaretLeftFill /></TopButton>
                    <PageText>第{cardNum + 1}頁，共{text.game3.length}頁</PageText>
                    <TopButton onClick={() => handleCardChange(1)} ><BsFillCaretRightFill /></TopButton>
                </TopButtons>
                <QuestionContainer $active={active !== 1 && active !== 1.5}>
                    <Question>[{text.game3[cardNum][0][0]}]的華語是什麼?</Question>
                    {text.game3[cardNum][1].map((t,i)=>
                        <Answer key={t} $active={answer[cardNum] === i} $anima={answerAnima[cardNum] === i} id={i} onClick={handleSelectAnswer}>
                            <ButtonNum>{buttonNumber[i]}</ButtonNum>
                            {t}
                            {(answer[cardNum] !== undefined && answer[cardNum].length !== 0) ?
                                (answer[cardNum] === i || text.game3[cardNum][0][1] === t)?
                                    text.game3[cardNum][0][1] === t ? 
                                        <AnswerSelected><TiTick /></AnswerSelected>: 
                                        <AnswerSelected><TiTimes /></AnswerSelected>:
                                    '':
                                ''
                            }
                        </Answer>
                    )}
                </QuestionContainer>
            </Container>
        </FullScreen>
    );
}

export default Game3;
