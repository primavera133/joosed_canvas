Module("JCUI.Geometry",function(m){
    Class("Offset", {
       has: {
           x: {
               is: "rw",
               isa: m.Angle,
               init: new m.Angle()
           },
           y: {
               is: "rw",
               isa: m.Angle,
               init: new m.Angle()
           },
           z: {
               is: "rw",
               isa: m.Angle,
               init: new m.Angle()
           }
       },
       methods: {
           add: function(obj){
               this.x.add(obj.getX().getAmount());
               this.y.add(obj.getY().getAmount());
               this.z.add(obj.getZ().getAmount());
           }
       }
    });
});
