import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Home from './containers/Home';
import ScrollToTop from './utils/ScrollToTop';

export enum AuthRoutes {}

export enum PublicRoutes {
  home = '/',
}

const routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route exact path={PublicRoutes.home} component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
