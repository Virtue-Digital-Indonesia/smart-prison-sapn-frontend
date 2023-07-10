// CONSTANTS
import { colors } from 'constants/colors'

// COMPONENTS
import CollapseSideBar from './CollapseSideBar'

// MUIS
import { Stack } from '@mui/material'

const Sidebar = () => {
  return (
    <Stack
      width='90px'
      overflow='visible'
      height='100%'
      sx={{ backgroundColor: colors.brown }}
    >
      <CollapseSideBar />
    </Stack>
  )
}

export default Sidebar
