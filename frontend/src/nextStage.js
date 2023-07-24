import { loaderDiv } from "./fonts.js";
import { recycleBtn } from "./recycleBtn.js";
import { fetchData } from "./fetch.js";
import { renderCard } from "./renderCard.js";

const stages = document.querySelectorAll('.stage');
let currentStageIndex = 0;
const formData = {}
let type=''
let userMessages=[];
let assistantMessages=[];

const nextBtn=document.getElementById('nextBtn')


async function next(){
  const currentStage = stages[currentStageIndex];
    currentStage.classList.add('fade-out');
    const textarea = currentStage.querySelectorAll('textarea');
    const values = Array.from(textarea).map(v=>v.value)
    const stageId = currentStage.id;
    currentStage.style.display = 'none';
    type=='' ? formData[stageId] = values : formData[stageId] = type
    currentStageIndex++;
    if(currentStageIndex===stages.length-1){
        document.getElementById('nextBtn').textContent = '완료'
    }
    // Show the next stage with fade-in animation
    if(currentStageIndex<stages.length){
    const nextStage = stages[currentStageIndex];
    nextStage.style.display = 'block';
    nextStage.classList.add('fade-in');
    }else if(currentStageIndex>=stages.length-1){
        document.getElementById('mainContainer').style.display = 'none'
        document.getElementById('chatContainer').style.display = 'flex'
        chatContainer.appendChild(loaderDiv);
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('timeout');
          }, 15000); // 10초 후에 타임아웃으로 처리
            });

    const assistantResponsePromise = fetchData(false); // 비동기 작업을 수행하는 프로미스

    const resultPromise = await Promise.race([timeoutPromise, assistantResponsePromise]);
    render(resultPromise,'flase')

    }
}

const render = async(resultPromise, flag)=>{
  if(resultPromise!=='timeout'){
    const result = await resultPromise;
    setassistantMessages([...getassistantMessages(),result])
    let assistantMessage=getassistantMessages()
    if(assistantMessage[0]!==''){
    const resultData = assistantMessage[0].match(/\d+\.\s\S+/g).map(v => v.replace('\n', ''));
    try {
      if (resultData.length >= 4 || resultData.some(item => typeof item === 'string' && /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(item))) {
        throw new Error('에러: 배열 resultData의 길이가 4 이상이거나 한국어가 포함되어 있습니다.');
      }
    renderCard(resultData,flag)
  } catch (error) {
    chatContainer.appendChild(recycleBtn);
  }
  } else {
            chatContainer.removeChild(loaderDiv);
        chatContainer.appendChild(recycleBtn);
  }
  setassistantMessages([]);} else{
    chatContainer.appendChild(recycleBtn);
    chatContainer.removeChild(loaderDiv);
  }
}

nextBtn.addEventListener('click',next)

function getuserMessages() {
  return userMessages;
}

function setuserMessages(newuserMessages) {
  userMessages = newuserMessages
}


function getassistantMessages() {
  return assistantMessages;
}

function setassistantMessages(newassistantMessages) {
  assistantMessages = newassistantMessages
}

export{userMessages, assistantMessages, formData, getassistantMessages, getuserMessages,setassistantMessages,setuserMessages, render}