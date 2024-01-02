import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import ResourceNotFound from './pages/ResourceNotFound.tsx'
import './styles/index.scss'

const router = createBrowserRouter([
    {
        path: "twins/:twinId",
        element: <App/>,
        errorElement: <ResourceNotFound/>,
    },
    {
        path: "/",
        loader: async () => {
            window.location.href = 'https://platform.myxrobotics.com/'
            return null
        }
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
