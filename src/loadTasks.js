import {createTaskElement} from './task'

export function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        const newTask = createTaskElement(taskData);
        taskList.appendChild(newTask);
    });
}