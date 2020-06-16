/**funcion que crea el contenido de las opciones de pago y se lo asigna al onclick
 *
 * @param {string} id id de boton al que se da click(1:mp 2:ef)
 */
function pago(id) {
  const infoPago = document.getElementById("infoPago");

  const point = document.createElement("div");
  if (id == 1) {
    const msgMp = document.createElement("h2");
    msgMp.textContent = "Escanea el codigo para procesar el pago";
    const img = document.createElement("img");
    img.src = "img/qr.png";

    point.appendChild(msgMp);
    point.appendChild(img);
  } else {
    const msgEfe = document.createElement("h3");
    msgEfe.textContent = "Nuestro delivery recibira su pago";
    point.appendChild(msgEfe);
  }
  infoPago.appendChild(point);
}
