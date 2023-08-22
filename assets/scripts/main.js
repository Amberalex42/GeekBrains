let config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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