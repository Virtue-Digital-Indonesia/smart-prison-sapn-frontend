import { Routes, Route } from 'react-router-dom'

// ROUTES
import routes from 'routes/routes'

// COMPONENTS
import AuthenticationRoute from 'components/Routes/AuthenticationRoute'
import PrivateRoute from 'components/Routes/PrivateRoute'

function App() {
  const getRouteComponent = (inputItem) => {
    if (inputItem.routeType === 'authentication') {
      return (
        <AuthenticationRoute>
          {inputItem.element}
        </AuthenticationRoute>
      )
    }
    else if (inputItem.routeType === 'private') {
      return (
        <PrivateRoute>
          {inputItem.element}
        </PrivateRoute>
      )
    }
    else if (inputItem.routeType === 'free') return inputItem.element
  }

  return (
    <>
      <Routes>
        {routes.map((item, index) => (
          <Route 
            key={index}
            path={item.path} 
            element={getRouteComponent(item)}
          />
        ))}
      </Routes>
    </>
  )
}

export default App
