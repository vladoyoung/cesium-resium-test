import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import ResourceNotFound from './pages/ResourceNotFound.tsx'
import './styles/index.scss'

const signInPass = import.meta.env.VITE_VLAD_PLATFORM_PASSWORD

const router = createBrowserRouter([
    {
        path: "twins/:twinId",
        element: <App/>,
        errorElement: <ResourceNotFound/>,
        loader: async ({params : { twinId }}) => {
            const hardcodedSignIn = await fetch(
                `http://localhost:4213/api/v1/users/sign-in/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        campaignTags: [''],
                        email: 'v.nikolov@myxrobotics.com',
                        password: signInPass }),
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                }
            );
            // console.log(hardcodedSignIn)
            if (!hardcodedSignIn.ok) {
                throw new Response(`Failed to sign in`, { status: hardcodedSignIn.status });
            }
            const twinMetadata = await fetch(`http://localhost:4213/api/v1/twins/${twinId}/metadata`);
            if (!twinMetadata.ok) {
                throw new Response(`Twin with ID ${twinId} not found`, { status: twinMetadata.status });
            }
            const twinMetadataBody = await twinMetadata.json()
            const userInfo = await fetch(`http://localhost:4213/api/v1/users/me`, { credentials: "include" });
            // console.log(userInfo);
            if (!userInfo.ok) {
                throw new Response(`Could not find user information`, { status: userInfo.status });
            }
            // console.log('all router checks passed')
            return twinMetadataBody.id;
        }
    },
    {
        path: "/",
        errorElement: <ResourceNotFound/>,
        loader: async () => {
            throw new Response(`Use the full /twins/:twinId path`);
        },
        children: [
            {
                path: "*",
            },
        ],
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
