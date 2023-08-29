import { IBoardFieldsMap, TColor } from 'types';

const generateFieldsWithPosition = (): { position: string }[] => {
  const positionChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const positionNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  return positionChars.reduce((positionsArray: { position: string }[], char) => {
    const charPositions = positionNumbers.map((number) => ({
      position: char + number,
    }));
    return [...positionsArray, ...charPositions];
  }, []);
};

export const generateBoardFieldsMap = (): IBoardFieldsMap => {
  const fieldsWithPosition = generateFieldsWithPosition();
  const colors: TColor[] = ['white', 'black'];

  const boardData: IBoardFieldsMap = fieldsWithPosition.reduce(
    (fieldsMap: IBoardFieldsMap, field, index) => {
      const newFieldsMap = {
        ...fieldsMap,
        [field.position]: { color: colors[0], figureInField: null },
      };
      if ((index + 1) % 8 !== 0) {
        colors.reverse();
      }
      return newFieldsMap;
    },
    {},
  );

  return boardData;
};

const calculatePositionsDiff = (figurePosition: string, positionTo: string) => {
  const allPositionChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const [figurePositionChar, figurePositionNumber] = figurePosition.split('');
  const [positionToChar, positionToNumber] = positionTo.split('');
  const indexFigureChar = allPositionChars.findIndex((char) => figurePositionChar === char) + 1;
  const indexPositionToChar = allPositionChars.findIndex((char) => positionToChar === char) + 1;
  const positionsNumbersDiff = Number(positionToNumber) - Number(figurePositionNumber);
  const positionsCharsDiff = indexPositionToChar - indexFigureChar;

  return [positionsNumbersDiff, positionsCharsDiff];
};
// Проверить есть ли препятствия на пути фигуры по диагонали
const checkBarriersInFigurePathDiagonal = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
): boolean => {
  const allPositionChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const [figurePositionChar, figurePositionNumber] = figurePosition.split('');
  const [positionToChar] = positionTo.split('');
  const indexFigureChar = allPositionChars.findIndex((char) => figurePositionChar === char);
  const indexPositionToChar = allPositionChars.findIndex((char) => positionToChar === char);
  const [positionsNumbersDiff, positionsCharsDiff] = calculatePositionsDiff(
    figurePosition,
    positionTo,
  );
  const pathPositions = [];

  let numberInPath =
    positionsNumbersDiff < 0 ? Number(figurePositionNumber) - 1 : Number(figurePositionNumber) + 1;

  if (positionsCharsDiff > 0) {
    for (let index = indexFigureChar + 1; index <= indexPositionToChar; index++) {
      if (positionsNumbersDiff < 0 ? numberInPath > 0 : numberInPath < 9) {
        pathPositions.push(allPositionChars[index] + numberInPath);
      }

      if (positionsNumbersDiff < 0) {
        numberInPath--;
      } else {
        numberInPath++;
      }
    }
  }
  if (positionsCharsDiff < 0) {
    for (let index = indexFigureChar - 1; index >= indexPositionToChar; index--) {
      if (positionsNumbersDiff < 0 ? numberInPath > 0 : numberInPath < 9) {
        pathPositions.push(allPositionChars[index] + numberInPath);
      }

      if (positionsNumbersDiff < 0) {
        numberInPath--;
      } else {
        numberInPath++;
      }
    }
  }

  const lastPositionInPath = pathPositions.splice(pathPositions.length - 1, 1);

  if (lastPositionInPath[0] !== positionTo) {
    return true;
  }

  const isBarriersOnPath = pathPositions.some((position) => boardFieldsMap[position].figureInField);

  return isBarriersOnPath;
};

