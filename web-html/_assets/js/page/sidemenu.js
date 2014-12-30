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

    lib.sidepanel = function(element)
    {
        //options.dummy = true;
        if (element.olliHook === undefined)
            element.olliHook = new sidepanel(element);
        return element.olliHook;
    };
    lib.sidepanel.ver="0.0.1";
    /* sidepanel STUFF */
    var sidepanel = function(el)
    {
        var plugin = this,
            $panel = null,
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
            $panel = $(element);
            $overlay = $panel.parent();
            $panel.attr('olli','true');
            $overlay.attr('olli','true');
              //Overwrite body data-toggle event
              $panel.on('click.panel',false);
              $panel.on('click.panel','button[data-toggle]',function(e) {
              var $this = $(this),id = $this.attr('data-toggle'),$id=$(id);
              $this.blur();
              if (id !== undefined)
              {
                var open = olli.getBoolAttr($id[0],"open");
                $id.velocity((!open) ?"slideDown":"slideUp", { duration: 500 });
                olli.toggleBoolAttr($this[0],"open");
                olli.toggleBoolAttr($id[0],"open");
              }
              return false;
           });
           $panel.find('.tool-back').on('click.panel',plugin.toggle);
            return plugin;
        }
        function olliToggle()
        {





        }
        plugin.toggle = function()
        {
           var v_options,v_anim,visible = !olli.getBoolAttr($overlay[0],"hide");

            if (visible)
            {
                v_options = {
                  duration:250,
                  easing: "linear",
                  complete:function(){$panel.scrollTop(0);olli.setBoolAttr($overlay[0],"hide",true);lib.enableScroll();}
                };
                v_anim = {translateX: ["-100%","0%"]};
                $overlay[0].removeAttribute("data-toggle");
           }
            else
            {
                v_options = {
                  duration:250,
                  easing: "linear",
                  begin:function(){lib.disableScroll();$panel.scrollTop(0);olli.setBoolAttr($overlay[0],"hide",false);}
                };
                v_anim = {translateX: ["0%","-100%"]};
            }
            $panel.velocity(v_anim,v_options);
            $overlay[0].setAttribute("data-toggle","#"+$panel[0].getAttribute('id'));
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
