import { recycleBtn } from "./recycleBtn.js";
import { fontsData,loaderDiv } from "./fonts.js";
import { fetchData } from "./fetch.js";
import { getuserMessages,setassistantMessages,setuserMessages } from "./nextStage.js";
const chatContainer = document.getElementById('chatContainer');
let isProcessing = false; // 이벤트 핸들러 실행 중인지 여부를 나타내는 변수
let description={}  
const newDiv = document.createElement('div');
const back = document.createElement('div');

function getDescription() {
  return description;
}

function setDescription(newDescription) {
  description = newDescription;
}



function renderCard(wordData,re) {
    if(re){


      
    }
    chatContainer.appendChild(recycleBtn);
    chatContainer.removeChild(loaderDiv);
    let row = document.createElement('div');
    row.classList.add('row');
    const sansFonts = fontsData.sansFonts;
    const serifFonts = fontsData.serifFonts;
    for (let i = 0; i < wordData.length; i++) {
      const randomIndex = Math.random() < 0.5 ? 0 : 1; // 50%의 확률로 0 또는 1을 선택
      const selectedVariable = randomIndex === 0 ? sansFonts : serifFonts; // 선택된 변수
      const min = 0; // 최소값
      const max = selectedVariable.length; // 최대값
      const random = Math.floor(Math.random() * (max - min + 1)) + min;
      const link=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(selectedVariable[random])}&display=swap`
      const messageElement = document.createElement('div');
      const linkElement = document.createElement('link');
      messageElement.style.fontFamily = `'${selectedVariable[random]}', ${selectedVariable.length === sansFonts.length ? 'sans-serif' : 'serif'}`;

      linkElement.href = link;
      linkElement.rel = 'stylesheet';

      document.head.appendChild(linkElement);
      messageElement.classList.add('namingCard');
      messageElement.dataset.key = wordData[i].replace(/^\d+\./, '')
      messageElement.textContent = wordData[i].replace(/^\d+\./, '');
      row.appendChild(messageElement);

      
      
      

      if ((i + 1) % 3 === 0 || i === wordData.length - 1) {
        chatContainer.appendChild(row);
        row = document.createElement('div');
        row.classList.add('row');
      }
    }


    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
  }





const click = async (event) => {
    if (isProcessing) return; // 이벤트 핸들러 실행 중이면 중복 실행 방지
    
    const target = event.target.closest('.namingCard'); // 클릭된 요소의 최상위 부모(.namingCard)를 찾음
  
    if (!target) return; // 클릭된 요소가 .namingCard가 아니면 종료
  
    isProcessing = true; // 이벤트 핸들러 실행 중으로 설정
    const key = target.dataset.key;
  
    try {
      if (!description[key]) {
        setuserMessages([...getuserMessages(),key])
        target.classList.add('rotating');
  
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('timeout')
          }, 15000);
        });
  
        const fetchDataPromise =  fetchData(true);

        const result = await Promise.race([timeoutPromise, fetchDataPromise]);


        
        if (result ==='timeout') {
          // 타임아웃 또는 fetchDataPromise에서 발생한 에러 처리
          target.classList.remove('rotating');
          setuserMessages([])
        } else {
          const assistantResponse = result;
          if(assistantResponse===''){
            target.classList.remove('rotating');
          setuserMessages([])
          }else {
          description[key] = assistantResponse;
          target.classList.remove('rotating');
          descript(key)
          setuserMessages([])
          setassistantMessages([])
        }
        }
      } else {
        descript(key)
      }
    } catch (error) {
      console.log('hi')
    } finally {
      isProcessing = false; // 이벤트 핸들러 실행 완료
    }
  }

  chatContainer.addEventListener('click',click);



function descript(key) {

    chatContainer.appendChild(back);
    chatContainer.appendChild(newDiv);
    newDiv.appendChild(backBtn)
    back.classList.add('ground');
    newDiv.classList.add('description');
    newDiv.textContent = description[key];
  
    const handleClickOutside = (event) => {
      if (event.target !== newDiv && !newDiv.contains(event.target)) {
        closeWindow();
      }
    };
  
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeWindow();
      }
    };
  
    const closeWindow = () => {
      chatContainer.removeChild(newDiv);
      chatContainer.removeChild(back);
      document.removeEventListener('keydown', handleEscKey, {capture:true});
      document.removeEventListener('click', handleClickOutside, {capture:true});
    };
  
    document.addEventListener('keydown', handleEscKey, {capture:true});
    document.addEventListener('click', handleClickOutside, {capture:true});
  }


  
export { renderCard, getDescription,setDescription}




