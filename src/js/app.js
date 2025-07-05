// ✅ app.js (English version)
import { getData, addTask, editTask, deleteTask } from './service.js';
import { renderTasks, showModal, closeModal, resetForm, showModalWithData } from './dom.js';

const containerPending = document.getElementById("container_task_pending");
const containerHold = document.getElementById("container_task_hold");
const containerProgress = document.getElementById("container_task_progress");
const containerCompleted = document.getElementById("container_task_completed");

async function loadAndRenderTasks() {
  const tasks = await getData();
  renderTasks(tasks.filter(t => t.status === 'pending'), containerPending);
  renderTasks(tasks.filter(t => t.status === 'on-hold'), containerHold);
  renderTasks(tasks.filter(t => t.status === 'in-progress'), containerProgress);
  renderTasks(tasks.filter(t => t.status === 'completed'), containerCompleted);
}

window.onload = loadAndRenderTasks;

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.openModalButton').forEach(button => {
    button.addEventListener('click', () => {
      const status = button.dataset.status;
      showModal(status);
    });
  });

  const closeBtn = document.getElementById('closeButton');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  const deleteBtn = document.getElementById('deleteButton');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', async () => {
      const id = document.getElementById('taskForm').dataset.editingId;
      if (id) {
        await deleteTask(id);
        closeModal();
        resetForm();
        await loadAndRenderTasks();
      }
    });
  }
});

document.getElementById('taskForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const editingId = form.dataset.editingId;

  const newTask = {
    title: document.getElementById('title').value.trim(),
    description: document.getElementById('description').value,
    status: document.getElementById('status').value,
    dueDate: document.getElementById('dueDate').value
  };

  const existingTasks = await getData();

  const duplicateTitle = existingTasks.some(t => {
    const sameTitle = t.title.trim().toLowerCase() === newTask.title.toLowerCase();
    const isDifferentTask = editingId ? t.id != editingId : true;
    return sameTitle && isDifferentTask;
  });

  if (duplicateTitle) {
    alert('⚠️ A task with this title already exists.');
    return;
  }

  if (editingId) {
    newTask.id = Number(editingId);
    await editTask(newTask);
  } else {
    await addTask(newTask);
  }

  form.removeAttribute('data-editing-id');
  closeModal();
  resetForm();
  await loadAndRenderTasks();
});
