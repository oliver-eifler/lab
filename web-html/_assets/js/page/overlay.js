/** MODULE (olli.page.overlay)
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

    lib.overlay = function(element)
    {
        //options.dummy = true;
        if (element instanceof jQuery)
            element = element[0];

        if (element.olliHook === undefined)
            element.olliHook = new overlay(element);
        return element.olliHook;
    };
    lib.overlay.obj = null;
    lib.overlay.ver="0.0.1";
    /* footer STUFF */
    var overlay = function(el)
    {
        var plugin = this,
            $overlay = null;
            elementWidth = 0,elementHeight = 0,
            open = [],curOpen = -1,
            curIDSelector = "sidepanel";

        function cacheData()
        {
            elementHeight = $overlay.Height();
            elementWidth = $overlay.Width();
        }

        plugin.getWidth = function() {return elementWidth;}
        plugin.getHeight = function() {return elementHeight;}

        function init(element)
        {
            $overlay = $(element);
            $overlay.attr('olli','true');

            $overlay.on("click.overlay",function(e) {
                if (curOpen < 0)
                  return false;
                var $cur = $(open[curOpen]);
                if (!$cur.length)
                    return false;

                var el = $cur[0];
                if (el.olliHook !== undefined && typeof el.olliHook.onOverlayClick === 'function')
                {
                  el.olliHook.onOverlayClick();
                }
                return false;
            });
            return plugin;
        }
        plugin.resize = function(data)
        {
            cacheData();
            return plugin;
        }
        plugin.isVisible = function()
        {
            return !olli.getBoolAttr($overlay[0],"hide");
        }
        /*
        plugin.show = function()
        {
            if(olli.getBoolAttr($overlay[0],"hide")) //is hidden
                show();
            return plugin;
        }
        plugin.hide = function()
        {
            if(!olli.getBoolAttr($overlay[0],"hide")) //is visible
                hide();
            return plugin;
        }
        plugin.toggle = function()
        {
            if(!olli.getBoolAttr($overlay[0],"hide"))
                hide();
            else
                show();
            return plugin;
        }
        */
        plugin.add = function(selector)
        {
           if (open.indexOf(selector) == -1) //not yet added
           {
             open.push(selector);
             curOpen = open.length -1;

             if(olli.getBoolAttr($overlay[0],"hide")) //is hidden
                 show();
           }
           return plugin;
        }
        plugin.remove = function(selector)
        {
            var cur = open.indexOf(selector);
            if (cur != -1)
                open.splice(cur,1);
            curOpen = open.length -1;
            if (curOpen < 0)
            {
              if(!olli.getBoolAttr($overlay[0],"hide")) //is visible
                 hide();
            }
            return plugin;

        }
        function show()
        {
          /*
            var v_options = {
                  duration:250,
                  easing: "linear",
                  begin:function(){olli.setBoolAttr($overlay[0],"hide",false);lib.disableScroll();}
                };
            var v_anim = {backgroundColor: ["#000000","#000000"],backgroundColorAlpha: [0.75,0]};

            $overlay.velocity(v_anim,v_options);
            */
            olli.setBoolAttr($overlay[0],"hide",false);
            lib.disableScroll();
        }
        function hide()
        {
          /*
            var v_options = {
                  duration:250,
                  easing: "linear",
                  complete:function(){olli.setBoolAttr($overlay[0],"hide",true);lib.enableScroll();}
                };
            var v_anim = {backgroundColor: ["#000000","#000000"],backgroundColorAlpha: [0,0.75]};

            $overlay.velocity(v_anim,v_options);
           */
           olli.setBoolAttr($overlay[0],"hide",true);
           lib.enableScroll();
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
