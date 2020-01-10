import Maze from './maze';

class MazeDFS extends Maze {


  walk() {
    super.walk();
    console.log('dfs walk');
  }
}

export default MazeDFS;
