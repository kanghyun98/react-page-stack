import { FC, TouchEvent, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransitionGroup } from 'react-transition-group';
import { PageStackContext } from '.';

import Page from './Page';

type moveTypes = 'next' | 'back';

const PageStack: FC<any> = ({ AppRoute }) => {
  const [componentStack, setComponentStack] = useState<any[]>([]);
  const [moveType, setMoveType] = useState<moveTypes>('next');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const lastPageRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const getPage = (location: string) => {
    return AppRoute(location);
  };

  const onExited = () => {
    setComponentStack(componentStack.slice(0, -1));
  };

  const moveNextPage = (location: string) => {
    navigate(location);
    setMoveType('next');
    setCurrentPage((page) => page + 1);

    setComponentStack((prev) => [...prev, getPage(location)]);
  };

  const moveBeforePage = () => {
    if (componentStack.length > 1) {
      navigate(-1);
      setMoveType('back');
      setCurrentPage((page) => page - 1);
    }
  };

  useEffect(() => {
    console.log(lastPageRef);
    if (!lastPageRef.current) return;
    const $ref = lastPageRef.current;
    let startX = 0;
    const $stackComponent = lastPageRef.current;

    const onTouchStart = (e: globalThis.TouchEvent) => {
      const touch = e.touches[0];
      const { screenX } = touch;
      startX = screenX;
    };

    const onTouchMove = (e: globalThis.TouchEvent) => {
      const touch = e.touches[0];
      const { clientX } = touch;
      requestAnimationFrame(() => {
        $ref.style.transition = '';
        $ref.style.transform = `translate3d(${clientX}px, 0, 0)`;
      });

      if (startX > 10) return;
    };

    const onTouchEnd = (e: globalThis.TouchEvent) => {
      const touch = e.changedTouches[0];
      const { clientX } = touch;

      // if touch ends on the right side of screen
      if (clientX > window.innerWidth / 2) {
        moveBeforePage();
      }
      startX = 0;
    };

    $stackComponent.addEventListener('touchstart', onTouchStart, { passive: true });
    $stackComponent.addEventListener('touchmove', onTouchMove, { passive: true });
    $stackComponent.addEventListener('touchend', onTouchEnd, { passive: true });
  }, [lastPageRef, currentPage]);

  useEffect(() => {
    moveNextPage('/');
  }, []);

  return (
    <TransitionGroup className={`stack ${moveType}`}>
      <PageStackContext.Provider
        value={{
          moveNextPage,
          moveBeforePage,
        }}
      >
        {componentStack.map((comp, idx) => {
          console.log(componentStack.length);
          if (idx === componentStack.length - 1) {
            console.log('last');
            return (
              <Page
                key={`${idx + 1}`}
                pageNum={idx + 1}
                currentPage={currentPage}
                onExited={onExited}
                mref={lastPageRef}
              >
                {comp}
              </Page>
            );
          }
          return (
            <Page key={`${idx + 1}`} pageNum={idx + 1} currentPage={currentPage} onExited={onExited}>
              {comp}
            </Page>
          );
        })}
      </PageStackContext.Provider>
    </TransitionGroup>
  );
};

export default PageStack;
