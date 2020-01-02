import * as utils from './utils';

export default class Maze {
  constructor({ width, height, gridSize }) {
    this.grids = [];
    this.width = width;
    this.height = height;
    this.gridSize = gridSize;
    this.grids[width * height - 1] = 0;

    this.history = [];
    this.visited = [];

    this.count = 1;
    this.finish = false;
  }

  // 任意挑选一个点开始
  async walk() {
    let current = utils.getRandomInt(this.grids.length);

    while (this.count < 10000000 && this.visited.length <= this.grids.length) {
      this.count++;

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

      await utils.delay(10);
      this.draw(current);
    }

    console.log(this.grids);
    this.finish = true;
    this.draw();
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

  draw(current) {
    utils.draw({
      width: this.width,
      height: this.height,
      grids: this.grids,
      gridSize: this.gridSize,
      current,
      isFinish: this.finish,
    });
  }

}