// Проверить есть ли препятствия на пути фигуры по вертикали
const checkBarriersInFigurePathVertical = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
) => {
  const [figurePositionChar, figurePositionNumber] = figurePosition.split('');
  const [positionToChar, positionToNumber] = positionTo.split('');
  const [positionsNumbersDiff] = calculatePositionsDiff(figurePosition, positionTo);

  if (figurePositionChar !== positionToChar) {
    return true;
  }

  const pathPositions = [];

  if (positionsNumbersDiff < 0) {
    for (let index = Number(figurePositionNumber) - 1; index > Number(positionToNumber); index--) {
      pathPositions.push(figurePositionChar + index);
    }
  }
  if (positionsNumbersDiff > 0) {
    for (let index = Number(figurePositionNumber) + 1; index < Number(positionToNumber); index++) {
      pathPositions.push(figurePositionChar + index);
    }
  }

  const isBarriersOnPath = pathPositions.some((position) => boardFieldsMap[position].figureInField);

  return isBarriersOnPath;
};

// Проверить есть ли препятствия на пути фигуры по горизонтали
const checkBarriersInFigurePathHorizontal = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
) => {
  const allPositionChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const [figurePositionChar, figurePositionNumber] = figurePosition.split('');
  const [positionToChar, positionToNumber] = positionTo.split('');
  const [positionsNumbersDiff, positionsCharsDiff] = calculatePositionsDiff(
    figurePosition,
    positionTo,
  );
  const indexFigureChar = allPositionChars.findIndex((char) => figurePositionChar === char);
  const indexPositionToChar = allPositionChars.findIndex((char) => positionToChar === char);

  if (figurePositionNumber !== positionToNumber) {
    return true;
  }

  const pathPositions = [];

  if (positionsCharsDiff > 0) {
    for (let index = indexFigureChar + 1; index < indexPositionToChar; index++) {
      pathPositions.push(allPositionChars[index] + figurePositionNumber);
    }
  }
  if (positionsCharsDiff < 0) {
    for (let index = indexFigureChar - 1; index > indexPositionToChar; index--) {
      pathPositions.push(allPositionChars[index] + figurePositionNumber);
    }
  }

  const isBarriersOnPath = pathPositions.some((position) => boardFieldsMap[position].figureInField);

  return isBarriersOnPath;
};

export const checkPawnMoveIsCorrect = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
): boolean => {
  const [figurePositionChar, figurePositionNumber] = figurePosition.split('');
  const [positionToChar, positionToNumber] = positionTo.split('');
  const isPositionToOccupied = !!boardFieldsMap[positionTo].figureInField;
  const figureColor = boardFieldsMap[figurePosition].figureInField?.color as TColor;
  const eatingFigureColor = isPositionToOccupied && boardFieldsMap[positionTo].figureInField?.color;

  const [positionsNumbersDiff, positionsCharsDiff] = calculatePositionsDiff(
    figurePosition,
    positionTo,
  );

  const isFirstMove =
    figureColor === 'black' ? figurePositionNumber === '2' : figurePositionNumber === '7';

  const isFirstMoveBlackValid = isFirstMove ? positionsNumbersDiff < 3 : positionsNumbersDiff < 2;
  const isFirstMoveWhiteValid = isFirstMove ? positionsNumbersDiff > -3 : positionsNumbersDiff > -2;

  const diagonalMoveValidatorsMap = {
    black:
      (figurePositionChar === positionToChar && !isPositionToOccupied) ||
      (positionsNumbersDiff < 2 && isPositionToOccupied),
    white:
      (figurePositionChar === positionToChar && !isPositionToOccupied) ||
      (positionsNumbersDiff > -2 && isPositionToOccupied),
  };

  const strokeLengthValidatorsMap = {
    black: positionsNumbersDiff > 0 && isFirstMoveBlackValid,
    white: positionsNumbersDiff < 0 && isFirstMoveWhiteValid,
  };

  if (
    positionToNumber === figurePositionNumber ||
    !strokeLengthValidatorsMap[figureColor] ||
    positionsCharsDiff > 1 ||
    positionsCharsDiff < -1
  ) {
    return false;
  }

  if (
    figurePosition !== positionTo &&
    !isPositionToOccupied &&
    figurePositionChar === positionToChar &&
    !checkBarriersInFigurePathVertical(figurePosition, positionTo, boardFieldsMap)
  ) {
    return true;
  }
  if (
    diagonalMoveValidatorsMap[figureColor] &&
    positionToChar !== figurePositionChar &&
    eatingFigureColor !== figureColor
  ) {
    return true;
  }
  return false;
};

