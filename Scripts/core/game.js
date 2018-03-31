/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyboardManager;
    var textureAtlasData;
    var textureAtlas;
    textureAtlasData = {
        "images": [
            ""
            //"./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [2, 2, 32, 32, 0, 0, 0],
            [36, 2, 32, 32, 0, 0, 0],
            [70, 2, 32, 32, 0, 0, 0],
            [104, 2, 16, 16, 0, 0, 0],
            [122, 2, 226, 178, 0, 0, 0],
            [350, 2, 44, 40, 0, 0, 0],
            [396, 2, 44, 40, 0, 0, 0],
            [442, 2, 44, 40, 0, 0, 0],
            [2, 182, 44, 40, 0, 0, 0],
            [48, 182, 44, 40, 0, 0, 0],
            [94, 182, 44, 40, 0, 0, 0],
            [140, 182, 44, 40, 0, 0, 0],
            [186, 182, 44, 40, 0, 0, 0],
            [232, 182, 44, 40, 0, 0, 0],
            [278, 182, 44, 40, 0, 0, 0],
            [324, 182, 65, 65, 0, 0, 0],
            [391, 182, 65, 65, 0, 0, 0],
            [2, 249, 65, 65, 0, 0, 0],
            [69, 249, 65, 65, 0, 0, 0],
            [136, 249, 65, 65, 0, 0, 0],
            [203, 249, 65, 65, 0, 0, 0],
            [270, 249, 65, 65, 0, 0, 0],
            [337, 249, 62, 63, 0, 0, 0],
            [401, 249, 65, 65, 0, 0, 0],
            [2, 316, 65, 65, 0, 0, 0],
            [69, 316, 65, 65, 0, 0, 0],
            [136, 316, 65, 65, 0, 0, 0],
            [203, 316, 65, 65, 0, 0, 0],
            [270, 316, 200, 60, 0, 0, 0],
            [472, 316, 32, 32, 0, 0, 0],
            [2, 383, 32, 32, 0, 0, 0],
            [36, 383, 32, 32, 0, 0, 0],
            [70, 383, 32, 32, 0, 0, 0],
            [104, 383, 32, 32, 0, 0, 0],
            [138, 383, 32, 32, 0, 0, 0],
            [172, 383, 200, 60, 0, 0, 0]
        ],
        "animations": {
            "blueenemy": {
                "frames": [0, 1, 2],
                "speed": 0.25
            },
            "bullet": { "frames": [3] },
            "cloud": { "frames": [4] },
            "coin": {
                "frames": [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
                "speed": 0.33
            },
            "explosion": {
                "frames": [15, 16, 17, 18, 19, 20, 21],
                "speed": 0.15
            },
            "island": { "frames": [22] },
            "plane": {
                "frames": [23, 24, 25],
                "speed": 0.5
            },
            "planeflash": {
                "frames": [26, 27],
                "speed": 0.08
            },
            "restartButton": { "frames": [28] },
            "smallexplosion": {
                "frames": [29, 30, 31, 32, 33, 34],
                "speed": 0.16
            },
            "startButton": { "frames": [35] }
        }
    };
    assetManifest = [
        { id: "textureAtlas", src: "./Assets/sprites/textureAtlas.png" },
        { id: "ocean", src: "./Assets/images/ocean.gif" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "coin", src: "./Assets/audio/coin.wav" },
        { id: "life", src: "./Assets/audio/life.wav" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" }
    ];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        textureAtlasData.images = [assetManager.getResult("textureAtlas")];
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        managers.Game.stage = stage;
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyboardManager = new managers.Keyboard();
        managers.Game.keyboardManager = keyboardManager;
        managers.Game.assetManager = assetManager;
        managers.Game.textureAtlas = textureAtlas;
        Main();
    }
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (managers.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene();
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene();
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene();
                break;
        }
        currentState = managers.Game.currentScene;
        managers.Game.currentSceneObject = currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map