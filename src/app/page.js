"use client"
import Image from 'next/image'
import useLocalStorage from 'use-local-storage'
import { useEffect, useState, useRef } from 'react'
import Background from '@/components/Background'
import Ground from '@/components/Ground'
import styled from 'styled-components'
import Flower1 from '@/components/Flower1'
import Flower2 from '@/components/Flower2'
import Flower3 from '@/components/Flower3'
import Flower4 from '@/components/Flower4'
import Trees from '@/components/Trees'
import DisplayDate from '@/components/DisplayDate'
import Butterfly from '@/components/Butterfly'
import Squirrel from '@/components/Squirrel'


const StyledMenu = styled(Image)`
position:absolute;
top:0;
left: 0;
z-index: 16;
`
const StyledOptions = styled.div`
position: absolute;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
top:0;
left:0;
bottom:0;
right:0;
padding:4rem;
width:100%;
height:100%;
background-color:rgba(0,0,0,0.8);
z-index:15;
` 
const StyledForm = styled.form`
display:flex;

flex-direction:column;
width:100%;
align-items:center;
justify-content: center;

`

const ButtonWrapper = styled.div`
display: flex;
position: absolute;
align-items: center;
justify-content: center;
bottom: 0;
width: 100%;
z-index: 17;
gap:20px;
`
const StyledPopup = styled.div`
display:flex;
position: absolute;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 4rem;
font-size: 1.5rem;
row-gap: 1rem;
height:100%;
width:100%;
z-index: 30;
top:0;
left:0;
background-color:rgba(0,0,0,0.9);
text-align: center;

`  

const StyledX = styled.button`
background-color:transparent;
background: transparent;
border:none;
`

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  
  align-items: center;
  
  
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

