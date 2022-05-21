import React, { FC, ReactNode } from 'react';
import { CSSTransition } from 'react-transition-group';

interface PropsType {
  children: ReactNode;
  pageNum: number;
  currentPage: number;
  mref?: React.RefObject<HTMLDivElement>;
  onExited: () => void;
}

const Page: FC<PropsType> = ({ children, pageNum, currentPage, onExited, mref }) => {
  return (
    <CSSTransition
      classNames="slide"
      timeout={500}
      key={pageNum}
      in={pageNum <= currentPage}
      onExited={onExited}
      unmountOnExit
    >
      <div className={`page ${pageNum === currentPage ? 'root' : 'notRoot'}`} id={`${pageNum}`} ref={mref}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Page;
