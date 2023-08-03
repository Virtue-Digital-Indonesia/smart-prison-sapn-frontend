import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

// LAYOUTS
import Private from 'layouts/Private/Private'

// CONTEXTS
import { PrivateLayoutContextProvider } from 'contexts/PrivateLayoutContext'
import { AllPagesContext } from 'contexts/AllPagesContext'

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AllPagesContext)

  return (
    // CHECK IS AUTH EMPTY?
    Object.keys(auth).length < 1 ? (
      <Navigate replace to='/sign-in' />
    ) : (
      <PrivateLayoutContextProvider>
        <Private>{children}</Private>
      </PrivateLayoutContextProvider>
    )
  )
}

export default PrivateRoute
