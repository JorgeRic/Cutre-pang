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
        <h1>Cutre Pang</h1>
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
    <h1>CUTRE PANG</h1>
   
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
      console.log("x: " + x + " y: " + y)
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
       
      <h2 class="risa2">.....,AJ, AJ, AJ</h2><h2>
      <h2 class="risa3">JA, JA, JA,...</h2><h2>
      <h2>¿Quieres volver a jugar?</h2>
      <button class="restart"t>Restart</button>
      <h2 class="risa4">JA, JA, JA,...</h2><h2>
      <h2 class="risa5">JA, JA, JA,...</h2><h2>
      <h2 class="risa6">JA, JA, JA,...</h2><h2>
      </section>
    `);

    var restartButton = document.querySelector('button');
    restartButton.addEventListener('click', function() { createGameScreen(playerName) });
  };

  createSplashScreen();
};

window.addEventListener('load', main);