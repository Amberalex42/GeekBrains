class PreloadScene extends Phaser.Scene{
    constructor(){
        super('Preload');
    }

    preload(){
        this.add.sprite(0, 0, 'bg').setOrigin(0);
        const loadingBar = new LoadingBar(this);
        this.preloadAssets();
    }

    preloadAssets(){
        this.load.image('bg', 'assets/sprites/background.png');
        this.load.image('dolphin', 'assets/sprites/dolphin.png');
        this.load.image('endgame', 'assets/sprites/endgame.png');
        this.load.image('betweengame', 'assets/sprites/betweengame.png');
        this.load.image('card', 'assets/sprites/card.png');
        this.load.image('answer', 'assets/sprites/pony.png');
        this.load.image('ball', 'assets/sprites/ball.png');
        this.load.image('city', 'assets/sprites/city.png');
        this.load.image('avatar', 'assets/sprites/avatar.png');
        this.load.image('star', 'assets/sprites/star.png');
        this.load.image('progress', 'assets/sprites/progress.png');
        this.load.image('medal', 'assets/sprites/medal.png');
        this.load.image('calendar', 'assets/sprites/calendar.png');
        this.load.image('sound', 'assets/sprites/sound.png');
        // this.load.image('leaderboard', 'assets/sprites/leaderboard.svg');
        // this.load.image('heart', 'assets/sprites/heart.svg');
        // this.load.image('music', 'assets/sprites/music.svg');
        // this.load.image('info', 'assets/sprites/info.svg');
        this.load.image('close', 'assets/sprites/close.png');
        this.load.image('game1button', 'assets/sprites/game1button.png');
        this.load.image('game2button', 'assets/sprites/game2button.png');
        this.load.spritesheet({key: 'card_ss', url: 'assets/sprites/card_spritesheet.png', frameConfig: {
            frameWidth: 190,
            frameHeight: 190
        }});
        this.load.spritesheet({key: 'card2_ss', url: 'assets/sprites/card2_spritesheet.png', frameConfig: {
            frameWidth: 80,
            frameHeight: 80
        }});

        this.load.audio('bulk', 'assets/sounds/bulk.mp3');
        this.load.audio('correct', 'assets/sounds/correct.mp3');
        this.load.audio('end_session', 'assets/sounds/end_session.mp3');
        this.load.audio('end_wrong', 'assets/sounds/end_wrong.mp3');
        this.load.audio('game1_poni', 'assets/sounds/game1_poni.mp3');
        this.load.audio('game1_task', 'assets/sounds/game1_task.mp3');
        this.load.audio('right_answer', 'assets/sounds/right_answer.mp3');
        this.load.audio('welldone', 'assets/sounds/welldone.mp3');
        this.load.audio('word2slog', 'assets/sounds/word2slog.mp3');
        this.load.audio('word3slog', 'assets/sounds/word3slog.mp3');
        this.load.audio('game2zadanie', 'assets/sounds/game2_zadanie.mp3');
        this.load.audio('gorod', 'assets/sounds/gorod.mp3');
        this.load.audio('sapog', 'assets/sounds/sapog.mp3');
        this.load.audio('lodka', 'assets/sounds/lodka.mp3');
        this.load.audio('nozh', 'assets/sounds/nozh.mp3');
        this.load.audio('zub', 'assets/sounds/zub.mp3');
    }

    create(){
        this.scene.start('Start');
    }
}