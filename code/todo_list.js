const TODOLIST_KEY = 'todo_list';
const CHECKBOX_KEY = 'checkbox';
const SPANTEXTLINE = 'line';
const MAIN_KEY = 'main';

const focusTodo = document.querySelector('.focus-todo ul');
const subTodo = document.querySelector('.sub-todo ul');
const subForm = document.querySelector('.sub-todo form');
const subTodoButton = document.querySelector('.rb-btn');


let todoList = [];
let mainTodo = { id: MAIN_KEY, text: null };


function onMouseOver(event) {
    const checkbox = event.target.querySelector('.' + CHECKBOX_KEY);
    const deleteBtn = event.target.querySelector('.delete-btn');

    if (checkbox == null || deleteBtn == null) return;

    if (deleteBtn.style.opacity == 0) {
        deleteBtn.style.opacity = 1;
    }

    if (checkbox.style.opacity == 0) {
        checkbox.style.opacity = 1;
    }

}

function onMouseLeave(event) {
    const checkbox = event.target.querySelector('.' + CHECKBOX_KEY);
    const deleteBtn = event.target.querySelector('.delete-btn');

    if (deleteBtn.style.opacity == 1) {
        deleteBtn.style.opacity = 0;
    }

    if (checkbox.style.opacity == 1) {
        checkbox.style.opacity = 0;
    }

}

function onRemoveTodo(event) {
    //엘리먼트 지우기
    const removeElement = event.target.parentElement;
    const removeId = removeElement.id;
    removeElement.remove();


    //데이터 지우기
    const filteredTodoList = todoList.filter((element) => element.id !== parseInt(removeId));
    todoList = filteredTodoList;
    saveTodoList();
}

function onRemoveMainTodo(event){
    const removeElement = event.target.parentElement;
    removeElement.remove();

    localStorage.removeItem(MAIN_KEY);

    changeState();
}

function onChangeChecked(event) {
    const textSpan = event.target.parentElement.querySelector('.todo-text');

    textSpan.classList.toggle(SPANTEXTLINE, this.checked);

    console.dir(textSpan);

}

function addSubTodo(todoText) {
    //리스트에 새로운 투두 데이터 추가
    const newToDo = { id: Date.now(), text: todoText };

    todoList.push(newToDo);

    renderTodo(newToDo);

    //로컬 데이터 저장
    saveTodoList();
}

function renderMainTodo(key, value) {
    // li 요소를 생성합니다.
    const liElem = document.createElement('li');
    liElem.classList.add('li-main');

    // checkbox 요소를 생성합니다.
    const checkboxElem = document.createElement('input');
    checkboxElem.type = CHECKBOX_KEY;
    checkboxElem.classList.add(CHECKBOX_KEY);

    // todo-text 요소를 생성합니다.
    const todoTextElem = document.createElement('span');
    todoTextElem.classList.add('todo-text');

    // delete-btn 요소를 생성합니다.
    const deleteBtnElem = document.createElement('button');
    deleteBtnElem.classList.add('delete-btn');
    deleteBtnElem.textContent = 'X';

    //버튼 초기화
    deleteBtnElem.style.opacity = 0;
    checkboxElem.style.opacity = 0;

    //데이터 태깅
    liElem.id = key;
    todoTextElem.textContent = value;

    //리스너 추가
    addTodosButtonListener(liElem, checkboxElem, deleteBtnElem, false);

    liElem.appendChild(checkboxElem);
    liElem.appendChild(todoTextElem);
    liElem.appendChild(deleteBtnElem);

    //전부 추가
    focusTodo.appendChild(liElem);

    console.dir(focusTodo);
}

function renderTodo(todoObject) {
    // li 요소를 생성합니다.
    const liElem = document.createElement('li');
    liElem.classList.add('li-sub');

    // checkbox 요소를 생성합니다.
    const checkboxElem = document.createElement('input');
    checkboxElem.type = CHECKBOX_KEY;
    checkboxElem.classList.add(CHECKBOX_KEY);

    // todo-text 요소를 생성합니다.
    const todoTextElem = document.createElement('span');
    todoTextElem.classList.add('todo-text');

    // delete-btn 요소를 생성합니다.
    const deleteBtnElem = document.createElement('button');
    deleteBtnElem.classList.add('delete-btn');
    deleteBtnElem.textContent = 'X';

    //버튼 초기화
    deleteBtnElem.style.opacity = 0;
    checkboxElem.style.opacity = 0;

    //데이터 태깅
    liElem.id = todoObject.id;
    todoTextElem.textContent = todoObject.text;

    //리스너 추가
    addTodosButtonListener(liElem, checkboxElem, deleteBtnElem);

    liElem.appendChild(checkboxElem);
    liElem.appendChild(todoTextElem);
    liElem.appendChild(deleteBtnElem);

    //전부 추가
    subTodo.appendChild(liElem);
}

function addTodosButtonListener(listElement, checkbox, deleteBtn, isSub = true) {
    listElement.addEventListener('mouseover', onMouseOver);
    listElement.addEventListener('mouseleave', onMouseLeave);

    checkbox.addEventListener('change', onChangeChecked);


    if (isSub) {
        deleteBtn.addEventListener('click', onRemoveTodo);
    }
    else {
        deleteBtn.addEventListener('click', onRemoveMainTodo);
    }
}

function saveTodoList() {
    localStorage.setItem(TODOLIST_KEY, JSON.stringify(todoList));
}

function LoadTodoList() {
    var loadObject = localStorage.getItem(TODOLIST_KEY);
    todoList = JSON.parse(loadObject);

    if (todoList == null) {
        return false;
    }
    else {
        return true;
    }
}

function LoadMainTodo() {
    const value = localStorage.getItem(MAIN_KEY);

    if (value != null) {
        mainTodo.text = value.text;
        return true;
    }
    else {
        return false;
    }


}

// function switchDisplay() {
//     focusTodo.parentElement.classList.toggle(UNDISPLAY_KEY);
//     const input = document.querySelector('.custom-input');
//     input.classList.toggle(UNDISPLAY_KEY);
//     input.querySelector('input').value = '';
// }

function onSubmit(event) {
    event.preventDefault();

    const input = subForm.querySelector('input');
    const value = input.value;
    input.value = '';

    addSubTodo(value);
}


subForm.addEventListener('submit', onSubmit);
subTodoButton.addEventListener('click', function() {
    console.dir(subTodo.parentElement);
    subTodo.parentElement.classList.toggle(UNDISPLAY_KEY);
});

if (LoadTodoList()) {
    todoList.slice(1).forEach(renderTodo);
}
else {
    todoList = [];
}

