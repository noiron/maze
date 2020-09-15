import Maze from './maze';
import * as utils from './utils';

class MazeDFS extends Maze {

  constructor(params) {
    super(params);
    this.count = 0;
  }

  async walk() {
    const start = utils.getRandomInt(this.grids.length);
    let current = start;
    let neighbors, unvisitedNeighbors;

    do {

      if (this.showAnimation) {
        await utils.delay(this.delayMs);
        this.draw(current);
      }

      if (this.visited.indexOf(current) === -1) {
        this.visited.push(current);
      }

      // 检查当前点的邻居是否有未到达过的点
      neighbors = this.findAllNeighbors(current);
      unvisitedNeighbors = neighbors.filter(neighbor => !this.isVisited(neighbor));
      this.count++;

      // 从邻居中随机挑选一个
      if (unvisitedNeighbors.length > 0) {
        const index = utils.getRandomInt(unvisitedNeighbors.length);
        const next = unvisitedNeighbors[index];

        if (this.history.indexOf(current) === -1) {
          this.history.push(current);
        }

        this.mark(current, next);
        current = next;
        continue;
      }

      // 是否已经遍历完所有的格子
      if (this.visited.length >= this.grids.length) {
        break;
      }

      // 退回上一个格子
      current = this.history.pop();

    } while(true && this.count < 300000);

    this.finish = true;
    if ((typeof (this.finishNotice)) === 'function') this.finishNotice();

    this.draw();
  }
}

export default MazeDFS;
