/** app.js es la conexion entre los servicios de la aplicacion 
 * y el dom aca se maneja la logica de los services y el dom.
*/

import "./dom.js"
import { renderTasks } from "./dom.js";
import { getData } from "./service.js";

window.onload = async function () {
  const tasks = await getData();
  renderTasks(tasks)// esta función accede al DOM
};