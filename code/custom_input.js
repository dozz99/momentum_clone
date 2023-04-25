//이름도 모름
//이름은 앎
//목적까지 앎



const signHolder = 'Hi, what can I call you?';
const todoHolder = 'What is your main focus for today?';

const holder = document.querySelector('.custom-input h1');
const form = document.querySelector('.custom-input form');
const greetingMessage = document.querySelector('#greeting');

const USERNAME_KEY = 'name';
const UNDISPLAY_KEY = 'hidden';
const FOCUS_KEY = 'main';

let canGreeting = true;         //사용자 데이터 캐싱 체크

function onSubmit(event) {
    event.preventDefault();

    const state = changeState();

    const input = form.querySelector('input');

    if (state == 0) {
        localStorage.setItem(USERNAME_KEY, input.value);
    }
    else if (state == 1) {
        localStorage.setItem(FOCUS_KEY, input.value);
    }


    input.value = '';

    changeState();

}

function switchInputFocusAndDisplay(isDislay){
    const mainTodo = document.querySelector('.focus-todo');
    mainTodo.classList.toggle(UNDISPLAY_KEY, !isDislay);

    const inputDiv = document.querySelector('.custom-input');
    inputDiv.classList.toggle(UNDISPLAY_KEY, isDislay);
}

function changeState() {
    const name = localStorage.getItem(USERNAME_KEY);
    const focus = localStorage.getItem(FOCUS_KEY);

    //이름도 모름
    if (name == null) {
        holder.classList.replace('sizable-small', 'sizable-big');
        holder.innerHTML = signHolder;
        return 0;
    }
    //이름만 앎
    else if (name != null && focus == null) {
        switchInputFocusAndDisplay(false);

        greetingMessage.innerHTML = `Good ${currentTimePeriod}, ${name}`;
        holder.classList.replace('sizable-big', 'sizable-small');
        holder.innerHTML = todoHolder;

        return 1;
    }
    //이름과 목적 둘 다 앎
    else {
        greetingMessage.innerHTML = `Good ${currentTimePeriod}, ${name}`;

        switchInputFocusAndDisplay(true);

        renderMainTodo(FOCUS_KEY, focus);
        return 2;
    }
}


form.addEventListener('submit', onSubmit);

changeState();
