import React from 'react';
import { useParams } from 'react-router-dom';

const Contents = () => {
  const { id } = useParams();

  return <h2>{id}</h2>;
};

export default Contents;
