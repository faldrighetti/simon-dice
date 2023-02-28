let secuenciaIA = []
let secuenciaUsuario = []
let ronda = 0;

function reiniciar(){
    secuenciaIA = []
    secuenciaUsuario = []
    ronda = 0;
}

const botonAzul = document.querySelector('#azul');
const botonVerde = document.querySelector('#verde');
const botonRojo = document.querySelector('#rojo');
const botonAmarillo = document.querySelector('#amarillo');

botonAzul.onclick = function(){
    secuenciaUsuario.push('azul');
    console.log(secuenciaUsuario)
}

botonVerde.onclick = function(){
    secuenciaUsuario.push('verde');
    console.log(secuenciaUsuario)
}

botonRojo.onclick = function(){
    secuenciaUsuario.push('rojo');
    console.log(secuenciaUsuario)
}

botonAmarillo.onclick = function(){
    secuenciaUsuario.push('amarillo');
    console.log(secuenciaUsuario)
}

function obtenerColorRandom(colores){
    let colorResaltado = colores[Math.floor(Math.random() * colores.length)].value;
    secuenciaIA.push(colorResaltado);
    return colorResaltado;
}

function encenderColor(){
    const colores = document.querySelectorAll('.cuadrado');
    let proximoColor = obtenerColorRandom(colores);
        setTimeout(proximoColor.classList.add('cuadradoEncendido'), 1000);
    secuenciaIA.push(proximoColor);
}

function compararArrays (array1, array2){
    let string1 = JSON.stringify(array1);
    let string2 = JSON.stringify(array2);
    return string1 === string2;
}

function manejarRonda(){
    actualizarEstado('Turno de la maquina')
    deshabilitarUsuario();

    const nuevoCuadro = obtenerColorRandom()
    secuenciaIA.push(nuevoCuadro);

    const retrasoJugador = (secuenciaIA.length + 1) * 1000;
    //Si la IA tiene n cuadros, el usuario va a poder jugar cuando pasen n+1 segundos

    secuenciaIA.forEach(function(cuadro, indice){
        const retraso = (indice + 1) * 1000;
        setTimeout(function(){
            encenderColor(cuadro);
        }, retraso)
    })

    setTimeout(function(){
        actualizarEstado('Turno del jugador')
        habilitarUsuario();
    }, retrasoJugador);

    secuenciaUsuario = [];
    ronda++;
    //actualizarRonda(ronda);
}

function manejarClic(){
    //target
    if(compararArrays(secuenciaIA, secuenciaUsuario)){
 
    }
}

function actualizarEstado(estado){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
}

/*
Llamar funciones sin paréntesis: son funciones de call back, van en los onclick u onsubmit.
Cuando haga clic en el botón, el navegador va a llamar a la función. No lo voy a hacer yo sino el navegador.
*/

function deshabilitarUsuario(boton){
    boton.onclick = function(){
        return;
    }
}

function bloquearUsuario(){
    setTimeout(deshabilitarUsuario(/*Acá tiene que haber un parámetro!*/), 1000)
}

function habilitarUsuario(){

}

function mostrarPuntos(){
    return puntos*10;
}

function continuarPartida(){
    if(compararArrays(secuenciaIA, secuenciaUsuario)){
        encenderColor();
    }
    secuenciaUsuario = [];
}

function fallar(){


    mostrarBotonReiniciar();
}

function mostrarBotonReiniciar(){
    const $botonReiniciar = document.querySelector('#reiniciar');
    $botonReiniciar.style.display = 'flex'
}


/*

Armar 4 rectángulos de colores
Asignarlos como botones del juego
Botón de empezar, para elegir el cuadrado random 
Declarar dos arrays: 
-uno vacío de lo que hace el jugador (1)
-el otro vacío, pero que al empezar se le elige un cuadrado random (con un timer se le cambia el color a 
    uno más claro por un segundo). Si el clic es correcto, se elige otro random y así. (2)
Al hacerle clic al correcto, se hace un push al array 1
Si se le da el clic al equivocado, sale un mensaje "Perdiste!". No hay push ni nada porque muere el juego ahí. 
Se pone otro mensaje de "Hiciste X puntos" (contador += 1) y botón para reiniciar.

2- Hacer formularios anteriores en CSS con bootstrap, más paquetes json

3- Volver a ver clase 8
*/