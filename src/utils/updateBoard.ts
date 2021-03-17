import countItemNeighbours from "./countItemNeighbours";

function updateBoard(oldArr:boolean[][]) {
    let arr = oldArr.map((row) => row.slice());

  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr[j].length; i++) {
      let livingNeighbours = countItemNeighbours(j, i, oldArr);
      let isAlive = arr[j][i];
      if (isAlive && (livingNeighbours === 2 || livingNeighbours === 3)) {
        arr[j][i] = true;
      } else if (isAlive && (livingNeighbours < 2 || livingNeighbours > 3)) {
        arr[j][i] = false;
      } else if (!isAlive && livingNeighbours === 3) {
        arr[j][i] = true;
      } else {
        arr[j][i] = false;
      }
    }
  }

  return arr;
}

export default updateBoard;
