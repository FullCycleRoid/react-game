export class CharacterBuilder {
    constructor(scene) {
        this.scene = scene;
        this.container = this.scene.add.container(400, 300);
        this.bodyParts = {};
    }

    /**
     * Adds or replaces a body part
     * @param {string} partType - e.g., 'torso', 'arm_upper_right'
     * @param {string} frameName - frame name from atlas (e.g., 'Torso', 'ArmR')
     * @param {number} offsetX - X offset from center
     * @param {number} offsetY - Y offset from center
     * @returns {Phaser.GameObjects.Sprite|null} The created sprite or null if failed
     */
    setBodyPart(partType, frameName, offsetX = 0, offsetY = 0) {
        // First check if texture atlas is loaded
        if (!this.scene.textures.exists('human-body')) {
            console.error('Texture atlas "human-body" not loaded');
            return null;
        }

        // Check if frame exists in atlas
        if (!this.scene.textures.getFrame('human-body', frameName)) {
            console.warn(`Frame "${frameName}" not found in texture atlas`);
            return null;
        }

        // Remove existing part if it exists
        if (this.bodyParts[partType]) {
            this.container.remove(this.bodyParts[partType], true);
            this.bodyParts[partType].destroy();
        }

        // Create new sprite
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