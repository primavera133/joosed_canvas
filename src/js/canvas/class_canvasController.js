Module("JCUI", function(){
    Class("CanvasController", {
        has: {
            $canvas: {
                is: "ro"
            },
            canvas: {
                is: "ro",
                init: function(){
                    return new Canvas({$canvas: this.$canvas});
                }
            },

            center: {
                is: "rw",
                init: function(){
                    return new JCUI.Geometry.Position({x:150,y:150});
                }
            },

            polygon: {
                is: "rw",
                init: function(){
                    return new JCUI.Geometry.Polygon({center: this.center, sides: 3})
                }
            }
        },
        after: {
            initialize: function(){
                this.draw();
            }
        },
        methods: {
            change: function(what, value){
                var rotationAmount;
                switch (what){
                    case "sides":
                        this.polygon.setSides(value);
                        //this.draw();
                        break;
                    case "shape":
                        this.polygon.setShape(value);
                        //this.draw();
                        break;
                    case "rotationX":
                        rotationAmount = (Math.PI *2) /100 * value;
                        this.polygon.getRotationSpeedX().setAmount(rotationAmount);
                        this.polygon.rotate(this.canvas);
                        break;
                    case "rotationY":
                        rotationAmount = (Math.PI *2) /100 * value;
                        this.polygon.getRotationSpeedY().setAmount(rotationAmount);
                        this.polygon.rotate(this.canvas);
                        break;
                    case "rotationZ":
                        rotationAmount = (Math.PI *2) /100 * value;
                        this.polygon.getRotationSpeedZ().setAmount(rotationAmount);
                        this.polygon.rotate(this.canvas);
                        break;

                }
            },
            draw: function(){
                this.canvas.clear();

                this.canvas.lineWidth(3);
                this.canvas.strokeStyle("rgba", 255, 255, 255, 1);
                this.polygon.draw(this.canvas);


            }
        }
    });
});
