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
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import UpdateAssignment from './Pages/UpdateAssignment';
import MyAssignment from './Pages/MyAssignment';
import AssignmentDeatils from './Pages/Home/AssignmentDeatils';

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
        path: "/my_attempted_assignments",
        element: <ProtectedRoute><MyAssignment></MyAssignment></ProtectedRoute>,
      },
      {
        path: "/create_assignments",
        element: <ProtectedRoute><CreateAssignments></CreateAssignments></ProtectedRoute>,
      },
      {
        path: "/assignment_update/:id",
        element: <ProtectedRoute><UpdateAssignment></UpdateAssignment></ProtectedRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/assignment_update/${params.id}`)
      },
      {
        path: "/assignment_details/:id",
        element: <ProtectedRoute><AssignmentDeatils></AssignmentDeatils></ProtectedRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/assignment_details/${params.id}`)
      },
      {
        path: "/pending_assignments",
        element: <ProtectedRoute><PendingAssignments></PendingAssignments></ProtectedRoute>,
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
