//Problem: user interaction doesn't provide desired results
//Solution: add interactivity so the user can manage daily tasks.

let taskInput = document.getElementById("new-task"); // new-task
let addButton = document.getElementsByTagName("button")[0]; //first button
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
let completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List item

let createNewTaskElement = function (taskString) {
  // create List Item
  let listItem = document.createElement("li");
  // input checkbox
  let checkBox = document.createElement("input");
  // label
  let label = document.createElement("label");
  // input (text)
  //create button icons in added item buttons
  let editButton = document.createElement("button");
  let editIconElement = document.createElement("i");


  let editInput = document.createElement("input");
  // button.edit
  
  // button.delete
  let deleteButton = document.createElement("button");
  let deleteIconElement = document.createElement("i");
  // span for completion message
  let completionMessage = document.createElement("span");

  //Each element needs modified

  checkBox.type = "checkBox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  editIconElement.setAttribute("class", "fa-regular fa-pen-to-square");
  editButton.appendChild(editIconElement);

  
  deleteIconElement.setAttribute("class", "fa-regular fa-trash-can");
  deleteButton.appendChild(deleteIconElement);

  // Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

let addTask = function () {
  console.log("Add Task...");
  // Create a new list item with the text from the #new-task:
  let listItem = createNewTaskElement(taskInput.value, false); // Pass false for incomplete tasks
  // Append listItem to incompleteTaskHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";

  // Update pending tasks count and label
  pendingTasksCount++;
  updatePendingLabel();
};

//Edit an existing task
let editTask = function () {
  console.log("Edit Task...");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector("input[type=text]");
  let label = listItem.querySelector("label");

  let containsClass = listItem.classList.contains("editMode");

  // if class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the labels text
    editInput.value = label.innerText;
  }
  //Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
};

//Delete an existing task
let deleteTask = function () {
  console.log("Delete Task...");
  //Remove the parent list item from the ul
  let listItem = this.parentNode;
  let ul = listItem.parentNode;

  
    ul.removeChild(listItem);

  // Check if the deleted task was pending or completed
  if (ul.id === "incomplete-tasks") {
    pendingTasksCount--;
  } else if (ul.id === "completed-tasks") {
    completedTasksCount--;
  }

  updatePendingLabel();
  updateCompletedLabel();
};

// Modify the taskCompleted function
let taskCompleted = function () {
  console.log("Task Complete...");
  // When the Checkbox is checked
  // Append the task list item to the #completed-tasks ul
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
  // Remove editMode class to turn off edit mode
  listItem.classList.remove("editMode");
  // Hide the "Edit" and "Delete" buttons
  let editButton = listItem.querySelector("button.edit");
  let deleteButton = listItem.querySelector("button.delete");
  editButton.style.display = "none";
  // deleteButton.style.display = "none";

  // Update tasks count and labels
  pendingTasksCount--;
  completedTasksCount++;
  updatePendingLabel();
  updateCompletedLabel();

  let completionMessage = listItem.querySelector("span");
  completionMessage.innerText = "Task completed!";
};

// Modify the taskIncomplete function
let taskIncomplete = function () {
  console.log("Task Incomplete...");
  // When the checkbox is unchecked append to #incomplete-tasks
  let listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  // Show the "Edit" and "Delete" buttons
  let editButton = listItem.querySelector("button.edit");
  let deleteButton = listItem.querySelector("button.delete");
  editButton.style.display = "inline-block";
  deleteButton.style.display = "inline-block";

  // Update tasks count and labels
  pendingTasksCount++;
  completedTasksCount--;
  updatePendingLabel();
  // updateCompletedLabel();

  let completionMessage = listItem.querySelector("span");
  completionMessage.innerText = "";
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let pendingTasksCount = incompleteTasksHolder.children.length;
let completedTasksCount = completedTasksHolder.children.length;

let updatePendingLabel = function () {
  pendingLabel.innerText = `PENDING (${pendingTasksCount} tasks)`;
};

let updateCompletedLabel = function () {
  completedLabel.innerText = `COMPLETED (${completedTasksCount} tasks)`;
};

// Add these lines where you define your labels
let pendingLabel = document.getElementById("pending-label");
let completedLabel = document.getElementById("completed-label");

// Update the labels when the page loads
updatePendingLabel();
updateCompletedLabel();

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("Bind List item events");
  // select listitems chidlren
  let checkBox = taskListItem.querySelector('input[type="checkbox"]');
  let editButton = taskListItem.querySelector("button.edit");
  let deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTaskHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
