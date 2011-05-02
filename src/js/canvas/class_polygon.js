Module("JCUI.Geometry", function(m){
    Class("Polygon", {
        isa: m.Figure,
        does: m.Rotateable,
        has: {
            shape: {
                is: "rw",
                init: "polygon"
            },
            sides: {
                is: "rw",
                isa: JCUI.Types.Sides,
                /*init: 2,*/
                coerce: true
            },
            radius: {
                is: "rw",
                init: 100
            },
            //angle between corners
            angleBetweenCorners: {
                is: "rw",
                init: function(){
                    return this.calculateAnglesBetweenCorners();
                }
            },
            offset: {
                is: "rw",
                isa: m.Offset,
                init: function(){
                    return new m.Offset();
                }
            },
            corners: {
                is: "rw",
                init: function(){
                    return this.calculateCorners();
                }
            }
        },
        methods: {
            calculateAnglesBetweenCorners: function(){
                var r = 2 * Math.PI / this.sides;
                return new m.Angle({amount:r});

            },
            calculateCorners: function(){
                var arr = [],
                    angle = this.offset.getX();

                for(var i=0,l=this.sides; i<l; i++){
                    var a = angle.getAmount();
                    var x = this.center.x + (this.radius * Math.cos(a)),
                        y = this.center.y + (this.radius * Math.sin(a));
                    var pos = new m.Position({x:x,y:y});
                    arr.push(pos);
                    angle.add(this.angleBetweenCorners);
                }
                return arr;
            },
            applyYBounceToCorner: function(corner){
                var y, newY, angle;
                y = corner.getY();
                angle = this.offset.getY().getAmount();
                newY = y + (this.radius * Math.cos(angle));
                return newY;
            },
            applyZBounceToCorner: function(corner){
                var x, newX, angle;
                x = corner.getX();
                angle = this.offset.getZ().getAmount();
                newX = x + (this.radius * Math.cos(angle))  ;
                return newX;
            },
            draw: function(canvasObj){
                switch (this.shape){
                    case "polygon":
                        this.drawPolygon(canvasObj);
                        break;
                    case "star":
                        this.drawStar(canvasObj);
                        break;
                }
            },
            drawPolygon: function(canvasObj){
                var corner;
                this.angleBetweenCorners = this.calculateAnglesBetweenCorners();
                this.corners = this.calculateCorners();
                for(var i=0,l=this.corners.length; i<l; i++){
                    corner = this.corners[i];
                    corner.setY(this.applyYBounceToCorner(corner));
                    corner.setX(this.applyZBounceToCorner(corner));
                }

                canvasObj.beginPath();
                for(var i=0, l=this.corners.length; i<l; i++){
                    var corner = this.corners[i],
                    nextCorner,
                    nextIterator;

                    if(i === l-1){
                        nextIterator = 0;
                    }else{
                        nextIterator = i+1;
                    }
                    nextCorner = this.corners[nextIterator];

                    canvasObj.moveTo(corner);
                    canvasObj.lineTo(nextCorner);
                }

                canvasObj.stroke();
            },
            drawStar: function(canvasObj){
                if(this.sides<4){
                    return;
                }
                this.angleBetweenCorners = this.calculateAnglesBetweenCorners();
                this.corners = this.calculateCorners();
                for(var i=0,l=this.corners.length; i<l; i++){
                    corner = this.corners[i];
                    corner.setY(this.applyYBounceToCorner(corner));
                    corner.setX(this.applyZBounceToCorner(corner));
                }

                canvasObj.beginPath();
                canvasObj.moveTo(this.corners[0]);

                var crossSkipAmount = Math.floor(this.sides / 2);
                if(crossSkipAmount === this.sides/2){
                    crossSkipAmount -= 1;
                }
                var arr = this.corners;

                for(var i=0; i<crossSkipAmount; i++){
                    arr.concat(this.corners);
                }

                for(var i=0, l=arr.length; i<l; i++){
                    var corner = arr[i],
                    nextCorner,
                    nextIterator;

                    nextIterator = i+crossSkipAmount;
                    if(nextIterator > l-1){
                        nextIterator = 0 + nextIterator - l;
                    }
                    nextCorner = arr[nextIterator];

                    canvasObj.moveTo(corner);
                    canvasObj.lineTo(nextCorner);
                }

                canvasObj.stroke();
            },
            rotate: function(canvasObj){
                window.clearInterval(canvasController.rotateTimer);
                //console.log("rotates? " + canvasController.polygon.rotates());
                if(canvasController.polygon.rotates()){

                    canvasController.rotateTimer = window.setInterval((function(obj){
                        return function(){
                            canvasObj.clear();
                            var xAngle = new m.Angle({amount: obj.getRotationSpeedX().getAmount()/100});
                            var yAngle = new m.Angle({amount: obj.getRotationSpeedY().getAmount()/100});
                            var zAngle = new m.Angle({amount: obj.getRotationSpeedZ().getAmount()/100});
                            var additions = new m.Offset({
                                x: xAngle,
                                y: yAngle,
                                z: zAngle
                            });
                            obj.offset.add(additions);
                            obj.draw(canvasObj);
                        }
                    }(this)), 10);

                }
            }

        }
    });
});
