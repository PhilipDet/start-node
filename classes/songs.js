export class songModel {
    constructor(title, description, image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    present() {
        return `<p>Sangen heddder <strong>${this.title}</strong>. ${this.description} - Billede af sangen: ${this.image}</p>`;
    }
}
