/**
 * service.js - Handles all communication with the backend/database.
 * Contains functions to fetch, add, update, and delete tasks.
 */

const url = "http://localhost:3000/tasks";

/**
 * Fetch all tasks from the server.
 * @returns {Promise<Array>} List of task objects.
 */
export async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

/**
 * Add a new task to the server.
 * @param {Object} newTask - The task to be added.
 */
export async function addTask(newTask) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });
    if (!response.ok) throw new Error("Failed to save task");
  } catch (error) {
    console.error("Failed to save task:", error);
    alert("Error saving task");
  }
}

/**
 * Edit an existing task.
 * @param {Object} task - The task with updated values including its ID.
 */
export async function editTask(task) {
  try {
    const response = await fetch(`${url}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error("Failed to update task");
  } catch (error) {
    console.error("Failed to update task:", error);
    alert("Error updating task");
  }
}

/**
 * Delete a task from the server.
 * @param {number|string} id - The ID of the task to delete.
 */
export async function deleteTask(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) throw new Error("Failed to delete task");
  } catch (error) {
    console.error("Failed to delete task:", error);
    alert("Error deleting task");
  }
}
