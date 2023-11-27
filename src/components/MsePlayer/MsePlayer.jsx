import FlussonicMsePlayer from '@flussonic/flussonic-mse-player'
import { useEffect } from 'react'

const MsePlayer = (props) => {
  const { url, id, styles } = props

  useEffect(() => {
    let element = document.getElementById(`${id}`)
    const player = new FlussonicMsePlayer(element, url)

    player.play()

    return () => {
      player.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, url])

  return <video autoPlay muted id={id} style={styles} />
}

export default MsePlayer
