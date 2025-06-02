import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

class CharacterBuilder {
    constructor(scene) {
        this.scene = scene;
        this.container = this.scene.add.container(400, 300);
        this.bodyParts = {};
    }

    /**
     * Добавляет или заменяет часть тела
     * @param {string} partType - например: 'head', 'torso', 'arm_upper_right'
     * @param {number|string} atlasIndex - индекс из атласа (Human-0, Human-1, ... Human-head)
     * @param {number} offsetX - смещение X относительно центра
     * @param {number} offsetY - смещение Y относительно центра
     */
    setBodyPart(partType, atlasIndex, offsetX = 0, offsetY = 0) {
        if (this.bodyParts[partType]) {
            this.bodyParts[partType].destroy();
        }

        // Формируем имя кадра с учетом расширения .png
        let frameName;
        if (atlasIndex === 'head') {
            frameName = 'Human-head.png';
        } else if (atlasIndex === 'torso') {
            frameName = 'Human-torso.png';
        } else if (atlasIndex === 'leg') {
            frameName = 'Human-leg.png';
        } else {
            frameName = `Human-${atlasIndex}.png`;
        }

        // Проверяем существование кадра
        if (!this.scene.textures.getFrame('human-body', frameName)) {
            console.warn(`Frame "${frameName}" not found in texture atlas`);
            return null;
        }

        const sprite = this.scene.add.sprite(offsetX, offsetY, 'human-body', frameName);
        this.container.add(sprite);
        this.bodyParts[partType] = sprite;
        return sprite;
    }

    clear() {
        this.container.removeAll(true);
        this.bodyParts = {};
    }

    getPart(partType) {
        return this.bodyParts[partType];
    }
}

export class CharGen extends Scene {
    constructor() {
        super('CharGen');
    }

    preload() {
        this.load.atlas('human-body', 'assets/bodies/human-body.png', 'assets/bodies/human-body.json');
    }

    create() {
        this.character = new CharacterBuilder(this);

        // === Собираем персонажа из частей ===
        // Human-torso
        this.character.setBodyPart('torso', 'torso', 0, 0);
        
        // Human-head
        this.character.setBodyPart('head', 'head', 0, -50);
        
        // Руки
//        this.character.setBodyPart('arm_upper_right', 2, -30, -30);
//        this.character.setBodyPart('arm_lower_right', 3, -50, -10);
//        this.character.setBodyPart('arm_upper_left', 2, 30, -30).setFlipX(true);
//        this.character.setBodyPart('arm_lower_left', 3, 50, -10).setFlipX(true);
        
        // Таз и ноги (исправляем индекс 10 на доступный)
        this.character.setBodyPart('hips', 5,4, 35);
//        this.character.setBodyPart('leg_upper_right', 5, -250, 200);
//        this.character.setBodyPart('leg_lower_right', 6, -15, 110);
//        this.character.setBodyPart('foot_right', 7, -15, 135);
//        this.character.setBodyPart('foot_left', 8, 15, 135);
        
        // Используем доступный кадр Human-leg.png вместо Human-10
        this.character.setBodyPart('leg_upper_left', 'leg', 20, 65);
        this.character.setBodyPart('leg_upper_right', 'leg', -10, 65);
        
        // Тень
//        this.character.setBodyPart('shadow', 1, 0, 160).setAlpha(0.3);

        // === Кнопки управления ===
        // Перемещение головы
        const moveHeadUp = this.add.text(20, 20, 'Move Head Up', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        moveHeadUp.on('pointerdown', () => {
            const head = this.character.getPart('head');
            if (head) head.y -= 10;
        });

        const moveHeadDown = this.add.text(20, 60, 'Move Head Down', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        moveHeadDown.on('pointerdown', () => {
            const head = this.character.getPart('head');
            if (head) head.y += 10;
        });

        const resetPosition = this.add.text(20, 100, 'Reset Position', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        resetPosition.on('pointerdown', () => {
            this.character.clear();
            this.create();
        });

        // === Эксперименты с заменой частей ===
        const swapHead = this.add.text(20, 140, 'Swap Head (Try Other Parts)', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        swapHead.on('pointerdown', () => {
            // Пробуем заменить голову на Human-6.png
            this.character.setBodyPart('head', 6, 0, -100);
        });

        const resetHead = this.add.text(20, 180, 'Reset Head', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        resetHead.on('pointerdown', () => {
            this.character.setBodyPart('head', 'head', 0, -100);
        });
    }

    changeScene() {
        this.scene.start('MainMenu');
    }
}