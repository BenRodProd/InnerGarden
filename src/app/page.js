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
import FetchMotivationApi from '@/components/FetchMotivationApi'

const StyledMenu = styled(Image)`
position:absolute;
top:0;
left: 0;
z-index: 21;
background-color: transparent;
background: transparent;
filter: invert(1);
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
background-color:rgba(0,0,0,0.9);
z-index:20;
@media (max-width: 768px) {
    padding: 0rem;

  }
` 
const StyledForm = styled.form`
display:flex;

flex-direction:column;
width:100%;
height:100%;
align-items:center;
justify-content: center;
@media (max-width: 768px) {
    padding: 0rem;
  }
`

const StyledTaskButton = styled.button`
font-size: 3rem;
font-weight: bold;
border-radius: 8px;
&:disabled {
  opacity:0.25
}
`

const ButtonWrapper = styled.div`
display: flex;
position: absolute;
flex-wrap: wrap;
align-items: center;
justify-content: center;
bottom: 4rem;
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
font-size: 2rem;
row-gap: 1rem;
height:100%;
width:100%;
z-index: 30;
top:0;
left:0;
background-color:rgba(0,0,0,0.9);
text-align: center;

`  
const InputWrapper = styled.div`
display:inline;
position: relative;
;

`
const StyledX = styled.button`
position:absolute;
;
background-color:transparent;
background: transparent;
border:none;
`

const FormHeader=styled.h2`
margin-top:2rem;
margin-bottom: 0;
font-size: 2.5rem;
letter-spacing: 0.5rem;
`

const StyledInput = styled.input`
font-size:2.5rem;
`

const StyledCount = styled.span`
font-size: 3rem;
`

