import styled  from 'styled-components'
import { useState } from 'react'
import { BsFillCaretRightFill } from "react-icons/bs";
const Container = styled.div`
width: 100%;
aspect-ratio: 800 / 530;
position: absolute;
z-index: 2;
margin: 0 auto;
user-select: none;
background: rgba(0, 0, 0);
font-weight: 600;
transition: opacity .5s;
height: 100%;
${prop => !prop.$stage && `
opacity: 0;
`}
${prop => !prop.$active && `
display: none;
`}
`
const TopText = styled.div`
position: absolute;
width: 100%;
top: 5%;
color: white;
margin: auto;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
font-size: 4cqw;
& div:last-of-type {
  font-size: 10cqw;
}
@media screen and (min-width: 800px) {
  font-size: 32px;
  & div:last-of-type {
    font-size: 80px;
  }
}
`
const BottomText = styled(TopText)`
top: 80%;
color: rgba(256, 256, 256, 0.8);
font-size: 3.5cqw;
@media screen and (min-width: 800px) {
  font-size: 28px;
}
`
const StartButton = styled.div`
position: absolute;
bottom: calc(40%);
left: calc(50% - 7.5%);
margin: 0 1cqw;
width: 15%;
aspect-ratio: 1;
border-radius: 1cqw;
background: #66B3FF;
font-size: 9cqw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
cursor: pointer;
color: white;
& * {
    margin: auto;
}
& div {
  font-size: 4cqw;
  margin: 0;
}
&:hover {
  filter: brightness(1.1)
}
@media screen and (min-width: 800px) {
  font-size: 72px;
    & div {
      font-size: 32px;
      margin: 0;
    }
}
`


function StartScreen(props) {
    const {stage, setStage, active, setActive, reStart, game} = props
    const handleStart = () => {
      reStart()
      setStage(1)
      setTimeout(()=>{setActive(1)},500)
    }
    const text = {
      1:['快閃記憶體卡','記憶單詞','使用前面有提示的圖片和背面的答案來測試自己。'],
      2:['匹配遊戲','字母配對練習','將每個關鍵字拖放到其定義旁邊。']
    }
  return (
    <Container $stage={stage} $active={active === 0}>
    <TopText>
      <div>{text[game][0]}</div>
      <div>{text[game][1]}</div>
    </TopText>
      <StartButton onClick={handleStart}>
        <BsFillCaretRightFill/>
        <div>開始</div>
      </StartButton>
      <BottomText>
      {text[game][2]}
      </BottomText>
    </Container>
  );
}

export default StartScreen;
