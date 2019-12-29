/**
 * 获取一个从 0 ~ max-1 的整数
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let count = 1;
const grid_width = 40;

class Maze {
  constructor({ width, height }) {
    this.grids = [];
    this.width = width;
    this.height = height;
    this.grids[width * height - 1] = 0;

    this.history = [];
    this.visited = [];

    this.walk();
  }

  // 任意挑选一个点开始
  async walk() {
    let startPos = getRandomInt(this.grids.length);

    while (count < 100000 && this.visited.length <= this.grids.length) {
      count++;

      let neighbors = this.findAllNeighbors(startPos);
      if (neighbors.length === 0) {
        startPos = getRandomInt(this.grids.length);
        continue;
      }

      const index = getRandomInt(neighbors.length);
      const next = neighbors[index];

      if (this.isVisited(next)) {
        startPos = next;
        continue;
      }
      this.visited.push(next);

      // 判断 start 和 next 的关系
      if (startPos + 1 === next) {
        // 向右
        this.grids[startPos] = this.grids[startPos] | 2;
        this.grids[next] = this.grids[next] | 8;
      }

      if (startPos - 1 === next) {
        // 向左
        this.grids[startPos] = this.grids[startPos] | 8;
        this.grids[next] = this.grids[next] | 2;
      }

      if (startPos + this.width === next) {
        // 向下
        this.grids[startPos] = this.grids[startPos] | 4;
        this.grids[next] = this.grids[next] | 1;
      }

      if (startPos - this.width === next) {
        // 向下
        this.grids[startPos] = this.grids[startPos] | 1;
        this.grids[next] = this.grids[next] | 4;
      }

      await delay(20);
      this.draw();
    }

    console.log(this.grids);
  }

  // 确定一个点在四个方向上相邻的点
  findNeighbor(pos, type) {
    // 上方
    if (type === 1) {
      return pos < this.width ? null : pos - this.width;
    }

    // 右
    if (type === 2) {
      return ((pos + 1) % this.width === 0) ? null : pos + 1;
    }

    // 下
    if (type === 3) {
      return (pos >= this.grids.length - this.width) ? null : pos + this.width;
    }

    // 左
    if (type === 4) {
      return (pos % this.width === 0) ? null : pos - 1;
    }
  }

  // 确定一个点所有的相邻点
  findAllNeighbors(pos) {
    const neighbors = [];

    if (pos >= this.grids.length) return [];

    for (let i = 1; i <= 4; i++) {
      if (this.findNeighbor(pos, i) !== null) {
        neighbors.push(this.findNeighbor(pos, i));
      }
    }
    return neighbors;
  }

  // 检查一个点是否已经经过
  isVisited(pos) {
    if (this.visited.indexOf(pos) > -1) return true;
    return false;
  }

  // 画图
  draw() {
    const canvas = document.getElementById('drawing');
    const context = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;
    context.translate(10, 10);

    context.fillStyle = '#fff';
    context.fillRect(0, 0, 1000, 1000);

    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = '#000';

    // 横线
    // for (let i = 0; i <= this.height; i++) {
    //   context.moveTo(0, i * grid_width);
    //   context.lineTo(this.width * grid_width, i * grid_width);
    // }

    context.moveTo(0, 0 * grid_width);
    context.lineTo(this.width * grid_width, 0 * grid_width);

    context.moveTo(0, this.height * grid_width);
    context.lineTo(this.width * grid_width, this.height * grid_width);

    // // 纵线
    // for (let i = 0; i <= this.width; i++) {
    //   context.moveTo(i * grid_width, 0);
    //   context.lineTo(i* grid_width, this.height * grid_width);
    // }

    context.moveTo(0 * grid_width, 0);
    context.lineTo(0 * grid_width, this.height * grid_width);

    context.moveTo(this.width * grid_width, 0);
    context.lineTo(this.width * grid_width, this.height * grid_width);

    context.stroke();
    context.closePath();

    for (let i = 0; i < this.grids.length; i++) {

      const pos = this.getPos(i);

      // 上方可通行
      context.beginPath();
      if ((this.grids[i] & 1) === 1) {
        context.strokeStyle = '#fff';
      } else {
        context.strokeStyle = '#000';
      }
      context.moveTo(pos[0], pos[1]);
      context.lineTo(pos[0] + grid_width, pos[1]);
      context.stroke();
      context.closePath();

      // 右侧可通行
      context.beginPath();
      if ((this.grids[i] & 2) === 2) {
        context.strokeStyle = '#fff';
      } else {
        context.strokeStyle = '#000';
      }
      context.moveTo(pos[0] + grid_width, pos[1]);
      context.lineTo(pos[0] + grid_width, pos[1] + grid_width);
      context.stroke();
      context.closePath();

      // 下侧可通行
      context.beginPath();
      if ((this.grids[i] & 4) === 4) {
        context.strokeStyle = '#fff';
      } else {
        context.strokeStyle = '#000';
      }
      context.moveTo(pos[0], pos[1] + grid_width);
      context.lineTo(pos[0] + grid_width, pos[1] + grid_width);
      context.stroke();
      context.closePath();

      // 左侧可通行
      context.beginPath();
      if ((this.grids[i] & 8) === 8) {
        context.strokeStyle = '#fff';
      } else {
        context.strokeStyle = '#000';
      }
      context.moveTo(pos[0], pos[1]);
      context.lineTo(pos[0], pos[1] + grid_width);
      context.stroke();
      context.closePath();
    }
  }

  // 根据 index 确定左上角在 canvas 的位置
  getPos(index) {
    const row = Math.floor(index / this.width);
    const col = index - row * this.width;
    return [col * grid_width, row * grid_width];
  }
}

const maze = new Maze({
  width: 10,
  height: 10
});
