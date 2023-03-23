import styled  from 'styled-components'
import { useState } from 'react'
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
${prop => !prop.$stage && `
opacity: 0;
`}
${prop => !prop.$active && `
display: none;
`}
`
const ListButtons = styled.div`
position: absolute;
width: 200px;
aspect-ratio: 1;
border-radius: 5px;
border: 2px solid rgba(256, 256, 256, 0.6);
left: 20px;
bottom: 20px;
background: black;
padding: 5px;
`
const Text = styled.div`
width: 90%;
height: 25%;
color: rgba(256, 256, 256, 0.6);
border-radius: 5px;
padding: 0 5px;
margin: auto;
display: flex;
align-items: center;
font-size: 24px;
`
const ListButton = styled(Text)`
color: rgba(256, 256, 256, 0.8);
font-size: 34px;
cursor: pointer;
border-radius: 3px;
&:hover {
    background: rgba(256,256,256,0.2);
}
`
const RetuenButton = styled.div`
position: absolute;
cursor: pointer;
width: 100%;
height: 100%;
`
function ListScreen(props) {
    const {stage, setStage, active, setActive, handleComplete} = props
    const handleListClose = () => {
        setStage(1)
        setTimeout(()=>setActive(1),500)
    }
    const handleReStart = () => {
        setStage(0)
        setActive(0)
    }
    return (
    <Container $stage={stage} $active={active === 1.5}>
        <RetuenButton onClick={handleListClose} />
        <ListButtons>
            <Text>快閃記憶體卡</Text>
            <ListButton onClick={handleComplete}>提交答案</ListButton>
            <ListButton onClick={handleReStart}>重新開始</ListButton>
            <ListButton onClick={handleListClose}>恢復</ListButton>
        </ListButtons>
    </Container>
  );
}

export default ListScreen;
