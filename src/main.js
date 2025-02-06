import './style.css'
import * as Phaser from 'phaser'

import Game from './Scenes/game'
import Preloader from './Scenes/Preloader'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200}
    }
  },

  scene: [Preloader, Game]
}

export default new Phaser.Game(config)