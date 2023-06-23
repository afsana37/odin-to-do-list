// Define an array to store the to-do lists
let lists = [];

// Function to add a new task
function addTask(event) {
  event.preventDefault();

  // Get the input values
  const listTitle = document.getElementById("list-title").value;
  const taskName = document.getElementById("task-name").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;
  const progress = document.getElementById("progress").value;

  // Create a new task object
  const task = {
    name: taskName,
    dueDate: dueDate,
    priority: priority,
    progress: progress
  };

  // Find the list with the given title or create a new one
  let list = lists.find(list => list.title === listTitle);
  if (!list) {
    list = {
      title: listTitle,
      tasks: []
    };
    lists.push(list);
  }

  // Add the task to the list
  list.tasks.push(task);

  // Clear the input fields
  document.getElementById("task-name").value = "";
  document.getElementById("due-date").value = "";

  // Render the to-do lists
  renderLists();
}

// Function to delete a task
function deleteTask(listIndex, taskIndex) {
  lists[listIndex].tasks.splice(taskIndex, 1);
  renderLists();
}

// Function to render the to-do lists
function renderLists() {
  const listContainer = document.getElementById("list-container");
  listContainer.innerHTML = "";

  lists.forEach((list, listIndex) => {
    const listCard = document.createElement("div");
    listCard.classList.add("list-card");

    const listTitle = document.createElement("h2");
    listTitle.textContent = list.title;

    listCard.appendChild(listTitle);

    const taskList = document.createElement("ul");

    list.tasks.forEach((task, taskIndex) => {
      const taskItem = document.createElement("li");

      const taskName = document.createElement("p");
      taskName.textContent = `Task: ${task.name}`;

      const dueDate = document.createElement("p");
      dueDate.textContent = `Due Date: ${task.dueDate}`;

      const priority = document.createElement("p");
      priority.textContent = `Priority: ${task.priority}`;

      const progress = document.createElement("p");
      progress.textContent = `Progress: ${task.progress}`;

      taskItem.appendChild(taskName);
      taskItem.appendChild(dueDate);
      taskItem.appendChild(priority);
      taskItem.appendChild(progress);

      // Set color based on priority
      if (task.priority === "low") {
        taskItem.style.backgroundColor = "#ebe84a";
      } else if (task.priority === "medium") {
        taskItem.style.backgroundColor = "#FDEBD0";
      } else if (task.priority === "high") {
        taskItem.style.backgroundColor = "#f85a2a";
      }

      // Delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteTask(listIndex, taskIndex);
      });
      taskItem.appendChild(deleteButton);

      taskList.appendChild(taskItem);
    });

    listCard.appendChild(taskList);
    listContainer.appendChild(listCard);
  });
}

// Attach event listener to the form submit event
document.getElementById("add-list-form").addEventListener("submit", addTask);
