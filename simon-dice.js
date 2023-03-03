let secuenciaIA = []
let secuenciaUsuario = []
let ronda = 0;

document.querySelector('#boton-inicio').onclick = iniciarPartida;

function iniciarPartida(){
    reiniciar();
    manejarRonda();
}

function reiniciar(){
    secuenciaIA = []
    secuenciaUsuario = []
    ronda = 0;
}

function obtenerColorRandom(colores){
    let colorResaltado = colores[Math.floor(Math.random() * colores.length)];
    secuenciaIA.push(colorResaltado);
    return colorResaltado;
}

function encenderColor(){
    const colores = document.querySelectorAll('.cuadrado');
    let proximoColor = obtenerColorRandom(colores);
    proximoColor.classList.add('cuadradoEncendido')
        setTimeout(proximoColor.classList.add('cuadradoEncendido'), 1000);
    secuenciaIA.push(proximoColor);
}

function compararArrays(array1, array2){
    let string1 = JSON.stringify(array1);
    let string2 = JSON.stringify(array2);
    return string1 === string2;
}

function manejarRonda(){
    actualizarEstado('Turno de la maquina');
    deshabilitarUsuario();

    const nuevoCuadro = obtenerColorRandom();
    secuenciaIA.push(nuevoCuadro);

    const retrasoJugador = (secuenciaIA.length + 1) * 1000;
    //Si la IA tiene n cuadros, el usuario va a poder jugar cuando pasen n+1 segundos

    secuenciaIA.forEach(function(cuadro, indice){
        const retraso = (indice + 1) * 1000;
        setTimeout(function(){
            encenderColor(cuadro);
        }, retraso);
    });

    setTimeout(function(){
        actualizarEstado('Turno del jugador');
        habilitarUsuario();
    }, retrasoJugador);

    secuenciaUsuario = [];
    ronda++;
    actualizarRonda(ronda);
}

function manejarClic(event){
    const cuadro = event.target;
    encenderColor(cuadro);
    secuenciaUsuario.push(cuadro);
    const cuadroMaquina = secuenciaIA[secuenciaUsuario.length -1];
    if (cuadro.id !== cuadroMaquina.id){
        perderPartida();
        return;
    }

    if(compararArrays(secuenciaIA, secuenciaUsuario)){
        deshabilitarUsuario();
        setTimeout(manejarRonda,1000);
    }
}

function actualizarEstado(estado){
    const $estado = document.querySelector('#estado');
    $estado.textContent = estado;
}

function actualizarRonda(ronda){
    const $ronda = document.querySelector('#ronda');
    $ronda.textContent = ronda;
}

function resaltarCuadro(cuadro){
    cuadro.style.opacity = 1;
    setTimeout(function(){
        cuadro.style.opacity = 0.5;
    }, 500);
}

function deshabilitarUsuario(){
    const $boton = document.querySelectorAll('.cuadrado');
    $boton.forEach(function(cuadro){
        cuadro.onclick = function(){
            console.log('bloqueado');
        }
    })
}

function habilitarUsuario(){
    const cuadradoHabilitado = document.querySelectorAll('.cuadrado')
    cuadradoHabilitado.forEach(function($cuadro) {
        $cuadro.onclick = manejarClic;
    });
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

function perderPartida(){
    deshabilitarUsuario();
    actualizarEstado('Perdiste, tocá "Iniciar partida" para volver a jugar');
}

/*
SI Armar 4 rectángulos de colores
SI Asignarlos como botones del juego
SI Botón de empezar, para elegir el cuadrado random 
Declarar dos arrays: 
-uno vacío de lo que hace el jugador (1)
-el otro vacío, pero que al empezar se le elige un cuadrado random (con un timer se le cambia el color a 
    uno más claro por un segundo). Si el clic es correcto, se elige otro random y así. (2)
Al hacerle clic al correcto, se hace un push al array 1
Si se le da el clic al equivocado, sale un mensaje "Perdiste!". No hay push ni nada porque muere el juego ahí. 
Se pone otro mensaje de "Hiciste X puntos" (contador += 1) y botón para reiniciar.

2- Hacer formularios anteriores en CSS con bootstrap, más paquetes json
*/