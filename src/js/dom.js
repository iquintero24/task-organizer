/**
 * dom.js - Handles DOM manipulation and modal interaction for task manager.
 */

// Select DOM elements
const overlay = document.getElementById('overlay');
const form = document.getElementById('taskForm');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const statusInput = document.getElementById('status');
const dueDateInput = document.getElementById('dueDate');
const titleModal = document.getElementById('tituloModal');
const deleteButton = document.getElementById('deleteButton');

// Show modal and set default status
export function showModal(defaultStatus = "pending") {
  overlay.style.display = "flex";
  form.reset();
  statusInput.value = defaultStatus;
  titleModal.textContent = "📝 Add New Task";
  deleteButton.classList.add("hidden");
}

// Show modal with data (edit mode)
export function showModalWithData(task) {
  overlay.style.display = "flex";
  titleInput.value = task.title;
  descriptionInput.value = task.description;
  statusInput.value = task.status;
  dueDateInput.value = task.dueDate;
  form.dataset.editingId = task.id;
  titleModal.textContent = "✏️ Edit Task";
  deleteButton.classList.remove("hidden");
}

// Hide modal
export function closeModal() {
  overlay.style.display = "none";
}

// Clear form inputs and remove edit mode
export function resetForm() {
  form.reset();
  form.removeAttribute('data-editing-id');
}

// 📦 Render tasks inside a specific container
export function renderTasks(tasks, container) {
  container.innerHTML = ""; // Clear any previous tasks

  tasks.forEach(task => {
    const taskCard = document.createElement("div");

    // 🧩 Add base and dynamic class for task status
    taskCard.classList.add("card__example", task.status);

    // 🏷️ Add task content
    taskCard.innerHTML = `
      <div class="title__and__time">
        <p class="title__card">${task.title}</p>
        <p class="time__card">${task.dueDate}</p>
      </div>
      <p class="description__title">${task.description}</p>
      <br>
    `;

    // 🖱️ Add click listener to edit task
    taskCard.addEventListener("click", () => {
      showModalWithData(task);
    });

    // 📌 Append task card to the container
    container.appendChild(taskCard);
  });
}