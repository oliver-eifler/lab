/** MODULE (olli.page.footer)
* not reuseable
**/

(function (root, factory) {
    var olli = olli_namespace(root),
    module = olli_namespace(olli,"page");
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define(["dependings"], function (lib) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (module = factory(module,olli,jQuery));
        });
    } else {
        // Browser globals
        module = factory(module,olli,jQuery);
    }
}(this, function (lib,olli,$) {

    lib.footer = function(element)
    {
        //options.dummy = true;
        if (element instanceof jQuery)
            element = element[0];

        if (element.olliHook === undefined)
            element.olliHook = new footer(element);
        return element.olliHook;
    };
    lib.footer.obj = null;
    lib.footer.ver="0.0.1";
    /* footer STUFF */
    var footer = function(el)
    {
        var plugin = this,
            $footer = null,
            footerWidth = 0,footerHeight = 0;

        function cacheData()
        {
            footerHeight = $footer.outerHeight();
        }

        plugin.getWidth = function() {return footerWidth;}
        plugin.getHeight = function() {return footerHeight;}

        function init(element)
        {
            $footer = $(element);
            $footer.attr('olli','true');
            return plugin;
        }
        plugin.resize = function(data)
        {
           var width = rwidth($footer[0],true);
           footerWidth = width;
           if (data.bFont == true)
               cacheData();
            return plugin;
        }
        function rwidth(e,down)
        {
          var fx = (down === true) ? Math.floor:Math.ceil,
          rect = e.getBoundingClientRect();
          return fx((typeof rect.width !== "undefined") ? rect.width:(rect.right - rect.left));
        }

        return init(el);
   }
return lib;
}));
/*GLOBAL*/
