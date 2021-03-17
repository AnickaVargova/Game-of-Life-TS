function countItemNeighbours(j: number, i: number, arr: boolean[][]) {
  let neighbours: boolean[] = [];
  if (arr[j - 1] && arr[j + 1]) {
    neighbours = [
      arr[j - 1][i - 1],
      arr[j - 1][i],
      arr[j - 1][i + 1],
      arr[j][i - 1],
      arr[j][i + 1],
      arr[j + 1][i - 1],
      arr[j + 1][i],
      arr[j + 1][i + 1],
    ];
  } else if (!arr[j - 1] && arr[j + 1]) {
    neighbours = [
      arr[j][i - 1],
      arr[j][i + 1],
      arr[j + 1][i - 1],
      arr[j + 1][i],
      arr[j + 1][i + 1],
    ];
  } else if (arr[j - 1] && !arr[j + 1]) {
    neighbours = [
      arr[j - 1][i - 1],
      arr[j - 1][i],
      arr[j - 1][i + 1],
      arr[j][i - 1],
      arr[j][i + 1],
    ];
  }
  let livingNeighbours = neighbours.filter((item) => item).length;
  return livingNeighbours;
}

export default countItemNeighbours;
