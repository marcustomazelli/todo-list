import './style.css'

const btnNew = document.querySelector("#btnNew");
const btnCancelModal = document.querySelector("#cancelModal");
const modalNewTask = document.querySelector("#modalNew");
const form = document.querySelector("#taskForm");
const taskList = document.querySelector("#taskList");
const modalConcluir = document.querySelector("#modalConcluir");
const modalExcluir = document.querySelector("#modalExcluir");
const btnConfirmarExclusao = document.querySelector("#excluir");
const btnCancelarExclusao = document.querySelector("#cancelExcluir");
const btnConfirmarConclusao = document.querySelector("#concluir");
const btnCancelarConclusao = document.querySelector("#cancelConfirm");
const btnDarkMode = document.querySelector("#darkModeToggle");
const html = document.documentElement;

localStorage.setItem("darkMode", false);

btnDarkMode.addEventListener("click", ()=>{
  const darkMode = localStorage.getItem('darkMode') === 'true';
  const moon = document.querySelector("#moon");
  const sun = document.querySelector("#sun");
  
  // Toggle darkMode no localStorage
  localStorage.setItem('darkMode', !darkMode);
  
  // Toggle classe dark no html
  html.classList.toggle("dark");
  
  // Toggle classes dos ícones
  moon.classList.toggle('text-black');
  moon.classList.toggle('text-yellow-300');
  sun.classList.toggle('text-yellow-300');
  sun.classList.toggle('text-black');
})



btnNew.addEventListener("click", ()=>{
    modalNewTask.classList.remove('hidden');
})


btnCancelModal.addEventListener('click', () => {
  modalNewTask.classList.add('hidden');
});

// carrega as tarefas salvas e mostra na tela
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskData => {
        const newTask = createTaskElement(taskData);
        taskList.appendChild(newTask);
    });
}

window.addEventListener('load', loadTasks); //quando carregar a pagina nao excluir as tasks

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const dataAtual = new Date();

    const taskData = {
        id: Date.now(), //gambiarra de um id pelo date.now 
        name: document.querySelector("#taskName").value,
        description : document.querySelector("#taskDescription").value,
        time: dataAtual.toLocaleDateString('pt-BR'),
        status: "☑️" //html nao estava pegando o codigo do emoji, tive q copiar e colar
    }

    // recupera as tarefas existentes ou cria um array vazio
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // add a nova tarefa ao array
    tasks.push(taskData);
    
    // salva o array atualizado no localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    const newTask = createTaskElement(taskData);
    taskList.appendChild(newTask);
    
    taskForm.reset();
    modalNewTask.classList.add('hidden');

})

function createTaskElement(taskData) {
  const taskDiv = document.createElement('div');
  taskDiv.className = 'flex flex-col gap-2 px-6 mb-2';
  
  taskDiv.innerHTML = `
    <div class="dark:text-white p-4 rounded-lg flex items-center justify-between task border-gray-400 hover:shadow-lg shadow-xs">
      <p class="w-32 truncate" title="${taskData.name}">${taskData.name}</p>
      <p class="w-32 truncate" title="${taskData.description}">${taskData.description}</p>
      <p class="w-24">${taskData.time}</p>
      <p class="w-20 text-center">${taskData.status}</p>
      <div class="flex items-center justify-between gap-3">
        <div class="gap rounded-md">
          <button class="px-2 py-1 btn-exclude"><i class="fa-solid fa-trash text-red-300"></i></button>
        </div>
        <div class="border-gray-500 rounded-md shadow-sm">
          <button class="px-2 py-1 btn-done">conclude</button>
        </div>
      </div>
    </div>
  `;
    
    const btnExcluir = taskDiv.querySelector('.btn-exclude');
    const btnConcluir = taskDiv.querySelector('.btn-done');


    btnExcluir.addEventListener('click', () => {
        modalExcluir.classList.remove('hidden');
        taskDiv.setAttribute('data-task-id', taskData.id);
    });

    btnConcluir.addEventListener('click', () => {
        modalConcluir.classList.remove('hidden');
        taskDiv.setAttribute('data-task-id', taskData.id);
    });

    btnConfirmarExclusao.addEventListener('click', () => {
        const taskId = taskDiv.getAttribute('data-task-id');
    
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.id !== parseInt(taskId)); //o filter cria um novo array, recebe um arrow dizendo que o novo array só vai ter as tasks diferentes do id que selecionamos
    

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    
        document.querySelector(`[data-task-id="${taskId}"]`).remove();
        modalExcluir.classList.add('hidden');
    });

    btnConfirmarConclusao.addEventListener('click', () => {
        const taskId = taskDiv.getAttribute('data-task-id');
    
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
    
        tasks[taskIndex].status = '✅';
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        
        //taskElement.firstElementChild.classList.add('text-green-800', 'border-green-800'); // div com classe 'task'
        taskElement.firstElementChild.children[3].textContent = '✅'; // quarto <p>
    
        modalConcluir.classList.add('hidden');
    });

  return taskDiv;
}

btnCancelarConclusao.addEventListener('click', ()=>{
    modalConcluir.classList.add('hidden');
})

btnCancelarExclusao.addEventListener('click', ()=>{
    modalExcluir.classList.add('hidden');
})

import { getHours } from './clock';

setInterval(() => {
  getHours()
}, 1000)