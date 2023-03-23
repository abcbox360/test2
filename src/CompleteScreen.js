import styled from 'styled-components'
import { useState } from 'react'
import text from './text/text.json';

const Container = styled.div`
width: 100%;
aspect-ratio: 800 / 530;
position: absolute;
z-index: 1;
margin: 0 auto;
user-select: none;
background: rgba(0, 0, 0, 0.6);
font-weight: 600;
transition: opacity .5s;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
${prop => !prop.$stage && `
opacity: 0;
`}
${prop => !prop.$active && `
display: none;
`}
`
const CompleteWindow = styled.div`
width: 220px;
height: 230px;
background: black;
border: 2px solid rgba(256, 256, 256, 0.6);
color: rgba(256, 256, 256, 0.6);
display: flex;
align-items: center;
justify-content: space-around;
flex-direction: column;
padding: 5px;
font-size: 20px;
border-radius: 6px;
`
const Title = styled.div`
width: 90%;
height: 20%;
display: flex;
justify-content: center;
align-items: center;
color: rgba(256, 256, 256, 0.6);
`
const Statistics = styled(Title)`
height: 30%;
font-size: 24px;
`
const Score = styled(Title)`
flex-direction: column;
& *:last-of-type {
    color: white;
}
`
const Button = styled(Title)`
color: rgba(256, 256, 256, 0.8);
font-size: 34px;
cursor: pointer;
border-radius: 3px;
&:hover {
    background: rgba(256,256,256,0.2);
}
`

function CompleteScreen(props) {
    const { stage, setStage, active, setActive, answer, time } = props

    let score = 0
    if (stage) {
        for (let i = 0; i < text.game1.length; i++) {
            if (text.game1[i][2] === answer[i]) {
                score += 1
            }
        }
    }
    let timeText
    if (time > 60) {
        if (Math.floor(time%60) > 9) {
            timeText = Math.floor(time/60)+':'+Math.floor(time%60)
        }else {
            timeText = Math.floor(time/60)+':0'+Math.floor(time%60)
        }
    }else {
        if (time > 9) {
            timeText = time + 's'
        }else {
            timeText = '0'+ time + 's'
        }
    }
    return (
        <Container $stage={stage} $active={active === 2} >
            <CompleteWindow>
                <Title>遊戲完成</Title>
                <Statistics>
                    <Score>
                        <div>得分</div>
                        <div>{score}/{text.game1.length}</div>
                    </Score>
                    <Score>
                        <div>時間</div>
                        <div>{timeText}</div>
                    </Score>
                </Statistics>
                <Button>顯示答案</Button>
                <Button onClick={() => { setStage(0); setActive(0) }}>重新開始</Button>
            </CompleteWindow>
        </Container>
    );
}

export default CompleteScreen;
