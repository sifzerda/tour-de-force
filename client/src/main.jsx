import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
// index.js or App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory';
import Success from './pages/Success';
//import SubConfirm from './pages/SubConfirm.jsx';
import Shop from './pages/Shop.jsx';
import Shows from './pages/Shows.jsx';
import ShowDetail from './pages/ShowDetail.jsx';
//import Tickets from './pages/Tickets.jsx';
import TicketDetail from './pages/TicketDetail.jsx';
import TicketPurchase from './pages/TicketPurchase.jsx';
import TicketConfirm from './pages/TicketConfirm.jsx';

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
      ////////////////////////////////////////
      {
        path: '/login',
        element: <Login />
      },
      ////////////////////////////////////////
      {
        path: '/signup',
        element: <Signup />
      },
      ////////////////////////////////////////
      {
        path: '/account',
        element: <OrderHistory />
      },
      ////////////////////////////////////////
      {
        path: '/products/:id',
        element: <Detail />
      },
      ////////////////////////////////////////
      {
        path: '/success',
        element: <Success />
      },
      ////////////////////////////////////////
      {
        path: '/tickets/:id',
        element: <TicketDetail />
      },
      ////////////////////////////////////////
      {
        path: '/shop',
        element: <Shop />
      },
      ////////////////////////////////////////
      {
        path: '/shows',
        element: <Shows />
      },
      ////////////////////////////////////////
      {
        path: '/shows/:id',
        element: <ShowDetail />
      },
      ////////////////////////////////////////
      {
        path: '/tickets/purchase/:id',
        element: <TicketPurchase />
      },
      // more links //////////////////////////////////////////
      {
        path: '/tickets/purchase/confirm',
        element: <TicketConfirm />
      },
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
