Class("Canvas", {
	has: {
		support: {
			is: "ro",
			init: function(){
				var c = jQuery("<canvas />")[0];
				return (c.getContext) ? true : false;
			}
		},
		$canvas: {
			is: "rw"
		},
		context: {
			is: "ro",
			init: function(){
				if(this.support){
					return this.$canvas[0].getContext("2d");
				}
			}
		},
        width: {
            is: rw,
            init: function(){
                return this.$canvas[0].width;
            }
        },
        height:{
            is: rw,
            init: function(){
                return this.$canvas[0].height;
            }
        }
	},
	methods: {
        lineWidth: function(val){
          this.context.lineWidth = val;
        },
		fillStyle: function(){
			var args = Array.prototype.slice.call(arguments),
				type = args.shift();
			this.context.fillStyle = type + "(" + args.join(",") + ")";
			
		},
		strokeStyle: function(){
			var args = Array.prototype.slice.call(arguments),
				type = args.shift();
			this.context.strokeStyle = type + "(" + args.join(",") + ")";
		},
		
		fillRectangle: function(){
			this.context.fillRectangle.apply(this.context, arguments);
		},
		
		beginPath: function(){
			this.context.beginPath();
		},
		
		moveTo: function(pos){
			var args = [pos.getX(), pos.getY()];
			this.context.moveTo.apply(this.context, args);
		},
		
		lineTo: function(pos){
			var args = [pos.getX(), pos.getY()];
			this.context.lineTo.apply(this.context, args);
		},

		stroke: function(){
			this.context.stroke();
		},

        clear: function(){
            this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
            var tempWidth = this.getWidth();
            this.setWidth(1);
            this.setWidth(tempWidth);
        }
	}
});


