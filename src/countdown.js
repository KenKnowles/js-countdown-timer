(function($){

   $.fn.countdown = function() {
      return this.each(function(){
         var xTimer = $(this);
         xTimer.data("remaining", xTimer.attr("data-initial-time"));
         xTimer.on("timer:tick", timer_handler);
      });
   };

   function timer_handler()
   {
      var timer = $(this);
      var container = timer.closest(".timer_container");
      if (container.length == 0) { container = timer; }
      var remaining = timer.data("remaining");
      if(remaining)
      {
         if (remaining>0) {
            remaining = remaining - 1;
            timer.html(remaining);
         }
         if (remaining<10)
         {
            container.css("background-color","red");
         } else if (remaining< 20)
         {
            container.css("background-color", "yellow");
         }
      }

      timer.data("remaining", remaining);
   }

   var countdownInterval = setInterval(function(){
      $(".timer").trigger("timer:tick");
   }, 1000);

}(jQuery));