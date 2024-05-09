import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory';
import Success from './pages/Success';
import SubConfirm from './pages/SubConfirm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/orderHistory',
        element: <OrderHistory />
      }, 
      {
        path: '/products/:id',
        element: <Detail />
      }, 
      {
        path: '/success',
        element: <Success />
      },
      {
        path: '/subscribed',
        element: <SubConfirm />
      },
// below links I've added //////////////////////////////////////////
//{
//  path: '/page1',
//  element: <Events />
//},
//{
//  path: '/page2',
//  element: <Event-1 />
//},
//{
//path: '/page3',
//element: <Chat />
//},

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
