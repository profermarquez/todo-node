class Task {
    constructor() {
        this.id = 0; // propiedad opcional, puede o no venir => "?""
        this.text = '';
        this.day = '';
        this.reminder = false;
    }
}
module.exports = Task