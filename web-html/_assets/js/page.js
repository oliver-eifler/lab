/** MODULE (Page)
* final page rendering
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

    lib.ver = '0.0.1';
    lib.vars = lib.vars||{};
    //PRIVAT
    var header = null,
        footer = null,
        sidemenu = null;;

    lib.init = function()
    {
        $(document).ready(onReady);
    }
    function onReady()
    {
        /*indicate that anything is now under control of olli */
        $('body').addClass('olli').attr('olli','true').
        /*INIT Toggle Buttons (show/hide)*/
        on('click.toggle','*[toggle]',function(e) {
           var $this = $(this),id = $this.attr('toggle');
           $this.blur();
           if (id !== undefined)
           {
              var $id = $(id),el = $id[0];
              if (el.olliHook !== undefined && typeof el.olliHook.toggle === 'function')
              {
                el.olliHook.toggle();
              }
              else
              {
                $id.toggleClass("hidden");
                if (!$id.hasClass("hidden"))
                  $id.find('input:first').focus();
              }
            }
           });

        header = olli.page.header().init();
        footer = olli.page.footer().init();
        sidemenu = olli.page.sidemenu().init();
        resize();
        WebFont.load({
            custom: {
                families: ['ollicon','roboto_condensed','droid_serif:n4,n7,i4,i7']
            },
            fontactive: function(familyName, fvd) {console.log("font: "+familyName+":"+fvd+" loaded..");onFontResize();}
        });
        $(window).on("resize",onWinResize);
        $(document).on("fontresize",onFontResize);
    }
    function onFontResize()
    {
        resize({bFont:true});
    }
    function onWinResize()
    {
        resize({bFont:false});
    }
    function resize(options)
    {
        var opt = $.extend({},{bFont:true,width:olli._curWidth,height:olli._curHeight,owidth:olli._oldWidth,oheight:olli._oldHeight,xwidth:olli.clientWidth(true)},options);
        if (opt.width < 320)
        {
            opt.width = 320;
            opt.xwidth = 320;

        }
        $('body,header').css({'width':opt.xwidth});


        header.resize(opt);
        footer.resize(opt);
        $('body').css({'paddingTop':header.getHeight()});
        //resize content
        page = olli.clientHeight() -  header.getHeight() - footer.getHeight();
        $('#content').css({'minHeight':page});

    }

return lib;
}));
/*GLOBAL*/
