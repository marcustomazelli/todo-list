
export function modalNewTasks(){

    const btnNew = document.querySelector("#btnNew");
    const btnCancelModal = document.querySelector("#cancelModal");
    const modalNewTask = document.querySelector("#modalNew");

    btnNew.addEventListener("click", ()=>{
        modalNewTask.classList.remove('hidden');
        })


    btnCancelModal.addEventListener('click', () => {
        modalNewTask.classList.add('hidden');
    });
}

export function modalSaveExcludeTask(){

    const modalConcluir = document.querySelector("#modalConcluir");
    const modalExcluir = document.querySelector("#modalExcluir");
    const btnCancelarExclusao = document.querySelector("#cancelExcluir");
    const btnCancelarConclusao = document.querySelector("#cancelConfirm");
    
    btnCancelarConclusao.addEventListener('click', ()=>{
    modalConcluir.classList.add('hidden');
    })

    btnCancelarExclusao.addEventListener('click', ()=>{
    modalExcluir.classList.add('hidden');
    })

}