export const checkKnightMoveIsCorrect = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
): boolean => {
  const [figurePositionChar] = figurePosition.split('');
  const [positionToChar] = positionTo.split('');
  const isPositionToOccupied = !!boardFieldsMap[positionTo].figureInField;
  const figureColor = boardFieldsMap[figurePosition].figureInField?.color as TColor;
  const eatingFigureColor = isPositionToOccupied && boardFieldsMap[positionTo].figureInField?.color;
  const [positionsNumbersDiff, positionsCharsDiff] = calculatePositionsDiff(
    figurePosition,
    positionTo,
  );

  const isCharCorrect1 =
    (positionsNumbersDiff === 1 || positionsNumbersDiff === -1) &&
    (positionsCharsDiff === 2 || positionsCharsDiff === -2);

  const isCharCorrect2 =
    (positionsNumbersDiff === 2 || positionsNumbersDiff === -2) &&
    (positionsCharsDiff === 1 || positionsCharsDiff === -1);

  if (
    positionToChar === figurePositionChar ||
    figureColor === eatingFigureColor ||
    positionsNumbersDiff === 0 ||
    (!isCharCorrect1 && !isCharCorrect2)
  ) {
    return false;
  }

  return true;
};

export const checkElephantMoveIsCorrect = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
): boolean => {
  if (
    boardFieldsMap[positionTo]?.figureInField?.color ===
    boardFieldsMap[figurePosition]?.figureInField?.color
  ) {
    return false;
  }
  return !checkBarriersInFigurePathDiagonal(figurePosition, positionTo, boardFieldsMap);
};

export const checkRookMoveIsCorrect = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
): boolean => {
  if (
    boardFieldsMap[positionTo]?.figureInField?.color ===
    boardFieldsMap[figurePosition]?.figureInField?.color
  ) {
    return false;
  }

  return (
    !checkBarriersInFigurePathHorizontal(figurePosition, positionTo, boardFieldsMap) ||
    !checkBarriersInFigurePathVertical(figurePosition, positionTo, boardFieldsMap)
  );
};

export const checkQueenMoveIsCorrect = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
): boolean => {
  if (
    boardFieldsMap[positionTo]?.figureInField?.color ===
    boardFieldsMap[figurePosition]?.figureInField?.color
  ) {
    return false;
  }

  return (
    !checkBarriersInFigurePathDiagonal(figurePosition, positionTo, boardFieldsMap) ||
    !checkBarriersInFigurePathHorizontal(figurePosition, positionTo, boardFieldsMap) ||
    !checkBarriersInFigurePathVertical(figurePosition, positionTo, boardFieldsMap)
  );
};

export const checkKingMoveIsCorrect = (
  figurePosition: string,
  positionTo: string,
  boardFieldsMap: IBoardFieldsMap,
): boolean => {
  const [figurePositionChar, figurePositionNumber] = figurePosition.split('');
  const [positionToChar, positionToNumber] = positionTo.split('');
  const [positionsNumbersDiff, positionsCharsDiff] = calculatePositionsDiff(
    figurePosition,
    positionTo,
  );
  const moveIsTooLong =
    positionsNumbersDiff > 1 ||
    positionsNumbersDiff < -1 ||
    positionsCharsDiff > 1 ||
    positionsCharsDiff < -1;

  if (
    moveIsTooLong ||
    boardFieldsMap[positionTo]?.figureInField?.color ===
      boardFieldsMap[figurePosition]?.figureInField?.color
  ) {
    return false;
  }

  return (
    !checkBarriersInFigurePathDiagonal(figurePosition, positionTo, boardFieldsMap) ||
    !checkBarriersInFigurePathHorizontal(figurePosition, positionTo, boardFieldsMap) ||
    !checkBarriersInFigurePathVertical(figurePosition, positionTo, boardFieldsMap)
  );
};
