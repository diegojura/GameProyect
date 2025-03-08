import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";  
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store'

import Home from './pages/Home/Home.jsx'
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx'
import Games from './pages/Games/Games.jsx'
import AppNavbar from './components/AppNavbar.jsx'
import AppFooter from "./components/AppFooter.jsx";
import GameDetails from './pages/GameDetails/GameDetails.jsx';
import PublisherDetails from './pages/PublisherDetails/PublisherDetails.jsx';
import TagGames from './pages/TagGames/TagGames.jsx';
import GenreGames from './pages/GenreGames/GenreGames.jsx';
import Publishers from './pages/Publisher/Publisher.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import MyEvents from './pages/MyEvents/MyEvents.jsx';
import Events from './pages/Events/Events.jsx';

function AppLayout() {
  return <>
    <AppNavbar />
    <Outlet />
    <AppFooter />
  </>
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/",
      element: <Home />,
    },
    {
      path: "/games",
      element: <Games />,
    },
    {
      path: "/gameDetails/:id",
      element: <GameDetails />
    },
    {
      path: "/publisher/:id",
      element: <PublisherDetails />
    },
    {
      path: "/tag/:tag",
      element: <TagGames />
    },
    {
      path: "/genre/:genre",
      element: <GenreGames />
    },
    {
      path: "/publishers",
      element: <Publishers />
    },
    {
      path: "/favorites",
      element: <Favorites />
    },
    {
      path: "/my-events",
      element: <MyEvents />
    },
    {
      path: "/events",
      element: <Events />
    }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)