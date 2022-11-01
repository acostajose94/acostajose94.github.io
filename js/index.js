let orden = 0;

document.querySelector("#boton__down__js").addEventListener("click", () => {
  if (orden == 0) {
    document
      .getElementById("descripcion_id")
      .scrollIntoView({ behavior: "smooth" }, true);
    ++orden;
    console.log(orden);
  } else if (orden == 1) {
    document
      .getElementById("habilidades")
      .scrollIntoView({ behavior: "smooth" }, true);
    ++orden;
    console.log(orden);
  }
});

// let orden = 0;

// document
//   .getElementsByClassName("boton__down__js")
//   .addEventListener("click", () => {
//     if (orden == 0) {
//       document
//         .getElementById("descripcion_id")
//         .scrollIntoView({ behavior: "smooth" }, true);
//       ++orden;
//       console.log(orden);
//     } else if (orden == 1) {
//       document
//         .getElementById("descripcion_id")
//         .scrollIntoView({ behavior: "smooth" }, true);
//       ++orden;
//       console.log(orden);
//     } else if (orden == 2) {
//       document
//         .getElementById("descripcion_id")
//         .scrollIntoView({ behavior: "smooth" }, true);
//       ++orden;
//       console.log(orden);
//     } else if (orden == 3) {
//       document
//         .getElementById("descripcion_id")
//         .scrollIntoView({ behavior: "smooth" }, true);
//       ++orden;
//       console.log(orden);
//     } else if (orden == 4) {
//       document
//         .getElementById("descripcion_id")
//         .scrollIntoView({ behavior: "smooth" }, true);
//       ++orden;
//       console.log(orden);
//     }
//   });
