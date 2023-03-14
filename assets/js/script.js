// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let dplannerContainer = document.querySelector('#timeBlock-container')
// const listOfEvents = localStorage.

let currentDay = dayjs()
let currentDayEl = $('#currentDay')
currentDayEl.text(currentDay.format('dddd MMM D, YYYY'))

const plannerContainer = $("#timeBlock-container")
const plannerChildren = plannerContainer.children()
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  });
  
const generateTimeBlock = () => {
    var timeBlock = $('<div>');
    timeBlock.addClass('row time-block');
    var timeLabel = $('<div>')
    timeLabel.addClass('col-2 col-md-1 hour text-center py-3')
    timeLabel.text('time')
    var textBox = $('<textarea>')
    textBox.addClass('col-8 col-md-10 description')
    textBox.attr('rows', '3')
    var saveButton = $('<button>');
    saveButton.addClass('btn saveBtn col-2 col-md-1');
    saveButton.attr('aria-label', 'save')
    var i = $('<i>')
    i.addClass('fas fa-save')
    i.attr('aria-hidden', 'true')

    plannerContainer.append(timeBlock)
    timeBlock.append(timeLabel)
    timeBlock.append(textBox)
    timeBlock.append(saveButton)
    saveButton.append(i)
}

const updateTimeBlocks = () => {


  var timeInterval = setInterval(function () {
   

    for(let i = 0; i < plannerChildren.length; i++){
      if (plannerChildren[i].getAttribute('id') < currentDay.format('HH')) {
        plannerChildren[i].classList.remove('present')
        plannerChildren[i].classList.remove('future')
        plannerChildren[i].classList.add('past')
      } else if (plannerChildren[i].getAttribute('id') > currentDay.format('HH')) {
        plannerChildren[i].classList.remove('present')
        plannerChildren[i].classList.remove('past')
        plannerChildren[i].classList.add('future')
      } else {
        plannerChildren[i].classList.remove('future')
        plannerChildren[i].classList.remove('past')
        plannerChildren[i].classList.add('present')
      }
    }

  }, 1);
}

const savePlan = (e) => {
  const id = e.target.parentElement.getAttribute('id');
  const text = e.target.parentElement.querySelector('textarea').value

  if(text == null || text == undefined){
    alert('Fill out event before saving')
  } else {
    localStorage.setItem(id, text.trim())
  }
}

for(let i = 0; i < plannerChildren.length; i++){

  const button = plannerChildren[i].querySelector('button')
  console.log(button)
  button.addEventListener('click', savePlan)
}

// for(let i = 0; i < plannerChildren.length; i++){
//   const textBox = plannerChildren[i].querySelector('textarea');
//   const currentID = plannerChildren[i].getAttribute('id');
//   const event = localStorage.getItem(currentID)
//   if(event){
//     textBox.text(event)
//   }
// }





console.log(plannerChildren[0].querySelector('textarea').value)

updateTimeBlocks()
console.log(plannerChildren[0].classList.remove())

console.log(localStorage.getItem('js'))