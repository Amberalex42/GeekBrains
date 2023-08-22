class EndGameScene extends Phaser.Scene{
    constructor(){
        super('EndGame');
    }

    create(){
        this.createBackground();
        //this.createText();
        this.setEvents();
    }

    createBackground(){
        this.add.sprite(0, 0, 'endgame').setOrigin(0);
    }

    createText(){
        this.add.text(config.width / 2, config.height / 2, 'Игра закончилась! Ты молодец!', {font: "500 54px Inter", fill:"#ADCFFF", align: "center"}).setOrigin(0.5)
    }

    setEvents(){
        this.input.on('pointerdown', () => {
            this.scene.start('Start')
        })
    }
}