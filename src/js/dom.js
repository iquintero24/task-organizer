/** dom.js aca se manaje la parte del dom donde y como se
 * van a renderizar los datos necesarios para la app.
 */

export function renderTasks(tasks, container) {
  container.innerHTML = ""; // Limpiar una vez, no por cada tarea

  tasks.forEach((task) => {
    container.innerHTML += `
      <div class="card__example">
          <div class="title__and__time">
            <p class="title__card">${task.title}</p>
            <p class="time__card">${task.dueDate}</p>
          </div>

          <p class="description__title">
            ${task.description}
          </p>
      </div>	
      <br>
    `;
  });
}

