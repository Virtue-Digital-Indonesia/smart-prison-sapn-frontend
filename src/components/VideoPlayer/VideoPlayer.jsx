import React, { useState } from 'react'

// MUIS
import { Stack, Typography, CircularProgress } from '@mui/material'

const VideoPlayer = ({ src, styles }) => {
  const [isMediaNotFound, setIsMediaNotFound] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <>
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

      {loading && (
        <Stack
          position='absolute'
          top={styles.width !== undefined ? '45%' : '50%'}
          left={styles.width !== undefined ? '40%' : '45%'}
        >
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

export default VideoPlayer
