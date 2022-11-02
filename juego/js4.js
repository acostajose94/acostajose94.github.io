//variables
var imagen_URL='imagenes/';
URL_ANIMAL='https://palabras-aleatorias-public-api.herokuapp.com/animal/random';
URL_ALEATORIO='https://palabras-aleatorias-public-api.herokuapp.com/random';
URL_RESPALDO='https://pokeapi.co/api/v2/pokemon/';

//funcion palabra random y animal random
async function funcion_get_palabra(url) {
    fetch(URL_ANIMAL)
    .then(response => response.json())
    .then( 
        data =>{
         document.getElementById('palabra_correcta').value = data.body.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        });

}
//funcion respaldo api pokemon
async function funcion_get_palabra2(url) {
    fetch( url +   Math.floor(Math.random() * 10) + 1)
    .then(response => response.json())
    .then( 
        data =>{
         document.getElementById('palabra_2').value = data.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        });
        
}
//declaracion de variables
let palabra = document.getElementById('palabra_correcta').value;
let palabra_con_guiones=palabra.replace(/./g,"_ ");
let contador_errores=1;


//Buscar Letra en palabra
String.prototype.replaceAt=function(index, character) 
{ return this.substring(0, index) + character + this.substring(index + character.length); }

//jugar con palabra randon o animal
document.querySelector('#palabra_animal').addEventListener('click', ()=>{
    document.getElementById("popup__inicio").classList.add("d-none");
    document.getElementById("popup-js").classList.add("d-none");
    document.getElementById("plantilla__juego-js").classList.remove("d-none");

    let palabra = document.getElementById('palabra_correcta').value;
     palabra_con_guiones=palabra.replace(/./g,"_ ");
    //console.log(palabra +' '+ palabra_con_guiones);   
    // //Setear palabra con guiones
    document.querySelector('#resultado').innerHTML=palabra_con_guiones;
});


//jugar con palabra pokemon
document.querySelector('#palabra_pokemon').addEventListener('click', ()=>{
    document.getElementById("popup__inicio").classList.add("d-none");
    document.getElementById("popup-js").classList.add("d-none");
    document.getElementById("plantilla__juego-js").classList.remove("d-none");
    document.getElementById('palabra_correcta').value = document.getElementById('palabra_2').value;
    let palabra = document.getElementById('palabra_correcta').value;
     palabra_con_guiones=palabra.replace(/./g,"_ ");
    //console.log(palabra +' '+ palabra_con_guiones);   
    // //Setear palabra con guiones
    document.querySelector('#resultado').innerHTML=palabra_con_guiones;
});

//Verificar Letra
document.querySelector('#verificar').addEventListener('click', ()=>{
    const letra = document.querySelector('#letra').value;
    console.log(letra);
    let palabra = document.getElementById('palabra_correcta').value;
    let error=true;
    
    //reemplaza guiones
    for(const i in palabra){
        if(letra == palabra[i]){
            palabra_con_guiones=palabra_con_guiones.replaceAt(i*2,letra);
            
            error=false;
        }
    }
     
    if(error){
        console.log(contador_errores);
        contador_errores++;
        document.getElementById("pic").src =imagen_URL+contador_errores+'.png';
        if(contador_errores==7){
            console.log('game over');
            document.getElementById("popup-js").classList.remove("d-none");
            document.getElementById("popup__new").classList.add("d-none");
            document.getElementById("popup__reset").classList.remove("d-none");
            document.getElementById("imagen__final").src= 'imagenes/fin.png';

        }else if(contador_errores>7){
            console.log('El Juego ya termino');
            document.getElementById("popup-js").classList.remove("d-none");
            document.getElementById("popup__new").classList.add("d-none");
            document.getElementById("popup__reset").classList.remove("d-none");
            document.getElementById("imagen__final").src= 'imagenes/fin.png';
        }
    }
    else{
        if(palabra_con_guiones.indexOf('_')<0){
            console.log('ganaste');
            document.getElementById("popup-js").classList.remove("d-none");
            document.getElementById("popup__new").classList.add("d-none");
            document.getElementById("popup__reset").classList.remove("d-none");
            document.getElementById("imagen__final").src= 'imagenes/victoria.png';
            document.getElementById("gif-js").classList.remove("d-none");
            document.getElementById("plantilla__juego-js").classList.remove("d-none");
            document.getElementById("popup").style.background='transparent';
        }
         
    }
    //muestra resultado, limpia input para poner otra letra
    document.querySelector('#resultado').innerHTML=palabra_con_guiones;
    document.querySelector('#letra').value='';
    document.querySelector('#letra').focus();

});

//obtiene palabra inicial
funcion_get_palabra(URL_ANIMAL);
funcion_get_palabra2(URL_RESPALDO);
//Boton de Bienvenida
document.querySelector('#popup__new').addEventListener('click', ()=>{
    document.getElementById("popup__new").classList.add("d-none");
    document.getElementById("popup__inicio").classList.remove("d-none");
});

//Boton de reset
document.querySelector('#reset-js').addEventListener('click', ()=>{
    //obtiene palabra inicial
    funcion_get_palabra(URL_ANIMAL);
    funcion_get_palabra2(URL_RESPALDO);
    document.getElementById("popup__new").classList.add("d-none");
    document.getElementById("popup__inicio").classList.remove("d-none");
    document.getElementById("popup__reset").classList.add("d-none");
    document.getElementById("gif-js").classList.add("d-none");
    document.getElementById("pic").src =imagen_URL+'1'+'.png';
});
document.querySelector('#reset-js2').addEventListener('click', ()=>{
    //obtiene palabra inicial
    funcion_get_palabra(URL_ANIMAL);
    funcion_get_palabra2(URL_RESPALDO);
    document.getElementById("popup__new").classList.add("d-none");
    document.getElementById("popup__inicio").classList.remove("d-none");
    document.getElementById("popup__reset").classList.add("d-none");
    document.getElementById("gif-js").classList.add("d-none");
    document.getElementById("pic").src =imagen_URL+'1'+'.png';
});

