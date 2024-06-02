// function myFunction(event) {
//   var y = parseInt(event.deltaY);
//   console.log(y);
//   if (y == 125) {
//     window.location.hash = "#descripcion_id";
//     document
//       .getElementById("descripcion_id")
//       .scrollIntoView({ behavior: "smooth" });
//   }
// }
var headerHeight = document.getElementById("header__id").clientHeight+10;

if (headerHeight) {
  document.getElementById("estudios").style.paddingTop = headerHeight + "px";
  document.getElementById("estudios").style.paddingBottom = headerHeight + "px";
} else {
  console.log("Elemento no existe");
}
