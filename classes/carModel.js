export class carModel {
    constructor(
        brand,
        model,
        propellent,
        range,
        production_year,
        color,
        mileage_km,
        description,
        price
    ) {
        this.brand = brand;
        this.model = model;
        this.propellent = propellent;
        this.range = range;
        this.production_year = production_year;
        this.color = color;
        this.mileage_km = mileage_km;
        this.description = description;
        this.price = price;
    }

    presentCar() {
        return `${this.brand} ${this.model} - ${this.production_year} - ${this.propellent} - ${this.price}kr`;
    }

    presentKmPerYear() {
        return `${getKmPerYear(this.mileage_km, this.production_year).toFixed(
            0
        )}km har bilen kørt i gennemsnit pr år`;
    }

    presentChargePerYear = () => {
        const kmPerYear = getKmPerYear(this.mileage_km, this.production_year);
        const chargePerYear = kmPerYear / this.range;

        if (this.propellent !== "Electric") {
            return "Dette er ikke en elbil";
        }

        return `${chargePerYear.toFixed(0)} ladninger ca om året ved ${
            this.range
        }km rækkevidde`;
    };
}

function getKmPerYear(mileage_km, production_year) {
    return mileage_km / (new Date().getFullYear() - production_year);
}
