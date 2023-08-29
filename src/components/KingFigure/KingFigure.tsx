import React from 'react';
import whiteKing from '../../images/whiteKing.png';
import blackKing from '../../images/blackKing.png';
import { IFigure } from 'types';

export const KingFigure: React.FC<IFigure> = (props) => {
  const { color } = props;

  const imagesMap = {
    white: whiteKing,
    black: blackKing,
  };

  return <img src={imagesMap[color]} />;
};
