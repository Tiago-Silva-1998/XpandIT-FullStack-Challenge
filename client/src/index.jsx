import React from "react"
import { createRoot } from "react-dom/client"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter(
    [
        {
            id: "home",
            path: "/app",
            element: <Home />,
            /*children: [
                {
                    path: "/top10movies/:year",
                    element: <Top10Movies />
                },
                {
                    path: "/movie/:id",
                    element: <MovieDetails />
                }
            ]*/
        }
    ]
)

const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router={ router }/>)
