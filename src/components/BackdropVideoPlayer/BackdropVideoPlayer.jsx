import { useState, useRef, useEffect } from 'react'

// MUIS
import { Stack, Typography } from '@mui/material'

const BackdropVideoPlayer = ({ src }) => {
  const [isMediaNotFound, setIsMediaNotFound] = useState(false)
  const [loading, setLoading] = useState(true)
  const [styles, setStyles] = useState()
  const [renderImageComponent, setRenderImgageComponent] = useState(true)

  const imageRef = useRef()

  useEffect(() => {
    if (imageRef.current !== null) {
      setTimeout(() => {
        if (imageRef.current.naturalHeight < 590) {
          setStyles({ width: '100%' })
          setTimeout(() => {
            setRenderImgageComponent(false)
          }, 1000)
        } else {
          setStyles({ height: '100%' })
          setTimeout(() => {
            setRenderImgageComponent(false)
          }, 1000)
        }
      }, 1000)
    }
  }, [])

  return (
    <>
      {!renderImageComponent && (
        <img
          src={src}
          alt=''
          style={styles}
          onError={() => {
            setLoading(false)
            setIsMediaNotFound(true)
          }}
          onLoad={() => {
            setLoading(false)
          }}
        />
      )}

      {/* THIS COMPONENT JUST FOR GETTING NATURAL HEIGHT VIDEO
      IF VIDEO'S RESOLUTION IS 800 x 450 SET HIGH = 100%
      ELSE IF VIDEO'S RESOLUTION IS 800 x 650 SET WIDTH = 100% 
      CURRENTLY, THIS METHODE IS WORKING FOR CASE TRUNCATED VIDEO BECAUSE DIFFERENCE IN RESOLUTION
      */}
      {renderImageComponent && (
        <img ref={imageRef} src={src} alt='' style={{ width: 0, height: 0 }} />
      )}

      {loading && (
        <Stack position='absolute'>
          <Typography variant='h6' color='black' textAlign='center'>
            Loading...
          </Typography>
        </Stack>
      )}

      {isMediaNotFound && (
        <Stack position='absolute'>
          <Typography variant='h6' color='black' textAlign='center'>
            Media Not Found
          </Typography>
        </Stack>
      )}
    </>
  )
}

export default BackdropVideoPlayer
