import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Root from '../layout/Root';
import Register from '../pages/Register/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ],
  },
]);
