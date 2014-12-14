/**
 * Olli Framework
 * This file is part of the Olli-Framework
 * Copyright (c) 2012-2013 Oliver Jean Eifler
 *
 * @version 0.0.1
 * @link http://www.framework.dd/
 * @author Oliver Jean Eifler <oliver.eifler@gmx.de>
 * @license http://www.opensource.org/licenses/mit-license.php MIT License

 * using fancybox (for ie and dumb browsers) and magnific-popup (for all other browsers)
 **/
 /*
 options =
 {
 galerie: name/false
 delegate: selector/false
 }
 */
 (function(lib,$) {
lib.loadLightbox = function(callback)
{
//async load lightbox if not available
        var css = php.pathCSS+((php.ie===false)?"/magnific-popup.css":"/fancybox.css"),
            js = php.pathJS+((php.ie===false)?"/extra/jquery.magnific-popup.js":"/extra/jquery.fancybox.js"),
            lb = (php.ie===false)?$.magnificPopup:$.fancybox;
        if (lb!==undefined)
        {
           if(callback !== undefined && typeof callback == 'function')
                callback();
           return;
        }
        $.ajax({url:js,dataType:"script",cache:true,
          success:function(data){
              DEBUG && console.log(js+" loaded");
              $.ajax({url:css,dataType:"text",cache:true,
              success:function(data){
                //$("#lazyload_start").after("<style data-href='"+css+"'>" + data + "</style>");
                $("head").append("<style data-href='"+css+"'>" + data + "</style>");
                if(callback !== undefined && typeof callback == 'function') callback();
                }
                });
            }
        });
}
lib.lightbox = function(selector,options) {
    if (!lib.lightbox.initMP(selector,options))
        lib.lightbox.initFB(selector,options);
}
lib.lightbox.initFB = function(selector,options) {
  if (lib.lightbox.fb === undefined)
     lib.lightbox.fb = new fancyBox();
  var lb = lib.lightbox.fb;
  lb.initGalerie(selector,$.extend({},lib.lightbox.defaults,options));
  return lb.avail;
}
lib.lightbox.initMP = function(selector,options) {
  if (lib.lightbox.mp === undefined)
     lib.lightbox.mp = new magnificPopup();
  var lb = lib.lightbox.mp;
  lb.initGalerie(selector,$.extend({},lib.lightbox.defaults,options));
  return lb.avail;
}
lib.lightbox.defaults = {galerie:false,delegate:false}
    var fancyBox = function()
    {
          var plugin = this;
          plugin.defaults = function()
          {
            if($.fancybox===undefined)
                return false;

            $.extend(true, $.fancybox.defaults,{
                openEffect  : 'none',
                closeEffect : 'none',
                nextEffect  : 'none',
                prevEffect  : 'none',
                wrapCSS: "lb",
                padding:0,
                beforeLoad: function() {
                  /*
                    var $elem = $(this.element),
                        galerie =$elem.parent().data("galerie");
                    if (galerie !== undefined && galerie !="")
                        this.title = "<b>"+galerie+"</b><br>"+this.title;
                  */
                    var text = this.title,count = this.group.length > 1 ? 'Bild ' + (this.index + 1) + ' von ' + this.group.length:"",
                    $elem = $(this.element),galerie =$elem.parent().data("galerie");
                    if (galerie !== undefined && galerie !="")
                        text = "<b>"+galerie+"</b><br>"+text;
                    this.title="<table cellpadding='0' cellspacing='0' style='width:100%;border-size:0px'>";
                    this.title+= "<tr><td>"+text+"</td><td align='right'><small>"+count+"</small></td></tr></table>";
                    //'Image ' + (this.index + 1) + ' of ' + this.group.length;
                },
                afterShow: function() {
                    var $fontsize = $("#fontsize"),
                    elem = $(this.wrap);
                    onFontResize(elem,{width:$fontsize.width(),height:$fontsize.height()});
                    $(document).on("fontresize",function(event,data){onFontResize(elem,data);});
                    function onFontResize(elem,data)
                    {
                        var fh = data.width;
                        elem.find('.fancybox-title').css({fontSize:16/fh+"em",lineHeight:"1.125em"});
                    };
                },
                helpers : {
                    title: {type: 'outside'}
                }
            });
            return true;
          };
        //Init it;
        plugin.initGalerie = function(selector,options)
        {
            if (!plugin.avail)
                return;
            var items = $(selector);
            if (options.delegate!="")
                items = items.find(options.delegate);
            if (options !== false && options.galerie != "")
                items.attr("rel",options.galerie).fancybox();
            else
                items.fancybox();
        };
        if (plugin.avail === undefined)
            plugin.avail = plugin.defaults();

    };
    var magnificPopup = function()
    {
          var plugin = this;
          plugin.defaults = function()
          {
            if($.magnificPopup===undefined)
                return false;
            //create additional functions
            $.magnificPopup.posArrows = function(mp)
            {
                var pos=(mp.container.width()-mp.content.width())/2-52;
                if (pos < 0)
                    pos = 0;
                if (mp.arrowLeft !== undefined && mp.arrowLeft != null)
                    mp.arrowLeft.css({marginLeft:pos+"px"});
                if (mp.arrowRight !== undefined && mp.arrowRight != null)
                    mp.arrowRight.css({marginRight:pos+"px"});
            }
            $.extend(true, $.magnificPopup.defaults, {
                disableOn: function() {return this.isIE7 ? false: true;},
                mainClass: "lb",
                closeBtnInside:true,
                closeMarkup: '<button title="%title%" type="button" class="mfp-close"><span>&times;</span></button>',
                tClose: 'Close (Esc)', // Alt text on close button
                tLoading: 'Loading...', // Text that is displayed during loading. Can contain %curr% and %total% keys
                gallery: {
                    tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
                    tNext: 'Next (Right arrow key)', // Alt text on right arrow
                    tCounter: '<em>Bild %curr% von %total%</em>' // Markup for "1 of 7" counter
                },
                image: {
                    tError: '<a href="%url%">The image</a> could not be loaded.', // Error message when image could not be loaded
                    markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-img"></div>'+
					'<div class="mfp-bottom-bar">'+
                        "<table cellpadding='0' cellspacing='0' style='width:100%;border-size:0px'>"+
                        '<tr><td class="mfp-title"></td>'+
						'<td class="mfp-counter"></td></tr></table>'+
					'</div>'+
				'</div>',

                    titleSrc: function(item) {
                        var magnificPopup = $.magnificPopup.instance,
                        galerie = magnificPopup.st.mainEl.data("galerie");
                        if (galerie !== undefined && galerie !="")
                            return "<b>"+galerie+"</b><br>"+item.el.attr('title');
                        return item.el.attr('title');
                        }
                },
                ajax: {
                    tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
                },
                callbacks: {
                    open: function() {
                        var $fontsize = $("#fontsize"),
                        magnificPopup = this,
                        $close = magnificPopup.content.find('.mfp-close'), //28/44pixel
                        $title = magnificPopup.content.find('.mfp-title'), //16/18pixel
                        $counter = magnificPopup.content.find('.mfp-counter');//12/pixel;
                        magnificPopup.container.css({overflow:"hidden"});
                        onFontResize({width:$fontsize.width(),height:$fontsize.height()});
                        $(document).on("fontresize",function(event,data){onFontResize(data);});
                        function onFontResize(data)
                        {
                            var fh = data.width;
                            $close.css({fontSize:28/fh+"em",lineHeight:"1em",height:"44px"});
                            $title.css({fontSize:16/fh+"em",lineHeight:"1.125em"});
                            $counter.css({fontSize:12/fh+"em",lineHeight:"1.125em"});
                        };
                    },
                    close: function() {
                        //$(document).off("fontresize",open.onFontResize);
                    },
                    buildControls: function() {
                        //$.magnificPopup.posArrows(this);
                    },
                    afterChange: function() {
                        //$.magnificPopup.posArrows(this);
                    },
                    imageLoadComplete: function() {
                        $.magnificPopup.posArrows(this);
                    },
                    resize: function() {
                        $.magnificPopup.posArrows(this);
                    }
                }
            });
           return true;
          };
        //Init it;
        plugin.initGalerie = function(selector,options)
        {
            if (!plugin.avail)
                return;
            var galerie = (options !== false && options.galerie != "")
                $(selector).magnificPopup({
                    delegate: options.delegate, // child items selector, by clicking on it popup will open
                    type: 'image',
                    gallery:{enabled:galerie}
		    });
        };
        if (plugin.avail === undefined)
            plugin.avail = plugin.defaults();
    };
})(olli,jQuery);

