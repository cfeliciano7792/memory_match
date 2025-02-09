import Phaser from "phaser";

export default class Preloader extends Phaser.Scene 
{
    constructor()
    {
        super('preloader')
    }

    preload()
    {
        this.load.spritesheet('sokoban', 'textures/sokoban_tilesheet.png', {
            frameWidth: 64
        })

        // load animal images
        this.load.image('dog', 'textures/dog.png')
        this.load.image('cow', 'textures/cow.png')
        this.load.image('sloth', 'textures/sloth.png')
        this.load.image('narwhal', 'textures/narwhal.png')
        this.load.image('parrot', 'textures/parrot.png')
        this.load.image('penguin', 'textures/penguin.png')
        this.load.image('pig', 'textures/pig.png')
        this.load.image('walrus', 'textures/walrus.png')
        

    }

    create()
    {
        // create idle animations
        this.anims.create({
            key: 'down-idle',
            frames: [{ key: 'sokoban', frame: 52}]
        })

        this.anims.create({
            key: 'up-idle',
            frames: [{ key: 'sokoban', frame: 55}]
        })

        this.anims.create({
            key: 'left-idle',
            frames: [{ key: 'sokoban', frame: 81}]
        })

        this.anims.create({
            key: 'right-idle',
            frames: [{ key: 'sokoban', frame: 78}]
        })


        // create walking animations
        this.anims.create({
            key: 'down-walk',
            frames: this.anims.generateFrameNumbers('sokoban', { start: 52, end: 54}),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
           key: 'up-walk',
           frames: this.anims.generateFrameNumbers('sokoban', {start: 55, end: 57}),
           frameRate: 4,
           repeat: -1
        })
        
        this.anims.create({
            key: 'left-walk',
            frames: this.anims.generateFrameNumbers('sokoban', {start: 81, end: 83}),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'right-walk',
            frames: this.anims.generateFrameNumbers('sokoban', {start: 78, end: 80}),
            frameRate: 4,
            repeat: -1
        })

        // start game scene
        this.scene.start('game')
    }
}