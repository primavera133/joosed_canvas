Module("JCUI.Geometry", function(m){
    Class("Position", {
        has: {
            x: {
                is: "rw",
                isa: Joose.Type.Int,
                init: 0
            },
            y: {
                is: "rw",
                isa: Joose.Type.Int,
                init: 0
            },
            z: {
                is: "rw",
                isa: Joose.Type.Int,
                init: 0
            }
        }
    });
});
