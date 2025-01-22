import { createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Result from "./Components/Result/Result";

export const routers = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/result',
        element: <Result />
    },
])