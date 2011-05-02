Module("JCUI", function(){
    Class("UiControllers", {
        has: {
            $elems: {
                is: rw,
                init: function() {
                    return {

                        $sidesSlider: $("#sides-slider"),
                        $sidesAmount: $("#sides-amount"),
                        $sidesMin: $("#sides-min"),
                        $sidesMax: $("#sides-max"),

                        $shapeSet: $("#shapeSet"),
                        $starButton : $("input[name=shape]").filter("*[value=star]"),

                        $rotationXSlider: $("#rotation-x-slider"),
                        $rotationXAmount: $("#rotation-x-amount"),

                        $bounceYSlider: $("#bounce-y-slider"),
                        $bounceYAmount: $("#bounce-y-amount"),

                        $bounceXSlider: $("#bounce-x-slider"),
                        $bounceXAmount: $("#bounce-x-amount")
                    };
                }
            },

            sides: {
                is: "ro",
                init: function() {
                    var self = this,
                            initSidesMin = 3,
                            initSidesMax = 23;
                    // Slider
                    self.$elems.$sidesAmount.html(initSidesMin);
                    self.$elems.$sidesMin.html(initSidesMin);
                    self.$elems.$sidesMax.html(initSidesMax);
                    this.$elems.$sidesSlider.slider({
                        min:initSidesMin,
                        max: initSidesMax,
                        slide: function(event, ui) {
                            self.$elems.$sidesAmount.html(ui.value);
                            canvasController.change("sides", ui.value);
                            self.checkUIControllers("sides");
                            canvasController.draw();
                        }
                    });
                }
            },

            shape: {
                is: "ro",
                init: function() {
                    var self = this;
                    //Polygon type
                    this.$elems.$shapeSet.buttonset({

                    }).find("input[type=radio]").bind("change", function(e) {
                        canvasController.change("shape", $(this).val());
                        self.checkUIControllers("shape");
                        canvasController.draw();
                    });
                }
            },

            rotationX: {
                is: "ro",
                init: function() {
                    var self = this;
                    this.$elems.$rotationXSlider.slider({
                        min: 0,
                        max: 100,
                        step: 1,
                        slide: function(event, ui){
                            self.$elems.$rotationXAmount.html(ui.value);
                            canvasController.change("rotationX", ui.value);
                            //self.checkUIControllers("rotation");
                        }
                    });
                }
            },
            rotationY: {
                is: "ro",
                init: function() {
                    var self = this;
                    this.$elems.$bounceYSlider.slider({
                        min: 0,
                        max: 100,
                        step: 1,
                        slide: function(event, ui){
                            self.$elems.$bounceYAmount.html(ui.value);
                            canvasController.change("rotationY", ui.value);
                            //self.checkUIControllers("rotation");
                        }
                    });
                }
            },
            rotationZ: {
                is: "ro",
                init: function() {
                    var self = this;
                    this.$elems.$bounceXSlider.slider({
                        min: 0,
                        max: 100,
                        step: 1,
                        slide: function(event, ui){
                            self.$elems.$bounceXAmount.html(ui.value);
                            canvasController.change("rotationZ", ui.value);
                            //self.checkUIControllers("rotation");
                        }
                    });
                }
            }
        },
        methods: {
            checkUIControllers: function(whatChanged) {
                switch (whatChanged) {
                    case "sides":
                        (canvasController.getPolygon().getSides() > 4) ? this.$elems.$starButton.button("enable") : this.$elems.$starButton.button("disable");
                        break;
                    case "shape":
                        var minVal, maxVal;
                        if (canvasController.getPolygon().getShape() === "star") {
                            minVal = 5;
                            maxVal = 23;
                        } else {
                            minVal = 3;
                            maxVal = 23;
                        }
                        this.$elems.$sidesSlider.slider("option", "min", minVal);
                        this.$elems.$sidesSlider.slider("value", this.$elems.$sidesSlider.slider("value"));

                        this.$elems.$sidesMin.html(minVal);
                        this.$elems.$sidesMax.html(maxVal);

                        break;
                    //case "rotate":

                        //break;
                }

            }
        }
    });
});