const StyledButton = styled.button`
font-size: 3rem;
letter-spacing: 1rem;
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
const [motivationPopup, setMotivationPopup] = useState(false)
const [motivationMessage, setMotivationMessage] = useState("")
const [motivationAuthor, setMotivationAuthor] = useState("")
const [taskData, setTaskData] = useLocalStorage("taskData", [
  { name: "", clicked: 0, goal: 0, dates: [] },
  { name: "", clicked: 0, goal: 0, dates: [] },
  { name: "", clicked: 0, goal: 0, dates: [] },
  { name: "", clicked: 0, goal: 0, dates: [] },
  { name: "", clicked: 0, goal: 0, dates: [] },
  {lastvisit: ""},
]);


const yesRef = useRef(null)
const noRef = useRef(null)
const allClicked = taskData[0].clicked+taskData[1].clicked+taskData[2].clicked+taskData[3].clicked+taskData[4].clicked
async function fetchMotivation() {
  try {
    const randomQuote = await FetchMotivationApi();
    setMotivationAuthor(randomQuote.author)
    setMotivationMessage(randomQuote.text)
   return randomQuote
    
  } catch (error) {
   
  }
}
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {

  setTimeout(() => {
    setIsLoading(false);
  }, 10);
}, []);

useEffect(() => {
  const currentDate = new Date().toISOString().slice(0, 10)
  if (taskData[5].lastvisit !== currentDate) {
    fetchMotivation()
    const updatedTaskData = [...taskData];
    updatedTaskData[5].lastvisit = currentDate;
   
    setMotivationPopup(true)
   
   
    setTaskData(updatedTaskData);

  }
}, []);

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
  const currentDate = new Date().toISOString(); // Get current date in ISO format

  if (!updatedTaskData[task].dates.includes(currentDate)) {
    updatedTaskData[task] = {
      ...updatedTaskData[task],
      clicked: updatedTaskData[task].clicked + 1,
      dates: updatedTaskData[task].dates
        ? `${updatedTaskData[task].dates},${currentDate}`
        : currentDate,
    };
    setTaskData(updatedTaskData);
  }
}
if (isLoading) {
  return (<div>Loading..</div>

  )
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
      <FormHeader>Task 1</FormHeader>
      <InputWrapper><StyledInput name ="task1name" type="text" maxLength="20" placeholder={taskData[0].name} />
      <StyledX type="button" onClick ={() => handleDeleteTask(0)}><Image src ="/assets/x.png" width="25" height="25" alt="x"/></StyledX>
      </InputWrapper>
      <StyledCount>{taskData[0].clicked}</StyledCount>
      
      <FormHeader>Task 2</FormHeader>
      <InputWrapper><StyledInput name ="task2name" type="text" maxLength="20" placeholder={taskData[1].name} />
      <StyledX type="button" onClick ={() => handleDeleteTask(1)}><Image src ="/assets/x.png" width="25" height="25" alt="x"/></StyledX>
      </InputWrapper>
      <StyledCount>{taskData[1].clicked}</StyledCount>
      <FormHeader>Task 3</FormHeader>
      <InputWrapper><StyledInput name ="task3name" type="text" maxLength="20" placeholder={taskData[2].name} />
      <StyledX type="button" onClick ={() => handleDeleteTask(2)}><Image src ="/assets/x.png" width="25" height="25" alt="x"/></StyledX>
      </InputWrapper>
      <StyledCount>{taskData[2].clicked}</StyledCount>
      <FormHeader>Task 4</FormHeader>
      <InputWrapper>
      <StyledInput name ="task4name" type="text" maxLength="20" placeholder={taskData[3].name} />
      <StyledX type="button" onClick ={() => handleDeleteTask(3)}><Image src ="/assets/x.png" width="25" height="25" alt="x"/></StyledX>
      </InputWrapper>
      <StyledCount>{taskData[3].clicked}</StyledCount>
      <FormHeader>Task 5</FormHeader>
      <InputWrapper>
      <StyledInput name ="task5name" type="text" maxLength="20" placeholder={taskData[4].name} />
      <StyledX type="button" onClick ={() => handleDeleteTask(4)}><Image src ="/assets/x.png" width="25" height="25" alt="x"/></StyledX>
      </InputWrapper>
      <StyledCount>{taskData[4].clicked}</StyledCount>
      <FormHeader></FormHeader>
      <StyledButton type ="submit">SUBMIT</StyledButton>
      </StyledForm>
      </StyledOptions>}
      <ButtonWrapper>
        {taskData[0].name !== "" && <StyledTaskButton type="button" disabled={taskData[0].dates && taskData[0].dates.includes(new Date().toISOString().slice(0, 10))} onClick={()=>increaseTask(0)}>{taskData[0].name}</StyledTaskButton>}
        {taskData[1].name !== "" && <StyledTaskButton type="button" disabled={taskData[1].dates && taskData[1].dates.includes(new Date().toISOString().slice(0, 10))}onClick={()=>increaseTask(1)}>{taskData[1].name}</StyledTaskButton>}
        {taskData[2].name !== "" && <StyledTaskButton type="button" disabled={taskData[2].dates && taskData[2].dates.includes(new Date().toISOString().slice(0, 10))}onClick={()=>increaseTask(2)}>{taskData[2].name}</StyledTaskButton>}  
        {taskData[3].name !== "" && <StyledTaskButton type="button" disabled={taskData[3].dates && taskData[3].dates.includes(new Date().toISOString().slice(0, 10))}onClick={()=>increaseTask(3)}>{taskData[3].name}</StyledTaskButton>}
        {taskData[4].name !== "" && <StyledTaskButton type="button" disabled={taskData[4].dates && taskData[4].dates.includes(new Date().toISOString().slice(0, 10))}onClick={()=>increaseTask(4)}>{taskData[4].name}</StyledTaskButton>}
        
      </ButtonWrapper>
      {animalPopup && 
      <StyledPopup>
      <p>You have {allClicked} Task completed! You earn a new animal. The {animalMessage} is now living in your Garden!</p>
      <button type ="button" onClick={()=>setAnimalPopup(false)} >Close</button>
      </StyledPopup>
      }
      {deletePopup && <StyledPopup>
      <p>Are you sure you want to delete this task? All progress will be lost!</p>
      <StyledButton type ="button" onClick={handleConfirmDelete} ref={yesRef}>YES</StyledButton>
      <StyledButton type ="button" onClick={handleConfirmDelete} ref={noRef} >NO</StyledButton>
      </StyledPopup>}
      {motivationPopup && <StyledPopup onClick={()=> setMotivationPopup(false)}>
        <h2>{motivationMessage}</h2>
        <h2>{motivationAuthor}</h2>
      </StyledPopup>}
        
      </MainWrapper>
   </>
  )
}
