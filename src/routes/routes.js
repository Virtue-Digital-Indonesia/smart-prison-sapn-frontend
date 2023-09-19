// PAGES
import SignIn from 'pages/SignIn/SignIn'
import Home from 'pages/Home/Home'
import CameraDetail from 'pages/CameraDetail/CameraDetail'
import ValueSetting from 'pages/ValueSetting/ValueSetting'
import ValueSettingAction from 'pages/ValueSettingAction/ValueSettingAction'
import Camera from 'pages/Camera/Camera'
import CameraAdd from 'pages/CameraAdd/CameraAdd'
import AllCamera from 'pages/AllCamera/AllCamera'
import Authority from 'pages/Authority/Authority'
import UserAction from 'pages/UserAction/UserAction'
import User from 'pages/User/User'
import CreateAuthority from 'pages/AuthorirtyActions/CreateAuthority/CreateAuthority'
import AuthorityManagement from 'pages/AuthorirtyActions/AuthorityManagement/AuthorityManagement'

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
    path: '/value-setting/add-value',
    element: <ValueSettingAction />,
    routeType: 'private',
  },
  {
    path: '/value-setting/edit/:id',
    element: <ValueSettingAction />,
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
  {
    path: '/authority',
    element: <Authority />,
    routeType: 'private',
  },
  {
    path: '/authority/add-authority',
    element: <CreateAuthority />,
    routeType: 'private',
  },
  {
    path: '/authority/edit-authority/:id',
    element: <CreateAuthority />,
    routeType: 'private',
  },
  {
    path: '/authority/manage/:id',
    element: <AuthorityManagement />,
    routeType: 'private',
  },
  {
    path: '/user',
    element: <User />,
    routeType: 'private',
  },
  {
    path: '/user/add-user',
    element: <UserAction />,
    routeType: 'private',
  },
  {
    path: '/user/edit/:id',
    element: <UserAction />,
    routeType: 'private',
  },
]

export default routes
