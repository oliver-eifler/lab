/* Olli-Lib
overlay
*/
(function (root, factory) {
    var lib = olli_namespace(root);
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define([], function () {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (lib = factory(lib,jQuery));
        });
    } else {
        // Browser globals
        lib = factory(lib,jQuery);
    }
}(this, function (lib,$) {
    lib.overlay = function(selector,options)
    {
        //options.dummy = true;
        var opt = $.extend({},lib.overlay.options,options);
        if (lib.overlay.obj === null)
            lib.overlay.obj = new overlay(selector,opt);
        return lib.overlay.obj;
    };
    lib.overlay.obj = null;
    lib.overlay.ver="0.0.1";
    lib.overlay.options = {
      delay:300,
      legacy: !(Modernizr.csstransforms), //use $.animate - no transforms
      dummy: !($.Velocity !== undefined && Modernizr.boxsizing)   //to old browsers, dont' use overlay
      };
    lib.disableScroll = function()
    {
      $('body').disablescroll();
       var hm=document.getElementsByTagName("html")[0]||document.body
        ,add=hm.style.marginTop;
        if ($(document).height() > $(window).height()) {
            var scrollTop = ($('body').scrollTop()) ? $('body').scrollTop() : $('html').scrollTop(); // Works for Chrome, Firefox, IE...
            $('html').addClass('noscroll');$('#page').css({'top':-(scrollTop),"padding-top":add});//.css('top',-scrollTop);
        }
    }
    lib.enableScroll = function()
    {
        var scrollTop = parseInt($('#page').css('top'));
        $('#page').css({'top':0,"padding-top":0});
        $('html').removeClass('noscroll');
        $('html,body').scrollTop(-scrollTop);
      $('body').disablescroll("undo");
    }






    var overlay = function(selector,options)
    {
        var plugin = this;
        plugin.vars = {selector:$(selector)};
        plugin.options = options;
        plugin.defaults = {window:null,click:null,closebtn:false,spinner:false,closeon:0xff};
        plugin.flags = {overlay:0x01,window:0x02,button:0x04,esc:0xf0};
        var cur_options = plugin.defaults;
        var open = [];
        var init = function(selector)
        {
            var vars = plugin.vars,options = plugin.options;
            if (options.dummy)
                return;
            //vars.selector = $(selector);
            //Create Overlay
            vars.selector.removeAttr("class");
            var html = "<div class='modal--window'>";
                html+=   "<div class='modal--info'></div>";
                html+=   "<div class='modal--spinner'><svg class='symbol' role='img'><use xlink:href='img/svg/icons.svg#icon-spinner' data-img='img/loader_inv.gif'></use></svg></div>";
                html+=   "<a href='#' title='schliessen' class='modal--close'><svg class='symbol' role='img'><use xlink:href='img/svg/icons.svg#icon-x'></use></svg></a>";
                html+=  "</div>";
            vars.selector.html(html).addClass("modal").css({display:"block",visibility:"hidden"});
            svgfix.fix(vars.selector.get(0));


            vars.window = vars.selector.find(".modal--window").first();
            vars.info = vars.selector.find(".modal--info").first();
            vars.button = vars.selector.find(".modal--close").first();
            vars.spinner = vars.selector.find(".modal--spinner").first();

            vars.window.css({display:"block",visibility:"hidden"});

            vars.selector.on("click.overlay",{target:plugin.flags.overlay},clicked);
            vars.window.on("click.overlay",{target:plugin.flags.window},clicked);
            vars.button.on("click.overlay",{target:plugin.flags.button},clicked);
            $(document).on("keydown.overlay",esckey)


            $(window).on("resize.overlay",olli.debounce(resize,100));

        };
        var esckey=function(e)
        {
            var key = e.keyCode || e.which;
            var shift = e.shiftKey;
            if (key == 27 && (cur_options.closeon & plugin.flags.esc))
            {
                e.stopPropagation();
                e.preventDefault();
                if (cur_options.click !== null && !cur_options.click())
                    return;
                plugin.hidecurrent();
                $(document).trigger("overlay-click");
            }
        }
        var clicked=function(e)
        {
            e.stopPropagation();
            e.preventDefault();
            var target = e.data.target;
            if (!(cur_options.closeon & e.data.target))
                return;
            /*
            if (target == plugin.flags.overlay)
                console.log("clicked on "+target+" (overlay)");
            if (target == plugin.flags.window)
                console.log("clicked on "+target+" (window)");
            if (target == plugin.flags.button)
                console.log("clicked on "+target+" (button)");
            */
            if (cur_options.click !== null && !cur_options.click())
                return;
            plugin.hidecurrent();
            $(document).trigger("overlay-click");
        }
        var add = function(name)
        {
            var vars = plugin.vars,options = plugin.options,delay = options.delay,
            visible = vars.selector.hasClass("visible");
            if (open.indexOf(name)!= -1) //already added
                return;
            addClass(name);
            open.push(name);
            if (visible)
                return;

            vars.selector.addClass("visible");
            //if (!options.legacy)
            olli.disableScroll();
            vars.selector.velocity({ opacity: 1}, { duration:plugin.options.delay,visibility: "visible" });

            //else
            //    vars.selector.css({visibility:"visible",opacity:1});
        };
        var remove = function(name)
        {
            var vars = plugin.vars,options = plugin.options,delay = options.delay,
            visible = vars.selector.hasClass("visible");
            var idx = open.indexOf(name);
            if (idx != -1)
                open.splice(idx,1);


            if (open.length && vars.selector.hasClass("modal-"+name)) //this overlay shown
                removeClass(name);
            if (open.length || !visible)
                return;
            //no more overlays open
            vars.selector.removeClass("visible");
            vars.selector.velocity({ opacity: 0 }, { duration:plugin.options.delay,visibility: "hidden",complete:function(){removeClass(name);} });
            olli.enableScroll();
        };
        var addClass=function(name)
        {
            var vars = plugin.vars;
            if (open.length)
                vars.selector.removeClass("modal-"+open[open.length-1]);
            vars.selector.addClass("modal-"+name);
            setopt(vars.selector.data(name));
        }
        var removeClass=function(name)
        {
            var vars = plugin.vars;
            vars.selector.removeClass("modal-"+name);
            var opt = plugin.defaults;
            if (open.length)
            {
                opt = vars.selector.data(open[open.length-1]);
                vars.selector.addClass("modal-"+open[open.length-1]);
            }
            setopt(opt);
        }
        var setopt=function(options)
        {
            var vars = plugin.vars,
            opt = $.extend({},plugin.defaults,options);

           vars.info.html((opt.window==0) ? "...":opt.window);

            if (opt.closebtn)
                vars.selector.addClass("modal-hasclose");
            else
                vars.selector.removeClass("modal-hasclose");
            if (opt.spinner)
                vars.selector.addClass("modal-hasspinner");
            else
                vars.selector.removeClass("modal-hasspinner");

            cur_options = opt;
            vars.window.move(($(window).width() - vars.window.outerWidth())/2,($(window).height() - vars.window.outerHeight())/2);
            if (opt.window == null)
                vars.window.css({visibility:"hidden"}).removeClass("visible");
            else
                vars.window.css({visibility:"visible"}).addClass("visible");
        }
        var resize=function()
        {
            var vars = plugin.vars,
            visible = vars.selector.hasClass("visible"),
            w_visible = vars.window.hasClass("visible");
            if (w_visible)
            {

                vars.window.move(($(window).width() - vars.window.outerWidth())/2,($(window).height() - vars.window.outerHeight())/2);
            }
        }
        var debug = function()
        {
            console.log(open);
        }
        plugin.show = function(name)
        {
            if (plugin.options.dummy || plugin.vars.selector === undefined)
                return;
            add((name !== undefined && name !="")?name:"default");
        };
        plugin.hide = function(name)
        {
            if (plugin.options.dummy)
                return;
            remove((name !== undefined && name !="")?name:"default");
        };
        plugin.hidecurrent = function()
        {
            if (plugin.options.dummy)
                return;
            if (open.length)
                remove(open[open.length-1]);
        };
        plugin.setOptions = function(name,options)
        {
            if (plugin.options.dummy)
                return;
            var opt = $.extend({},plugin.defaults,options);
            if (opt.window != null && opt.window=="")
                opt.window = null;
            if (opt.closebtn)
            {
                if (opt.window == null)
                    opt.window="HINWEIS";
                opt.closeon|=plugin.flags.button;
            }
            var vars = plugin.vars;
            vars.selector.data((name !== undefined && name !="")?name:"default",opt);
        }
        plugin.hideLoader = function()
        {
            if (plugin.options.dummy)
                $(selector).css({display:"none"});
            else
            {
                $(selector).velocity("fadeOut", { duration: 250,complete:function() {init(selector);}});
            }
        }
        //init(selector);
        return plugin;
    };
 return lib;
 }));

