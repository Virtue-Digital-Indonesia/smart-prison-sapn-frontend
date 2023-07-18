// PAGES
import SignIn from 'pages/SignIn/SignIn'
import Home from 'pages/Home/Home'
import CameraDetail from 'pages/CameraDetail/CameraDetail'

const routes = [
  // AUTHENTICATION
  {
    path: '/sign-in',
    element: <SignIn/>,
    routeType: 'authentication',
  },

  // PRIVATE
  {
    path: '/',
    element: <Home/>,
    routeType: 'private',
  },
  {
    path: '/camera/detail/:id',
    element: <CameraDetail/>,
    routeType: 'private',
  },
]

export default routes