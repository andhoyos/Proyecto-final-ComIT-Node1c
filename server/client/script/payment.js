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
