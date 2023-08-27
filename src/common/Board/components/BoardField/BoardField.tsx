import React, { MouseEventHandler, useEffect } from 'react';
import { EFigureTypes, IBoardField, IBoardFieldsMap, IFigureInField, TColor } from 'types';
import classNames from 'classnames';
import s from './style.module.scss';
import { PawnFigure } from 'components';
import { useDispatch } from 'react-redux';
import { appendFigureInField, moveFigure } from 'redux/reducers/BoardFields';
import { checkPawnMoveIsCorrect } from 'common/Board/utils';

interface IStartPositionFiguresMap {
  [key: string]: IFigureInField;
}

const startPositionFiguresMap: IStartPositionFiguresMap = {
  a2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  b2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  c2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  d2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  e2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  f2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  g2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  h2: {
    color: 'black',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  a7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  b7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  c7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  d7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  e7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  f7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  g7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
  h7: {
    color: 'white',
    figureComponent: PawnFigure,
    figureType: EFigureTypes.Pawn,
  },
};

const figureMoveValidatorsMap = {
  [EFigureTypes.Pawn]: checkPawnMoveIsCorrect,
};

interface IBoardFieldProps {
  fieldData: IBoardField;
  position: string;
  selectedFigurePosition: string | null;
  boardFieldsMap: IBoardFieldsMap;
  activeMoveColor: TColor;
  onSelectFigure: (figurePosition: string) => void;
  onChangeActiveMoveColor: () => void;
}

export const BoardField: React.FC<IBoardFieldProps> = (props) => {
  const {
    fieldData,
    position,
    selectedFigurePosition,
    boardFieldsMap,
    activeMoveColor,
    onSelectFigure,
    onChangeActiveMoveColor,
  } = props;
  const { color, figureInField } = fieldData;
  const dispatch = useDispatch();

  const FigureComponent = figureInField?.figureComponent;
  const figureColor = figureInField?.color;
  const isFigureRender = FigureComponent && figureColor;

  const [positionChar, positionNumber] = position.split('');
  const isRenderChar = Number(positionNumber) === 1;
  const isRenderNumber = positionChar === 'a';
  const isFigureSelected = selectedFigurePosition === position;

  const handleClick = () => {
    if (figureColor !== activeMoveColor) {
      return;
    }
    onSelectFigure(position);
  };

  const handleClickInField = () => {
    if (!selectedFigurePosition) {
      return;
    }
    if (boardFieldsMap[selectedFigurePosition].figureInField) {
      const figureType = boardFieldsMap[selectedFigurePosition].figureInField
        ?.figureType as EFigureTypes;

      const checkMoveIsValid = figureMoveValidatorsMap[figureType];

      if (checkMoveIsValid(selectedFigurePosition, position, boardFieldsMap)) {
        dispatch(moveFigure({ positionFrom: selectedFigurePosition, positionTo: position }));
        onChangeActiveMoveColor();
      }
    }
    onSelectFigure('');
  };

  useEffect(() => {
    if (startPositionFiguresMap[position]) {
      dispatch(
        appendFigureInField({
          position: position,
          figureInField: startPositionFiguresMap[position],
        }),
      );
    }
  }, []);

  return (
    <div className={s.fieldWrapper} onClick={handleClickInField}>
      {isRenderChar && <span className={s.charColumnPosition}>{positionChar.toUpperCase()}</span>}
      {isRenderNumber && <span className={s.numberRowPosition}>{positionNumber}</span>}
      <div className={classNames(s.field, s[color])}>
        {isFigureRender && (
          <div onClick={handleClick} className={classNames(isFigureSelected && s.selectedFigure)}>
            <FigureComponent color={figureColor} />
          </div>
        )}
      </div>
    </div>
  );
};
