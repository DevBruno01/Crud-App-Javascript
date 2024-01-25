let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let data = [];

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    formValidation();
});


let formValidation = () =>{
    if(textInput.value === ""){
        console.log('failure')
        msg.innerHTML = "Task cannot be blank"
    }
    else{
        console.log('success')
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        (() =>{
            add.setAttribute("data-bs-dismiss","");
        })();
    }
};

let acceptData = () => {
    data.push(
        {
            'Text': textInput.value,
            'Date': dateInput.value,
            'Description' : textArea.value,
        }
    );

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();

};

let createTasks = () =>{
    tasks.innerHTML = "";
    data.map((x,y) =>{
        return (tasks.innerHTML += `
        <div id="${y}">
            <span class="fw-bold">${x.Text}</span>
            <span class="small text-secondary">${x.Date}</span>
            <p>${x.Description}</p>
            <span class="options">
                <i data-bs-toggle="modal" data-bs-target="#form" onClick="editTask(this)" class="fa-solid fa-pen-to-square"></i>
                <i onClick="deleteTask(this);createTasks()" class="fa-solid fa-trash"></i>
            </span>
        </div>`)
    });

    resetForm()
};

let deleteTask = (e) =>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (e) => {
        let selectedTask = e.parentElement.parentElement;
    
        textInput.value = selectedTask.children[0].innerHTML;
        dateInput.value = selectedTask.children[1].innerHTML;
        textArea.value = selectedTask.children[2].innerHTML;
    
        deleteTask(e);
}

let resetForm = () =>{
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();
