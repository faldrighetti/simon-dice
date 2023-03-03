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

function perderPartida(){
    deshabilitarUsuario();
    actualizarEstado('Perdiste, tocá "Iniciar partida" para volver a jugar');
}
