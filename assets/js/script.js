//Some basic code to access the needed elements and get the current date/time
let currentDay = dayjs()
let currentDayEl = $('#currentDay')
currentDayEl.text(currentDay.format('dddd MMM D, YYYY'))
let dplannerContainer = document.querySelector('#timeBlock-container')
const plannerContainer = $("#timeBlock-container")
const plannerChildren = plannerContainer.children()


//Was gonna go for bonus points by making overtime blocks but I gotta turn this in lol
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
//This is the function that updates the css class displaying if the time block is past present or future
const updateTimeBlocks = () => {

//loops through the timeBlocks (plannerChildren) every millisecond (i believe) checking the current hour to the id of the hour block
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

//This takes the plans and stores them in locaStorage
const savePlan = (e) => {
  const id = e.target.parentElement.getAttribute('id');
  const text = e.target.parentElement.querySelector('textarea').value
console.log(text)
  if(text === null || text === undefined){
    alert('Fill out event before saving')
  } else {
    localStorage.setItem(id, text.trim())
  }
}
//adds an event listener to each saveButton to execute savePlan function
for(let i = 0; i < plannerChildren.length; i++){

  const button = plannerChildren[i].querySelector('button')
  console.log(button)
  button.addEventListener('click', savePlan)
}

//Loads the saved plans to their respective timeblocks they were saved to from the localStorage
for(let i = 0; i < plannerChildren.length; i++){
  const textBox = plannerChildren[i].querySelector('textarea');
  const currentID = plannerChildren[i].getAttribute('id');
  const event = localStorage.getItem(currentID)
  if(event){
    textBox.value = event;
  }
}






updateTimeBlocks()