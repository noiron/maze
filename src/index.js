import Maze from './maze';

const init_width = 10;
const init_height = 10;

function $(selector) {
  return document.querySelector(selector);
}

const widthInput = $('#width-input');
const heightInput = $('#height-input');
const newMazeBtn = $('#new-maze');

widthInput.value = init_width;
heightInput.value = init_height;

newMazeBtn.addEventListener('click', () => {
  const width = +widthInput.value;
  const height = +heightInput.value;
  const maze = new Maze({
    width,
    height,
  });
  maze.walk();
});

const maze = new Maze({
  width: 10,
  height: 10,
});
maze.walk();
