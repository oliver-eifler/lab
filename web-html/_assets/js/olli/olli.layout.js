var layout = (function(lib,olli,$) {
lib.vars = {};
lib.vars.ver="0.0.1";
//private
var vars = {};
lib.slideshows = olli.slideshow(); //Page slideshows
var beforePrint = function() {
        console.log('Functionality to run before printing.');
        lib.printpage();
    };
    var afterPrint = function() {
        console.log('Functionality to run after printing');
        lib.resize();
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
    //execute if dom is ready
$(document).ready(onReady);
/**/
    function onPageInit()
    {
        //cache elements
        vars.$shrinkable = $('.shrink');
        vars.$ratiobox = $('.ratiobox');

        if (php.pageinit !== undefined && php.pageinit!="")
        {
            //php.pageinit += "console.log(php.pageinit+' ausgeführt');"
                    eval(php.pageinit);
        }

    };
    function onPageReady()
    {
        //cache elements
        if (php.pageready !== undefined && php.pageready!="")
        {
            //php.pageinit += "console.log(php.pageinit+' ausgeführt');"
                    eval(php.pageready);
        }
    };
    var loadCSS = function(file) //private
    {
           $.ajax({url:file,dataType:"text",cache:true,
              success:function(data){
                $("head").append("<style data-href='"+file+"'>" + data + "</style>");
                //onResize();
                }
            });
/*
        cssLink = $("<link>");
        //  $("head").append(cssLink); //IE hack: append before setting href
        cssLink.attr({
        rel:  "stylesheet",
        type: "text/css",
        href: href
        });
        $("head").append(cssLink); //IE hack: append before setting href
        return cssLink.get(0);
*/
    };
    function onReady() //public
    {
        if (Modernizr.fontface && Modernizr.generatedcontent)
        {
            loadCSS("/css/font-awesome.css");
        }
        /*
        if (DEBUG && Modernizr.minmax)
        {
            $('#log').html($('#log').html()+"<br>minmax  supported");
        }
        */
        if (DEBUG)
        {
            docElement = document.documentElement;
            var classes = docElement.className;
            $('#log').html('<p><code>'+classes+'</code></p>');
        }
        vars.$body = $('body');
        vars.$banner = $("#banner:first");
        vars.$banner_text = vars.$banner.first(".text");
        vars.$banner_logo = vars.$banner.first(".logo");
        vars.$page = $("#page:first");
        vars.$foot = $("#foot:first");
        vars.$mobilemenu = $("#navigation:first");
        vars.$mainmenu = $("#mainmenu");
        vars.$submenu = $("#submenu");
        vars.$content = $("#content");
        vars.$frame = $("#frame"); //DIE SEITE
        vars.$info = $("#info");
        vars.$fontsize = $("#fontsize");
        //vars.$mobilemenu.buildmenu("#mainmenu","#submenu");
        vars.$page.removeClass("group").children().removeClass("g1 g2 g3");

        if(Modernizr.svg) {
            imgs = $('img[data-svg]');
            imgs.attr('src', imgs.data('svg'));
        }
        olli.ajax.vars.ajaxload = lib.onAjaxLoad;
        olli.ajax.vars.ajaxunload = lib.onAjaxUnload;

        vars.contentWatcher = new heightWatcher(vars.$content,250,lib.resize);
        onLoad();
  }
    function onLoad()
    {
        olli.pagemenu.init();
        olli.ajax.init();
        onPageInit();
        onResize();
        $(window).load(function()
        {
            $('#loader').fadeTo(500,0);
            vars.$page.fadeTo(500,1);
            onPageReady();
            $.backstretch("img/background.jpg",{fade: 1000});
        });
        $(window).resize(olli.debounce(onResize,100));
        $(document).on("fontresize",onFontResize);
        vars.contentWatcher.start();
        bannerAnim(vars.$banner,5*1000);

    }
    lib.onAjaxUnload=function(event)
    {
        vars.contentWatcher.stop();
        //clear slideshows
        lib.slideshows.clear();
    }
    lib.onAjaxLoad=function(event,data)
    {
        //eval("layout.onPageInit = function() {"+php.pageinit+"}");
        olli.ajax.init();
        onPageInit();
        lib.resize();
        var offset = vars.$frame.offset();
        if ($(document).scrollTop() > offset.top)
            window.scroll(0,offset.top);
        onPageReady();
        $(window).trigger('resize.backstretch');
        vars.contentWatcher.start();

    }
    function onFontResize()
    {
        onResize();
    }
    function onResize()
    {
        vars.contentWatcher.stop();
        lib.resize();
        vars.contentWatcher.start();

    }
    lib.resize = function(forcewidth)
    {
        var em = vars.$fontsize.width();
        if (em < 16) em = 16;
        var fh = vars.$fontsize.height();
        vars.$mainmenu.css({fontSize:(4800/fh)+"%"});
        vars.$submenu.css({fontSize:(3200/fh)+"%"});
        vars.$mobilemenu.css({fontSize:2500/fh+"%"});

        if (forcewidth !== undefined)
            vars.clientWidth = forcewidth;
        else
            vars.clientWidth = olli.clientWidth();
        //$("body").css({width:vars.clientWidth});
        resizeBanner(vars.clientWidth,fh);

        var margin=0,orgWidth = vars.clientWidth;
        if (vars.clientWidth > em*86)//1366)
            vars.clientWidth = em*86;//1366;
        if (vars.clientWidth < em*20)//320)
            vars.clientWidth = em*20;//320;
        if (vars.clientWidth < orgWidth)
            margin = (orgWidth-vars.clientWidth)/2;

        //Reset heights;
        vars.$mainmenu.removeAttr("style");
        vars.$frame.removeAttr("style");
        vars.$info.removeAttr("style");
        vars.$content.removeAttr("style");
        vars.$page.css({height:"auto",width:vars.clientWidth,marginLeft:margin});
        resetForms();

        if (vars.clientWidth < em*48) //768
        //if (vars.clientWidth-vars.menuwidth < em*30)
        {
            DEBUG && console.log("1col");
            olli.pagemenu.mobile(true);
            //mobile display 1 column
            /*
            vars.$frame.css({position:"relative",left:0,top:0});
            vars.$info.css({position:"relative",left:0,top:0});
            xWidth(vars.$frame,vars.clientWidth);
            xWidth(vars.$info,vars.clientWidth);
            */
            resizeContent(false);
            alignForms();
            vars.contentWatcher.setVal(xHeight(vars.$body));
        }
        else
        {
            vars.menuwidth = 300;//vars.$mainmenu.outerWidth();//300;
            xWidth(vars.$mainmenu.get(0),vars.menuwidth-5);
            col = (vars.clientWidth - vars.menuwidth)/4;
            olli.pagemenu.mobile(false);

          if (col < em*10) //200
          {
              //normal display 2 column
              DEBUG && console.log("2col");
              width = vars.clientWidth - vars.menuwidth;
              posx = vars.menuwidth;

              vars.$frame.css({position:"absolute",top:0});
              xWidth(vars.$frame,width);
              xLeft(vars.$frame,posx);
              /*
              vars.$info.css({position:"relative",left:0,top:0});
              xWidth(vars.$info,vars.clientWidth);
              //xLeft(vars.$info,posx);
              */
              resizeContent(true);
              alignForms();

              var heights=[xHeight(vars.$mainmenu),xHeight(vars.$frame),xClientHeight()-(xHeight(vars.$banner)+xHeight(vars.$foot)+xHeight(vars.$info))];
              heights.sort(function(a,b){return b - a;});
              xHeight(vars.$mainmenu,heights[0]);
              xHeight(vars.$frame,heights[0]);
              xHeight(vars.$page,heights[0]+xHeight(vars.$info));
              vars.contentWatcher.setVal(xHeight(vars.$body));

           }
           else
           {
             //wide display 3 columns
              DEBUG && console.log("3col");
              infowidth = col;
              if (infowidth > em*20) //400
                  infowidth = em*20;
              width = vars.clientWidth - vars.menuwidth - infowidth;
              posx = vars.menuwidth;

              vars.$frame.css({position:"absolute",top:0});
              xWidth(vars.$frame,width);
              xLeft(vars.$frame,posx);

              posx+=width;
              vars.$info.css({position:"absolute",top:0});
              xWidth(vars.$info,infowidth);
              xLeft(vars.$info,posx);

              resizeContent(true);
              alignForms();

              var heights=[xHeight(vars.$mainmenu),xHeight(vars.$frame),xHeight(vars.$info),xClientHeight()-xHeight(vars.$banner)-xHeight(vars.$foot)-1];
              heights.sort(function(a,b){return b - a;});
              xHeight(vars.$mainmenu,heights[0]);
              xHeight(vars.$frame,heights[0]);
              xHeight(vars.$info,heights[0]);
              xHeight(vars.$page,heights[0]);
              vars.contentWatcher.setVal(xHeight(vars.$body));
          }
        }
    $(window).trigger("page_resize");
}
    lib.printpage = function(forcewidth)
    {
        var fh = vars.$fontsize.height();
        var w=700;
        resizeBanner(w,fh);

        //Reset heights;
        vars.$mainmenu.hide();
        vars.$submenu.hide();
        vars.$mobilemenu.hide();

        vars.$page.css({height:"auto",width:w,marginLeft:0});
        vars.$banner.css({height:"auto",marginTop:0});
        vars.$content.css({height:"auto"});
        vars.$frame.css({position:"relative",height:"auto",width:"100%",left:0,top:0});
        vars.$info.css({position:"relative",height:"auto",width:"75%",left:0,top:0});

       resetForms();
            resizeContent(true);
            alignForms();
            $(window).trigger("page_resize");
}
function resizeBanner(width,fontheight)
{
    var ratio = 800/240;
    var height = width/ratio;
    if (height > 240)
        height = 240;
    var fratio = height/240;



    vars.$banner.css({fontSize:(10*fratio)/fontheight+"em"});
    xHeight(vars.$banner,height);
}
function resizeContent(forcex2)
{
//SPALTEN für frame
    var em = vars.$fontsize.width(),width = vars.$content.width(),cls="colx1";
    if (forcex2 || width >=30*em) //600
        cls="colx2";
    vars.$content.removeClass("colx1 colx2").addClass(cls);
    if (!Modernizr.minmax)
        vars.$shrinkable.shrink();//only for old browsers and ie<=6
    vars.$ratiobox.ratiobox();
    lib.slideshows.resize();
}
function resetForms()
{
$("form.align-form").each(function(container) {
    $(".label",container).css("width","auto");
    $(".align",container).css("width","50%");
    $(".full-line",container).css("width","50%");
    });
}
function alignForms()
{
    $("form.align-form").each(function(container) {
        var $this = $(this),form_width = $this.width()-4,max = 0;
        $(".label", container).each(function(){
            var w = xWidth(this);
            if (w > max)
            max = w;
        });
        $(".label",container).each(function() {
            xWidth(this,max);
        });
        var width = form_width;
        if (width >= 3*max)
            width-=max;
        $(".align",container).each(function() {
            xWidth(this,width);
        });
        $(".full-line",container).each(function() {
            xWidth(this,form_width);
        });
    });
}

//causes an array to be sorted numerically and ascending
function numsort(a, b) {return (a - b);};
var heightWatcher = function(selector,interval,callback)
{
    var plugin = this,
    $elem=$(selector),
    jump = callback,
    timeout = interval,
    curval = -1,
    timer = null;
    plugin.setVal = function()
    {
      curval = xHeight($elem);
      return plugin;
    }
    plugin.start = function()
    {
        if (plugin.timer == null)
        {
            plugin.timer = setInterval(plugin.do,timeout);
            DEBUG && console.log("watcher started");
        }
        return plugin;
    }
    plugin.stop = function()
    {
        if (plugin.timer != null)
        {
            clearInterval(plugin.timer);
            plugin.timer = null;
            DEBUG && console.log("watcher stopped");
        }
        return plugin;
    }
    plugin.do = function()
    {
        var val = xHeight($elem);
        if (curval != val)
        {
          curval = val;
          if(jump !== undefined && typeof jump == 'function') jump();
          DEBUG && console.log("watcher resized to: "+val+"px");
        }
    }
    return plugin;
}
var bannerAnim = function(elem,time)
{
    var plugin = this,
    $elem = elem,
    parts = new Array(),
    current = -1;
    plugin.init = function()
    {
        var e = $elem.find(".wobble");
        e.find(".anim").each(function(){parts.push($(this));});
        if (parts.length)
        {
            current = parts.length -1;
            setTimeout(plugin.anim,time);
        }
    }
    plugin.anim = function()
    {
        parts[current].removeClass("active");
        current = current < parts.length-1?current+1:0;
        parts[current].addClass("active");
        setTimeout(plugin.anim,time);
    }
    plugin.init();
}
return lib;
})(layout||{},olli,jQuery);
