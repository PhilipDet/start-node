export class personModel {
    constructor(first_name, last_name, email, birthday, job_title) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.birthday = birthday;
        this.job_title = job_title;
    }

    presentGreeting() {
        return `Hej jeg hedder ${this.first_name} ${this.last_name}.`;
    }

    presentAge() {
        return `${getAge(this.birthday)}`;
    }

    presentCard() {
        return `${this.first_name} ${this.last_name} - ${this.email} - ${this.job_title}`;
    }
}

function getAge(birthday) {
    let today = new Date();
    let birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    let month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
