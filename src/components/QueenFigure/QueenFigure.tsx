import React from 'react';
import whiteQueen from '../../images/whiteQueen.png';
import blackQueen from '../../images/blackQueen.png';
import { IFigure } from 'types';

export const QuuenFigure: React.FC<IFigure> = (props) => {
  const { color } = props;

  const imagesMap = {
    white: whiteQueen,
    black: blackQueen,
  };

  return <img src={imagesMap[color]} />;
};
