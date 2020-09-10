/* eslint-disable no-return-assign */
/* eslint-disable no-confusing-arrow */
/* eslint-disable prefer-destructuring */
window.onload = () => {
  document.getElementsByClassName('game_start')[0].setAttribute('disabled', '');
  document.getElementsByClassName('end_game')[0].style.display = 'none';
};

function SetGame() {
  this.boxes = Array.from(document.getElementsByClassName('box'));
  this.start_button = document.getElementsByClassName('game_start')[0];
  this.score = 0;
  this.color = document.getElementsByClassName('color')[0];
  this.setEasyLevel = () => {
    this.boxes[0].style.display = 'flex';
    this.boxes[1].style.display = 'none';
    return this.IsDisabled();
  };
  this.setHardLevel = () => {
    this.boxes[0].style.display = 'flex';
    this.boxes[1].style.display = 'flex';
    return this.IsDisabled();
  };
  this.IsDisabled = () => this.start_button.hasAttribute('disabled') ? this.start_button.removeAttribute('disabled') : false;
  this.setScore = () => document.getElementsByClassName('score')[0].textContent = (this.score++);
  this.setColors = () => {
    const color = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
    const gameBox = this.boxes.filter((e) => e.style.display === 'flex');
    gameBox.map((e) => {
      Array.from(e.children).map((item) => item.style.backgroundColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`);
      Array.from(e.children)[Math.round(Math.random() * (Array.from(e.children).length - 1))].style.backgroundColor = color;
    });
    this.color.textContent = color;
  };
  this.checkIfWin = (box) => {
    if (box.style.backgroundColor === this.color.textContent) {
      this.setScore();
      this.setColors();
    } else {
      this.setColors();
    }
  };
  this.setEventToBoxAndHideButton = (button) => {
    document.getElementsByClassName('score_label')[0].style.display = 'flex';
    this.boxes.map((boxField) => Array.from(boxField.children).map((box) => box.addEventListener('click', (item) => this.checkIfWin(item.target))));
    button.style.display = 'none';
    button.nextElementSibling.style.display = '';
    return this.setColors();
  };
  this.endGame = (button) => {
    button.style.display = 'none';
    button.previousElementSibling.style.display = '';
    this.score = 0;
    document.getElementsByClassName('color')[0].textContent = '';
    document.getElementsByClassName('score_label')[0].style.display = 'none';
    document.getElementsByClassName('score')[0].textContent = '';
    this.boxes.map((boxField) => Array.from(boxField.children).map((box) => box.style.backgroundColor = ''));
  };
}

const Game = new SetGame();

document.getElementsByClassName('easy_level')[0].addEventListener('click', Game.setEasyLevel);
document.getElementsByClassName('hard_level')[0].addEventListener('click', Game.setHardLevel);
document.getElementsByClassName('game_start')[0].addEventListener('click', (e) => Game.setEventToBoxAndHideButton(e.target));
document.getElementsByClassName('end_game')[0].addEventListener('click', (e) => Game.endGame(e.target));
