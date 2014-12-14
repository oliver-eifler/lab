/* Olli-Lib
scroller
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
    lib.scroller = function(selector,options)
    {
        //options.dummy = true;
        var opt = $.extend({},lib.scroller.options,options);
        var $elem = $(selector);
        var obj = $elem.data("olli-scroller");
        if (obj === undefined)
            obj=new scroller(selector,opt);
        return obj;
    };
    lib.scroller.ver="0.0.1";
    lib.scroller.options = {
      legacy: !(Modernizr.csstransforms), //use $.animate - no transforms
      dummy: !($.Velocity !== undefined && Modernizr.boxsizing),   //to old browsers, dont' use customscrollbar
      theme: "ocs-white",
      wrapper: null //null - create wrapper else wrapper=$(wrapper);
      };
    var scroller = function(selector,options)
    {
        var plugin = this;
        plugin.vars = {};
        plugin.options = options;
        var enabledY = true;
        var data = {};
        plugin.update = function()
        {
         if (plugin.options.dummy)
                return;
         recalc();
         update();
        }
        plugin.enable = function()
        {
         if (plugin.options.dummy)
                return;
         enableY(true);
        }
        plugin.disable = function()
        {
         if (plugin.options.dummy)
                return;
         enableY(false);
        }
        var init = function(selector)
        {
            var vars = plugin.vars,options = plugin.options;
            if (options.dummy)
                return;
            vars.selector = $(selector);
            vars.selector.addClass("ocs-container "+options.theme).css("overflow","hidden").scrollTop(0);
            if (options.wrapper == null)
            {
                var html = "<div class='ocs-content'>"+vars.selector.html()+"</div>";
                vars.selector.html(html);
                vars.content = vars.selector.find('.ocs-content');
            }
            else
            {
                vars.content = $(options.wrapper);
            }
            vars.scrollbarY = $("<div class='ocs-scrollbarY'></div>").appendTo(vars.selector);
            vars.thumbY = $("<div class='ocs-scrollthumbY'></div>").appendTo(vars.scrollbarY);
            recalc();
            update();

            vars.selector.on("scroll.scroller",function(e) {

                data.posY = plugin.vars.selector.scrollTop();
                update();
            });
            bindUpDown();
            bindDragY();
            bindMouseWheel();
            bindTouch();

        };
        var bindMouseWheel = function() {
            var vars = plugin.vars,options = plugin.options;
            var mousewheel = function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (!isVisibleY())
                    return
                scrollYDelta(-(e.deltaY*e.deltaFactor));
            };
            vars.selector.on("mousewheel.scroller",mousewheel);
        };
        var bindDragY = function () {
            var vars = plugin.vars,options = plugin.options;
            var currentPageY;

            var mousedown = function (e) {
                currentPageY = e.pageY;
                vars.scrollbarY.addClass('in-scrolling');
                $(document).on('mousemove.scroller',mousemove);
                $(document).on('mouseup.scroller',mouseup);

                e.stopPropagation();
                e.preventDefault();
            };
            var mousemove=function (e) {
                if (vars.scrollbarY.hasClass('in-scrolling')) {
                    dragY(e.pageY - currentPageY);
                    currentPageY = e.pageY;
                    e.stopPropagation();
                    e.preventDefault();
                }
            };
            var mouseup=function (e) {
                $(document).off('mousemove.scroller');
                $(document).off('mouseup.scroller');
                if (vars.scrollbarY.hasClass('in-scrolling')) {
                    vars.scrollbarY.removeClass('in-scrolling');
                }
            };
        currentPageY = null;
        vars.thumbY.on('mousedown.scroller',mousedown);

      };
      var bindUpDown = function() {
        var vars = plugin.vars,options = plugin.options;
        var click = function(event)
        {
            event.preventDefault();
            var offset = $(this).offset(),
                pos = {x:event.pageX - offset.left,y:event.pageY - offset.top},
                top = data.thumbPosY,
                bot = top+data.thumbSizeY;
            if (pos.y <= top)
                page_up();
            else if (pos.y >= bot)
                page_down();
        };
        vars.scrollbarY.on("click.scroller",click);
      };
      var bindTouch = function() {
        var vars = plugin.vars,options = plugin.options,
        touched=false,moved = false,
        lastX = null,lastY = null;
        var touchStart=function(event) {
                event.preventDefault();
                var e = vars.selector;
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var data = { element: e, x: touch.pageX, y: touch.pageY, scrollX: 0, scrollY: e.scrollTop(),target: event.target };
                $(event.target).addClass('touch');
                touched = true;
                moved = false;
                vars.selector.bind("touchend", data, touchEnd);
                vars.selector.bind("touchmove", data,touchMove);
            };
        var touchMove = function(event) {
                event.preventDefault();
                var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
                var delta = {x: (touch.pageX - event.data.x), y: (touch.pageY - event.data.y) };
                if (moved || Math.abs(delta.x) > 10 || Math.abs(delta.y) > 10)
                {
                    if (touched)
                        $(event.data.target).removeClass('touch');
                    if (isVisibleY())
                    {
                        scrollY(event.data.scrollY - delta.y);
                    }
                    touched = false;
                    moved = true;
                    lastX = touch.pageX;
                    lastY = touch.pageY;
                }
            };
        var touchEnd=function(event) {
                vars.selector.unbind("touchmove", touchMove);
                vars.selector.unbind("touchend", touchEnd);
                var $elem = $(event.data.target);
                if (touched)
                {
                    $elem.removeClass('touch');
                    touched = false;
                    $elem.trigger('click');
                }
            };

        vars.selector.on("touchstart", touchStart);

        }
        var page_up=function(e)
        {
                var deltaY = data.height*0.5;
                scrollYDelta(-deltaY);
        }
        var page_down=function(e)
        {
                var deltaY = data.height*0.5;
                scrollYDelta(deltaY);
        }
        var dragY = function(deltaY)
        {
            var vars = plugin.vars,options = plugin.options;
            if (options.dummy)
                return;
            scrollYDelta(deltaY/data.ratio);
        }
        var scrollY = function(pos)
        {
            var vars = plugin.vars,options = plugin.options;
            if (pos < 0)
                pos = 0;
            if (pos + data.height > data.areaheight)
                pos = data.areaheight-data.height;
            if (pos != data.posY)
                vars.selector.scrollTop(pos);
        }
        var scrollYDelta = function(delta)
        {
            var vars = plugin.vars,options = plugin.options;
            var toppos=data.posY,
                pos = toppos+delta;
            if (pos < 0)
                pos = 0;
            if (pos + data.height > data.areaheight)
                pos = data.areaheight-data.height;
            if (pos != toppos)
                vars.selector.scrollTop(pos);
        }
        var update = function()
        {
            var vars = plugin.vars,options = plugin.options;
            if (options.dummy || !enabledY)
                return;
            var toppos = data.posY;
            if (toppos + data.height > data.areaheight)
            {
                toppos = data.areaheight-data.height;
                vars.selector.scrollTop(toppos);
                return;
            }
            showY(data.ratio!=1);
            data.thumbPosY = Math.round(data.posY + (data.posY*data.ratio));
            if (data.thumbPosY < 0)
                data.thumbPosY = 0;
            if (data.thumbPosY+data.thumbSizeY > toppos + data.height)
                data.thumbPosY = toppos + data.height - data.thumbSizeY;

            if (!options.legacy)
                $.Velocity.hook(vars.thumbY, "translateY", ""+data.thumbPosY+"px"); // Must provide unit type
            else
                vars.thumbY.css({top:data.thumbPosY});
        }
        var recalc = function()
        {
            var vars = plugin.vars,options = plugin.options;
            data.height = vars.selector.innerHeight(),
            data.areaheight = Math.max(data.height,vars.content.innerHeight()),
            data.ratio = Math.min(data.height/data.areaheight,1);
            data.posY = vars.selector.scrollTop();
            data.thumbPosY = Math.round(data.posY + (data.posY*data.ratio));
            data.thumbSizeY = Math.round(data.height*data.ratio);
            if (data.thumbSizeY < 16)
               data.thumbSizeY = 16;
            vars.scrollbarY.css({top:0,height:data.areaheight});
            vars.thumbY.css({height:data.thumbSizeY});

        }
        var isVisibleY = function()
        {
            var vars = plugin.vars,options = plugin.options;
            return vars.scrollbarY.css("display")!="none";
        }
        var showY = function(bShow)
        {
            var vars = plugin.vars,options = plugin.options;
            if (options.dummy)
                return;
            if (isVisibleY == bShow)
                return;
            if (bShow)
                vars.scrollbarY.css({display:"block"});
            else
                vars.scrollbarY.css({display:"none"});

        }
        var enableY = function(bEnable)
        {
            var vars = plugin.vars,options = plugin.options;
            if (options.dummy)
                return;
            if (bEnable == enabledY)
                return;
            enabledY = bEnable;
            if (enabledY)
                recalc();
            update();
        }
        init(selector);
        return plugin;
    };
 return lib;
 }));

