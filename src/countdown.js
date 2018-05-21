(function($){

   $.fn.countdown = function() {
      return this.each(function(){
          var xTimer = $(this);
          var initTime = xTimer.data("initial-time");
          xTimer.data("remaining", initTime);
         xTimer.on("timer:tick", timer_handler);
      });
   };

   function timer_handler()
   {
      var timer = $(this);
      var container = timer.closest(".timer_container");
      if (container.length == 0) { container = timer; }
      var remaining = timer.data("remaining");
       if (remaining) {
           if (remaining > 0) {
               remaining = remaining - 1;
               timer.html(formatTime(remaining));
           }
           if (remaining < 300) {
               container.css("background-color", "red");
           } else if (remaining < 120) {
               container.css("background-color", "yellow");
           }
       } else {
           container.css("background-color", "red");
           timer.html("TIME EXPIRED");
       }

      timer.data("remaining", remaining);
   }


    function formatTime(ms) {
        var result = "";
        var remaining = ms;
        var sec = 1; // change this to 1000 if the parameter will be milliseconds
        var min = sec * 60;
        var hour = min * 60;
        var day = hour * 24;

        var days = Math.trunc(remaining / day);
        remaining -= (days * day);

        if (days > 0) result = days.toFixed(0) + ":";

        var hours = Math.trunc(remaining / hour);
        remaining -= (hours * hour);

        if (hours > 0 || result.length > 0) {
            result += (hours >= 10 ? "" : "0") + hours.toFixed(0) + ":";
        }

        var mins = Math.trunc(remaining / min);
        remaining -= (mins * min);

        result += (mins >= 10 ? "" : "0") + mins.toFixed(0) + ":";

        var secs = Math.trunc(remaining / sec);

        result += (secs >= 10 ? "" : "0") + secs.toFixed(0);

        return result;
    }

   var countdownInterval = setInterval(function(){
      $(".timer").trigger("timer:tick");
   }, 1000);

}(jQuery));