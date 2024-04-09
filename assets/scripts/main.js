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
    cards: ["ПО", "БО", "НИ", "НЕ", "НЯ", "ПА", "БА", "ЛО", "ШАДЬ"],
    gameTextSettings: {
        font: "56px CurseCasual",
        fill: "#000000"
    },
    scene: [BootScene, PreloadScene, StartScene, GameScene, Game2Scene, BetweenGameScene, EndGameScene],
    game1_data: [
        {
            level_riddle_sound: 'game1_poni',
            level_task_sound: 'game1_task',
            level_answer_sound: 'game1_answer_poni',
            cards: ["ПО", "БО", "НИ", "НЕ", "НЯ", "ПА", "БА", "ЛО", "ШАДЬ"],
            level_answer_slog: 'word2slog',
            level_answer_pic: 'pony',
            level_answer_text: 'ПОНИ',
            level_answer: ['ПО', 'НИ']
        },
        {
            level_riddle_sound: 'game1_sova',
            level_task_sound: 'game1_task',
            level_answer_sound: 'game1_answer_sova',
            cards: ["СО", "СА", "ВА", "ФА", "ФИ", "БА", "ЗО", "РА", "СЕ"],
            level_answer_slog: 'word2slog',
            level_answer_pic: 'sova',
            level_answer_text: 'СОВА',
            level_answer: ['СО', 'ВА']
        },
        {
            level_riddle_sound: 'game1_koleso',
            level_task_sound: 'game1_task',
            level_answer_sound: 'game1_answer_koleso',
            cards: ["КО", "КА", "ЛЕ", "ЛИ", "СО", "ЗО", "СА", "ЖО", "ХО"],
            level_answer_slog: 'word3slog',
            level_answer_pic: 'koleso',
            level_answer_text: 'КОЛЕСО',
            level_answer: ['КО', 'ЛЕ', 'СО']
        }
    ],
    game2_data: [
        {
            level_task_sound: 'game2_task',
            level_answer_sound: 'game2_lodka',
            level_answer_slog: 'word2slog',
            cards: ["Л", "П", "С", "Б", "Т", "Ш", "Х", "Ж", "Д", "А", "Р", "О", "Г", "К"],
            level_answer: ['Л', 'О', 'Д', 'К', 'А'],
            opened_array: [1, 1, 0, 1, 1],
            level_answer_pic: 'lodka',
            level_answer_text: 'ЛОДКА'
        },
        {
            level_task_sound: 'game2_task',
            level_answer_sound: 'game2_sapog',
            level_answer_slog: 'word2slog',
            cards: ["Л", "П", "С", "Б", "Т", "Ш", "Х", "Ж", "Д", "А", "Р", "О", "Г", "К"],
            level_answer: ['С', 'А', 'П', 'О', 'Г'],
            opened_array: [1, 0, 1, 1, 0],
            level_answer_pic: 'sapog',
            level_answer_text: 'САПОГ'
        },
        {
            level_task_sound: 'game2_task',
            level_answer_sound: 'game2_gorod',
            level_answer_slog: 'word2slog',
            cards: ["Л", "П", "С", "Б", "Т", "Ш", "Х", "Ж", "Д", "А", "Р", "О", "Г", "К"],
            level_answer: ['Г', 'О', 'Р', 'О', 'Д'],
            opened_array: [1, 1, 1, 0, 0],
            level_answer_pic: 'city',
            level_answer_text: 'ГОРОД'
        },
        {
            level_task_sound: 'game2_task',
            level_answer_sound: 'game2_zabor',
            level_answer_slog: 'word2slog',
            cards: ["Л", "П", "С", "Б", "Т", "Ш", "Х", "Ж", "А", "Р", "О", "Г", "К", "З"],
            level_answer: ['З', 'А', 'Б', 'О', 'Р'],
            opened_array: [0, 1, 0, 1, 1],
            level_answer_pic: 'zabor',
            level_answer_text: 'ЗАБОР'
        },
        {
            level_task_sound: 'game2_task',
            level_answer_sound: 'game2_garazh',
            level_answer_slog: 'word2slog',
            cards: ["Л", "П", "С", "Б", "Т", "Ш", "Х", "Ж", "А", "Р", "О", "Г", "К", "З"],
            level_answer: ['Г', 'А', 'Р', 'А', 'Ж'],
            opened_array: [1, 0, 1, 1, 0],
            level_answer_pic: 'garazh',
            level_answer_text: 'ГАРАЖ'
        }
    ]
};

let game = new Phaser.Game(config);