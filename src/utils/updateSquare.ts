function updateSquare(oldBoardInfo: boolean[][], index: number, rowIndex: number) {
    let boardInfo = oldBoardInfo.map((row) => row.slice());
    boardInfo[rowIndex][index] = !boardInfo[rowIndex][index];
  
    let newRow = boardInfo[rowIndex]
      .slice(0, index)
      .concat(boardInfo[rowIndex][index], boardInfo[rowIndex].slice(index + 1));
  
    let newBoard = boardInfo
      .slice(0, rowIndex)
      .concat([newRow], boardInfo.slice(rowIndex + 1));
  
    return newBoard;
  }
  
  export default updateSquare;
  