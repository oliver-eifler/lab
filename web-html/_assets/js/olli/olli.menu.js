/**
 * Olli Framework
 * This file is part of the Olli-Framework
 * Copyright (c) 2012-2013 Oliver Jean Eifler
 *
 * @version 0.0.1
 * @link http://www.framework.dd/
 * @author Oliver Jean Eifler <oliver.eifler@gmx.de>
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */
"use strict";
(function (root, factory) {
    var lib = olli_namespace(root),
    module = olli_namespace(lib,"pagemenu");
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define(["dependings"], function (lib) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (module = factory(module,lib,jQuery));
        });
    } else {
        // Browser globals
        module = factory(module,lib,jQuery);
    }
}(this, function (module,olli) {
var vars={
  $menu:null,
  menubar: "<div id='menuopen'><div class='menuopentxt' >Men&uuml;</div><div class='menuopenbtn'><div></div></></div>"
}
lib.init = function()
{
    vars.$body = $('body');
    vars.$banner = $("#banner:first");
    vars.$mobilemenu = $("#navigation:first");
    vars.$mainmenu = $("#mainmenu");
    vars.$submenu = $("#submenu");
    vars.$overlay = $("#overlay");
    lib.build();

}
lib.isOpen = function()
{
    if (vars.$menu == false)
        return false;
    return (vars.$menu.css("display")!= "none");
}
lib.toggle = function()
{
    if (vars.$menu == false)
        return false;
    if (!lib.isOpen())
    {
        vars.$overlay.addClass("menubar-back");
        vars.$overlay.height($(document).height());
        vars.$menu.show();
        vars.$overlay.click(lib.toggle);
    }
    else
    {
        vars.$menu.hide();
        vars.$overlay.click(function(){});
        vars.$overlay.removeClass("menubar-back");
        vars.$overlay.removeAttr("style");
    }
}
lib.open = function(bOpen)
{
    if (vars.$menu == false)
        return false;

    if (bOpen == true && !lib.isOpen())
    {
        vars.$overlay.addClass("menubar-back");
        vars.$overlay.height($(document).height());
        vars.$menu.show();
        vars.$overlay.click(lib.toggle);
    }
    else (bOpen == false && lib.isOpen())
    {
        vars.$menu.hide();
        vars.$overlay.click(function(){});
        vars.$overlay.removeClass("menubar-back");
        vars.$overlay.removeAttr("style");
    }
}
lib.build = function()
{
    if (vars.$menu != null)
        return;
    var menuclose=function()
    {
        lib.open(false);
    }

    vars.$mobilemenu.removeClass("g1 g2 g3 menu").addClass("menubar").insertBefore("#banner");
    var $menubar = $(vars.menubar);
    $menubar.click(lib.toggle);
    vars.$mobilemenu.prepend($menubar);
    $(window).resize(menuclose);
    vars.$menu = vars.$mobilemenu.find("#menu");
    vars.$menu.hide();
    lib.refresh();
}
lib.refresh = function(data)
{
    if (data !== undefined)
        vars.$menu.html(data);

    $list = $("<ul>");
    _c = 0;
    vars.$menu.find(".main").each(function()
    {
        $list.append($("<li>").append($(this).clone()));
        _c++;
    });
    if (_c > 0)
        vars.$mainmenu.html($list); //clear out the current contents
    else
        vars.$mainmenu.html(""); //clear out the current contents

    $list = $("<ul>");
    _c = 0;
    vars.$menu.find(".sub").each(function()
    {
        $list.append($("<li>").append($(this).clone()));
        _c++;
    });
    if (_c > 0)
        vars.$submenu.html($list); //clear out the current contents
    else
        vars.$submenu.html(""); //clear out the current contents
}
lib.mobile = function(bShow)
{
    if (DEBUG)
    {
        vars.$mobilemenu.show()
        vars.$banner.css({marginTop:xHeight(vars.$mobilemenu)});
        if (bShow == true)
        {
            vars.$mainmenu.hide();
            vars.$submenu.hide();
        }
        else
        {
            vars.$mainmenu.show();
            vars.$submenu.show();
        }
        return;
    }

    if (bShow == true)
    {
       vars.$mainmenu.hide();
       vars.$submenu.hide();
       vars.$mobilemenu.show();
       vars.$banner.css({marginTop:xHeight(vars.$mobilemenu)});
    }
    else
    {
       vars.$mobilemenu.hide();
       vars.$mainmenu.show();
       vars.$submenu.show();
       vars.$banner.css({marginTop:0});
    }
}

return lib;
}));