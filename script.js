/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */

/*
 * instellingen om foutcontrole van je code beter te maken 
 */
///<reference path="p5.global-mode.d.ts" />
"use strict"

/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */
const SPELEN = 1;
const GAMEOVER = 2;
const UITLEG = 3;
var spelStatus = SPELEN;


const KEY_w = 87;
const KEY_a = 65;
const KEY_s = 83;
const KEY_d = 68;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

var spelerX = 800; // x-positie van speler
var spelerY = 600; // y-positie van speler
var health = 100;  // health van speler

var kogelX=400;
var kogelY=300;
var kogelVliegt = false

var vijandX = 500;
var vijandY = 300;
var health = 100;

/* ********************************************* */
/* functies die je gebruikt in je game           */
/* ********************************************* */

/**
 * Updatet globale variabelen met posities van speler, vijanden en kogels
 */
var beweegAlles = function() {
  // speler
  if (keyIsDown(KEY_a)) {
    spelerX = spelerX - 1;
  }
  if (keyIsDown(KEY_d)) {
    spelerX = spelerX + 1;
  }

  if (keyIsDown(KEY_w)) {
    spelerY = spelerY - 1
  }
  if (keyIsDown(KEY_s)) {
    spelerY = spelerY + 1
  }
  // vijand
  if (keyIsDown(KEY_LEFT)) {
    vijandX = vijandX - 1;
  }

  if (keyIsDown(KEY_UP)) {
    vijandY = vijandY - 1;
  }

  if (keyIsDown(KEY_DOWN)) {
    vijandY = vijandY + 1
  }

  if (keyIsDown(KEY_RIGHT)) {
    vijandX = vijandX + 1;
  }
  // kogel

  if (kogelVliegt === false && 
      keyIsDown(32)) { //start schieten
    kogelVliegt = true;
    kogelX = spelerX;
    kogelY = spelerY;
   
  }
  if (kogelVliegt === false &&
     keyIsDown(3)) {
    kogelX = vijandX;
    kogelY = vijandY;
     }
  if (kogelVliegt === true ) { //kogel vliegt
  kogelY = kogelY -1; 
  }

if (kogelVliegt === true &&
   kogelY < 0) { // kogel verdwijnt
  kogelVliegt = false;}
};

/**
 * Checkt botsingen
 * Verwijdert neergeschoten dingen
 * Updatet globale variabelen punten en health
 */
var verwerkBotsing = function() {
  // botsing speler tegen vijand


  // botsing kogel tegen vijand

  // update punten en health

};
var checkGameOver = function() {
  if (spelerX - vijandX < 50 &&
    spelerX - vijandX > -50 &&
    spelerY - vijandY < 50 &&
    spelerY - vijandY > -50) {
    console.log("Botsing");

    if (kogelX - vijandX < 50 &&
      kogelX - vijandX > -50 &&
      kogelY - vijandY < 50 &&
      kogelY - vijandY > -50)

    return true;
  }
  return false;
}
/**
 * Tekent spelscherm
 */
var tekenAlles = function() {
  // achtergrond
  fill("green");
  rect(0, 0, 1280, 720);

  // vijand
  fill("red");
  rect(vijandX - 25, vijandY - 25, 50, 50)
  fill("blue");
  ellipse(vijandX, vijandY, 10, 10);
 
  // speler
  fill("blue");
  rect(spelerX - 25, spelerY - 25, 50, 50);
  fill("red");
  ellipse(spelerX, spelerY, 10, 10);

   // kogel
  fill("red")
  ellipse(kogelX, kogelY, 20, 20)
  
  // punten en health

};

/* ********************************************* */
/* setup() en draw() functies / hoofdprogramma   */
/* ********************************************* */

/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}

/**
 * draw
 * de code in deze functie wordt 50 keer per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  if (spelStatus === SPELEN) {
    beweegAlles();
    verwerkBotsing();
    tekenAlles();
    if (checkGameOver()) {
      spelStatus = GAMEOVER;
      console.log("game over")
    }
    console.log("spelen");
  }
  if (spelStatus === GAMEOVER) {
    // teken gameover scherm
    console.log("game over");
    textSize(60);
    fill("white");
    text("Game Over, Druk Spatie voor Start", 100, 100);
  if (keyIsDown (32)) { // spatie
    spelerY = 601;
    spelerX = 800;
    vijandX = 400;
    vijandY = 600;
  spelStatus = SPELEN;
  }
  }
  if (spelStatus === UITLEG) {
    // teken uitleg scherm
    console.log("uitleg");
  }
}