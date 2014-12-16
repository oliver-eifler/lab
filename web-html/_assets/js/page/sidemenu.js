/** MODULE (olli.page.sidemenu)
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

    lib.sidemenu = function()
    {
        //options.dummy = true;
        if (lib.sidemenu.obj === null)
            lib.sidemenu.obj = new sidemenu();
        return lib.sidemenu.obj;
    };
    lib.sidemenu.obj = null;
    lib.sidemenu.ver="0.0.1";
    /* sidemenu STUFF */
    var sidemenu = function()
    {
        var plugin = this,
            $element = null,
            elementWidth = 0,elementHeight = 0;

        function cacheData()
        {
            elementHeight = $element.outerHeight();
        }

        plugin.getWidth = function() {return elementWidth;}
        plugin.getHeight = function() {return elementHeight;}

        plugin.init = function()
        {
            $element = $('#sidemenu');
            $element[0].olliHook = plugin;
            return plugin;
        }
        plugin.toggle = function()
        {
            $element.toggleClass('hidden');
        }
        plugin.resize = function(data)
        {
           var width = rwidth($element[0],true);
           elementWidth = width;
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

        return plugin;
   }
return lib;
}));
/*GLOBAL*/
