import FlussonicMsePlayer from '@flussonic/flussonic-mse-player'
import { useEffect, useState } from 'react'

// MUIS
import { Stack, Typography } from '@mui/material'

const MsePlayer = (props) => {
  const { url, id, styles } = props

  const [loading, setLoading] = useState(false)
  const [isMediaNotFound, setIsMediaNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    let element = document.getElementById(`${id}`)
    const player = new FlussonicMsePlayer(element, url)

    const initializePlayer = async () => {
      if (url.includes('ws')) {
        try {
          await player.play()
          console.log('Playing video')
        } catch (err) {
          console.log(err)
        }
      }

      if (player.playing) setLoading(false)
      else {
        setLoading(false)
        setIsMediaNotFound(true)
      }
    }

    initializePlayer()

    return () => {
      // eslint-disable-next-line no-undef
      if (player.playing) player.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, url])

  return (
    <>
      <video autoPlay muted id={id} style={styles} />
      {loading && (
        <Stack position='absolute' top='50%' left='45%'>
          <Typography variant='h6' color='black' textAlign='center'>
            Loading...
          </Typography>
        </Stack>
      )}
      {isMediaNotFound && (
        <Stack
          position='absolute'
          top={styles.width !== undefined ? '45%' : '50%'}
          left={styles.width !== undefined ? '30%' : '45%'}
        >
          <Typography variant='h6' color='black' textAlign='center'>
            Media Not Found
          </Typography>
        </Stack>
      )}
    </>
  )
}

export default MsePlayer
