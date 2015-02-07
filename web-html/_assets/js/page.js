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
        modal = null,$modal = null,
        sidepanel = null,$sidepanel = null,
        content=null,$content = null,
        $gap = null,
        $rows = null;

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
           })
         /*INIT ajax links */
        .on('click.ajax','a[data-ajax]',function(e) {
           var $this = $(this);
           lib.ajaxload(this);
           e.preventDefault();
           });
        $('#modal-test').on('click',function(e){
                modal.open('test',{
                  header:'test dialog',
                  text: 'was weiss den ich!<br>Was solls...',
                  loader:true,
                  overlayClick:false,
                  buttonsClick:function(btn,id){console.log("modal buttons "+id);return true;},
                  buttons:[
                    {label:'cancel<div>bla</div>'},
                    {label:'weiter',id:'ok'}
                  ]
                });
        });

        $gap = $('#gap');
        $content = $('#content');
        $header = $('#header');
        $sidepanel = $('#sidepanel');
        $footer = $('#footer');
        $modal = $('#modal');
        $rows = $('.page-row');

        header = lib.header($header[0]);
        footer = lib.footer($footer[0]);
        sidepanel = lib.sidepanel($sidepanel[0]);
        content = lib.content($content[0]);
        modal = lib.modal($modal[0]);

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
        var clientHeight = olli.clientHeight();

        if (opt.width < 320)
        {
            opt.width = 320;
            opt.xwidth = 320;

        }
        $rows.css({'width':opt.xwidth});


        header.resize(opt);
        footer.resize(opt);
        $('body').css({'paddingTop':header.getHeight()});
        //resize content
        page = clientHeight -  header.getHeight() - footer.getHeight();
        $content.css({'minHeight':page});

        if (scroll_disabled)
        {
            var scrollTop = parseInt($gap.css('marginTop'));
            var rect = $footer[0].getBoundingClientRect();
            if (rect.bottom < clientHeight)
            {
                scrollTop += (clientHeight - rect.bottom);
                $gap.css({'marginTop':scrollTop});
            }
        }
        /*
        if (scroll_disabled)
        {
            var scrollTop = ($('body').scrollTop()) ? $('body').scrollTop() : $('html').scrollTop(); // Works for Chrome, Firefox, IE...
            var rect = $footer[0].getBoundingClientRect();
            if (rect.bottom < olli.clientHeight())
            {
                window.scrollBy(0,olli.clientHeight()-rect.bottom);
            }
        }
        */

    }
    /* used by other page-elements */
    var scroll_disabled = false;
    lib.enableScroll = function(bDisable)
    {
       if (scroll_disabled == false)
           return;
       var scrollTop = parseInt($gap.css('marginTop'));
       $gap.css({'marginTop':0});
       $('html,body').removeClass('no-scroll').scrollTop(-scrollTop);
       scroll_disabled = false;
       resize();
    }
    lib.disableScroll = function(bDisable)
    {
       if (scroll_disabled == true)
           return;
       var scrollTop = olli.getWindowScrollTop();//($('body').scrollTop()) ? $('body').scrollTop() : $('html').scrollTop(); // Works for Chrome, Firefox, IE...
       $('html,body').addClass('no-scroll').scrollTop(0);//css({'overflow-y':'hidden'});
       $gap.css({'marginTop':-scrollTop});
       scroll_disabled = true;
       resize();
    }
    lib.ajaxload = function(element)
    {
        $link = $(element);



      modal.open('ajaxpage',{
        header:false,
        text: 'Loading Page:<br>'+$link.text(),
        loader:true,
        overlayClick:false,
        buttonsClick:function(btn,id){return true;},
        buttons:[
          {label:'cancel',id:'cancel'}
        ]
      });
}
return lib;
}));
/*GLOBAL*/
