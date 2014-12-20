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

    lib.sidemenu = function($element)
    {
        //options.dummy = true;
        if ($element[0].olliHook === undefined)
            new sidemenu($element[0]);
        return $element[0].olliHook;
    };
    lib.sidemenu.ver="0.0.1";
    /* sidemenu STUFF */
    var sidemenu = function(el)
    {
        var plugin = this,
            $menu = null,
            $overlay = null,
            elementWidth = 0,elementHeight = 0;

        function cacheData()
        {
            elementHeight = $menu.outerHeight();
        }

        plugin.getWidth = function() {return elementWidth;}
        plugin.getHeight = function() {return elementHeight;}
        var bodypos,htmlpos;
        function init(element)
        {
            $menu = $(element);
            $overlay = $menu.parent();
            $menu.attr('olli','true');
            $menu[0].olliHook = plugin;
            $overlay.attr('olli','true');
            return plugin;
        }
        plugin.toggle = function()
        {
           var v_options,v_anim,visible = !$overlay.hasClass('hidden');

            if (visible)
            {
                v_options = {
                  duration:250,
                  easing: "linear",
                  complete:function(){$menu.scrollTop(0);$overlay.addClass('hidden');lib.enableScroll();}
                };
                v_anim = {translateX: ["-100%","0%"]};
           }
            else
            {
                v_options = {
                  duration:250,
                  easing: "linear",
                  begin:function(){lib.disableScroll();$menu.scrollTop(0);$overlay.removeClass('hidden');}
                };
                v_anim = {translateX: ["0%","-100%"]};
            }
            $menu.velocity(v_anim,v_options);
        }
        plugin.resize = function(data)
        {
           var width = rwidth($menu[0],true);
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

        init(el);
        return plugin;
   }
return lib;
}));
/*GLOBAL*/
