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
        if (element instanceof jQuery)
            element = element[0];

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
            $text = null,
            $loader = null,
            $buttons = null,
            $overlay = null,overlay = null,
            elementWidth = 0,elementHeight = 0,
            curOptions = null;
        plugin.defaults = {
          overlayClick:true,
          buttonsClick:true,
          loader:false,header:'Guru Meditations',text:'Somthing wonderfull has happend, your browser is still alive',
          buttons:[{cls:'',label:'proceed',id:'ok'}]
        };

        function cacheData()
        {
            elementHeight = $modal.outerHeight();
        }

        plugin.getWidth = function() {return elementWidth;}
        plugin.getHeight = function() {return elementHeight;}
        function init(element)
        {
            $modal = $(element);
            $overlay = $('#overlay');
            overlay = lib.overlay($overlay[0]);
            $text = $modal.find('.modal-text');
            $loader = $modal.find('.modal-loader');
            $buttons = $modal.find('.modal-buttons');
            $modal.attr('olli','true');
            olli.setBoolAttr($loader[0],"hide",true);
            olli.setBoolAttr($buttons[0],"hide",true);
            curOptions = plugin.defaults;





            $modal.on('click.modal',clickModal);

            return plugin;
        }
        plugin.onOverlayClick = function()
        {
          console.log("modal overlay clicked");
           if (typeof curOptions.overlayClick !== 'function' ? curOptions.overlayClick : curOptions.overlayClick())
             plugin.hide();
        }
        plugin.isVisible = function()
        {
            return !olli.getBoolAttr($modal[0],"hide");
        }
        function clickModal(e)
        {
            var e = e || window.event;
            var target = e.target || e.srcElement;
            var btns = this.querySelectorAll('button');
            [].forEach.call(btns, function(btn) {
                if (target == btn)
                {
                    var id = $(target).attr('id');
                    console.log("modal "+id+" clicked");
                    if (typeof curOptions.buttonsClick !== 'function'?curOptions.buttonsClick:curOptions.buttonsClick(target,id))
                        plugin.hide();
                }
            });
            e.stopPropagation();
            e.preventDefault();
            return false;
        }
        function addButtons(buttons)
        {
            var html='';
            if (Array.isArray(buttons))
            {
              buttons.forEach(function(btn,idx) {
                if (typeof btn.label === 'string')
                {
                    html += "<button id='modalbtn_"+((typeof btn.id==='string')?btn.id:idx)+"'";
                    html += " class='button button-flat'>"+btn.label+"</button>";
                }
              });
            }
            $buttons.html(html);
            olli.setBoolAttr($buttons[0],"hide",html._isBlank());
        }

        plugin.open = function(name,options)
        {
            var opts = curOptions = $.extend({},plugin.defaults,options);
            var html = '';
            if (typeof opts.header === 'string' && !opts.header._isBlank())
                html += '<h1>'+opts.header+'</h1>';
            if (typeof opts.text === 'string' && !opts.text._isBlank())
                html += opts.text;
            $text.html(html);
            olli.setBoolAttr($loader[0],"hide",!opts.loader);

            addButtons(opts.buttons);

            plugin.show();
        }

        plugin.show = function()
        {
            overlay.add("#"+$modal[0].getAttribute('id'));
            olli.setBoolAttr($modal[0],"hide",false);
            //setTimeout(plugin.hide,5000);
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
