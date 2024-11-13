export class cardModel {
    constructor(first_name, last_name, email, job_title) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.job_title = job_title;
    }

    present() {
        return `${this.first_name} ${this.last_name} - ${this.email} - ${this.job_title}`;
    }
}
