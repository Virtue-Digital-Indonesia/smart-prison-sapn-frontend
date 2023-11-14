// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f1f4f5',
  },
  container: {
    margin: '20px 40px',
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
  },
  cameraTitle: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    fontSize: '23px',
    fontWeight: 400,
    padding: '20px 40px',
  },
  button: {
    color: '#76838f',
    backgroundColor: '#e4eaec',
    borderColor: '#e4eaec',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#e4eaec80',
      borderColor: '#e4eaec80',
    },
  },
  cameraContainer: {
    margin: '40px',
    alignItems: 'center',
  },
  camera: {
    height: 540,
    border: '3px solid black',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '1200px',
    width: '100%',
  },
  logContainer: {
    margin: '40px',
  },
  icon: {
    width: '200px',
    height: '200px',
  },
  logListContainer: {
    margin: '0 0 0 20px',
    flexDirection: 'row',
    cursor: 'pointer',
  },
  '@keyframes slide': {
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-100%)' },
  },
  logListSlider: {
    animation: '$slide 15s infinite linear',
  },
  sliderPause: {
    '&:hover': {
      '& $logListSlider': {
        animationPlayState: 'paused',
      },
    },
  },
  logList: {
    width: 160,
    margin: '0 20px 0 20px',
  },
  foto: {
    backgroundColor: 'GrayText',
    objectFit: 'cover',
    width: 170,
    height: 170,
  },
  logDetails: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '11rem'
  }
}))

export default useStyles
