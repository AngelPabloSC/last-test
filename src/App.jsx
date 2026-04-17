import { useEffect } from 'react';
import { useRoutes, useLocation } from 'react-router-dom';
import router from '@/routes/index';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

const App = () => {
  const routes = useRoutes(router);
  return (
    <>
      <ScrollToTop />
      {routes}
    </>
  );
};

export default App;

