import { createContext, useContext } from 'react';

const PageStackContext = createContext<{
  moveNextPage: (path: string) => void;
  moveBeforePage: () => void;
}>({ moveNextPage: () => {}, moveBeforePage: () => {} });

const usePageStackContext = () => useContext(PageStackContext);

export { PageStackContext, usePageStackContext };
