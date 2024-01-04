
document.addEventListener("DOMContentLoaded", ()=> {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const tasksList = document.getElementById("taskList");

    //Checling if there are tasks in local storage
    let tasks = [];
    function fetchTasks() {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    }
    
    showTasks();

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({"text": taskText, "completed": false});
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
            taskInput.value = "";
        }
    });

    //Render tasks
    function showTasks() {
        fetchTasks();
        taskList.innerHTML = "";
        tasks.forEach((task, index)=> {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
            <input type="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button data-index="${index}">Delete</button>`;
            tasksList.appendChild(taskItem);
        });
    }

    //To handle checkbocks clicks
    tasksList.addEventListener("click", (event) => {
        if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
            const index = event.target.dataset.index;
            console.log("Index is: " + index)
            tasks[index].completed = event.target.checked;
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    });

    //Function to handle delete button tasks
    tasksList.addEventListener("click", (event) => {
        
        if (event.target.tagName === "BUTTON") {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            console.log("index is " + index + " and tasks are below")
            console.log(tasks);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showTasks();
        }
    });
});