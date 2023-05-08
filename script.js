const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
let locallist = JSON.parse(localStorage.getItem("todo"));
let num = 0;
if (!locallist) {
  locallist = [];
}
locallist.forEach(todoItem => {

  newTodo(todoItem.todo == null ? "untitled" : todoItem.todo, todoItem.checked);
});
function newTodo(todoText = null, checked = false) {
  if (todoText == null) {
    // get todoText from user
    todoText = prompt("Add a todo!");
    if (!todoText) {
      return;
    }
    locallist.push({ todo: todoText, checked: false });
    localStorage.setItem("todo", JSON.stringify(locallist));
  }

  // create a todoElement with inputted todoText
  todoElement = makeTodo(todoText);
  if (checked) {
    todoElement.getElementsByClassName(classNames.TODO_CHECKBOX)[0].checked = checked;
  }
  todoElement.getElementsByClassName(classNames.TODO_CHECKBOX)[0].index = num;
  num++;
  // append todoElement to DOM list element
  render(todoElement, list)

  // count newtodo
  countNewTodo(itemCountSpan)

  // count unchecked todos
  if(!checked){
  countUncheckedTodo(uncheckedCountSpan)
  }
  // select todoElement's checkbox from the DOM
  const checkbox = todoElement.children[todoElement.children.length-2];

  // if checkbox checked decrement unchecked todos count by one otherwise do the opposite
  checkbox.addEventListener("click", function (event) {
    locallist[event.target.index].checked = event.target.checked;
    localStorage.setItem("todo", JSON.stringify(locallist));
    if (event.target.checked) {
      countCheckedTodo(uncheckedCountSpan)
    } else {
      countUncheckedTodo(uncheckedCountSpan)
    }
  })

}

const deleteTodo=(index)=>{
list.children[index].remove();
for(let i=index+1;i<list.length;i++){

}
localStorage.
}
// create todoElements
function makeTodo(todoText) {
  // create li
  const li = document.createElement("li")

  addStyle(classNames.TODO_ITEM, li)

  // create span
  const span = document.createElement("span")

  addStyle(classNames.TODO_TEXT, span)

  // create input and set it's type to checkbox
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox")

  addStyle(classNames.TODO_CHECKBOX, checkbox)
  const button = document.createElement("button");
  button.innerHTML = "delete";

  button.addEventListener("click",()=>{alert();});
  // add text to span
  span.textContent = todoText

  // append span to li
  render(span, li)

  // appent checkbox to li
  render(checkbox, li)
  render(button, li);
  // return todoElement
  return li

}


// append elements to the DOM
function render(element, destination) {
  destination.appendChild(element)
}


// count total todos
function countNewTodo(element) {
  count(element)
}


// increase unchecked todos count everytime new tod0 added
function countUncheckedTodo(element) {
  count(element)
}

// factor out common code for countNewTodo and countUncheckedTodo functions
function count(element) {
  let count = Number(element.innerHTML)
  count++
  element.innerHTML = count.toString()
}


// decrease unchecked todos count if certain element is checked
function countCheckedTodo(element) {
  let count = Number(element.innerHTML)
  count--
  element.innerHTML = count.toString()
}

// add css to html elements
function addStyle(style, element) {
  element.setAttribute("class", style)
}


/*********
// check if certain element is checked or not
function isChecked(element) {
  element.addEventListener("click", function(event) {
      return event.target.checked
  })
}
**********/
