/** dom.js aca se manaje las llamadas a la bd y se manajen los sevicios.
 */

const url = "http://localhost:3000/tasks";

export async function getData() {
  debugger;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
