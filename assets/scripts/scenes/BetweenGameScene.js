class BetweenGameScene extends Phaser.Scene{
    constructor(){
        super('BetweenGame');
    }

    create(){
        this.createBackground();
        //this.createText();
        //this.setEvents();

        this.time.addEvent({
            delay: 5000,
            callback: ()=>{
                this.scene.start('Game2')
            }
        })
    }

    createBackground(){
        this.add.sprite(0, 0, 'betweengame').setOrigin(0);
    }

    createText(){
        this.add.text(config.width / 2, config.height / 2, 'Игра закончилась! Ты молодец!', {font: "500 54px Inter", fill:"#ADCFFF", align: "center"}).setOrigin(0.5)
    }

    // setEvents(){
    //     this.input.on('pointerdown', () => {
    //         this.scene.start('Game')
    //     })
    // }
}