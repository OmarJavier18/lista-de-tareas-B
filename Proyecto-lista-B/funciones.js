let tasks = [];

function addTask(task) {
tasks.push(task);
}

function deleteTask(taskId) {
tasks = tasks.filter((task) => task.id !== taskId);
}

function completeTask(taskId) {
tasks.forEach((task) => {
    if (task.id === taskId) {
    task.completed = true;
    }
});
}

function getTasks() {
return tasks;
}

module.exports = {
addTask,
deleteTask,
completeTask,
getTasks,
};