class GameScene extends Phaser.Scene{
    constructor(){
        super('Game');
    }

    create(data){
        this.currentLevel = data.level
        this.levelData = config.game1_data[this.currentLevel]
        this.anims.create({
            key: 'good_blink',
            frames: this.anims.generateFrameNumbers('card_ss', {frames: [1, 0]}),
            frameRate: 4,
            repeat: 3
        });
        this.anims.create({
            key: 'bad_blink',
            frames: this.anims.generateFrameNumbers('card_ss', {frames: [2, 0]}),
            frameRate: 4,
            repeat: 2
        });

        this.createSounds();
        this.createBackground();
        this.createCards();
        this.createAnswer();
        this.start();

    }

    createSounds(){
        this.sounds = {
            bulk: this.sound.add('bulk'),
            correct: this.sound.add('correct'),
            end_session: this.sound.add('end_session'),
            game1_riddle: this.sound.add(this.levelData.level_answer_sound),
            game1_task: this.sound.add(this.levelData.level_task_sound),
            right_answer: this.sound.add('right_answer'),
            welldone: this.sound.add('welldone'),
            wordslog: this.sound.add(this.levelData.level_answer_slog)
        };
    }

    createBackground(){
        this.add.sprite(0, 0, 'bg1').setOrigin(0, 0);

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
        this.add.text(609, 78, "Угадай-ка", {font: "500 54px Inter", fill:"#B7C4DD"}).setOrigin(0);
        this.add.text(609, 158, "Угадай слова, нажимая на клеточки с нужными слогами", {font: "500 24px Inter", fill:"#B7C4DD"}).setOrigin(0);
        this.closeButton = this.add.sprite(1776, 80, 'close').setOrigin(0, 0).setInteractive();
        this.closeButton.name = "closeButton";
        this.add.text(221, 80, "\nИмя\nФамилия\n", {font: "500 24px Inter", fill:"#1E1E1E"}).setOrigin(0);
        this.add.text(221, 166, "Новичок", {font: "400 24px Inter", fill:"#3C90DE"}).setOrigin(0);
    }

    createCards(){
        this.cards = [];

        for (let value of this.levelData.cards){
            this.cards.push(new Card(this, value));
        }
        this.input.on('gameobjectdown', this.onCardClicked, this)
    }

    createAnswer(){
        this.answerPict = this.add.sprite(0, 0, "question").setOrigin(0, 0);
        this.answerText = this.add.text(0, 0, this.levelData.level_answer_text, {font: "700 40px Inter", fill:"#FFFFFF"}).setOrigin(0).setStroke("#000000", 2).setVisible(false);
        this.levelAnswer = this.levelData.level_answer;
        this.answerCount = 0;
        this.mistakeCount = -1;
    }

    start(){
        this.gameContinuing = false;
        this.initCardsPositions();
        this.initCards();

        if (this.currentLevel == 0){
            this.sounds.game1_task.once('complete', function(){
                this.sounds.wordslog.once('complete', function(){
                    this.sounds.game1_riddle.once('complete', function(){
                        this.gameContinuing = true;
                    }, this)
                    this.sounds.game1_riddle.play();
                }, this)
                this.sounds.wordslog.play();
            }, this);
            this.sounds.game1_task.play();
        }else{
            this.sounds.wordslog.once('complete', function(){
                this.sounds.game1_riddle.once('complete', function(){
                    this.gameContinuing = true;
                }, this)
                this.sounds.game1_riddle.play();
            }, this)
            this.sounds.wordslog.play();
        }
        
        this.showCards();
    }

    initCardsPositions(){
        let positions = [];
        let answerTexture = this.textures.get(this.levelData.level_answer_pic).getSourceImage();
        let cardWidth = 190 + 35;
        let cardHeight = 190 + 35;
        //let offsetX = (this.sys.game.config.width - cardWidth * config.cols - answerTexture.width - 100)/2 + cardWidth / 2;
        let offsetX = 520;
        //let offsetY = (this.sys.game.config.height - cardHeight * config.rows)/2 + cardHeight / 2;
        let offsetY = 360;

        //this.answerPict.setPosition((this.sys.game.config.width + cardWidth * config.cols + 100) / 2, this.sys.game.config.height / 2);
        this.answerPict.setPosition(1200, 360);
        //this.answerText.setPosition(this.answerPict.x, this.answerPict.y + answerTexture.height / 2 + 20);
        this.answerText.setPosition(1231, 378);

        let id = 0;
        for (let row = 0; row < config.rows; row++){
            for (let col = 0; col < config.cols; col++){
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
        if (card.name === "soundButton"){
            this.gameContinuing = false;
            this.sounds.game1_task.once('complete', function(){
                this.gameContinuing = true;
            }, this)
            this.sounds.game1_task.play();
        }else if (card.name === "closeButton"){
            this.game.sound.stopAll();
            this.scene.start('Start');
        }else{
            console.log(card);
            if(!this.gameContinuing || card.frame.name == 1 || card.anims.isPlaying){
                return false;
            }
            if (card.value === this.levelAnswer[this.answerCount]){
                card.setFrame(1);
                this.answerCount++;
                if (this.answerCount === this.levelAnswer.length){
                    this.answerPict.setTexture(this.levelData.level_answer_pic);
                    this.answerText.setVisible(true);
                    this.sounds.correct.play();
                    this.gameContinuing = false;
                    this.time.addEvent({
                        delay: 5000,
                        callback: ()=>{
                            if(this.currentLevel == 2){
                                this.scene.start('BetweenGame')
                            }else{
                                this.scene.start('Game', {level: ++this.currentLevel})
                            }
                            
                        }
                    })
                }else{
                    this.sounds.right_answer.play();
                }
            }else{
                card.once('animationcomplete', function(animation, frame) {
                    console.log('animation complete');
                    console.log(this.mistakeCount);
                    this.gameContinuing = true;
                    if (animation.key == 'bad_blink'){
                        if (this.mistakeCount == 0){
                            this.gameContinuing = false;
                            this.sounds.game1_riddle.once('complete', function(){
                                this.gameContinuing = true;
                            }, this)
                            this.sounds.game1_riddle.play();
                        }else if (this.mistakeCount == 1){
                            this.answerPict.setTexture(this.levelData.level_answer_pic);
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
}