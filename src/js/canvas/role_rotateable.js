Module("JCUI.Geometry", function(m){
    Role("Rotateable", {
        requires: "rotate",
        has: {
            rotationSpeedX: {
                is: "rw",
                init: function(){
                    return new JCUI.Geometry.Angle();
                }
            },
            rotationSpeedY: {
                is: "rw",
                init: function(){
                    return new JCUI.Geometry.Angle();
                }
            },
            rotationSpeedZ: {
                is: "rw",
                init: function(){
                    return new JCUI.Geometry.Angle();
                }
            }
        },
        methods: {
            rotates: function(){
                return (this.xRotates() || this.yRotates() || this.zRotates());
            },

            xRotates: function(){
                return this.rotationSpeedX.getAmount() !== 0;
            },
            yRotates: function(){
                return this.rotationSpeedY.getAmount() !== 0;
            },
            zRotates: function(){
                return this.rotationSpeedZ.getAmount() !== 0;
            }
        }
    });
});
