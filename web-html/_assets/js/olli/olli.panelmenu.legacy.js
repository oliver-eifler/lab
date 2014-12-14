/* Olli-Lib
panel-Menu
*/
var olli = olli||{};
(function(lib,$) {
    lib.panelmenu = function(selector,page)
    {
        var options = {delay:300,
                        legacy: false, //use $.animate - no transforms
                        dummy: false   //to old browsers, use css menu only
                      }

        var obj = new menu_legacy(selector,page,options);
        return obj;
    };

    var menu_legacy = function(selector,page,options)
    {
        var plugin = this;
        var space = 3;
        plugin.vars = {};
        plugin.options = options;
        curLevel = 0;
        curMenu = null;
        plugin.toggleMenu = function()
        {
            var vars = plugin.vars;
            var visible = vars.selector.hasClass('visible');
            var pinned = vars.selector.hasClass('pinned');
            if (pinned)
                return;
            plugin.showMenu(!visible);
        };
        plugin.togglePin = function()
        {
            var vars = plugin.vars;
            var visible = vars.selector.hasClass('visible');
            var pinned = vars.selector.hasClass('pinned');
            plugin.pinMenu(!pinned);
        };
        plugin.showMenu = function(bShow)
        {
            var vars = plugin.vars;
            if (bShow)
                vars.selector.addClass('visible');
            else
                vars.selector.removeClass('visible');
            resize(true);
        };
        plugin.pinMenu = function(bPin)
        {
            var vars = plugin.vars;
            if (bPin)
                vars.selector.addClass('visible pinned');
            else
                vars.selector.removeClass('visible pinned');

            resize();
        };
        plugin.resize = function()
        {
            resize();
        };

        var init = function(selector,page)
        {
            var vars = plugin.vars;
            vars.selector = $(selector);
            vars.page = $(page);
            vars.caption = vars.selector.find('.caption');
            vars.menu = vars.selector.find('.menu');
            vars.scroller = vars.selector.find('.scroller');
            vars.scroller.css({"margin-top":space,"margin-bottom":space});
            vars.wrapper  = vars.selector.find('.wrapper');
            //vars.scroller.perfectScrollbar({suppressScrollX: true});
            vars.scroll_x = vars.selector.find('.ps-scrollbar-x-rail');
            vars.scroll_y = vars.selector.find('.ps-scrollbar-y-rail');
            curMenu = vars.menu;
            initSidebar();
        }
        init(selector,page);
        return plugin;

        function adjustWrapper(h)
        {
            var vars = plugin.vars;
            if (h==0)
            {
                vars.scroll_y.css({"visibility":"hidden"});
                h=vars.scroller.outerHeight()-4;//.css("height");//height-(vars.caption.outerHeight()-8);
                vars.wrapper.css({"height":h});
                vars.scroller.scrollTop(0);
            }
            else
            {
                vars.wrapper.css({"height":h});
                vars.scroller.scrollTop(0);
                vars.scroller.perfectScrollbar('update');
                vars.scroll_y.css({"visibility":"visible"});
                //vars.scroll_y.css({"display":"inherit"});
            }
        };
        function next(event)
        {
            event.preventDefault();
            var level = curLevel+1;
            curMenu = event.data.menu;
            event.data.menu.css({"visibility":"visible"});
            adjustWrapper(0);
            //event.data.main.offset({left:event.data.main.width()*level});
            event.data.main.animate({left:""+(level*100)+"%"},plugin.options.delay,"linear",function()
            {
                adjustWrapper(curMenu.height());
            });
            curLevel = level;
        };
        function prev(event)
        {
            event.preventDefault();
            var level = curLevel-1;
            curMenu = event.data.menu.parent().closest('ul');
            adjustWrapper(0);
            event.data.main.animate({left:""+(level*100)+"%"},plugin.options.delay,"linear",function()
            {
                event.data.menu.css({"visibility":"hidden"});
                adjustWrapper(curMenu.height());
            });
            curLevel = level;
        };
      function resize(bAnimate)
      {
        var vars = plugin.vars;
        var visible = vars.selector.hasClass('visible');
        var pinned = vars.selector.hasClass('pinned');
        var height = $(window).height()-20;
        if (visible)
        {
            vars.scroller.css("height",height-vars.caption.outerHeight()-(2*space));
            adjustWrapper(curMenu.height());
        }
        else
            height = vars.caption.outerHeight();

        if (bAnimate !== undefined && bAnimate == true)
            vars.selector.animate({height:height},plugin.options.delay,"linear");
        else
            vars.selector.css("height",height);

        if (pinned)
            vars.page.css('padding-left',vars.selector.width());
        else
            vars.page.css('padding-left',0);

      }
      function initSidebar()
      {
          var vars = plugin.vars;
          vars.open = false;
          vars.selector.removeClass('menubar').addClass('sidebar sidebar-legacy');
          resize();
          vars.caption.off('click.menu');
          vars.caption.on('click.menu', function(e) {
              e.preventDefault();
              plugin.toggleMenu();
          });

            vars.selector.find('a').each(function(){
                var $elem = $(this),$parent = $elem.parent();
                $elem.off('click.menu');
                if ($elem.hasClass('next')) //open submenu
                {
                  var $sub = $parent.find('.submenu');
                  $elem.on('click.menu',{main:vars.menu,menu:$sub},next);
                }
                else if ($elem.hasClass("prev")) //close submenu
                {
                  var $sub = $parent.parent();
                  $elem.on('click.menu',{main:vars.menu,menu:$sub},prev);
                }
                else
                  $elem.on('click.menu',plugin.toggleMenu);
            });
      };
    };

 })(olli,jQuery);

