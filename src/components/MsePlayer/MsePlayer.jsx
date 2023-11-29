import FlussonicMsePlayer from '@flussonic/flussonic-mse-player'
import { useEffect } from 'react'

const MsePlayer = (props) => {
  const { url, id, styles } = props

  useEffect(() => {
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
    }

    initializePlayer()

    return () => {
      // eslint-disable-next-line no-undef
      if (player.playing) player.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, url])

  return <video autoPlay muted id={id} style={styles} />
}

export default MsePlayer
