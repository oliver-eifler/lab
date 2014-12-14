/* Olli-Lib
panel-Menu
*/
var olli = olli||{};
(function(lib,$) {
    lib.panelmenu = function(selector,page)
    {
        var options = {delay:300,
                        legacy: !($.velocity !== undefined && Modernizr.csstransforms), //use $.animate - no transforms
                        sysScroll: (document.documentMode !== undefined),
                        dummy: !Modernizr.generatedcontent   //to old browsers, use css menu only
                      }
        //options.dummy = true;
        var obj = new menu(selector,page,options);
        return obj;
    };

    var menu = function(selector,page,options)
    {
        var plugin = this;
        plugin.vars = {};
        plugin.options = options;
        curLevel = 0;
        curMenu = null;

        plugin.toggleMenu = function()
        {
            if (plugin.options.dummy==true)
                return;

            var vars = plugin.vars;
            var visible = vars.selector.hasClass('visible');
            var pinned = vars.selector.hasClass('pinned');
            if (pinned)
                return;
            plugin.showMenu(!visible);
        };
        plugin.togglePin = function()
        {
            if (plugin.options.dummy==true)
                return;

            var vars = plugin.vars;
            var visible = vars.selector.hasClass('visible');
            var pinned = vars.selector.hasClass('pinned');
            plugin.pinMenu(!pinned);
        };
        plugin.showMenu = function(bShow)
        {
            if (plugin.options.dummy==true)
                return;
            var vars = plugin.vars;
            if (bShow)
                vars.selector.addClass('visible');
            else
                vars.selector.removeClass('visible');
            resize(true);
        };
        plugin.pinMenu = function(bPin)
        {
            if (plugin.options.dummy==true)
                return;
            var vars = plugin.vars;
            if (bPin)
                vars.selector.addClass('visible pinned');
            else
                vars.selector.removeClass('visible pinned');

            resize();
        };
        plugin.resize = function()
        {
            if (plugin.options.dummy==true)
                resize_dummy();
            else
                resize();
        };

        var init = function(selector,page)
        {
            var vars = plugin.vars,options = plugin.options;
            vars.selector = $(selector);
            vars.page = $(page);
            vars.caption = vars.selector.find('.caption');
            vars.menu = vars.selector.find('.menu');
            vars.scroller = vars.selector.find('.scroller');
            vars.wrapper  = vars.selector.find('.wrapper');
            vars.overlay = $('#overlay');
            //if (options.legacy == false )
            if (options.dummy == false)
            {
                vars.wrapper.removeClass('ddmenu');
                vars.scroller.perfectScrollbar({suppressScrollX: true});
            }
            vars.scroll_x = vars.selector.find('.ps-scrollbar-x-rail');
            vars.scroll_y = vars.selector.find('.ps-scrollbar-y-rail');
            curMenu = vars.menu;

            vars.selector.bind('mousewheel.menu', function (e) {
              e.preventDefault();
            });

            initSidebar();
        };

        //if (plugin.options.dummy==false)
            init(selector,page);
        return plugin;

        function adjustWrapper(h)
        {
            var vars = plugin.vars,options = plugin.options;
            if (h==0)
            {
               h=vars.scroller.outerHeight()-4;//.css("height");//height-(vars.caption.outerHeight()-8);
               //if (options.legacy == false)
               {
                    vars.scroll_y.css({"visibility":"hidden"});
               }
               vars.wrapper.css({"height":h});
               vars.scroller.scrollTop(0);
            }
            else
            {
                vars.wrapper.css({"height":h});
                vars.scroller.scrollTop(0);
                //if (options.legacy == false)
                {
                    vars.scroller.perfectScrollbar('update');
                    vars.scroll_y.css({"visibility":"visible"});
                }
                //vars.scroll_y.css({"display":"inherit"});
            }
        };
        function next(event)
        {
            $(this).removeClass("over");
            event.preventDefault();
            var level = curLevel+1,options = plugin.options;
            curMenu = event.data.menu;
            if (options.legacy == false)
            {
              event.data.main.velocity({translateX: [""+level*100+"%",""+curLevel*100+"%"]},
              {
                  duration:plugin.options.delay,
                  easing: "linear",
                  begin:function(){event.data.menu.css({'z-index':'1','opacity':'1'});adjustWrapper(0);},
                  complete:function(){adjustWrapper(curMenu.height());}
              }
              );
            }
            else
            {
              event.data.menu.css({"visibility":"visible"});
              event.data.main.css({"left":""+(level*100)+"%"});
              adjustWrapper(curMenu.height());
            }
            curLevel = level;
        };
        function prev(event)
        {
            $(this).removeClass("over");
            event.preventDefault();
            var level = curLevel-1,options = plugin.options;
            curMenu = event.data.menu.parent().closest('ul');
            if (options.legacy == false)
            {
              event.data.main.velocity({translateX: [""+level*100+"%",""+curLevel*100+"%"]},
              {
                  duration:plugin.options.delay,
                  easing: "linear",
                  begin:function(){adjustWrapper(0);},
                  complete:function(){event.data.menu.css({'z-index':'0','opacity':'0'});adjustWrapper(curMenu.height());}
              });
            }
            else
            {
                //adjustWrapper(0);
                event.data.main.css({"left":""+(level*100)+"%"});
                event.data.menu.css({"visibility":"hidden"});
                adjustWrapper(curMenu.height());
            }
            curLevel = level;
        };
        function toggle(event)
        {
            $(this).removeClass("over");
            plugin.toggleMenu();
        };
      function resize_dummy()
      {
        var vars = plugin.vars,options = plugin.options,
        height = vars.selector.height();
        vars.page.css('padding-top',vars.selector.height());
      }
      function resize(bAnimate)
      {
        var vars = plugin.vars,options = plugin.options;
        var visible = vars.selector.hasClass('visible');
        var pinned = vars.selector.hasClass('pinned');
        var height = $(window).height();
        var caption_height = parseInt(vars.caption.css("height"),10);
        var space = parseInt(vars.scroller.css("margin-top"),10)+parseInt(vars.scroller.css("margin-bottom"),10);
        if (options.sysScroll)
        {
            //normalize
            vars.selector.css({"width":"auto"});
            vars.wrapper.css({"width":"auto"});
            vars.scroller.css({"width":"auto"});
            var width = vars.menu.width();
            vars.selector.width(width);
            vars.wrapper.width(width);
            vars.scroller.width(width+olli.getScrollbarSize().v);
        }
        if (visible)
        {
            vars.scroller.css("height",height-caption_height-space);
            adjustWrapper(curMenu.height());
        }
        else
            height = caption_height;

        if (options.legacy)
            bAnimate = false;

        if (bAnimate !== undefined && bAnimate == true)
        {
            vars.selector.velocity({height:height},{duration:plugin.options.delay,easing:"linear"});
        }
        else
            vars.selector.css("height",height);

        if (pinned)
            vars.page.css('padding-left',vars.selector.width());
        else
            vars.page.css('padding-left',0);

        overlay(bAnimate,visible,pinned)
      }
      function overlay(bAnimate,visible,pinned)
      {
        var vars = plugin.vars,options = plugin.options;
        var show = vars.overlay.hasClass("show");
        var bShow = false;
        var delay = plugin.options.delay;
        if (options.legacy)
            bAnimate = false;

        if (pinned)
            bShow = false;
        else if (visible)
            bShow = true;

        if (visible && show)
        {
            vars.overlay.css({"width":$(document).width(),"height":$(document).height()});
            return;
        }
        if (bShow == show)
            return;
        vars.overlay.off('click.menu');
        if (bShow)
        {
            vars.overlay.addClass("show");
            vars.overlay.css({"width":$(document).width(),"height":$(document).height()});
            if (bAnimate)
                vars.overlay.velocity({ opacity: [.5,0] }, { duration:plugin.options.delay,display: "block" });
            else
                vars.overlay.css({"display":"block","opacity":.5});
            vars.overlay.on('click.menu',toggle);
        }
        else
        {
            vars.overlay.removeClass("show");
            if (bAnimate)
                vars.overlay.velocity({ opacity: [0,.5] }, { duration:plugin.options.delay,display: "none" });
            else
                vars.overlay.css({display:"none",opacity:0});
        }


      }
      function jumpTo($elem)
      {
        var menu = $elem.closest('ul');
        var $f = $elem.parentsUntil( $( "ul.menu" ), "ul.submenu" );
        var level = $f.length;
        var vars = plugin.vars,options = plugin.options;
        if (options.legacy == false)
        {
              $f.css({'z-index':'1','opacity':'1'});

              vars.menu.velocity({translateX: [""+level*100+"%","0%"]},
              {
                  duration:0,
                  easing: "linear",
                  complete:function(){adjustWrapper(menu.height());}
              }
              );
         }
         else
         {
              $f.css({"visibility":"visible"});
              vars.menu.animate({left:""+(level*100)+"%"},0,"linear",function()
              {
                  adjustWrapper(menu.height());
              });
          }
          curLevel = level;
          curMenu = menu;
      }
      function initSidebar()
      {
          var vars = plugin.vars,options = plugin.options;
          vars.open = false;

          if (options.dummy == true)
          {
               vars.selector.addClass('visible pinned');
               resize_dummy();
               return;
          }

          if (options.legacy == false)
            vars.selector.removeClass('menubar').addClass('sidebar sidebar-modern');
          else
            vars.selector.removeClass('menubar').addClass('sidebar sidebar-legacy');

          if (options.sysScroll == true)
            vars.scroller.css({"overflow-y":"scroll"});

          resize();
          jumpTo(vars.selector.find('.cur'));

          vars.caption.off('click.menu');
          vars.caption.on('click.menu', function(e) {
              e.preventDefault();
              plugin.toggleMenu();
          });

            vars.selector.find('button').each(function(){
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
                    $elem.on('click.menu',toggle);
                $elem.off('mouseenter.menu');
                $elem.off('mouseleave.menu');
                $elem.on('mouseenter.menu',function() {$(this).addClass("over");});
                $elem.on('mouseleave.menu',function() {$(this).removeClass("over");});


            });
            vars.selector.find('a').each(function(){
                var $elem = $(this);
                $elem.off('click.menu');
                $elem.on('click.menu',toggle);
                $elem.off('mouseenter.menu');
                $elem.off('mouseleave.menu');
                $elem.on('mouseenter.menu',function() {$(this).addClass("over");});
                $elem.on('mouseleave.menu',function() {$(this).removeClass("over");});
            });
      };
    };

 })(olli,jQuery);

