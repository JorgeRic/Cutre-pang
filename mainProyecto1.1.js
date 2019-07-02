'use strict'
function main(){

  var enlace = document.querySelector('#enlace_entre_paginas')

  function buildDom(html){
    enlace.innerHTML = html;
    return enlace;
  }

  function createSplashScreen(){
    var splashScreen = buildDom(`
    <section>
      <h1>Cutre Pang!!!!!</h1>
      <input type="text">Write your name:</input>
      <button>Start play</button>
    </section>`);
    var startButton = document.querySelector("button");
    startButton.addEventListener('click',createGameScreen);
  }

  function createGameScreen(){
    var GameScreen = buildDom(`
    <section>
      <h3>Your score:</h3>
      <input type="text"></input>
      <h3>Lives:</h3>
      <input type="text"></input>
    </section>
    <section>
      <canvas width = "100%" heigth="80%"></canvas>
    </section>`);
    setTimeout(createGameOverScreen, 3000);
   // var canvasElement = document.querySelector('canvas');
  }
 
  function createGameOverScreen(){
    var gameOverScreen = buildDom(`
    <section>
      <h1>Game over</h1>
      <h3>Final score:</h3>
      <input type="text"></input>
      <button>Start again</button>
    </section>`);
    var restartButton = document.querySelector("button");
    restartButton.addEventListener('click', createGameScreen);
  }

createSplashScreen();
}
window.addEventListener('load',main)