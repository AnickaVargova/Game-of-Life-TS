import countItemNeighbours from "./utils/countItemNeighbours";
import updateSquare from "./utils/updateSquare";
import updateBoard from "./utils/updateBoard";

function neighbours(arr: boolean[][]) {
  let neighboursArray = [];
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr[j].length; i++) {
      neighboursArray.push(countItemNeighbours(j, i, arr));
    }
  }
  return neighboursArray;
}

const boardInfo = [
  [true, true, false],
  [true, false, true],
  [false, true, false],
  [true, true, true],
];

const expectedNeighbours = [2, 3, 2, 3, 5, 2, 4, 5, 4, 2, 3, 2];

const expectedChangedBoard = [
  [true, true, false],
  [true, false, true],
  [false, false, false],
  [true, true, true],
];

const expectedChangedSquare = [
  [false, true, false],
  [true, false, true],
  [false, true, false],
  [true, true, true],
];

describe("test", () => {
  test("test1", () => {
    expect(neighbours(boardInfo)).toEqual(expectedNeighbours);
  });
  test("test2", () => {
    expect(updateSquare(boardInfo, 0, 0)).toEqual(expectedChangedSquare);
  });
  test("test3", () => {
    expect(updateBoard(boardInfo)).toEqual(expectedChangedBoard);
  });
});
