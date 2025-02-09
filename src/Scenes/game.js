import Phaser from "phaser";

const level = [
	[5, 1, 2, 7],
	[3, 7, 0, 4],
	[0, 5, 3, 1],
	[2, 4, 6, 6],
]

export default class Game extends Phaser.Scene {
	constructor() {
		super("game");
		this.cursors;
		this.player;
		this.speed = 200;
		this.boxGroup;
		this.activeBox;
		this.itemsGroup
	}

	create() {
		const { width, height } = this.scale;
		this.player = this.physics.add
			.sprite(width * 0.5, height * 0.6, "sokoban", 52)
			.setSize(40, 16)
			.setOffset(12, 38)
			.play("down-idle");

		this.cursors = this.input.keyboard.createCursorKeys();

		// add boxes to the screen
		this.boxGroup = this.physics.add.staticGroup();

		this.itemsGroup = this.add.group()

		this.createBoxes();

		//collision between player and box
		this.physics.add.collider(this.player, this.boxGroup, this.handlePlayerBoxCollide, undefined, this);
	}

	update() {
		
		this.updatePlayer()
		
		// player depth
		this.player.setDepth(this.player.y);

		this.updateActiveBox()

		this.updateActiveBox()

	}

	createBoxes() {
		const { width, height } = this.scale;
		let xPercent = 0.2;
		let yCor = 100;
		for (let row = 0; row < level.length; ++row) {
			for (let col = 0; col < level[row].length; ++col) {
				const box = this.boxGroup.create(width * xPercent, yCor, "sokoban", 6);
				box.setSize(64, 32);
				box.setOffset(0, 32);
				box.setDepth(box.y);
				box.setData('itemType', level[row][col])
				xPercent += 0.2;
			}

			xPercent = 0.2;
			yCor += 150;
		}
	}

	handlePlayerBoxCollide(player, box) {
		if (this.activeBox) {
			return
		}
		this.activeBox = box
		this.activeBox.setFrame(9)
	}

	// update box if player gets to far
	updateActiveBox() {
		if (!this.activeBox) {
			return
		}
		// calculate distance
		const distance = Phaser.Math.Distance.Between(
			this.player.x, this.player.y,
			this.activeBox.x, this.activeBox.y
		)

		if (distance < 64) {
			return
		}
		//change box back to orginal color
		this.activeBox.setFrame(6)

		this.activeBox = undefined
	}

	openBox(box){
		if (!box){
			return
		}

		const itemType = box.getData('itemType')

		let item

		switch (itemType){
			case 0:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('dog')
				break

			case 1:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('cow')
				break

			case 2:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('sloth')
				break

			case 3:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('narwhal')
				break

			case 4:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('parrot')
				break
		
			case 5:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('penguin')
				break

			case 6:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('pig')
				break
			
			case 7:
				item = this.itemsGroup.get(box.x, box.y)
				item.setTexture('walrus')
				break
		}

		box.setData('opened', true)

		item.scale = 0
		item.alpha = 0

		this.tweens.add({
			targets: item,
			y: '-=65',
			alpha: 1,
			scale: .5,
			duration: 500
		})
	}



	updatePlayer() {

		if (this.cursors.left.isDown) {
			this.player.setVelocity(-this.speed, 0);
			this.player.play("left-walk", true);
		} else if (this.cursors.right.isDown) {
			this.player.setVelocity(this.speed, 0);
			this.player.play("right-walk", true);
		} else if (this.cursors.up.isDown) {
			this.player.setVelocity(0, -this.speed);
			this.player.play("up-walk", true);
		} else if (this.cursors.down.isDown) {
			this.player.setVelocity(0, this.speed);
			this.player.play("down-walk", true);
		} else {
			this.player.setVelocity(0, 0);
			// retrieve what direction the player is facing
			const key = this.player.anims.currentAnim.key;
			const parts = key.split("-");
			const direction = parts[0];
			// set idle animation to current direction
			this.player.play(`${direction}-idle`);
		}

		// press the spacebar to open the box
		const spaceJustPressed = Phaser.Input.Keyboard.JustUp(this.cursors.space)
		if (spaceJustPressed && this.activeBox){
			this.openBox(this.activeBox)

			//reset box after opened
			this.activeBox.setFrame(6)
			this.activeBox = undefined
		}

	}
}
