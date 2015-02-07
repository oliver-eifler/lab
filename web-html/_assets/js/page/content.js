/** MODULE (olli.page.content)
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

    lib.content = function(element)
    {
        //options.dummy = true;
        if (element instanceof jQuery)
            element = element[0];

        if (element.olliHook === undefined)
            element.olliHook = new content(element);
        return element.olliHook;
    };
    lib.content.ver="0.0.1";
    /* content STUFF */
    var content = function(el)
    {
        var plugin = this,
            $content = null,
            contentWidth = 0,contentHeight = 0;

        function cacheData()
        {
            contentHeight = $content.outerHeight();
        }

        plugin.getWidth = function() {return contentWidth;}
        plugin.getHeight = function() {return contentHeight;}

        function init(element)
        {
            $content = $(element);
            $content.attr('olli','true');
            return plugin;
        }
        plugin.resize = function(data)
        {
           var width = rwidth($content[0],true);
           contentWidth = width;
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
