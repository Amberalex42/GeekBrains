class Game2Scene extends Phaser.Scene{
    constructor(){
        super('Game2');
    }

    create(){
        this.anims.create({
            key: 'good_blink',
            frames: this.anims.generateFrameNumbers('card2_ss', {frames: [1, 0]}),
            frameRate: 4,
            repeat: 3
        });
        this.anims.create({
            key: 'bad_blink',
            frames: this.anims.generateFrameNumbers('card2_ss', {frames: [2, 0]}),
            frameRate: 4,
            repeat: 2
        });

        this.createSounds();
        this.createBackground();
        this.createCards();
        this.createAnswer();
        this.start();

    }

    update(){
        if (this.ans_cards.every((x) => x.opened == true)){
            this.time.addEvent({
                delay: 5000,
                callback: ()=>{
                    this.scene.start('EndGame')
                }
            })
        }
        // if (this.ans_card1.opened && this.ans_card2.opened && this.ans_card3.opened && this.ans_card4.opened && this.ans_card5.opened){
        //     this.scene.start('EndGame')
        // }
    }

    createSounds(){
        this.sounds = {
            bulk: this.sound.add('bulk'),
            correct: this.sound.add('correct'),
            end_session: this.sound.add('end_session'),
            game1_poni: this.sound.add('game1_poni'),
            game1_task: this.sound.add('game1_task'),
            right_answer: this.sound.add('right_answer'),
            welldone: this.sound.add('welldone'),
            word2slog: this.sound.add('word2slog'),
            word3slog: this.sound.add('word3slog'),
            game2zadanie: this.sound.add('game2zadanie')
        };
    }

    createBackground(){
        this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

        this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(40, 40, 400, 200);
        this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(40, 278, 400, 225);
        this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(40, 538, 400, 105);
        this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(40, 680, 400, 105);
        this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(480, 40, 1400, 1000);

        this.add.sprite(80, 80, 'avatar').setOrigin(0, 0);
        this.add.sprite(80, 315, 'star').setOrigin(0, 0);
        this.add.text(112, 310, "35", {font: "600 32px Inter", fill:"#3C90DE"}).setOrigin(0);
        this.add.text(77, 440, "Статус: ", {font: "600 24px Inter", fill:"#B6C6DF"}).setOrigin(0);
        this.add.text(176, 440, "Бывалый", {font: "600 24px Inter", fill:"#3C90DE"}).setOrigin(0);
        this.add.sprite(80, 365, 'progress').setOrigin(0, 0);
        for(let i = 0; i < 6; i++){
            this.add.sprite(66 + 60 * i, 564, 'medal').setOrigin(0, 0);
        }
        this.add.sprite(75, 713, 'calendar').setOrigin(0, 0);
        this.add.text(132, 705, "7", {font: "700 56px Inter", fill:"#3C90DE"}).setOrigin(0);
        this.add.text(180, 707, "дней без\nпропуска", {font: "600 24px Inter", fill:"#B6C6DF"}).setOrigin(0);
        this.soundButton = this.add.sprite(518, 78, 'sound').setOrigin(0, 0).setInteractive();
        this.soundButton.name = "soundButton";
        this.soundButton.on('pointerdown', function(pointer){
            this.gameContinuing = false;
            this.sounds.game2zadanie.once('complete', function(){
                this.gameContinuing = true;
            }, this);
            this.sounds.game2zadanie.play();
        }, this)
        this.add.text(609, 78, "Угадай слова, нажимая", {font: "500 54px Inter", fill:"#B7C4DD"}).setOrigin(0);
        this.add.text(609, 158, "Угадай слова, нажимая на клеточки с нужными слогами\nОчень маленькие кони. Догадались? Это - ...", {font: "500 24px Inter", fill:"#B7C4DD"}).setOrigin(0);
        this.closeButton = this.add.sprite(1776, 80, 'close').setOrigin(0, 0).setInteractive();
        this.closeButton.name = "closeButton";
        this.closeButton.on('pointerdown', function(pointer){
            this.scene.start('Start');
        }, this);
        this.add.text(221, 80, "\nИмя\nФамилия\n", {font: "500 24px Inter", fill:"#1E1E1E"}).setOrigin(0);
        // this.add.sprite(29, 260, 'leaderboard').setOrigin(0, 0);
        this.add.text(221, 166, "Новичок", {font: "400 24px Inter", fill:"#3C90DE"}).setOrigin(0);
        // this.add.sprite(32, 329, 'heart').setOrigin(0, 0);
        // this.add.text(100, 342, "Монеты", config.gameTextSettings).setOrigin(0);
        // this.add.text(30, 389, "Драгоценные\n камни", config.gameTextSettings).setOrigin(0);
        // this.add.sprite(404, 24, 'music').setOrigin(0, 0);
        // this.add.sprite(470, 24, 'info').setOrigin(0, 0);
        // this.add.sprite(1303, 9, 'close').setOrigin(0, 0);
    }

    createCards(){
        this.cards = [];

        for (let value of ["М", "Л", "О", "У", "П", "Т", "Г", "Р", "В", "О", "Ч", "У", "Д", "Т"]){
            this.cards.push(new Card(this, value));
        }

        this.ans_cards = [];
        this.level_answer = ['Г', 'О', 'Р', 'О', 'Д'];

        for (var i = 0; i < 5; i++){
            let card = new Card(this, this.level_answer[i]);
            card.init({x: 949 + 93 * i, y: 902, delay: (i+1) * 100});
            card.move({
                x: card.position.x,
                y: card.position.y,
                delay: card.position.delay
            })
            this.ans_cards.push(card);
        }

        // this.ans_card1 = new Card(this, 'Г');
        // this.ans_card1.init({x: 949, y: 902, delay: 100});
        // this.ans_card1.move({
        //     x: this.ans_card1.position.x,
        //     y: this.ans_card1.position.y,
        //     delay: this.ans_card1.position.delay
        // })
        // this.ans_card2 = new Card(this, 'О')
        // this.ans_card2.init({x: 1042, y: 902, delay: 200});
        // this.ans_card2.move({
        //     x: this.ans_card2.position.x,
        //     y: this.ans_card2.position.y,
        //     delay: this.ans_card2.position.delay
        // })
        // this.ans_card3 = new Card(this, 'Р')
        // this.ans_card3.init({x: 1135, y: 902, delay: 300});
        // this.ans_card3.move({
        //     x: this.ans_card3.position.x,
        //     y: this.ans_card3.position.y,
        //     delay: this.ans_card3.position.delay
        // })
        // this.ans_card4 = new Card(this, 'О')
        // this.ans_card4.init({x: 1228, y: 902, delay: 300});
        // this.ans_card4.move({
        //     x: this.ans_card4.position.x,
        //     y: this.ans_card4.position.y,
        //     delay: this.ans_card4.position.delay
        // })
        // this.ans_card5 = new Card(this, 'Д')
        // this.ans_card5.init({x: 1321, y: 902, delay: 300});
        // this.ans_card5.move({
        //     x: this.ans_card5.position.x,
        //     y: this.ans_card5.position.y,
        //     delay: this.ans_card5.position.delay
        // })

        this.input.on('dragstart', function (pointer, gameObject) {
            this.startDrag_x = gameObject.x
            this.startDrag_text_x = gameObject.caption.x
            this.startDrag_y = gameObject.y
            this.startDrag_text_y = gameObject.caption.y
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            this.ans_cards.forEach((card) => {
                if (card.opened != true){
                    card.setFrame(0);
                }
            })
            // if(this.ans_card1.opened != true){
            //     this.ans_card1.setFrame(0);
            // }
            // if(this.ans_card2.opened != true){
            //     this.ans_card2.setFrame(0);
            // }
            // if(this.ans_card3.opened != true){
            //     this.ans_card3.setFrame(0);
            // }
            // if(this.ans_card4.opened != true){
            //     this.ans_card4.setFrame(0);
            // }
            // if(this.ans_card5.opened != true){
            //     this.ans_card5.setFrame(0);
            // }

            gameObject.x = dragX;
            gameObject.caption.x = dragX + gameObject.width / 2;
            gameObject.y = dragY;
            gameObject.caption.y = dragY + gameObject.height / 2;

            this.ans_cards.forEach((card) => {
                if (Math.abs(gameObject.x - card.x) < 50 && Math.abs(gameObject.y - card.y) < 50 && card.opened != true){
                    card.setFrame(1);
                }
            })

            // if (Math.abs(gameObject.x - this.ans_card1.x) < 50 && Math.abs(gameObject.y - this.ans_card1.y) < 50 && this.ans_card1.opened != true){
            //     this.ans_card1.setFrame(1);
            // }else if(Math.abs(gameObject.x - this.ans_card2.x) < 50 && Math.abs(gameObject.y - this.ans_card2.y) < 50){
            //     this.ans_card2.setFrame(1);
            // }else if(Math.abs(gameObject.x - this.ans_card3.x) < 50 && Math.abs(gameObject.y - this.ans_card3.y) < 50){
            //     this.ans_card3.setFrame(1);
            // }else if(Math.abs(gameObject.x - this.ans_card4.x) < 50 && Math.abs(gameObject.y - this.ans_card4.y) < 50){
            //     this.ans_card4.setFrame(1);
            // }else if(Math.abs(gameObject.x - this.ans_card5.x) < 50 && Math.abs(gameObject.y - this.ans_card5.y) < 50){
            //     this.ans_card5.setFrame(1);
            // }
        }, this);

        this.input.on('dragend', function (pointer, gameObject) {

            this.ans_cards.forEach((card) => {
                if (Math.abs(gameObject.x - card.x) < 50 && Math.abs(gameObject.y - card.y) < 50 && gameObject.value == card.value){
                    if(card.open != true){
                        card.setFrame(1).open();
                    }
                }
            })

            // if (Math.abs(gameObject.x - this.ans_card1.x) < 50 && Math.abs(gameObject.y - this.ans_card1.y) < 50 && gameObject.value == this.ans_card1.value){
            //     if(this.ans_card1.open != true){
            //         this.ans_card1.setFrame(1).open();
            //     }
            // }
            // if(Math.abs(gameObject.x - this.ans_card2.x) < 50 && Math.abs(gameObject.y - this.ans_card2.y) < 50 && gameObject.value == this.ans_card2.value){
            //     if(this.ans_card2.open != true){
            //         this.ans_card2.setFrame(1).open();
            //     }
            // }
            // if(Math.abs(gameObject.x - this.ans_card3.x) < 50 && Math.abs(gameObject.y - this.ans_card3.y) < 50 && gameObject.value == this.ans_card3.value){
            //     if(this.ans_card3.open != true){
            //         this.ans_card3.setFrame(1).open();
            //     }
            // }
            // if(Math.abs(gameObject.x - this.ans_card4.x) < 50 && Math.abs(gameObject.y - this.ans_card4.y) < 50 && gameObject.value == this.ans_card4.value){
            //     if(this.ans_card4.open != true){
            //         this.ans_card4.setFrame(1).open();
            //     }
            // }
            // if(Math.abs(gameObject.x - this.ans_card5.x) < 50 && Math.abs(gameObject.y - this.ans_card5.y) < 50 && gameObject.value == this.ans_card5.value){
            //     if(this.ans_card5.open != true){
            //         this.ans_card5.setFrame(1).open();
            //     }
            // }

            gameObject.x = this.startDrag_x
            gameObject.caption.x = this.startDrag_text_x
            gameObject.y = this.startDrag_y
            gameObject.caption.y = this.startDrag_text_y
        }, this);

    }

    createAnswer(){
        this.answerPict = this.add.sprite(0, 0, 'city').setOrigin(0, 0);
        this.answerText = this.add.text(0, 0, "ПОНИ", {font: "700 40px Inter", fill:"#FFFFFF"}).setOrigin(0).setStroke("#000000", 2).setVisible(false);
        this.levelAnswer = ['ПО', 'НИ'];
        this.answerCount = 0;
        this.mistakeCount = -1;
    }

    start(){
        this.gameContinuing = false;
        this.initCardsPositions();
        this.initCards();

        this.sounds.game2zadanie.once('complete', function(){
            this.gameContinuing = true;
        }, this);
        this.sounds.game2zadanie.play();
        this.showCards();
    }

    initCardsPositions(){
        let positions = [];
        let answerTexture = this.textures.get('answer').getSourceImage();
        let cardWidth = 80 + 14;
        let cardHeight = 80 + 14;
        //let offsetX = (this.sys.game.config.width - cardWidth * config.cols - answerTexture.width - 100)/2 + cardWidth / 2;
        let offsetX = 520;
        //let offsetY = (this.sys.game.config.height - cardHeight * config.rows)/2 + cardHeight / 2;
        let offsetY = 276;

        //this.answerPict.setPosition((this.sys.game.config.width + cardWidth * config.cols + 100) / 2, this.sys.game.config.height / 2);
        this.answerPict.setPosition(650, 450);
        //this.answerText.setPosition(this.answerPict.x, this.answerPict.y + answerTexture.height / 2 + 20);
        this.answerText.setPosition(1231, 378);

        let id = 0;
        for (let row = 0; row < 1; row++){
            for (let col = 0; col < 14; col++){
                positions.push({
                    x: offsetX + col * cardWidth,
                    y: offsetY + row * cardHeight,
                    delay: ++id * 100
                })
            }
        }

        this.positions = positions;
    }

    initCards(){
        let positions = Phaser.Utils.Array.Shuffle(this.positions);
        this.cards.forEach(card => {
            card.setInteractive({draggable: true});
            card.init(positions.pop());
        })
    }

    showCards(){
        let count = 0;
        let onCardMoveComplete = () => {
            ++count;
            if(count >= this.cards.length){
                this.cards.forEach(card => {
                    card.open();
                });
            }
        }

        this.cards.forEach(card => {
            card.depth = card.position.delay;
            card.move({
                x: card.position.x,
                y: card.position.y,
                delay: card.position.delay,
                callback: onCardMoveComplete
            })
        });
    }

    onCardClicked(pointer, card){
        if(!this.gameContinuing || card.frame.name == 1 || card.anims.isPlaying){
            return false;
        }
        if (card.value === this.levelAnswer[this.answerCount]){
            card.setFrame(1);
            this.answerCount++;
            if (this.answerCount === this.levelAnswer.length){
                this.answerPict.setVisible(true);
                this.answerText.setVisible(true);
                this.sounds.end_session.play();
                this.gameContinuing = false;
                this.time.addEvent({
                    delay: 5000,
                    callback: ()=>{
                        this.scene.start('EndGame')
                    }
                })
            }else{
                this.sounds.correct.play();
            }
        }else{
            card.once('animationcomplete', function(animation, frame) {
                console.log('animation complete');
                console.log(this.mistakeCount);
                this.gameContinuing = true;
                if (animation.key == 'bad_blink'){
                    if (this.mistakeCount == 0){
                        this.sounds.game1_poni.play();
                    }else if (this.mistakeCount == 1){
                        this.answerPict.setVisible(true);
                    }else if(this.mistakeCount == 2 || this.mistakeCount == 3){
                        this.cards.forEach(card => {
                            if (this.levelAnswer.includes(card.value) && card.frame.name != 1) {
                                card.once('animationcomplete', function(animation, frame){
                                    console.log('animation complete');
                                    this.gameContinuing = true;
                                }, this);
                                card.play('good_blink');
                                this.gameContinuing = false;
                            }
                        });
                    }else if(this.mistakeCount == 4){
                        this.cards.forEach(card => {
                            if (this.levelAnswer.includes(card.value)) {
                                card.setFrame(1);
                            }
                        });
                        this.answerPict.setVisible(true);
                        this.answerText.setVisible(true);
                        this.gameContinuing = false;
                    }
                }
            }, this);
            this.mistakeCount++;
            card.anims.play('bad_blink');
            this.gameContinuing = false;
            this.sounds.bulk.play();
        }
    }
}