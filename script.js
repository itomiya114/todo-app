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
if (!locallist) {
    locallist = {};
}

for (let key in locallist) {
    newTodo(key == null ? "untitled" : key, locallist[key].checked);

}
function newTodo(todoText = null, checked = false) {
    if (todoText == null) {
        // get todoText from user
        todoText = prompt("Add a todo!");
        if (!todoText) {
            return;
        }
        locallist[todoText] = { checked: false };
        localStorage.setItem("todo", JSON.stringify(locallist));
    }

    // create a todoElement with inputted todoText
    todoElement = makeTodo(todoText);
    if (checked) {
        todoElement.getElementsByClassName(classNames.TODO_CHECKBOX)[0].checked = checked;
    }
    // append todoElement to DOM list element
    render(todoElement, list)

    // count newtodo
    count(itemCountSpan, 1);

    // count unchecked todos
    if (!checked) {
        count(uncheckedCountSpan, 1);
    }
    // select todoElement's checkbox from the DOM
    const checkbox = todoElement.children[1];

    // if checkbox checked decrement unchecked todos count by one otherwise do the opposite
    checkbox.addEventListener("click", function (event) {
        let key = event.target.parentElement.children[0].innerHTML;

        if (locallist[key]) {
            locallist[key].checked = event.target.checked;
        }
        localStorage.setItem("todo", JSON.stringify(locallist));
        count(uncheckedCountSpan, event.target.checked ? -1 : 1);
    })

}

function deleteTodo(e) {
    console.log(e);
    if (!e.target.parentElement.children[1].checked) {
        count(uncheckedCountSpan, -1);
    }
    count(itemCountSpan, -1);

    delete locallist[event.target.parentElement.children[0].innerHTML];
    localStorage.setItem("todo", JSON.stringify(locallist));
    e.target.parentElement.remove();
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

    button.addEventListener("click", deleteTodo);
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
function count(element, num) {
    let count = Number(element.innerHTML)
    count += num;
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
