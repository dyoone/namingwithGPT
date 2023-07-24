import { loaderDiv } from "./fonts.js"
import { setuserMessages,render} from "./nextStage.js";
import { fetchData } from "./fetch.js";
import {  setDescription } from "./renderCard.js";

const recycleBtn = document.createElement('button')
recycleBtn.classList.add('recycle-button')
const recycleIcon = document.createElement('i')
recycleIcon.classList.add('fas', 'fa-recycle')
recycleBtn.appendChild(recycleIcon)


const recycle= async function() {
  setDescription({})
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => row.remove());
  const fontLinks = document.querySelectorAll('.font-link');
  fontLinks.forEach(link => link.remove());
  chatContainer.removeChild(recycleBtn);
  chatContainer.appendChild(loaderDiv);
  setuserMessages([])
  

  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('timeout');
    }, 10000);
      });
  const assistantResponse = fetchData(false);

  const resultPromise = await Promise.race([timeoutPromise, assistantResponse]);
  render(resultPromise,'true')

  }


recycleBtn.addEventListener('click',recycle );



export {recycleBtn} 