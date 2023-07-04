// PAGES
import SignIn from 'pages/SignIn/SignIn'
import Home from 'pages/Home/Home'

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
]

export default routes