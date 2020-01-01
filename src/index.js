import Maze from './maze';

const init_width = 10;
const init_height = 10;
const init_size = 40;

function $(selector) {
  return document.querySelector(selector);
}

const widthInput = $('#width-input');
const heightInput = $('#height-input');
const sizeInput = $('#size-input');
const newMazeBtn = $('#new-maze');

widthInput.value = init_width;
heightInput.value = init_height;
sizeInput.value = init_size;

newMazeBtn.addEventListener('click', () => {
  const width = +widthInput.value;
  const height = +heightInput.value;
  const gridSize = +sizeInput.value;
  const maze = new Maze({
    width,
    height,
    gridSize,
  });
  maze.walk();
});

const maze = new Maze({
  width: 10,
  height: 10,
  gridSize: 40,
});
maze.walk();
