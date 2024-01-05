import { useEffect, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// ASSETS
import SapnFavIconLogo from 'assets/images/logos/FavIconLogo.svg'
import SapnAppleTouchLogo from 'assets/images/logos/AppleTouchLogo.png'

// CONTEXS
import { AllPagesContext } from 'contexts/AllPagesContext'

// ROUTES
import routes from 'routes/routes'

// COMPONENTS
import AuthenticationRoute from 'components/Routes/AuthenticationRoute'
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner'
import PrivateRoute from 'components/Routes/PrivateRoute'
import Snackbar from 'components/Snackbar/Snackbar'

function App() {
  const { snackbarObject, setSnackbarObject, auth } =
    useContext(AllPagesContext)

  const navigate = useNavigate()

  const { loading } = useContext(AllPagesContext)

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

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const socket = new SockJS(
      `${process.env.REACT_APP_API_BASE_URL}/ws?token=${auth.accessToken}`
    )

    // eslint-disable-next-line no-undef
    const stompClient = Stomp.over(socket)

    stompClient.connect({}, (frame) => {
      stompClient.subscribe('smart-prison-notification', (message) => {
        const convertedMessage = JSON.parse(message.body)
        if (convertedMessage.type === 'FIGHT') {
          setSnackbarObject({
            open: true,
            severity: 'error',
            title: 'Telah terjadi perkelahian!',
            message: '',
            action: () =>
              navigate(
                `/notification/detail/fighting-${convertedMessage?.payload?.id}`
              ),
          })
        }
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      {/* SNACKBAR */}
      <Snackbar
        open={snackbarObject.open}
        setToast={setSnackbarObject}
        severity={snackbarObject.severity}
        title={snackbarObject.title}
        message={snackbarObject.message}
        action={snackbarObject.action}
      />

      <LoadingSpinner loading={loading} />
    </>
  )
}

export default App
