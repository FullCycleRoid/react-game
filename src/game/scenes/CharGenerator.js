import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { CharacterBuilder } from '../character/CharBuilder';

export class CharGen extends Scene {
    constructor() {
        super('CharGen');
    }

    preload() {
        // Load assets with error handling
        this.load.on('fileerror', (file) => {
            console.error(`Failed to load file: ${file.key}`);
        });

        this.load.atlas('human-body', 'assets/bodies/Human-body.png', 'assets/bodies/human-body.json');
//        this.load.multiatlas('human-body', 'assets/city/cityscene.json', 'assets/city');

    }

    create() {
        console.log('Creating character...');
        
        // Create character builder
        this.character = new CharacterBuilder(this);

        // Build character parts - using exact frame names from JSON
        this.buildCharacter();

        // Add UI controls
        this.addControls();
    }

    buildCharacter() {
        // === Character assembly from JSON atlas ===
        // Torso
        this.character.setBodyPart('torso', 'Torso', 0, 0);
        
        // Head (if exists in atlas)
        if (this.textures.getFrame('human-body', 'Head')) {
            this.character.setBodyPart('head', 'Head', 0, -40);
        }
        
        // Right arm
        this.character.setBodyPart('arm_upper_right', 'ArmR', -40, -50);
        this.character.setBodyPart('forearm_right', 'ForearmR', -50, -10);
        
        // Left arm (with flip)
        const leftArm = this.character.setBodyPart('arm_upper_left', 'ArmL', 30, -30);
        if (leftArm) leftArm.setFlipX(true);
        const leftForearm = this.character.setBodyPart('forearm_left', 'ForearmL', 50, -10);
        if (leftForearm) leftForearm.setFlipX(true);
        
        // Pelvis and legs
        this.character.setBodyPart('pelvis', 'Pelvis', 0, 35);
        this.character.setBodyPart('leg_upper_right', 'Leg', -10, 70);
        this.character.setBodyPart('leg_upper_left', 'Leg', 20, 65);
        this.character.setBodyPart('shin_right', 'Shin', -15, 110);
        this.character.setBodyPart('shin_left', 'Shin', 15, 110);
        
        // Hands and details
        this.character.setBodyPart('hand_right', 'HandR', -15, 135);
        this.character.setBodyPart('hand_left', 'HandL', 15, 135);
        this.character.setBodyPart('sleeve_right', 'SleeveR', 0, -20);
        this.character.setBodyPart('finger', 'Finger', 20, -30);
    }

    addControls() {
        // === Control buttons ===
        // Head movement (if head exists)
        const moveHeadUp = this.add.text(20, 20, 'Move Head Up', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        moveHeadUp.on('pointerdown', () => {
            const head = this.character.getPart('head');
            if (head) head.y -= 5;
        });

        const moveHeadDown = this.add.text(20, 60, 'Move Head Down', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        moveHeadDown.on('pointerdown', () => {
            const head = this.character.getPart('head');
            if (head) head.y += 5;
        });

        // Reset button
        const resetPosition = this.add.text(20, 100, 'Reset Position', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        resetPosition.on('pointerdown', () => {
            this.character.clear();
            this.buildCharacter();
        });

        // Head swapping (example)
        const swapHead = this.add.text(20, 140, 'Swap Head', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        swapHead.on('pointerdown', () => {
            if (this.textures.getFrame('human-body', 'AlternativeHead')) {
                this.character.setBodyPart('head', 'AlternativeHead', 0, -40);
            } else {
                console.warn('AlternativeHead frame not found');
            }
        });

        const resetHead = this.add.text(20, 180, 'Reset Head', {
            fontSize: '16px',
            backgroundColor: '#444',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive();
        
        resetHead.on('pointerdown', () => {
            if (this.textures.getFrame('human-body', 'Head')) {
                this.character.setBodyPart('head', 'Head', 0, -40);
            }
        });
    }

    changeScene() {
        this.scene.start('MainMenu');
    }
}