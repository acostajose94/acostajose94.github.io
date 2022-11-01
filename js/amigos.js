var headerHeight = document.getElementById("header__id").clientHeight;

if (headerHeight) {
  document.getElementById("amigos").style.paddingTop = headerHeight + "px";
  document.getElementById("amigos").style.paddingBottom = headerHeight + "px";
} else {
  console.log("Elemento no existe");
}
