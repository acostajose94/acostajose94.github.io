let orden = 0;

document.querySelector("#boton__down__js").addEventListener("click", () => {
  if (orden == 0) {
    document
      .getElementById("descripcion_id")
      .scrollIntoView({ behavior: "smooth" }, true);
    document.getElementById("boton__up__js").classList.remove("d-none");
    document.getElementById("boton__down__js").classList.remove("bounce");
    ++orden;
    console.log(orden);
  } else if (orden == 1) {
    document
      .getElementById("habilidades")
      .scrollIntoView({ behavior: "smooth" }, true);
    ++orden;
    console.log(orden);
  } else if (orden == 2) {
    document
      .getElementById("habilidades__2")
      .scrollIntoView({ behavior: "smooth" }, true);
    ++orden;
    console.log(orden);
  } else if (orden == 3) {
    document
      .getElementById("proyectos__recientes")
      .scrollIntoView({ behavior: "smooth" }, true);
    ++orden;
    console.log(orden);
  } else if (orden == 4) {
    document
      .getElementById("footer")
      .scrollIntoView({ behavior: "smooth" }, true);
    ++orden;

    document.getElementById("boton__down__js").classList.add("d-none");
    console.log(orden);
  }
});
document.querySelector("#boton__up__js").addEventListener("click", () => {
  if (orden == 5) {
    --orden;
    document
      .getElementById("proyectos__recientes")
      .scrollIntoView({ behavior: "smooth" }, true);
    document.getElementById("boton__down__js").classList.remove("d-none");
    console.log(orden);
  } else if (orden == 4) {
    --orden;
    document
      .getElementById("habilidades__2")
      .scrollIntoView({ behavior: "smooth" }, true);
    // ++orden;
    console.log(orden);
  } else if (orden == 3) {
    --orden;
    document
      .getElementById("habilidades")
      .scrollIntoView({ behavior: "smooth" }, true);
    // ++orden;
    console.log(orden);
  } else if (orden == 2) {
    --orden;
    document
      .getElementById("descripcion_id")
      .scrollIntoView({ behavior: "smooth" }, true);
    // ++orden;
    console.log(orden);
  } else if (orden == 1) {
    --orden;
    document
      .getElementById("banner__js")
      .scrollIntoView({ behavior: "smooth" }, true);
    document.getElementById("boton__up__js").classList.add("d-none");
    // ++orden;
    console.log(orden);
  }
});