`

export default function Home() {
const [menuOpen, setMenuOpen] = useState(false)
const [animalPopup, setAnimalPopup] = useState(false)
const [animalMessage, setAnimalMessage] = useState("")
const [deletePopup, setDeletePopup] = useState(false)
const [deleteConfirm, setDeleteConfirm] = useState(false)
const [deleteTaskIndex, setDeleteTaskIndex] = useState(null)
const [taskData, setTaskData] = useLocalStorage("taskData", [
  { name: "", clicked: 0, goal: 0, dates: "" },
  { name: "", clicked: 0, goal: 0, dates: "" },
  { name: "", clicked: 0, goal: 0, dates: "" },
  { name: "", clicked: 0, goal: 0, dates: "" },
  { name: "", clicked: 0, goal: 0, dates: "" },
]);
const yesRef = useRef(null)
const noRef = useRef(null)
const allClicked = taskData[0].clicked+taskData[1].clicked+taskData[2].clicked+taskData[3].clicked+taskData[4].clicked
useEffect(() => {
  if (allClicked === 30) {
    setAnimalPopup(true)
    setAnimalMessage("Butterfly")
    
  }
  if (allClicked === 60) {
    setAnimalPopup(true)
    setAnimalMessage("Squirrel")
    
  }
},[taskData, allClicked])
console.log(taskData)


// ... existing code ...

function handleDeleteTask(taskIndex) {
  setDeletePopup(true);
  setDeleteTaskIndex(taskIndex)
}

function handleConfirmDelete() {
  const yesButton = yesRef.current;
  const noButton = noRef.current;

  if (yesButton && noButton && deleteTaskIndex !== null) {
    if (document.activeElement === yesButton) {
      setDeleteConfirm(true);
      console.log("DELETE")
      const updatedTaskData = [...taskData];
      updatedTaskData[deleteTaskIndex] = {
        name: "",
        clicked: 0,
        goal: 0,
        dates: "",
      };
      setTaskData(updatedTaskData);
      setDeleteTaskIndex(null)
      setDeletePopup(false)
      setDeleteConfirm(false)
    } else if (document.activeElement === noButton) {
      setDeleteConfirm(false);
      setDeleteTaskIndex(null)
      setDeletePopup(false)
    }
  }

  setDeletePopup(false);
}
function handleFormSubmit(event) {
  event.preventDefault();

  const updatedTaskData = [...taskData];

  for (let i = 0; i < 5; i++) {
    const taskName = event.target[`task${i + 1}name`].value.trim();

    if (taskName !== "") {
      updatedTaskData[i] = {
        ...updatedTaskData[i],
        name: taskName,
      };
    }

    event.target[`task${i + 1}name`].value = ""; // Clear the input field
  }

  setTaskData(updatedTaskData);
}
function increaseTask(task) {
  const updatedTaskData = [...taskData];
  updatedTaskData[task].clicked++;
  setTaskData(updatedTaskData);
}

  return (
   <>
   <MainWrapper> 
    <DisplayDate />
    <Ground checked={allClicked}/>
    <Flower1 checked={taskData[0].clicked}/>
    <Flower2 checked={taskData[1].clicked}/>
    <Flower3 checked={taskData[2].clicked}/>
    <Flower4 checked={taskData[3].clicked}/>
    <Trees checked={taskData[4].clicked}/>
    <Butterfly checked = {allClicked} />
    <Squirrel checked = {allClicked} />
    <Background />
   
    <StyledMenu src="/assets/menu.png" alt="menu" width={80} height={80} onClick={() => setMenuOpen(!menuOpen)} />
    {menuOpen &&
    <StyledOptions>
      <StyledForm onSubmit={handleFormSubmit}>
      <h2>Task1</h2>
      <input name ="task1name" type="text" max="20" placeholder={taskData[0].name} />
      <span>{taskData[0].clicked}</span>
      <StyledX type="button" onClick ={() => handleDeleteTask(0)}><Image src ="/assets/x.png" width="45" height="45" alt="x"/></StyledX>
      <h2>Task2</h2>
      <input name ="task2name" type="text" max="20" placeholder={taskData[1].name} />
      <span>{taskData[1].clicked}</span>
      <StyledX type="button" onClick ={() => handleDeleteTask(1)}><Image src ="/assets/x.png" width="45" height="45" alt="x"/></StyledX>
      <h2>Task3</h2>
      <input name ="task3name" type="text" max="20" placeholder={taskData[2].name} />
      <span>{taskData[2].clicked}</span>
      <StyledX type="button" onClick ={() => handleDeleteTask(2)}><Image src ="/assets/x.png" width="45" height="45" alt="x"/></StyledX>
      <h2>Task4</h2>
      <input name ="task4name" type="text" max="20" placeholder={taskData[3].name} />
      <span>{taskData[3].clicked}</span>
      <StyledX type="button" onClick ={() => handleDeleteTask(3)}><Image src ="/assets/x.png" width="45" height="45" alt="x"/></StyledX>
      <h2>Task5</h2>
      <input name ="task5name" type="text" max="20" placeholder={taskData[4].name} />
      <span>{taskData[4].clicked}</span>
      <StyledX type="button" onClick ={() => handleDeleteTask(4)}><Image src ="/assets/x.png" width="45" height="45" alt="x"/></StyledX>
      <h2></h2>
      <button type ="submit">Submit</button>
      </StyledForm>
      </StyledOptions>}
      <ButtonWrapper>
        {taskData[0].name !== "" && <button type="button" onClick={()=>increaseTask(0)}>{taskData[0].name}</button>}
        {taskData[1].name !== "" && <button type="button" onClick={()=>increaseTask(1)}>{taskData[1].name}</button>}
        {taskData[2].name !== "" && <button type="button" onClick={()=>increaseTask(2)}>{taskData[2].name}</button>}  
        {taskData[3].name !== "" && <button type="button" onClick={()=>increaseTask(3)}>{taskData[3].name}</button>}
        {taskData[4].name !== "" && <button type="button" onClick={()=>increaseTask(4)}>{taskData[4].name}</button>}
        
      </ButtonWrapper>
      {animalPopup && 
      <StyledPopup>
      <p>You have {allClicked} Task completed! You earn a new animal. The {animalMessage} is now living in your Garden!</p>
      <button type ="button" onClick={()=>setAnimalPopup(false)} >Close</button>
      </StyledPopup>
      }
      {deletePopup && <StyledPopup>
      <p>Are you sure you want to delete this task? All progress will be lost!</p>
      <button type ="button" onClick={handleConfirmDelete} ref={yesRef}>YES</button>
      <button type ="button" onClick={handleConfirmDelete} ref={noRef} >NO</button>
      </StyledPopup>}
      </MainWrapper>
   </>
  )
}
