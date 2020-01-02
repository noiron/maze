/**
 * 获取一个从 0 ~ max-1 的整数
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 绘制迷宫的函数
 */
export function draw({
  width, height, gridSize, current, grids
}) {
  const canvas = document.getElementById('drawing');
  const context = canvas.getContext('2d');
  canvas.width = gridSize * width + 20;;
  canvas.height = gridSize * height + 20;
  context.translate(10, 10);

  context.fillStyle = '#fff';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.lineWidth = 2;
  context.strokeStyle = '#000';

  context.moveTo(0, 0 * gridSize);
  context.lineTo(width * gridSize, 0 * gridSize);

  context.moveTo(0, height * gridSize);
  context.lineTo(width * gridSize, height * gridSize);

  context.moveTo(0 * gridSize, 0);
  context.lineTo(0 * gridSize, height * gridSize);

  context.moveTo(width * gridSize, 0);
  context.lineTo(width * gridSize, height * gridSize);

  context.stroke();
  context.closePath();

  // 根据 index 确定左上角在 canvas 的位置
  function getPos(index) {
    const row = Math.floor(index / width);
    const col = index - row * width;
    return [col * gridSize, row * gridSize];
  }

  for (let i = 0; i < grids.length; i++) {

    const pos = getPos(i);

    context.beginPath();
    context.strokeStyle = '#333';

    // 上方不可通行
    if ((grids[i] & 1) !== 1) {
      context.moveTo(pos[0], pos[1]);
      context.lineTo(pos[0] + gridSize, pos[1]);
    }

    // 右侧不可通行
    if ((grids[i] & 2) !== 2) {
      context.moveTo(pos[0] + gridSize, pos[1]);
      context.lineTo(pos[0] + gridSize, pos[1] + gridSize);
    }

    // 下侧不可通行
    if ((grids[i] & 4) !== 4) {
      context.moveTo(pos[0], pos[1] + gridSize);
      context.lineTo(pos[0] + gridSize, pos[1] + gridSize);
    }

    // 左侧不可通行
    if ((grids[i] & 8) !== 8) {
      context.moveTo(pos[0], pos[1]);
      context.lineTo(pos[0], pos[1] + gridSize);
    }

    context.stroke();
    context.closePath();
  }

  // mark current grid
  context.fillStyle = 'lightgreen';
  context.fillRect(
    getPos(current)[0] - 1, 
    getPos(current)[1] - 1, 
    gridSize + 2, 
    gridSize + 2
  );
}
