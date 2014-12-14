(function (root, factory) {
    var lib = olli_namespace(root);
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define([], function () {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (lib = factory(lib,jQuery));
        });
    } else {
        // Browser globals
        lib = factory(lib,jQuery);
    }
}(this, function (lib,$) {
var css = {};

function getCSSPrefixed()
{
    css.transform = false;
    if (Modernizr.csstransforms)
        css.transform = Modernizr.prefixed('transform');
}
$.fn.move = function(x,y) {

	return $(this).each(function(){ lib.move(this,x,y); });
};
lib.move = function(e,x,y)
{
    if (css.transform === undefined)
        getCSSPrefixed();

    if (css.transform === false)
    {
        e.style["left"] = ""+x+"px"
        e.style["top"] = ""+y+"px"
    }
    else
    {
        e.style[css.transform] = "translateX("+x+"px) translateY("+y+"px) translateZ(0)";
    }
}




return lib;
}));
