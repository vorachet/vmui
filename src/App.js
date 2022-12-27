import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Loader, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { Store } from './vmdk/state/Store';
import Nav from "./Nav"

export const SuspenseLoader = <Loader m={20}/>;
const About = React.lazy(() => import('./About'));
const Polished = React.lazy(() => import('./apps/Polished'));
const ComponentsDemo = React.lazy(() => import('./apps/ComponentsDemo'));
const SimpleMachine = React.lazy(() => import('./apps/SimpleMachine'));
const SimpleMachineWithControls = React.lazy(() => import('./apps/SimpleMachineWithControls'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "about",
        element: <Suspense fallback={SuspenseLoader}><About /></Suspense>,
      },
      {
        path: "polished",
        element: <Suspense fallback={SuspenseLoader}><Polished /></Suspense>,
      },
      {
        path: "comps",
        element: <Suspense fallback={SuspenseLoader}><ComponentsDemo /></Suspense>,
      },
      {
        path: "simpmach",
        element: <Suspense fallback={SuspenseLoader}><SimpleMachine /></Suspense>,
      },
      {
        path: "simpmachwithctrls",
        element: <Suspense fallback={SuspenseLoader}><SimpleMachineWithControls /></Suspense>,
      },
    ],
  },
]);

/**
 * App
 * @author Vorachet Jaroensawas
 * @returns React component
 */
function App() {
  return (
    <Provider store={Store}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{
        colorScheme: 'dark',
        colors: {
          dark: [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
          ],
        },
        components: {
          Button: {
            defaultProps: {
              color: 'gray',
              variant: 'outline',
            },
          },
        },
      }}>
        <NotificationsProvider position="top-right">
          <RouterProvider router={router} />
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default App;
