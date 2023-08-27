import { IBoardFieldsMap, IFigureInField, TColor } from 'types';

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
  const allPositionChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const indexFigureChar = allPositionChars.findIndex((char) => figurePositionChar === char);
  const indexPositionToChar = allPositionChars.findIndex((char) => positionToChar === char);

  const positionsNumbersDiff = Number(positionToNumber) - Number(figurePositionNumber);
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
    indexPositionToChar - indexFigureChar > 1 ||
    indexPositionToChar - indexFigureChar < -1
  ) {
    return false;
  }

  if (
    figurePosition !== positionTo &&
    !isPositionToOccupied &&
    figurePositionChar === positionToChar
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
