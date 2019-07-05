'use strict';

function main() {

  var mainElement = document.querySelector('#enlace_paginas');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  };

  function createSplashScreen() {
    var splashScreen = buildDom(`
      <section class="pagina_inicio">
        <h1>Pang Kids</h1>
        <h2>Ingrese su nombre:</h2>
        <input id="input_nombre" type="text">
        <button class="restart">Start Game</button>
      </section>  
    `);

    var startButton = document.querySelector('button');
    startButton.addEventListener('click', function() { createGameScreen() });
  };

  function createGameScreen(nombreJugador) {
    if (!nombreJugador) {
      var campoDeTexto = document.querySelector('#input_nombre');
      nombreJugador = campoDeTexto.value;
    }
 
    var gameScreen = buildDom(`
    <section class="pagina_principal">
        <h1 class="titulo">PANG KIDS</h1>
    
      <contenedor>
    <h2 class='marcadores'>Numero de vidas:</h2><p id="n_vidas"></p>
    <h2 class='marcadores'>Puntuacion:</h2><p id="n_puntos"></p>
    </contenedor>
    <section class="canvas-container">
      <canvas></canvas>
    </section> 
    `);
    
    var container = document.querySelector('.canvas-container');
    var canvasElement = document.querySelector('canvas');
    canvasElement.width = container.offsetWidth;
    canvasElement.height = container.offsetHeight;

    var gameInstance = new Game(canvasElement, nombreJugador);

    gameInstance.gameOverCallback(createGameOverScreen);

    gameInstance.startGame();
    function getCursorPosition(canvasElement, event) {
      const rect = canvasElement.getBoundingClientRect()
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      //console.log("x: " + x + " y: " + y)
      gameInstance.mouseClickEvent(x, y);
  }
  
    canvasElement.addEventListener('click', function(event) {
      getCursorPosition(canvasElement,event);
    });
  }

  function createGameOverScreen() {
    let playerName = this.player.nombre;
    var gameOverScreen = buildDom(`
      <section class="pagina_final">
       <h1 class="over">Game Over</h1>
      <h2 class="risa1">JA, JA, JA,...</h2><h2><p class="jugador"> ${this.player.nombre}</p> Mejor suerte la proxima vez</h2>
      <p id="n_puntos">Tu puntuación es: ${this.contad_puntos}. Intenta mejorarla</p>
      <h2 class="risa2">.....,AJ, AJ, AJ</h2><h2>
      <h2 class="risa3">JA, JA, JA,...</h2><h2>
      <h2>¿Quieres volver a jugar?</h2>
      <button class="restart"t>Restart</button>
      <h2 class="risa4">JA, JA, JA,...</h2><h2>
      <h2 class="risa5">JA, JA, JA,...</h2><h2>
      <h2 class="risa6">JA, JA, JA,...</h2><h2>
      </section>
    `);
    var gameSong2 = new Audio('bubble.mp3');
    gameSong2.play();

    var restartButton = document.querySelector('button');
    restartButton.addEventListener('click', function() { 
      gameSong2.pause();
      gameSong2.currentTime = 0;
      createGameScreen(playerName) });
  };

  createSplashScreen();
};

window.addEventListener('load', main);