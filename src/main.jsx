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
import Login from './Pages/Home/Login';
import SignUp from './Pages/SignUp';

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
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/sign_up",
        element: <SignUp></SignUp>,
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
