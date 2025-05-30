import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class SpineScene extends Scene
{
    constructor ()
    {
        super('Spine');
    }
  
    preload() {
        console.log(this.add.spine); // Should be a function, not undefined
        console.log(this.load.spine); // Same here
        
        this.load.spineBinary("spineboy-data", "/assets/spineboy/spineboy-pro.skel");
        this.load.spineAtlas("spineboy-atlas", "/assets/spineboy/spineboy-pma.atlas");
    }

    create () {
        const spineboy = this.add.spine(
          400,
          500,
          "spineboy-data",
          "spineboy-atlas"
        );
        spineboy.scale = 0.5;
        spineboy.animationState.setAnimation(0, "walk", true);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
