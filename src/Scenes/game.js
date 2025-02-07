import Phaser from "phaser";

export default class Game extends Phaser.Scene 
{
    constructor()
    {
        super('game')
        this.cursors
        this.player
        this.speed = 200
        this.boxGroup
    }

    create()
    {
        const { width, height } = this.scale
        this.player = this.physics.add.sprite(width * 0.5, height * 0.6, 'sokoban', 52).play('down-walk')

        this.cursors = this.input.keyboard.createCursorKeys()

        // add boxes to the screen
        this.boxGroup = this.physics.add.staticGroup()

        let xPercent = 0.20
        let yCor = 75
        for (let row = 0; row < 4; ++row)
        {
            for (let col = 0; col < 4; ++col)
            {
                this.boxGroup.get(width * xPercent, yCor, 'sokoban', 10)
                xPercent += 0.20
            }

            xPercent = 0.20
            yCor += 150
        }

    }

    update(){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocity(-this.speed, 0)
            this.player.play('left-walk', true)
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocity(this.speed, 0)
            this.player.play('right-walk', true)
        }
        else if (this.cursors.up.isDown)
        {
            this.player.setVelocity(0,-this.speed)
            this.player.play('up-walk', true)
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocity(0, this.speed)
            this.player.play('down-walk', true)
        }
        else
        {
            this.player.setVelocity(0, 0)
            // retrieve what direction the player is facing
            const key = this.player.anims.currentAnim.key
            const parts = key.split('-')
            const direction = parts[0]
            // set idle animation to current direction
            this.player.play(`${direction}-idle`)
        }
    }
}
