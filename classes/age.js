export class ageModel {
    constructor(birthday) {
        this.birthday = birthday;
    }

    present() {
        return `${getAge(this.birthday)}`;
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
