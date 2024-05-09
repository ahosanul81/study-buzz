import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import GroupStudyProvider from './Context/GroupStudyProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GroupStudyProvider>
      <RouterProvider router={router} />
    </GroupStudyProvider>
  </React.StrictMode>,
)
