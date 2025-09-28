import './style.css'
import { getHours } from './clock';
import { loadTasks } from './loadTasks';
import { modalNewTasks } from './modal';
import { darkTheme } from './darkmode';
import { modalSaveExcludeTask } from './modal';
import { submitTask } from './task';


darkTheme();
modalNewTasks();
modalSaveExcludeTask();
submitTask();

window.addEventListener('load', loadTasks); //quando carregar a pagina nao excluir as tasks

setInterval(() => {
  getHours();
}, 1000)