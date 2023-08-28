import { useContext } from 'react'

// CONSTANTS
import { colors } from 'constants/colors'

// COMPONENTS
import CollapseSideBar from './CollapseSideBar'
import ExpandSideBar from './ExpandSideBar'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import { Stack } from '@mui/material'

const Sidebar = () => {
  const { isDrawerExpanded, appTheme } = useContext(PrivateLayoutContext)

  return (
    <Stack
      className='zoom'
      width={isDrawerExpanded ? '260px' : '90px'}
      overflow='visible'
      height='100%'
      sx={{
        backgroundColor: appTheme.sideBar === 'dark' ? colors.brown : 'white',
        transition: 'width 0.5s',
      }}
    >
      {isDrawerExpanded ? <ExpandSideBar /> : <CollapseSideBar />}
    </Stack>
  )
}

export default Sidebar
