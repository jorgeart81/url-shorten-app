import React from 'react';
import { useParams } from 'react-router';

export const LinkDetailsView = () => {
  const { backHalf } = useParams();
  return <div>LinkDetailsView: {backHalf}</div>;
};
