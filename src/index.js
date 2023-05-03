/* eslint-disable import/no-mutable-exports *//* eslint-disable import/no-cycle */

import './style.css';
import { shop } from './modules/storage.js';
import { addnewTask } from './modules/task.js';
import { myupdate } from './modules/update.js';
import { erase } from './modules/delete.js';
import { view, cleaning } from './modules/check.js';

const addmyButton = document.querySelector('.fa-arrow-right-to-bracket');
export const toodoo = document.querySelector('.toodoo');
export const lisNot = document.querySelector('.lisNot');
export const funyTasks = document.querySelector('.allactivity');
const cleartext = document.querySelector('.cleartext');

export let mytasks = [];

let descrit;
let myCheckBox;

export const displayMYtasks = () => {
  mytasks.forEach((task, i) => {
    const taskMypane = document.createElement('div');
    taskMypane.className = 'taskpane';

    const topMyLeft = document.createElement('div');
    topMyLeft.className = 'topleft';

    const topmyRight = document.createElement('div');
    topmyRight.className = 'topright';

    const middle = document.createElement('div');
    middle.className = 'leftright';

    if (i % 2 === 0) middle.classList.add('back-color');

    const myCheck = document.createElement('input');
    myCheck.className = 'myCheck';
    myCheck.setAttribute('type', 'checkbox');
    myCheck.setAttribute('id', `${task.index}`);
    if (task.completed === true) {
      myCheck.checked = true;
    }

    const descripts = document.createElement('p');
    descripts.textContent = task.descripts;
    descripts.className = 'descripts';
    descripts.setAttribute('contenteditable', 'true');

    const mytrash = document.createElement('i');
    mytrash.className = 'fa-solid fa-trash-can fa-beat';

    const joint = document.createElement('i');
    joint.className = 'fa-solid fa-ellipsis-vertical';

    topMyLeft.append(myCheck, descripts, mytrash);
    topmyRight.appendChild(joint);
    middle.append(topMyLeft, topmyRight);

    const dorector = document.createElement('hr');

    taskMypane.append(middle, dorector);

    funyTasks.appendChild(taskMypane);

    shop();

    topMyLeft.addEventListener('nymousse', () => {
      mytrash.style.display = 'block';
      joint.style.display = 'block';
    });

    topMyLeft.addEventListener('mouseleave', () => {
      mytrash.style.display = 'block';
      joint.style.display = 'block';
    });

    descripts.addEventListener('input', () => {
      descrit = descripts.textContent;
      myupdate(descrit, i);
    });

    mytrash.addEventListener('click', () => {
      erase(i);
    });

    myCheck.addEventListener('change', () => {
      myCheckBox = myCheck;
      view(i, myCheckBox);
    });
  });
};

addmyButton.addEventListener('click', addnewTask);

window.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') addnewTask();
});

window.onload = () => {
  mytasks = JSON.parse(localStorage.getItem('mytasks'));
  if (mytasks) {
    displayMYtasks();
  } else {
    mytasks = [];
  }
};

cleartext.addEventListener('click', cleaning);

export const displaymyTasksCaller = (gem) => {
  if (gem.length === 0) {
    mytasks = [];
    shop();

    funyTasks.innerHTML = '';
  } else {
    mytasks = gem.map((mapped, i) => ({
      descripts: `${mapped.descripts}`,
      index: `${i + 1}`,
      completed: false,
    }));
    funyTasks.innerHTML = '';
    displayMYtasks();
  }
};