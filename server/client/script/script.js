//funciones;
/**
 * funcion que disminuye la cantidad de cada producto dando click en el icono (-)
 * @param {number} id recibe id de producto generado con handlebars
 */
function disminuir(id) {
  const cantUnd = document.getElementById("cant" + id);
  if (cantUnd.innerHTML > 1) {
    cantUnd.innerHTML--;
  }
}
/**
 * funcion que aumenta la cantidad de cada producto dando click en el icono (+)
 * @param {number} id recibe id de producto generado con handlebars
 */
function incrementar(id) {
  const cantUnd = document.getElementById("cant" + id);
  cantUnd.innerHTML++;
}
/**
 * funcion que lee los datos de los productos y los asigna a una variable
 * crea los elementos que recibiran los datos de los productos y los asigna a cada uno
 * crea las funciones de eliminar productos y de mostrar mensajes y las asigna a los elementos
 *
 * @param {number} id recibe id de producto
 */
function addToCard(id) {
  const name = document.getElementById("name" + id).textContent;
  const price = document.getElementById("price" + id).textContent;
  const cantUnd = document.getElementById("cant" + id).textContent;

  console.log("di click en en producto" + id);

  const btnClear = document.createElement("button");
  btnClear.classList.add("clear");
  btnClear.textContent = "X";
  btnClear.addEventListener("click", removeProduct);

  const spa = document.createElement("span");
  spa.textContent = `${cantUnd * price}`;

  const total = document.getElementById("total");
  total.innerHTML = Number(spa.textContent);

  const addProduct = document.createElement("li");
  addProduct.classList.add("product", "product" + id);
  addProduct.textContent = `${cantUnd} X ${name} - $`;
  addProduct.appendChild(spa);
  addProduct.appendChild(btnClear);

  const contentList = document.getElementById("contentlist");
  contentList.appendChild(addProduct);

  const btnPoint = document.getElementById("btnPoint");
  const formPoint = document.getElementById("formPoint");
  formPoint.appendChild(btnPoint);

  const btnCar = document.getElementById("clear-car");
  btnCar.addEventListener("click", clearCar);

  /**
   * funcion que elimina el producto seleccionado
   */
  function removeProduct() {
    addProduct.remove();
  }
  /**
   * funcion que elimina el contenido del carrito de compras
   */
  function clearCar() {
    contentList.removeChild(addProduct);
  }
  /**
   * funcion que muestra mensaje cuando se agrega producto al carrito
   */
  function msgInt() {
    const msg = document.getElementById("msg" + id);
    msg.textContent = "producto agregado al carrito de compras";
    msg.style.background = "lime";
    msg.style.color = "brown";
  }
  /**
   * funcion que elimina el mensaje ejecutando el setTimeout
   */
  function msgOut() {
    const msg = document.getElementById("msg" + id);
    msg.textContent = "";
    msg.style = "none";
  }
  setTimeout(msgOut, 1500);
  msgInt();
}
/**
 * funcion que hace llamado al get de cada categoria
 * @param {string} menu valor del option al seleccionar categoria
 */
function ir(menu) {
  window.location.href = menu.options[menu.selectedIndex].value;
}
/**
 * muestra lista de la barra de navegacion en pantalla de movil
 */
function listMenu() {
  document.getElementById("nav-list").style.display = "block";
}
