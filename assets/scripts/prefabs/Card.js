class Card extends Phaser.GameObjects.Sprite {
    constructor(scene, value){
        let texture = "";
        if(scene.scene.key == "Game2"){
            texture = 'card2_ss'
        }else{
            texture = 'card_ss'
        }
        super(scene, 0, 0, texture);
        this.scene = scene;
        this.value = value;
        this.opened=false;
        this.scene.add.existing(this);

        if(this.scene.scene.key == "Game2"){
            this.setInteractive({draggable: true});
        }else{
            this.setInteractive();
        }
    }

    init(position){
        this.setOrigin(0, 0);
        this.position = position
        this.setPosition(-this.width, -this.height);
    }

    move(params){
        this.scene.tweens.add({
            targets: this,
            x: params.x,
            y: params.y,
            delay: params.delay,
            ease: 'Linear',
            duration: 250,
            onComplete: () => {
                if(params.callback){
                    params.callback();
                }
            }
        });
    }

    flip(callback){
        this.scene.tweens.add({
            targets: this,
            scaleX: 0,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                this.show(callback);
            }
        })
    }

    show(callback){
        this.caption = this.scene.add.text(this.position.x + this.width / 2, this.position.y + this.height / 2, this.value, {font: "600 48px Inter", fill:"#1E1E1E"});
        this.caption.depth = this.depth + 100;
        this.caption.setOrigin(0.5);
        this.scene.tweens.add({
            targets: this,
            scaleX: 1,
            ease: 'Linear',
            duration: 150,
            onComplete: () => {
                if(callback){
                    callback();
                }
            }
        })
    }

    open(callback){
        this.opened = true;
        this.flip(callback);
    }

    close(){
        if (this.opened){
            this.opened = false;
            this.flip()
        }
    }
}