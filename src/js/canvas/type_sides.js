Module("JCUI.Types", function(m) {
    Type("Sides", {
        uses: Joose.Type.Int,
        where: function(value) {
            if (value >= 3) {
                return true;
            }
            return false;
        },
        coerce: [{
            from: Joose.Type.Str,
            via: function(str){
                var int = new Number(str);

                if (3 > int) {
                    int = 3;
                }
                return parseInt(int);
            }
        }],
        message: function(i){
            return i + " is too few sides!";
        }

    });
});
