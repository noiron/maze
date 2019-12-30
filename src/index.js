import * as utils from './utils';

let count = 1;
const grid_width = 40;

export default class Maze {
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
    let current = utils.getRandomInt(this.grids.length);

    while (count < 10000 && this.visited.length <= this.grids.length) {
      count++;

      let neighbors = this.findAllNeighbors(current);
      const index = utils.getRandomInt(neighbors.length);
      const next = neighbors[index];

      if (this.isVisited(next)) {
        current = next;
        continue;
      }

      this.visited.push(next);

      // 判断 start 和 next 的关系
      if (current + 1 === next) {
        // 向右
        this.grids[current] = this.grids[current] | 2;
        this.grids[next] = this.grids[next] | 8;
      }

      if (current - 1 === next) {
        // 向左
        this.grids[current] = this.grids[current] | 8;
        this.grids[next] = this.grids[next] | 2;
      }

      if (current + this.width === next) {
        // 向下
        this.grids[current] = this.grids[current] | 4;
        this.grids[next] = this.grids[next] | 1;
      }

      if (current - this.width === next) {
        // 向下
        this.grids[current] = this.grids[current] | 1;
        this.grids[next] = this.grids[next] | 4;
      }

      await utils.delay(100);
      this.draw(current);
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
  draw(current) {
    const canvas = document.getElementById('drawing');
    const context = canvas.getContext('2d');
    canvas.width = grid_width * this.width + 20;;
    canvas.height = grid_width * this.height + 20;
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

      context.beginPath();
      context.strokeStyle = '#333';

      // 上方不可通行
      if ((this.grids[i] & 1) !== 1) {
        context.moveTo(pos[0], pos[1]);
        context.lineTo(pos[0] + grid_width, pos[1]);
      }

      // 右侧不可通行
      if ((this.grids[i] & 2) !== 2) {
        context.moveTo(pos[0] + grid_width, pos[1]);
        context.lineTo(pos[0] + grid_width, pos[1] + grid_width);
      }

      // 下侧不可通行
      if ((this.grids[i] & 4) !== 4) {
        context.moveTo(pos[0], pos[1] + grid_width);
        context.lineTo(pos[0] + grid_width, pos[1] + grid_width);
      }

      // 左侧不可通行
      if ((this.grids[i] & 8) !== 8) {
        context.moveTo(pos[0], pos[1]);
        context.lineTo(pos[0], pos[1] + grid_width);
      }

      context.stroke();
      context.closePath();
    }

    // mark current grid
    context.fillStyle = 'red';
    context.fillRect(
      this.getPos(current)[0] - 1, 
      this.getPos(current)[1] - 1, 
      grid_width + 2, 
      grid_width + 2
    );

  }

  // 根据 index 确定左上角在 canvas 的位置
  getPos(index) {
    const row = Math.floor(index / this.width);
    const col = index - row * this.width;
    return [col * grid_width, row * grid_width];
  }
}

const maze = new Maze({
  width: 16,
  height: 16
});
