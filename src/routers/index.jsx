import About from '@/pages/about/About';
import Contact from '@/pages/contact.jsx/Contact';
import Home from '@/pages/home/Home';
import Layout from '@/pages/layout/Layout';
import React from 'react'
import { useRoutes } from 'react-router-dom'

const Routers = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        // {
        //   path: "/movie/:id",
        //   element: <Details />,
        // },
        // {
        //   path: "/notfount",
        //   element: <NotFount />,
        // },
      ],
    },
  ]);
   
}

export default Routers