import styled from 'styled-components'
import { useState, useEffect } from 'react'
import backgroundImage from './img/00.webp'
import cardImage1 from './img/card1.webp'
import cardImage2 from './img/card2.webp'
import tickImage from './img/tick.png'
import crossImage from './img/cross.png'
import { BsList, BsFillCaretLeftFill, BsFillCaretRightFill, BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import text from './text/text.json';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import StartScreen from './StartScreen.js'
import ListScreen from './ListScreen.js'
import { TiTick } from "react-icons/ti";
import CompleteScreen from './CompleteScreen'

const cardImage = [cardImage1, cardImage2]
const Container = styled.div`
width: 100%;
max-width: 800px;
aspect-ratio: 800 / 530;
position: relative;
margin: 0 auto;
font-weight: 600;
user-select: none;
${prop => prop.$full && `
max-width: none;
height: 100%;
`}
`
const BackgroundImage = styled.img`
width: 100%;
height: 100%;
position: absolute;
z-index: -1;
`
const CardsContainer = styled.div`
position: relative;
width: 50%;
height: 56.6%;
left: calc(50% - 25%);
top: 5%;
display: flex;
justify-content: center;
align-items: center;
z-index: 0;
transition: opacity .5s;
${prop => prop.$completetrans && `
opacity: 0;
`}
`
const SelectButtons = styled.div`
width: 20%;
aspect-ratio: 0.5;
right: 5%;
position: absolute;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const SelectButton = styled.div`
width: 80%;
aspect-ratio: 1;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
opacity: 0;
display: none;
${prop => prop.$active && `
display: block;
transition: opacity 1s;
`}
${prop => prop.$trans && `
opacity: 1;
`}
`
const SelectImage = styled.img`
width: 50%;
height: 50%;
`
const CardAnswer = styled.div`
width: 20%;
aspect-ratio: 1;
bottom: 0;
left: 40%;
position: absolute;
display: none;
justify-content: center;
${prop => prop.$active && `
display: flex;
transition: opacity .5s;
`}
`
const CardAnswerImage = styled(SelectImage)`
transform: scale(10);
opacity: 0;
transition: opacity .5s, transform .5s;
${prop => prop.$trans && `
    transform: scale(1);
    opacity: 1;
`}
`
const CardContainer1 = styled.div`
width: 50%;
height: 100%;
position: absolute;
cursor: pointer;
backface-visibility: hidden;
${prop => prop.$selectLock && `
transition: transform 1s;
pointer-events:none;
`}
${props => props.$rotate && `
transform: rotateY(180deg);
`}
`
const CardContainer2 = styled(CardContainer1)`
transform: rotateY(180deg);
${props => props.$rotate && `
transform: rotateY(0deg);
`}
`
const CardBackground = styled.img`
position: absolute;
width: 100%;
z-index: -1;
`
const Text = styled.div`
position: absolute;
width: 90%;
height: 80%;
top: 5%;
left: 5%;
background: white;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
font-size: 5cqw;
`

const ListButton = styled.div`
position: absolute;
bottom: 0;
margin: 5px;
width: 5%;
max-width: 50px;
aspect-ratio: 1;
border-radius: 1cqw;
border: 2px solid rgba(256, 256, 256, 0.6);
font-size: 5cqw;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
color: rgba(256, 256, 256, 0.6);
transition: opacity .5s;
& * {
    margin: auto;
}
&:hover {
    color: rgb(256, 256, 256);
    border: 2px solid rgb(256, 256, 256);
}
@media screen and (min-width: 800px) {
    font-size: 40px;
    border-radius: 8px;
}
${prop => prop.$active && `
opacity: 0;
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
color: rgba(256, 256, 256, 0.6);
@media screen and (min-width: 800px) {
    font-size: 32px;
}
`
const TopButton = styled.div`
aspect-ratio: 1;
border-radius: 1cqw;
font-size: 6cqw;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
color: rgba(256, 256, 256, 0.6);
&:hover {
    color: rgb(256, 256, 256);
}
${prop => prop.$selectLock && `
pointer-events:none;
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
color: rgba(256, 256, 256, 0.6);
& * {
    margin: auto;
}
&:hover {
    color: rgb(256, 256, 256);
}
@media screen and (min-width: 800px) {
    font-size: 40px;
}
`
const TopRight = styled.div`
position: absolute;
right: 0;
top: 10px;
width: 10%;
font-size: 4cqw;
color: rgba(256, 256, 256, 0.6);
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
const TopLeft = styled(TopRight)`
left: 10px;
right: auto;
justify-content: start;

`
const CompleteButton = styled.div`
position: absolute;
width: 20%;
height: 10%;
bottom: 5%;
border: 2px solid rgba(256, 256, 256, 0.6);
border-radius: 5px;
color: rgba(256, 256, 256, 0.6);
left: 40%;
display: flex;
justify-content: center;
align-items: center;
font-weight: 600;
font-size: 3cqw;
cursor: pointer;
transition: opacity .5s;
&:hover {
    background: rgba(256, 256, 256, 0.6);
    color: black;
}
${prop => prop.$completetrans && `
opacity: 0;
`}
@media screen and (min-width: 800px) {
    font-size: 24px;
}
`
function Game() {
    const [stage, setStage] = useState(0)
    const [cardRotate, setCardRotate] = useState(false)
    const [cardNum, setCardNum] = useState(0)
    const [active, setActive] = useState(0)
    const [selectLock, setSelectLock] = useState(false)
    const [answer, setAnswer] = useState([])
    const [answerTrans, setAnswerTrans] = useState(false)
    const [answerActive, setAnswerActive] = useState(false)
    const [cardTrans, setCardTrans] = useState([])
    const [complete, setComplete] = useState(false)
    const [time, setTime] = useState(0)
    const fullScreen = useFullScreenHandle()
    useEffect(() => {
        if (cardRotate === true) {
            setAnswerActive(true)
            setTimeout(() => setAnswerTrans(true), 20)
        }
    }, [cardRotate])
    const handleRotateCard = () => {
        setSelectLock(true)
        setCardRotate(!cardRotate)
        setTimeout(() => { setSelectLock(false) }, 1000)
    }
    const handleCardChange = (i) => {
        if (i) {
            if (cardNum < text.game1.length - 1) {
                setAnswerTrans(false)
                setAnswerActive(false)
                setCardNum(cardNum + 1)
                setCardRotate(false)
            }
        } else {
            if (cardNum > 0) {
                setAnswerTrans(false)
                setAnswerActive(false)
                setCardNum(cardNum - 1)
                setCardRotate(false)
            }
        }
    }
    const handleListOpen = () => {
        setActive(1.5)
        setTimeout(() => setStage(1.5), 0)
    }
    const reStart = () => {
        setCardRotate(false)
        setCardNum(0)
        setAnswer([])
        setAnswerActive(false)
        setAnswerTrans(false)
        setCardTrans([])
        setTime(0)
    }
    const handleSelectAnswer = (ans) => {
        if (ans) {
            let a = [...answer]
            a[cardNum] = 1
            setAnswer(a)
            setTimeout(() => { setCardTrans(a) }, 20)
        } else {
            let a = [...answer]
            a[cardNum] = 2
            setAnswer(a)
            setTimeout(() => { setCardTrans(a) }, 20)
        }
    }
    useEffect(() => {
        let x = 0
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] === 1 || answer[i] === 2) {
                x++
            }
        }
        setComplete(x)
    }, [answer])
    const handleComplete = () => {
        setActive(2)
        setTimeout(() => setStage(2), 1000)
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
    }, [time,stage]);

    return (
        <FullScreen handle={fullScreen}>
            <Container $full={fullScreen.active}>
                <BackgroundImage src={backgroundImage}></BackgroundImage>
                <StartScreen reStart={reStart} stage={stage === 0} setStage={setStage} active={active} setActive={setActive} />
                <ListScreen handleComplete={handleComplete} stage={stage === 1.5} setStage={setStage} active={active} setActive={setActive} />
                <CompleteScreen time={time} answer={answer} stage={stage === 2} setStage={setStage} active={active} setActive={setActive} />
                <TopRight $completetrans={active === 2}><TiTick />{complete}</TopRight>
                <TopLeft $completetrans={active === 2}>{Math.floor(time / 60)}:{Math.floor(time % 60) > 9 ? Math.floor(time % 60): '0'+Math.floor(time % 60)}</TopLeft>
                <TopButtons $completetrans={active === 2}>
                    <TopButton onClick={() => handleCardChange(0)} $selectLock={selectLock}><BsFillCaretLeftFill /></TopButton>
                    <PageText>第{cardNum + 1}頁，共{text.game1.length}頁</PageText>
                    <TopButton onClick={() => handleCardChange(1)} $selectLock={selectLock}><BsFillCaretRightFill /></TopButton>
                </TopButtons>
                <CardsContainer $completetrans={active === 2}>
                    <CardContainer1 onClick={handleRotateCard} $rotate={cardRotate} $selectLock={selectLock}>
                        <CardBackground src={cardImage[cardNum % 2]} />
                        <Text>{text.game1[cardNum][0]}</Text>
                        <CardAnswer $active={answer[cardNum]}><CardAnswerImage $trans={cardTrans[cardNum]} src={answer[cardNum] === 1 ? tickImage : crossImage} /></CardAnswer>
                    </CardContainer1>
                    <CardContainer2 onClick={handleRotateCard} $rotate={cardRotate} $selectLock={selectLock}>
                        <CardBackground src={cardImage[cardNum % 2]} />
                        <Text>{text.game1[cardNum][1]}</Text>
                        <CardAnswer $active={answer[cardNum]}><CardAnswerImage $trans={cardTrans[cardNum]} src={answer[cardNum] === 1 ? tickImage : crossImage} /></CardAnswer>
                    </CardContainer2>
                    <SelectButtons>
                        <SelectButton $active={answerActive || answer[cardNum]} $trans={answerTrans || answer[cardNum]} onClick={() => handleSelectAnswer(1)}><SelectImage src={tickImage} /></SelectButton>
                        <SelectButton $active={answerActive || answer[cardNum]} $trans={answerTrans || answer[cardNum]} onClick={() => handleSelectAnswer(0)}><SelectImage src={crossImage} /></SelectButton>
                    </SelectButtons>
                </CardsContainer>
                <FullScreenButton onClick={() => { fullScreen.active ? fullScreen.exit() : fullScreen.enter() }}>
                    {fullScreen.active ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
                </FullScreenButton>
                <ListButton $active={stage !== 1 || active === 2} onClick={handleListOpen}><BsList /></ListButton>
                <CompleteButton $completetrans={active === 2 || complete !== text.game1.length} onClick={handleComplete}>提交答案</CompleteButton>
            </Container>
        </FullScreen>
    );
}

export default Game;
