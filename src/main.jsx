import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './Layout/Layout';
import GroupStudyProvider from './Context/GroupStudyProvider';
import Home from './Pages/Home/Home';
import Assignments from './Pages/Assignments';
import CreateAssignments from './Pages/CreateAssignments';
import PendingAssignments from './Pages/PendingAssignments';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/assignments",
        element: <Assignments></Assignments>,
      },
      {
        path: "/create_assignments",
        element: <CreateAssignments></CreateAssignments>,
      },
      {
        path: "/pending_assignments",
        element: <PendingAssignments></PendingAssignments>,
      },
    ]
  },
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GroupStudyProvider>
      <RouterProvider router={router} />
    </GroupStudyProvider>
  </React.StrictMode>,
)
