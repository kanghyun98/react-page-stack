import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePageStackContext } from '../stack';

const HeaderNav = () => {
  const { id } = useParams();
  const { moveBeforePage } = usePageStackContext();

  return (
    <>
      <button className="back-btn" onClick={moveBeforePage}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <span className="header-title">{id}</span>
      <button className="close-btn">
        <i className="fas fa-times"></i>
      </button>
    </>
  );
};

export default HeaderNav;
