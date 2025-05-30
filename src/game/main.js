import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { City } from './scenes/City';
import { SpineScene } from './scenes/Spine';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import Phaser from 'phaser';
import { Preloader } from './scenes/Preloader';
//import { SpinePlugin } from '@esotericsoftware/spine-phaser';
import * as SpinePlugin from '@esotericsoftware/spine-phaser-v4'; // For Phaser 4

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        City,
        SpineScene,
        GameOver
    ],
    plugins: {
        scene: [
            {
                key: 'SpinePlugin',
                plugin: SpinePlugin.SpinePlugin,
                mapping: 'spine', // Now `this.add.spine()` will work
            },
        ],
    },
};


const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
}

export default StartGame;
