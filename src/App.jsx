import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// ASSETS
import SapnFavIconLogo from 'assets/images/logos/FavIconLogo.svg'
import SapnAppleTouchLogo from 'assets/images/logos/AppleTouchLogo.png'

// ROUTES
import routes from 'routes/routes'

// COMPONENTS
import AuthenticationRoute from 'components/Routes/AuthenticationRoute'
import PrivateRoute from 'components/Routes/PrivateRoute'

function App() {
  const getRouteComponent = (inputItem) => {
    if (inputItem.routeType === 'authentication') {
      return <AuthenticationRoute>{inputItem.element}</AuthenticationRoute>
    } else if (inputItem.routeType === 'private') {
      return <PrivateRoute>{inputItem.element}</PrivateRoute>
    } else if (inputItem.routeType === 'free') return inputItem.element
  }

  useEffect(() => {
    // UPDATE FAVICON
    const faviconElement = document.getElementById('favicon')
    faviconElement.href = SapnFavIconLogo

    const appleTouchIconElement = document.getElementById('apple-touch-icon')
    appleTouchIconElement.href = SapnAppleTouchLogo
  }, [])

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
