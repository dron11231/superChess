import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { generateBoardFieldsMap } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { generateBoardFieldsAction } from 'redux/reducers/BoardFields';
import { getBoardFieldsMap } from 'redux/reducers/BoardFields/selectors';
import { BoardField } from './components';
import { TColor } from 'types';

export const Board: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedFigurePosition, setSelectedFigurePosition] = useState<string | null>(null);
  const [activeMoveColor, setActiveMoveColor] = useState<TColor>('white');

  const boardFieldsMap = useSelector(getBoardFieldsMap);
  const boardFieldsKeys = Object.keys(boardFieldsMap);

  const handleSelectFigure = (figurePosition: string) => {
    setSelectedFigurePosition(figurePosition);
  };

  const handleChangeActiveMoveColor = () => {
    setActiveMoveColor((previousState) => {
      return previousState === 'white' ? 'black' : 'white';
    });
  };

  useEffect(() => {
    dispatch(generateBoardFieldsAction(generateBoardFieldsMap()));
  }, []);

  if (!boardFieldsKeys.length) return null;

  return (
    <div className={s.board}>
      <div className={s.fields}>
        {boardFieldsKeys.map((positionKey) => (
          <BoardField
            activeMoveColor={activeMoveColor}
            onChangeActiveMoveColor={handleChangeActiveMoveColor}
            boardFieldsMap={boardFieldsMap}
            selectedFigurePosition={selectedFigurePosition}
            onSelectFigure={handleSelectFigure}
            position={positionKey}
            key={positionKey}
            fieldData={boardFieldsMap[positionKey]}
          />
        ))}
      </div>
    </div>
  );
};
