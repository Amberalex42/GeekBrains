class StartScene extends Phaser.Scene{
    constructor(){
        super('Start');
    }

    create(){
        this.createBackground();
        //this.createText();

        console.log('here');
        this.game1button = this.add.sprite(800, 900, 'game1button').setOrigin(0, 0).setInteractive();
        this.game2button = this.add.sprite(1000, 900, 'game2button').setOrigin(0, 0).setInteractive();
        this.setEvents();
    }

    createBackground(){
        this.add.sprite(0, 0, 'dolphin').setOrigin(0);
    }

    createText(){
        this.add.text(config.width / 2, config.height / 2, 'Привет! Пришло время веселых занятий! Давай начнем!\nНажми любую кнопку', {font: "500 54px Inter", fill:"#ADCFFF", align: "center"}).setOrigin(0.5)
    }

    setEvents(){
        // this.input.on('pointerdown', () => {
        //     this.scene.start('Game2')
        // })
        this.game1button.on('pointerdown', () => {
            this.scene.start('Game', {level: 0})
        })
        this.game2button.on('pointerdown', () => {
            this.scene.start('Game2', {level: 0})
        })
    }
}