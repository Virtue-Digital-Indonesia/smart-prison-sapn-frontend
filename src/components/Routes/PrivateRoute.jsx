// LAYOUTS
import Private from 'layouts/Private/Private'

// CONTEXTS
import { PrivateLayoutContextProvider } from 'contexts/PrivateLayoutContext'

const PrivateRoute = ({children}) => {
  return (
    <PrivateLayoutContextProvider>
      <Private>
        {children}
      </Private>
    </PrivateLayoutContextProvider>
  )
}

export default PrivateRoute