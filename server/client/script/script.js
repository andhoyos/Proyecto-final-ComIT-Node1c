//funciones;
function disminuir(id) {
  const cantUnd = document.getElementById("cant" + id);
  if (cantUnd.innerHTML > 1) {
    cantUnd.innerHTML--;
  }
}

function incrementar(id) {
  const cantUnd = document.getElementById("cant" + id);
  cantUnd.innerHTML++;
}

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

  localStorage.setItem("item", addProduct);

  function removeProduct() {
    addProduct.remove();
  }

  function clearCar() {
    contentList.removeChild(addProduct);
  }

  function msgInt() {
    const msg = document.getElementById("msg" + id);
    msg.textContent = "producto agregado al carrito de compras";
    msg.style.background = "lime";
    msg.style.color = "brown";
  }

  function msgOut() {
    const msg = document.getElementById("msg" + id);
    msg.textContent = "";
    msg.style = "none";
  }
  setTimeout(msgOut, 1500);
  msgInt();
}

function ir(menu) {
  window.location.href = menu.options[menu.selectedIndex].value;
}

function listMenu() {
  document.getElementById("nav-list").style.display = "block";
}
