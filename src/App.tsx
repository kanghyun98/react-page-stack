import AppRoute from './AppRoute';
import PageStack from './stack/PageStack';

const App = () => {
  return <PageStack AppRoute={AppRoute} />;
};

export default App;
