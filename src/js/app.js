import { getData } from "./service.js";
import { renderTasks } from "./dom.js";

const containerPending = document.getElementById("container_task_pending");
const containerHold = document.getElementById("container_task_hold");
const containerprogress = document.getElementById("container_task_progress")
const containercompleted = document.getElementById("container_task_completed")

window.onload = async function () {
  const tasks = await getData();

  const pendingTasks = tasks.filter(task => task.status === "pending");
  const holdTasks = tasks.filter(task => task.status === "on-hold");
  const progressTasks = tasks.filter(task => task.status === "in-progress")
  const completedTasks = tasks.filter(task => task.status === "completed")

  renderTasks(pendingTasks, containerPending);
  renderTasks(holdTasks, containerHold);
  renderTasks(progressTasks, containerprogress);
  renderTasks(completedTasks, containercompleted);
};