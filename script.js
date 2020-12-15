const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})


containers.forEach(container => {
  container.addEventListener('dragover', e => {
    // to allow drop beacuase we default get (disabled)
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    // no next element => push to the list 
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      // insert before the next element
      container.insertBefore(draggable, afterElement)
    }
  })
})

// get next element
function getDragAfterElement(container, y) {
  // querySelector not returing an array that's why => [...]
  // get all element except the draging one :not(.dragging)
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    // box.top - box.height / 2 => box center
    // and distance beteween box center and mouse is below :)
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
    // intial value must be the largest possible number to be sure that it is < Mous Y position 
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

// maybe using this is better to append many item??
//  ev.dataTransfer.setData("key", ev.target.id); is better to transform all child?
// var data = ev.dataTransfer.getData("key");
// w3schhoole example 
// https://www.w3schools.com/html/html5_draganddrop.asp