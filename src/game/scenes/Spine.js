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
        const animations = [
          "aim", "death", "hoverboard", "idle", 
          "idle-turn", "jump", "portal", 
          "run", "run-to-idle", "shoot", "walk"
        ];
    
        const spineboy = this.add.spine(
          400,
          500,
          "spineboy-data",
          "spineboy-atlas"
        );
        spineboy.scale = 0.5;
        
//        One animation
//        console.log(spineboy.skeleton.data.animations);
//        spineboy.animationState.setAnimation(0, "shoot", true);
        
//        Change animation every 3 sec
        this.time.addEvent({
          delay: 3000, // Интервал в мс
          callback: () => {
            const randomAnim = Phaser.Utils.Array.GetRandom(animations);
            spineboy.animationState.setAnimation(0, randomAnim, false);

            // После завершения возвращаем в "idle"
            spineboy.animationState.addAnimation(0, "idle", true, 0);
          },
          loop: true
        });
        
//        Change animation by click
//        this.input.on('pointerdown', () => {
//          const randomAnim = Phaser.Utils.Array.GetRandom(animations);
//          spineboy.animationState.setAnimation(0, randomAnim, false);
//          spineboy.animationState.addAnimation(0, "idle", true, 0);
//        });
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
