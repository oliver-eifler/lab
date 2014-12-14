/* Olli-Lib
panel-Menu
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
    lib.panelmenu = function(selector,options)
    {
        //options.dummy = true;
        var opt = $.extend({},lib.panelmenu.options,options);
        var obj = new menu(selector,opt);
        return obj;
    };
    lib.panelmenu.ver="0.0.1";
    lib.panelmenu.options = {
      delay:300,
      legacy: !(Modernizr.csstransforms), //use absolute position - no transforms
      dummy: !($.Velocity !== undefined && Modernizr.boxsizing),   //to old browsers, use css menu only
      page: null,
      searchBar: null,
      searchFunc: null
      };


    var menu = function(selector,options)
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
            hideSearch();
            if (bShow)
                vars.selector.addClass('visible');
            else
                vars.selector.removeClass('visible');
            resize(true);
        };
        plugin.hideMenu = function()
        {
            hideMenu();
        }
        plugin.pinMenu = function(bPin)
        {
            if (plugin.options.dummy==true)
                return;
            var vars = plugin.vars;
            hideSearch();
            if (bPin)
                vars.selector.addClass('visible pinned');
            else
                vars.selector.removeClass('visible pinned');

            resize();
        };
        plugin.resize = function(bPin)
        {
            if (plugin.options.dummy==true)
                resize_dummy();
            else
            {
                var vars = plugin.vars;
                var pinned = vars.selector.hasClass('pinned');
                if (bPin !== undefined && bPin != pinned)
                {
                    if (bPin)
                        vars.selector.addClass('visible pinned');
                    else
                        vars.selector.removeClass('visible pinned');
                }
                resize();
                resizeSearch();
            }
        };
        plugin.toggleSearch = function()
        {
            if (plugin.options.dummy==true)
                return;

            var vars = plugin.vars;
            var visible = vars.search.hasClass('visible');
            plugin.showSearch(!visible);
        };
        plugin.showSearch = function(bShow)
        {
            if (plugin.options.dummy==true)
                return;
            var vars = plugin.vars;
            hideMenu();
            if (bShow)
                vars.search.addClass('visible');
            else
                vars.search.removeClass('visible');
            resizeSearch(true);
        }
        var init = function(selector)
        {
            var vars = plugin.vars,options = plugin.options;
            vars.selector = $(selector);
            vars.page = $(options.page);
            vars.caption = $("#menubtn");
            vars.menu = vars.selector.find('.menu');
            vars.scroller = vars.selector.find('.scroller');
            vars.wrapper  = vars.selector.find('.wrapper');
            vars.overlay = $('#overlay');
            //if (options.legacy == false )
            if (options.dummy == false)
            {
                vars.wrapper.removeClass('ddmenu');
            }
            curMenu = vars.menu;
            vars.search = $(options.searchBar);
            vars.searchform = vars.search.find("form");
            vars.searchbtn = vars.search.find("button[type='submit']");
            vars.searchtxt = vars.search.find("input[type!='hidden']" ).filter(":first");

            initSidebar();
        };

        //if (plugin.options.dummy==false)
            init(selector);
        return plugin;
        function hideMenu()
        {
            var vars = plugin.vars;
            var bMenu = vars.selector.hasClass('visible') && !vars.selector.hasClass('pinned');
            if (bMenu)
            {
                    vars.selector.removeClass('visible');
                    resize(true);
            }
        }
        function hideSearch()
        {
            var vars = plugin.vars;
            var bSearch = vars.search.hasClass('visible');
            if (bSearch)
            {
                    vars.search.removeClass('visible');
                    resizeSearch(true);
            }
        }
        function adjustWrapper(h)
        {
            var vars = plugin.vars,options = plugin.options;
            var _h=Math.max(h,vars.scroller.innerHeight());
            vars.wrapper.css({"height":_h});
            vars.scrollbar.update();
            vars.scroller.scrollTop(0);
        };
        function next(event)
        {
            $(this).removeClass("over");
            event.preventDefault();
            event.stopPropagation();
            var level = curLevel+1,options = plugin.options;
            curMenu = event.data.menu;
            var v_options = {
                  duration:plugin.options.delay,
                  easing: "linear",
                  begin:function(){event.data.menu.css({"visibility":"visible"});adjustWrapper(0);},
                  complete:function(){adjustWrapper(curMenu.height());focusFirst(curMenu);}
              };
            var v_anim = {translateX: [""+level*100+"%",""+curLevel*100+"%"]};
            if (options.legacy)
                v_anim = {left: [""+level*100+"%",""+curLevel*100+"%"]};

            event.data.main.velocity(v_anim,v_options);
            curLevel = level;
        };
        function prev(event)
        {
            $(this).removeClass("over");
            event.preventDefault();
            event.stopPropagation();
            var level = curLevel-1,options = plugin.options;
            curMenu = event.data.menu.parent().closest('ul');
            var v_options=  {
                  duration:plugin.options.delay,
                  easing: "linear",
                  begin:function(){adjustWrapper(0);},
                  complete:function(){event.data.menu.css({"visibility":"hidden"});adjustWrapper(curMenu.height());focusFirst(curMenu);}
            }
            var v_anim = {translateX: [""+level*100+"%",""+curLevel*100+"%"]};
            if (options.legacy)
               v_anim = {left: [""+level*100+"%",""+curLevel*100+"%"]};

            event.data.main.velocity(v_anim,v_options);
            curLevel = level;
        };
        function toggle(event)
        {
            $(this).removeClass("over");
            plugin.toggleMenu();
        };
      function resize_dummy()
      {
        var vars = plugin.vars,options = plugin.options;
      }
      function resize(bAnimate)
      {
        var vars = plugin.vars,options = plugin.options;
        var visible = vars.selector.hasClass('visible');
        var pinned = vars.selector.hasClass('pinned');
        var height = $(window).height()-vars.selector.position().top;
        var caption_height = vars.caption.outerHeight();//parseInt(vars.caption.css("height"),10);
        var space = parseInt(vars.scroller.css("margin-top"),10)+parseInt(vars.scroller.css("margin-bottom"),10);
        vars.selector.css({"padding-top":caption_height});
        var pos = 0;

        var d = 0;
        if (bAnimate !== undefined && bAnimate == true)
            d = plugin.options.delay;
        var v_anim,v_options;
        if (visible)
        {
            vars.scroller.css("height",height-caption_height-space);
            adjustWrapper(curMenu.height());
            v_options = {
                  visibility: "visible",
                  duration:d,
                  easing:"linear",
                  complete:update_caption
            };
        }
        else
        {
            height = 0;
            pos = "-100%";
            if (options.legacy)
                pos= "-"+ vars.selector.width()+"px";
            v_options = {
                  visibility: "hidden",
                  duration:d,
                  easing:"linear",
                  begin:update_caption
            };
        }
        if (!options.legacy)
            v_anim = {translateX:pos};
        else
            v_anim = {left:pos};
        vars.selector.velocity(v_anim,v_options);
        if (pinned)
            vars.page.css({'left':vars.selector.width(),"width":$(window).width()-vars.selector.width()});
        else
            vars.page.css({'left':0,"width":$(window).width()-0});

        if (options.overlay != null)
        {
            if (visible && !pinned)
                options.overlay.show("menu");
            else
                options.overlay.hide("menu");
        }

      }
      function update_caption()
      {
        var vars = plugin.vars,options = plugin.options;
        var visible = vars.selector.hasClass('visible');
        var pinned = vars.selector.hasClass('pinned');
        if (visible)
        {
            vars.caption.addClass("visible").css({"width":vars.selector.width()});
        }
        else
        {
            vars.caption.removeClass("visible").css({"width":"auto"});
        }
        if (pinned)
            vars.caption.addClass("pinned");
        else
            vars.caption.removeClass("pinned");
      }
      function resizeSearch(bAnimate)
      {
        var vars = plugin.vars,options = plugin.options;
        var visible = vars.search.hasClass('visible');
        var width = 0;
        var right=4;
        var bAnim =(bAnimate!==undefined?bAnimate:false)
        if (visible)
        {
            width = $(window).width()-vars.caption.outerWidth();
            right = 4+vars.searchbtn.outerWidth()+4;
            vars.searchtxt.removeAttr('disabled').focus();
        }
        else
        {
            width = vars.searchbtn.outerWidth();
            vars.searchtxt.attr('disabled', 'disabled').blur();
        }
        if (bAnim)
            vars.search.velocity({width:width},{duration:plugin.options.delay,complete:function(){vars.searchtxt.css({"padding-right":right});}});
        else
        {
            vars.search.css({"width":width});
            vars.searchtxt.css({"padding-right":right});
        }
      }
      function jumpTo($elem)
      {
        if (!$elem.length)
            return;
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
          $(".HolyGrail-body").removeClass("HolyGrail-body");
          $(".HolyGrail-content").removeClass("HolyGrail-content");
          $(".HolyGrail-nav").removeClass("HolyGrail-nav");
          $(".HolyGrail-ads").removeClass("HolyGrail-ads");





          if (options.legacy == false)
            vars.selector.removeClass('sidebar-ns').addClass('sidebar-modern nofocus');
          else
            vars.selector.removeClass('sidebar-ns').addClass('sidebar-legacy nofocus');

          vars.caption.css({"display":"inline-block"});
          vars.scrollbar = olli.scroller(vars.scroller,{wrapper:vars.wrapper,theme:"ocs-black"});
          //adjustWrapper();
          resize();

          vars.search.removeClass('searchbar').addClass('searchbar-modern');
          vars.searchform.removeClass('sitesearch');
          resizeSearch();

          jumpTo(vars.selector.find('.cur'));
          $(document).off('click.menu');
          $(document).on('click.menu', function (e) {
            var bSearch = vars.search.hasClass('visible');
                if (bSearch && $(e.target).closest(vars.search).length === 0) {
                    hideSearch();
            }
          });
          vars.caption.off('click.menu');
          vars.caption.on('click.menu', function(e) {
              e.preventDefault();
              plugin.toggleMenu();
          });
          vars.searchbtn.off('click.menu')
          vars.searchbtn.on('click.menu', function(e) {
             var bStop = true;
             if(vars.search.hasClass('visible'))
                options.searchFunc(vars.searchform);
              plugin.toggleSearch();
             if (bStop)
             {
                e.preventDefault();
                e.stopPropagation();
             }

          });
         vars.selector.find('button').each(function(){
                var $elem = $(this),$parent = $elem.parent();
                $elem.off('click.menu');
                if ($elem.hasClass('next')) //open submenu
                {
                  var $sub = $parent.find('.submenu').first();
                  $elem.on('click.menu',{main:vars.menu,menu:$sub},next);
                }
                else if ($elem.hasClass("prev")) //close submenu
                {
                  var $sub = $parent.parent();
                  $elem.on('click.menu',{main:vars.menu,menu:$sub},prev);
                }
                else
                    $elem.on('click.menu',toggle);
            });
            vars.selector.find('a').each(function(){
                var $elem = $(this);
                $elem.off('click.menu');
                $elem.on('click.menu',toggle);
            });
          vars.selector.on("keydown",function(e) {
            var key = e.keyCode || e.which;
            var shift = e.shiftKey;
            var stop = false;
            if (key==9)
            {
                if (shift)
                    stop=focusPrev();
                else
                {
                    stop=focusNext();
                }
                if (stop)
                {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
          });
          vars.caption.on("keydown",function(e) {
            var vars = plugin.vars,options = plugin.options;
            var visible = vars.selector.hasClass('visible');
            var key = e.keyCode || e.which;
            var shift = e.shiftKey;
            if (visible && !shift && key==9)
            {
                focusFirst(curMenu);
                e.preventDefault();
                e.stopPropagation();
            }
          });
      };
      function focusFirst($elem)
      {
        var $e=$('>:first-child',$('>:first-child',$elem));
        if ($e.length)
            $e.focus();
      };
      function focusNext()
      {
        var vars = plugin.vars,options = plugin.options;
        var visible = vars.selector.hasClass('visible');
        var pinned = vars.selector.hasClass('pinned');
        var $focus=vars.selector.find(':focus');
        if (!$focus.length)
            return false;
        var $li = $focus.parent().next();
        if (!$li.length)
        {
            if (!pinned)
                plugin.showMenu(false);
            vars.page.find('input,textarea,select,button,a').filter(':visible:first').focus();
            return true;
        }
        var $e=$('>:first-child',$li);
        $("#debug").text($e.text());
        $e.focus();
        return true;
      };
      function focusPrev()
      {
        var vars = plugin.vars,options = plugin.options;
        var visible = vars.selector.hasClass('visible');
        var pinned = vars.selector.hasClass('pinned');
        var $focus=vars.selector.find(':focus');
        if (!$focus.length)
            return false;
        var $li = $focus.parent().prev();
        if (!$li.length)
        {
            vars.caption.focus();
            return true;
        }
        var $e=$('>:first-child',$li);
        $("#debug").text($e.text());
        $e.focus();
        return true;
      };

    };
 return lib;
 }));

