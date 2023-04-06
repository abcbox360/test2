import styled from 'styled-components'
import { useState, useEffect } from 'react'
import backgroundImage from './img/bg02.webp'
import StartScreen from './StartScreen.js'
import ListScreen from './ListScreen.js'
import CompleteScreen from './CompleteScreen'
import AnswerScreen from './AnswerScreen'
import text from './text/text.json';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsList, BsFillCaretLeftFill, BsFillCaretRightFill, BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import leaf1 from './img/leaf1.webp'
import leaf2 from './img/leaf2.webp'
import leaf3 from './img/leaf3.webp'

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
const TopLeft = styled.div`
left: 10px;
justify-content: start;
position: absolute;
top: 10px;
width: 10%;
font-size: 4cqw;
color: rgba(256, 256, 256, 0.6);
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
const DropBox = styled.div`
position: relative;
width: 90%;
height: 70%;
left: 5%;
top: 15%;
display: flex;
align-items: center;
justify-content: start;
transition: opacity .5s;
${prop => prop.$active && `
opacity: 0;
`}
`
const DropArea = styled.div`
position: block;
background: rgba(256, 256, 256, 0.2);
width: 10%;
height: 100%;
border-radius: 5px;
display: flex;
align-items: center;
justify-content: start;
flex-direction: column;
flex-wrap: wrap;
margin: 0 5px;
&:hover {
    background: rgba(256, 256, 256, 0.4);
}
`
const DropItems = styled.div`
width: 100%;
height: 24%;
margin: 2% 0;
display: flex;
align-items: center;
justify-content: center;
position: relative;
& div {
    position: absolute;
    width:100%;
    height: 100%;
    z-index:1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}
`
const LeafImg = styled.img`
position: absolute;
width: 100%;
height: 100%;   
`
const AnswerContainer = styled(DropArea)`
position: absolute;
background: transparent;
width: 70%;
left: 30%;
display: flex;
align-items: start;
justify-content: space-between;
&:last-of-type {
    align-items: end;
}
&:hover {
    background: transparent;
}
`
const AnswerArea = styled(DropArea)`
height: 24%;
width: 14%;
z-index: 1;
&:first-of-type  {
    margin-top: 0;
}
&:nth-of-type(4) {
    margin-bottom: 0;
}
&:nth-of-type(5) {
    margin-top: 0;
}
:last-of-type {
    margin-bottom: 0;
}
&:hover {
    background: rgba(256, 256, 256, 0.4);
}
`
const Answer = styled.div`
width: 20%;
height: 24%;
background: rgba(256, 256, 256, 0.8);
margin-right: 5%; 
display: flex;
align-items: center;
justify-content: center;
border-radius: 5px;
`
const SelectItem =styled(DropItems)`
height: 100%;
`
const CompleteButton = styled.div`
position: absolute;
width: 20%;
height: 10%;
bottom: 2%;
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
function Game2() {
    const [stage, setStage] = useState(0)
    const [active, setActive] = useState(0)
    const [time, setTime] = useState(0)
    const [items, setItems] = useState([]);
    const [complete, setComplete] = useState(false)
    const leafImage = [leaf1, leaf2, leaf3]
    const fullScreen = useFullScreenHandle()
    const init = () => {
        let newItems = [
            {
                name: 'selectList0',
                text: [],
                img: []
            },
            {
                name: 'selectList1',
                text: [],
                img: []
            },
        ]
        let j = 0
        for (let i = 0; i < text.game2.length; i++) {
            if (i === 4) { j++ }
            newItems[j].text.push(text.game2[i][0])
            newItems[j].img.push(i % 3)
            newItems.push({ name: 'answer' + i, text: [], img: [] })
        }
        setItems(newItems)
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
    const dragEnd = (e) => {
        const { source, destination } = e 
        if (!destination) {
            return
        }
        let newItems = [ ...items ]
        const [remove] = newItems[source.droppableId.match(/\d/)].text.splice(source.index, 1)
        const [removeimg] = newItems[source.droppableId.match(/\d/)].img.splice(source.index, 1)
        newItems[destination.droppableId.match(/\d/)].text.splice(destination.index, 0, remove)
        newItems[destination.droppableId.match(/\d/)].img.splice(destination.index, 0, removeimg)
        setItems(newItems)
    }
    useEffect(()=>{
        if (!complete) { 
        for (let i = 2; i < items.length; i++) {
            if (items[i].text.length > 0) {
                setComplete(true)
            }
        }
    }
    })
    return (
        <FullScreen handle={fullScreen}>
            <Container $full={fullScreen.active}>
                <BackgroundImage src={backgroundImage} />
                <StartScreen game={2} reStart={reStart} stage={stage === 0} setStage={setStage} active={active} setActive={setActive} />
                <ListScreen handleComplete={handleComplete} stage={stage === 1.5} setStage={setStage} active={active} setActive={setActive} />
                <CompleteScreen game={2} time={time} answer={items} stage={stage === 2} setStage={setStage} active={active} setActive={setActive} />
                <AnswerScreen game={2} active={stage === 3} setStage={setStage} setActive={setActive}/>
                <ListButton $active={stage !== 1 || active !== 1} onClick={handleListOpen}><BsList /></ListButton>
                <FullScreenButton onClick={() => { fullScreen.active ? fullScreen.exit() : fullScreen.enter() }}>
                    {fullScreen.active ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
                </FullScreenButton>
                <TopLeft $completetrans={active !== 1}>{Math.floor(time / 60)}:{Math.floor(time % 60) > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)}</TopLeft>

                <DropBox $active={stage !== 1}>
                    <DragDropContext onDragEnd={dragEnd}>
                        {items.map((list, i) => 
                            i < 2 &&
                                   <Droppable isDropDisabled={list.text.length > 3 ? true : false} droppableId={'select'+i} key={i}>
                                        {(provided, snapshot) => (
                                            <DropArea  {...provided.droppableProps} ref={provided.innerRef}>
                                                {list.text.map((item, index) => (
                                                    <Draggable
                                                        key={item} draggableId={item} index={index} >
                                                        {(provided, snapshot) => (
                                                            <DropItems
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <LeafImg src={leafImage[list.img[index]]} />
                                                                <div>{item}</div>
                                                            </DropItems>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </DropArea>
                                        )}
                                    </Droppable>
                        )}
                        <AnswerContainer>
                        {items.map((list, i) =>
                            i > 1 && 
                        <Droppable isDropDisabled={list.text.length > 0 ? true : false} droppableId={'answer'+i} key={i}>
                                    {(provided, snapshot) => (
                                        <AnswerArea  {...provided.droppableProps} ref={provided.innerRef}>
                                            {list.text.map((item, index) => (
                                                <Draggable
                                                    key={item} draggableId={item} index={index} >
                                                    {(provided, snapshot) => (
                                                        <SelectItem
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <LeafImg src={leafImage[list.img[index]]} />
                                                            <div>{item}</div>
                                                        </SelectItem>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </AnswerArea>
                                    )}
                                </Droppable>
                        )}
                        </AnswerContainer>
                        <AnswerContainer>
                        {text.game2.map((list)=>
                            <Answer key={list}>{list[1]}</Answer>
                        )}</AnswerContainer>
                    </DragDropContext>
                </DropBox>
                <CompleteButton $completetrans={!complete || stage !== 1} onClick={handleComplete}>提交答案</CompleteButton>
            </Container>
        </FullScreen>
    );
}

export default Game2;
