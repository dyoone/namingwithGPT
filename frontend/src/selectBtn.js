let type = '';
const namingStage = document.getElementById('naming');

namingStage.addEventListener('click', (event) => {
  // Check if the clicked element is a button
  if (event.target.tagName === 'BUTTON') {
    // Access the button text
    const buttonText = event.target.textContent;

    // Toggle the "selected" class on the clicked button
    event.target.classList.toggle('selected');

    // Update the type based on the selected button
    type = buttonText

    // Remove the "selected" class from the other buttons
    const buttons = Array.from(namingStage.querySelectorAll('button'));
    buttons.forEach((button) => {
      if (button !== event.target) {
        button.classList.remove('selected');
      }
    });
  }
});

export {type}
