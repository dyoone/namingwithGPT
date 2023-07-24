let fontsData = {};
const loaderDiv = document.createElement('div');
loaderDiv.id = 'loader';
loaderDiv.classList.add('loader');

const spinnerIcon = document.createElement('i');
spinnerIcon.id = 'spinner';
spinnerIcon.classList.add('fas', 'fa-spinner');

loaderDiv.appendChild(spinnerIcon);
function fetchFontsData() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:3000/google-fonts');
        const data = await response.json();
        resolve(data);
      } catch (error) {
        console.error('Error fetching fonts data:', error);
        reject(error);
      }
    });
  } 


fetchFontsData()
    .then(data => {
      fontsData = data; 
    });

// Get references to all textarea elements with the specified class
const textareas = document.querySelectorAll('.stage-textarea');

// Attach the event listener dynamically to each textarea
textareas.forEach(textarea => {
    textarea.addEventListener('input', resize);
});

// Define the resize function
function resize(event) {
    const textarea = event.target;
    textarea.style.height = "62px";
    let scrollHeight = textarea.scrollHeight;
    let style = window.getComputedStyle(textarea);
    let borderTop = parseInt(style.borderTop);
    let borderBottom = parseInt(style.borderBottom);
  
    textarea.style.height = (scrollHeight + borderTop + borderBottom) + "px";
}










export { loaderDiv, fontsData };
  