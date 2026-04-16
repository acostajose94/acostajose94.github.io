//variables
var imagen_URL = 'imagenes/';
URL_ANIMAL = 'https://palabras-aleatorias-public-api.herokuapp.com/animal/random';
URL_ALEATORIO = 'https://palabras-aleatorias-public-api.herokuapp.com/random';
URL_RESPALDO = 'https://pokeapi.co/api/v2/pokemon/';

// Estado del juego
let palabra = '';
let palabra_con_guiones = '';
let contador_errores = 1;
let letras_usadas = [];
let juego_activo = false;
let categoria_actual = '';

// Función para limpiar acentos
function limpiarTexto(texto) {
    return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Función para mostrar mensaje de error
function mostrarError(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<span style="color: #ff6b6b; font-size: 0.8rem;">${mensaje}</span>`;
    setTimeout(() => {
        if (juego_activo) {
            resultado.innerHTML = palabra_con_guiones;
        }
    }, 1500);
}

// Obtener palabra de API Animal
async function obtenerPalabraAnimal() {
    try {
        const response = await fetch(URL_ANIMAL);
        if (!response.ok) throw new Error('Error en API');
        const data = await response.json();
        return limpiarTexto(data.body.name);
    } catch (error) {
        console.log('API Animal falló, usando respaldo...');
        return obtenerPalabraPokemon();
    }
}

// Obtener palabra de API Pokemon (respaldo)
async function obtenerPalabraPokemon() {
    try {
        const numero = Math.floor(Math.random() * 150) + 1;
        const response = await fetch(URL_RESPALDO + numero);
        if (!response.ok) throw new Error('Error en API');
        const data = await response.json();
        return limpiarTexto(data.name);
    } catch (error) {
        console.log('API Pokemon falló, usando palabra local...');
        const palabras = ['gato', 'perro', 'casa', 'mesa', 'silla', 'libro', 'agua', 'fuego'];
        return palabras[Math.floor(Math.random() * palabras.length)];
    }
}

// Iniciar juego con categoría
async function iniciarJuego(categoria) {
    categoria_actual = categoria;
    juego_activo = false;
    letras_usadas = [];
    contador_errores = 1;
    
    if (categoria === 'animal') {
        palabra = await obtenerPalabraAnimal();
    } else {
        palabra = await obtenerPalabraPokemon();
    }
    
    // Validar que la palabra no esté vacía
    if (!palabra || palabra.length < 3) {
        palabra = 'javascript';
    }
    
    palabra_con_guiones = palabra.replace(/./g, "_ ");
    
    document.getElementById('palabra_correcta').value = palabra;
    document.getElementById('popup__inicio').classList.add('d-none');
    document.getElementById('popup-js').classList.add('d-none');
    document.getElementById('plantilla__juego-js').classList.remove('d-none');
    document.getElementById('pic').src = imagen_URL + '1.png';
    document.getElementById('resultado').innerHTML = palabra_con_guiones;
    document.getElementById('letra').value = '';
    document.getElementById('letra').focus();
    
    juego_activo = true;
    console.log('Palabra: ' + palabra);
}

// Reemplazar carácter en string
String.prototype.replaceAt = function(index, character) {
    return this.substring(0, index) + character + this.substring(index + character.length);
}

// Evento: botón Animal
document.querySelector('#palabra_animal').addEventListener('click', () => {
    iniciarJuego('animal');
});

// Evento: botón Pokemon
document.querySelector('#palabra_pokemon').addEventListener('click', () => {
    iniciarJuego('pokemon');
});

// Evento: verificar letra
document.querySelector('#verificar').addEventListener('click', verificarLetra);

// También permitir Enter
document.querySelector('#letra').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verificarLetra();
    }
});

// Limitar input a una letra
document.querySelector('#letra').addEventListener('input', (e) => {
    const valor = e.target.value;
    if (valor.length > 1) {
        e.target.value = valor.charAt(valor.length - 1);
    }
    e.target.value = valor.replace(/[^a-zA-Z]/g, '').toLowerCase();
});

function verificarLetra() {
    if (!juego_activo) {
        mostrarError('Selecciona una categoría primero');
        return;
    }
    
    const input = document.querySelector('#letra');
    let letra = input.value.trim().toLowerCase();
    
    // Validaciones
    if (!letra) {
        mostrarError('Ingresa una letra');
        return;
    }
    
    if (!/^[a-z]$/.test(letra)) {
        mostrarError('Solo letras (a-z)');
        return;
    }
    
    if (letras_usadas.includes(letra)) {
        mostrarError('Letra ya usada');
        return;
    }
    
    letras_usadas.push(letra);
    palabra = document.getElementById('palabra_correcta').value;
    let error = true;
    
    // Buscar letra en palabra
    for (let i = 0; i < palabra.length; i++) {
        if (palabra[i] === letra) {
            palabra_con_guiones = palabra_con_guiones.replaceAt(i * 2, letra);
            error = false;
        }
    }
    
    if (error) {
        contador_errores++;
        document.getElementById("pic").src = imagen_URL + contador_errores + '.png';
        
        if (contador_errores >= 7) {
            gameOver();
        }
    } else {
        // Verificar victoria
        if (palabra_con_guiones.indexOf('_') < 0) {
            victoria();
        }
    }
    
    document.querySelector('#resultado').innerHTML = palabra_con_guiones;
    input.value = '';
    input.focus();
}

function gameOver() {
    juego_activo = false;
    document.getElementById("popup-js").classList.remove("d-none");
    document.getElementById("popup__new").classList.add("d-none");
    document.getElementById("popup__reset").classList.remove("d-none");
    document.getElementById("imagen__final").src = 'imagenes/fin.png';
    document.getElementById("gif-js").classList.add("d-none");
}

function victoria() {
    juego_activo = false;
    document.getElementById("popup-js").classList.remove("d-none");
    document.getElementById("popup__new").classList.add("d-none");
    document.getElementById("popup__reset").classList.remove("d-none");
    document.getElementById("imagen__final").src = 'imagenes/victoria.png';
    document.getElementById("gif-js").classList.remove("d-none");
    document.getElementById("plantilla__juego-js").classList.remove("d-none");
    document.getElementById("popup").style.background = 'transparent';
}

function resetJuego() {
    juego_activo = false;
    letras_usadas = [];
    contador_errores = 1;
    palabra_con_guiones = '';
    document.getElementById("popup__new").classList.add("d-none");
    document.getElementById("popup__inicio").classList.remove("d-none");
    document.getElementById("popup__reset").classList.add("d-none");
    document.getElementById("popup-js").classList.remove("d-none");
    document.getElementById("gif-js").classList.add("d-none");
    document.getElementById("plantilla__juego-js").classList.add("d-none");
    document.getElementById("pic").src = imagen_URL + '1.png';
    document.getElementById("letra").value = '';
}

// Botón de bienvenida
document.querySelector('#popup__new').addEventListener('click', () => {
    document.getElementById("popup__new").classList.add("d-none");
    document.getElementById("popup__inicio").classList.remove("d-none");
});

// Botón Iniciar (en popup)
document.querySelector('#popup__new input[type="button"]').addEventListener('click', () => {
    // Ya hace el toggle
});

// Botones de reset
document.querySelector('#reset-js').addEventListener('click', resetJuego);
document.querySelector('#reset-js2').addEventListener('click', resetJuego);
