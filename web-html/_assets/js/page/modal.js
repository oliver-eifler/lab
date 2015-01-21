/** MODULE (olli.page.modal)
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

    lib.modal = function(element)
    {
        //options.dummy = true;
        if (element.olliHook === undefined)
            element.olliHook = new modal(element);
        return element.olliHook;
    };
    lib.modal.ver="0.0.1";
    /* sidepanel STUFF */
    var modal = function(el)
    {
        var plugin = this,
            $modal = null,
            $overlay = null,overlay = null,
            elementWidth = 0,elementHeight = 0;

        function cacheData()
        {
            elementHeight = $modal.outerHeight();
        }

        plugin.getWidth = function() {return elementWidth;}
        plugin.getHeight = function() {return elementHeight;}
        function init(element)
        {
            $modal = $(element);
            $overlay = $modal.parent();
            overlay = lib.overlay($overlay);

            $modal.attr('olli','true');
            $modal.on('click.modal',false); //do nothing at the moment

            return plugin;
        }
        plugin.onOverlayClick = function()
        {
           //do nothing ;)
        }
        plugin.isVisible = function()
        {
            return !olli.getBoolAttr($modal[0],"hide");
        }


        plugin.show = function()
        {
            overlay.add("#"+$modal[0].getAttribute('id'));
            olli.setBoolAttr($modal[0],"hide",false);
            setTimeout(plugin.hide,5000);
        }
        plugin.hide = function()
        {
            olli.setBoolAttr($modal[0],"hide",true);
            overlay.remove("#"+$modal[0].getAttribute('id'));
        }
        plugin.resize = function(data)
        {
           var width = rwidth($panel[0],true);
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

        return init(el);
   }
return lib;
}));
/*GLOBAL*/
