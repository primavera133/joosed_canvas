Module("JCUI.Geometry", function(m){
    Class("Angle", {
        has: {
            amount: {
                is: "rw",
                init: 0
            },
            unit: {
                is: "rw",
                init: "radians"
            }
        },
        methods: {
            addAngleObj: function(angle){
                var amount = angle.amount;

                amount = this.convertUnit(amount, angle.unit);

                this.amount += amount;

            },
            add: function(amount, unit){
                if(typeof arguments[0] === "object"){
                    this.addAngleObj(arguments[0]);
                    return;
                }

                if(!unit){
                    unit = this.unit;
                }

                amount = this.convertUnit(amount, unit);

                this.amount += amount;
            },
            subtractAngleObj: function(angle){
                var amount = angle.amount;

                amount = this.convertUnit(amount, angle.unit);

                this.amount -= amount;

            },
            subtract: function(amount, unit){
                if(typeof arguments[0] === "object"){
                    this.subtractAngleObj(arguments[0]);
                    return;
                }

                if(!unit){
                    unit = this.unit;
                }

                amount = this.convertUnit(amount, unit);

                this.angle -= amount;
            },
            convertUnit: function(amount, unit){
                if(unit === this.unit){
                    return amount;
                }

                if(unit === "degrees" && this.unit === "radians"){
                    return amount * Math.PI / 180;
                }

                if(unit === "radians" && this.unit === "degrees"){
                    return amount * 180 / Math.PI;
                }
            }
        }
    });
});
