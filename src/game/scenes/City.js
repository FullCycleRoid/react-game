import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class City extends Scene
{
    constructor ()
    {
        super('City');
    }
    
    preload() {
        this.load.multiatlas('cityscene', 'assets/city/cityscene.json', 'assets/city');
    }
    
    create ()
    {
        this.wwidth = this.cameras.main.width;
        this.wheight = this.cameras.main.height;
        const bg = this.add.sprite(0, 0, 'cityscene', 'background.png');
        bg.setDisplaySize(this.wwidth, this.wheight);
        
        this.capguy = this.add.sprite(10, 500, 'cityscene', 'capguy/walk/0001.png');
        this.capguy.setScale(0.5, 0.5);
        
        const frameNames = this.anims.generateFrameNames('cityscene', {
                       start: 1, end: 8, zeroPad: 4,
                       prefix: 'capguy/walk/', suffix: '.png'
                   });
        this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
        this.capguy.anims.play('walk');
        
                // 9-slice objects
        const button = this.add.nineslice(150, this.wheight - 50, 'cityscene', 'button.png', 200, 50);
        button.setInteractive();
        
        const buttonText = this.add.text(button.x, button.y, 'НАЖМИ И ДЕРЖИ', {
        fontFamily: 'Arial',
        fontSize: '18px',
        color: '#000000'
        });
        buttonText.setOrigin(0.5);
        buttonText.setPosition(button.x + button.width - 200, button.y + button.height - 50);
        
        // Обработчики событий для кнопки
        button.on('pointerdown', () => {
            // Остановить анимацию и движение персонажа при нажатии
            this.capguy.anims.pause();
            this.isMoving = false;
        });
        
        button.on('pointerup', () => {
            // Возобновить анимацию и движение персонажа при отпускании
            this.capguy.anims.resume();
            this.isMoving = true;
        });
        
        // Добавляем переменную для контроля движения
        this.isMoving = true;
    
        
        EventBus.emit('current-scene-ready', this);
    }
    
    update(time, delta)
    {
     if (this.isMoving) {
        this.capguy.x += delta/10;
        if (this.capguy.x > this.wwidth)
        {
            this.capguy.x = 10;
        }
    }
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
