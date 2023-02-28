let secuenciaIA = []
let secuenciaUsuario = []
let puntos = 0;

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

function colorRandom(colores){
    let colorResaltado = colores[Math.floor(Math.random() * colores.length)].value;
    secuenciaIA.push(colorResaltado);
    return colorResaltado;
}

function encenderColor(){
    const colores = document.querySelectorAll('.cuadrado');
    let proximoColor = colorRandom(colores);
        setTimeout(proximoColor.classList.add('cuadradoEncendido'), 1000);
    secuenciaIA.push(proximoColor);
}

function compararArrays (array1, array2){
    let string1 = JSON.stringify(array1);
    let string2 = JSON.stringify(array2);
    return string1 === string2;
}

function manejarClic(){
    //target
    if(compararArrays(secuenciaIA, secuenciaUsuario)){

    }
}

/*
Llamar funciones sin paréntesis: son funciones de call back, van en los onclick u onsubmit.
Cuando haga clic en el botón, el navegador va a llamar a la función. No lo voy a hacer yo sino el navegador.
*/

function deshabilitar(boton){
    boton.onclick = function(){
        return;
    }
}

function bloquearUsuario(){
    setTimeout(deshabilitar(), 1000)
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