'use strict';

function main() {

  var mainElement = document.querySelector('#enlace_paginas');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  };

  function createSplashScreen() {
    var splashScreen = buildDom(`
      <section>
        <h1>Cutre Pang</h1>
        <button>Start</button>
        <input id="input_nombre" type="text">Ingrese su nombre: 
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
    <section>
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
      <section>
        <h1>Game Over</h1>
        <p>nombre ${this.player.nombre}</p>
        <button>Restart</button>
      </section>
    `);

    var restartButton = document.querySelector('button');
    restartButton.addEventListener('click', function() { createGameScreen(playerName) });
  };

  createSplashScreen();
};

window.addEventListener('load', main);