// PAGES
import SignIn from 'pages/SignIn/SignIn'
import Home from 'pages/Home/Home'
import CameraDetail from 'pages/CameraDetail/CameraDetail'
import ValueSetting from 'pages/ValueSetting/ValueSetting'
import Camera from 'pages/Camera/Camera'
import CameraAdd  from 'pages/CameraAdd/CameraAdd'
import AllCamera from 'pages/AllCamera/AllCamera'

const routes = [
  // AUTHENTICATION
  {
    path: '/sign-in',
    element: <SignIn />,
    routeType: 'authentication',
  },

  // PRIVATE
  {
    path: '/',
    element: <Home />,
    routeType: 'private',
  },
  {
    path: '/camera/detail/:id',
    element: <CameraDetail />,
    routeType: 'private',
  },
  {
    path: '/value-setting',
    element: <ValueSetting />,
    routeType: 'private',
  },
  {
    path: '/camera',
    element: <Camera />,
    routeType: 'private',
  },
  {
    path: '/camera/add-camera',
    element: <CameraAdd />,
    routeType: 'private',
  },
  {
    path: '/camera/edit/:id',
    element: <CameraAdd />,
    routeType: 'private',
  },
  {
    path: '/all-camera',
    element: <AllCamera />,
    routeType: 'private',
  },
]

export default routes
