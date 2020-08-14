import Main from './Main';
import Registration from './Registration';
import Enter from './Enter';
import Profile from './Profile';
import Work from './Work';
import Separate from './Separate';
import Communication from './Communication';
import NoMatch from './NoMatch';

import { getData } from './fetchData';

const routes = [
  {
    path: '/',
    component: Main,
    exact: true
  },
  {
    path: ['/registration', '/signup'],
    component: Registration,
    exact: true
  },
  {
    path: '/signin',
    component: Enter,
    exact: true
  },
  {
    path: '/profile',
    component: Profile,
    exact: true
  },
  {
    path: '/profilefast',
    component: Profile,
    fetchInitialData: () => getData()
  },
  {
    path: ['/work', '/create'],
    component: Work,
    exact: true
  },
  {
    path: '/communication',
    component: Communication,
    exact: true
  },
  {
    path: '/work/:id',
    component: Separate,
    exact: true
  },
  {
    component: NoMatch
  }
]

export default routes;
