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
    var header = null,$header = null,
        footer = null,$footer = null,
        sidepanel = null,$sidepanel = null,
        content=null,$content = null;

    lib.init = function()
    {
        $(document).ready(onReady);
    }
    function onReady()
    {
        /*indicate that anything is now under control of olli */
        FastClick.attach(document.body);
        $('body').addClass('olli').attr('olli','true')
        /*INIT Toggle Buttons (show/hide)*/
        .on('click.toggle','*[data-toggle]',function(e) {
           var $this = $(this),id = $this.attr('data-toggle');
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
                if (!olli.toggleBoolAttr($id[0],"hide"))
                  $id.find('input:first').focus();
              }
            }
           });

        $content = $('#content');
        $header = $('#header');
        $sidepanel = $('#sidepanel');
        $footer = $('#footer');

        header = lib.header($header[0]);
        footer = lib.footer($footer[0]);
        sidepanel = lib.sidepanel($sidepanel[0]);
        content = lib.content($content[0]);
        /*Background for overlay*/
        var fcol = $footer.css("backgroundColor");
        var ccol = $content.css("backgroundColor");
        var gradient = 'linear-gradient(to right,'+ccol+','+ccol+')';
        $('html').css("backgroundColor",fcol);
        $('html').css("backgroundImage",gradient);

        resize();
        WebFont.load({
            custom: {
                families: ['ollicon','roboto condensed:n4,n7,i4,i7']
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
        $content.css({'minHeight':page});

        var scrollTop = parseInt($content.css('marginTop'));
        if (scrollTop != 0)
        {
            var rect = $('footer')[0].getBoundingClientRect();
            if (rect.bottom < olli.clientHeight())
            {
                scrollTop += (olli.clientHeight() - rect.bottom);
                if (scrollTop <=0)
                    $content.css({'marginTop':scrollTop});
            }
        }
        //Gradient
        var stop = $content[0].getBoundingClientRect().bottom;
        /*
        var fcol = $footer.css("backgroundColor");
        var ccol = $content.css("backgroundColor");
        var gradient = 'linear-gradient(to right,'+ccol+','+ccol+')';
        $('html').css("backgroundColor",fcol);
        $('html').css("backgroundImage",gradient);
        */
        $('html').css("backgroundSize","100% "+stop+"px");


    }
    /* used by other page-elements */
    var scroll_disabled = false;
    lib.enableScroll = function(bDisable)
    {
       if (scroll_disabled == false)
           return;
       var scrollTop = parseInt($content.css('marginTop'));
       $content.css({'marginTop':0});
       $('html,body').css({'overflow-y':''}).scrollTop(-scrollTop);
       scroll_disabled = false;
    }
    lib.disableScroll = function(bDisable)
    {
       if (scroll_disabled == true)
           return;
       var scrollTop = ($('body').scrollTop()) ? $('body').scrollTop() : $('html').scrollTop(); // Works for Chrome, Firefox, IE...
       $('html,body').css({'overflow-y':'hidden'});
       $content.css({'marginTop':-scrollTop});
       scroll_disabled = true;
    }
return lib;
}));
/*GLOBAL*/
