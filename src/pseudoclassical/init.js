/* eslint-disable */
if (typeof window === undefined) {
  const { Saiyan, SonOgong, MinBoo } = require('./Characters');
}

var drangonBallCharacters = [];

function handleClick(ev) {
  /* makeBlinkyDancer is the dancer maker functions available in global scope.
  * A new object of the given type will be created and added
  * to the stage.
  */

  // make a dancer with a random position
  //
  // TODO:
  let characterForm = ev.target.closest('.characterForm');
  let id = characterForm.id;
  let className = ev.target.className;
  let isExist = Character.prototype.isExist;
  let btnEl = ev.target;
  let character;

  if (className === 'addCharacter') {

    if (id === 'SonOgong' && !isExist['SonOgong']) {
      character = new SonOgong('SonOgong');

    } else if (id === 'SonOban' && !isExist['SonOban']) {
      character = new Saiyan('SonOban');

    } else if (id === 'Vegeta' && !isExist['Vegeta']) {
      character = new Saiyan('Vegeta');

    } else if (id === 'MineBoo' && !isExist['MineBoo']) {
      character = new MineBoo('MineBoo');
    }

    if (character) {
      drangonBallCharacters.push(character);
      document.body.append(character.node);
    }

  } else if (className === 'changeSuperSaiyan') {

    if (isExist[id]) {
      character = drangonBallCharacters.find(character => character.name === id);

      let afterChange = character.changeSuperSaiyan();

      if (!afterChange) return;

      let dataset = btnEl.dataset;

      if (dataset.stage == 0) {

        btnEl.textContent = 'change supersaiyan 1';
        dataset.stage = 1;

      } else if (dataset.stage == 1) {

        if (id === 'SonOgong') {
          btnEl.textContent = 'change supersaiyan 3'
          dataset.stage = 3;

        } else {

          btnEl.textContent = 'normal'
          dataset.stage = 0;

        }
      } else if (dataset.stage == 3) {

        btnEl.textContent = 'normal';
        dataset.stage = 0;

      }

    }

  } else if (className === 'wonkiok-btn') {

    if (isExist['SonOgong']) {
      let sonOgong = drangonBallCharacters.find(character => character.name === 'SonOgong');
      sonOgong.wonkiok();
      btnEl.parentElement.querySelector('.changeSuperSaiyan').textContent = 'change supersaiyan 1';
    }

  }
}


var dragged;

window.addEventListener('DOMContentLoaded', () => {
  const topbar = document.querySelector('.topbar');

  topbar.addEventListener('click', handleClick);

  const handleDrop = ev => {

    ev.preventDefault();

    let dataTransfer = ev.dataTransfer;
    let [left, top] = [ev.clientX + 'px', ev.clientY + 'px'];


    console.log('drop:', left, top);
    Object.assign(dragged.style, {
      left: left,
      top: top
    });

    dragged = null;

  };

  const handleDragOver = ev => {
    ev.preventDefault();

    console.log(ev.dataTransfer.getData('text/plain'));
  }

  document.body.ondrop = handleDrop;
  document.body.ondragover = handleDragOver;
});
