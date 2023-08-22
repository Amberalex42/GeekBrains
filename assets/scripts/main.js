let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    rows: 3,
    cols: 3,
    cards: ["ПО", "НИ", "ЛО", "БО", "КО", "РО", "ВА", "БА", "РАН"],
    gameTextSettings: {
        font: "56px CurseCasual",
        fill: "#000000"
    },
    scene: [BootScene, PreloadScene, StartScene, GameScene, Game2Scene, BetweenGameScene, EndGameScene]
};

let game = new Phaser.Game(config);