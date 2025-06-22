const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const totalEl = document.getElementById("total-tasks");
const completedEl = document.getElementById("completed-tasks");
const pendingEl = document.getElementById("pending-tasks");

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    const span = document.createElement("span");
    span.textContent = "\u00d7"; // close icon
    li.appendChild(span);

    inputBox.value = "";
    saveData();
    updateCounter();
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateCounter();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateCounter();
    }
});

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    updateCounter();
}

function updateCounter() {
    const tasks = listContainer.querySelectorAll("li");
    const completed = listContainer.querySelectorAll("li.checked");

    totalEl.textContent = tasks.length;
    completedEl.textContent = completed.length;
    pendingEl.textContent = tasks.length - completed.length;
}

showTasks();