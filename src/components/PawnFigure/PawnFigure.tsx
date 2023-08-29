import React from 'react';
import blackPawn from '../../images/blackPawn.png';
import whitePawn from '../../images/whitePawn.png';

import { IFigure } from 'types';

export const PawnFigure: React.FC<IFigure> = (props) => {
  const { color } = props;

  const imagesMap = {
    white: whitePawn,
    black: blackPawn,
  };

  return <img src={imagesMap[color]} />;
};
