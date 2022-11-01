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

var headerHeight = document.getElementById("header__id").clientHeight;
var papa_id = document.getElementById("papa").clientHeight;
if (papa_id) {
  document.getElementById("papa").style.paddingTop = headerHeight + "px";
  document.getElementById("papa").style.paddingBottom = headerHeight + "px";
} else {
  console.log("Elemento no existe");
}
