(function($){
$.fn.enterAsTab = function () {
  $(this).find('.noenter').on("keypress", function(e) {
    /* ENTER PRESSED*/
    if (e.keyCode == 13) {
        /* FOCUS ELEMENT */

        var inputs =   $(this).parents("form").eq(0).find(":input:visible:not(disabled):not([readonly])"),
            idx = inputs.index(this);

        if (idx == inputs.length - 1) {
            inputs[0].focus();
            //e.preventDefault();
        } else {
            inputs[idx + 1].focus(); // handles submit buttons
        }

        e.preventDefault();
        return false;
    }
  });
  return this;
};
$.autofocus = function() {
    //if (!Modernizr.input.autofocus)
        $('[autofocus]:first').focus();
};

})(jQuery);
