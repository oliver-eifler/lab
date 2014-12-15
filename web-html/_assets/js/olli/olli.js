/**
 * Olli Framework
 * This file is part of the Olli-Framework
 * Copyright (c) 2012-2013 Oliver Jean Eifler
 *
 * @version 0.0.2
 * @link http://www.framework.dd/
 * @author Oliver Jean Eifler <oliver.eifler@gmx.de>
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 *
 * Utilitie functions used by all olli plugins ;)

 */
function olli_namespace( ns, ns_string ) {
   if (ns_string===undefined)
        ns_string = "olli";

    var parts = ns_string.split('.'),
        parent = ns,
        pl, i,name=(typeof ns.namespace==='string')?ns.namespace+".":"";

    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        name = name + (!i?"":".")+parts[i];
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {namespace:name};
        }

        parent = parent[parts[i]];
    }

    return parent;
}
/* expand some javascript objects with utilitie functions*/
  String.prototype._isBlank = function() {
    return (this.length === 0 || !/[^\s]+/.test(this));
  };


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
//public
lib.ver = "0.2.0";
lib.vars = lib.vars||{};
//private
var vars = {};
$.fn.shrink = function( options ) {
	return $(this).each(function(){ lib.shrink(this,options); });
};
lib.shrink = function(element,options)
{
    var $e=$(element),$p = $e.parent(),size_e = lib.getSize($e),size_p=lib.getSize($p);
    var ratio=0,owidth = $e.attr('width'),oheight = $e.attr('height');
    //ratio = owidth/oheight;
    //get sizes
    //size = $e.data("size");
    var max_width = owidth;//(size !== undefined?size.width:$e.css("max-width"));
    if (max_width !== undefined)
        max_width = parseInt(max_width);

    var width = size_p.width - size_e.xspace;
    if (max_width !== undefined && width > max_width)
        width = max_width;
    $e.css({"width":width,"height":(ratio==0)?"auto":width/ratio});
    return $e;
}
$.fn.ratiobox = function( options ) {
	return $(this).each(function(){ lib.ratiobox(this,options); });
};
lib.ratiobox = function(element,options)
{
    var $e=$(element),$p = $e.parent(),size_e = lib.getSize($e),size_p=lib.getSize($p),
    options = $.extend({},{ratio:1},$e.data("ratio")),
    width = size_p.width - size_e.xspace,
    height = width/options.ratio;
    $e.css({"width":parseInt(width),"height":parseInt(height)});
    return $e;
}
lib.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };
lib.getSize = function(elem)
{
    var $e=$(elem),size = {width:0,height:0,xspace:0,yspace:0};
    size.width=$e.width();
    size.height=$e.height();
    size.xspace = $e.outerWidth()-size.width;
    size.yspace = $e.outerHeight()-size.height;
    return size;
};
lib.autoSize = function(elem,opts)
{
    var $e = $(elem),$p = $e.parent(),size_e = olli.getSize($e),size_p=olli.getSize($p),
    s={width:0,height:0,mleft:0,mtop:0,mright:0,mbottom:0},ratio = 1,
    options = $.extend({},{hpos:"center",vpos:"middle"},$e.data("pos"),opts),
    size = $e.data("size");
    if (size === undefined)
        return false;
    size_p.width-=size_e.xspace;
    size_p.height-=size_e.yspace;

    if (size.width !== undefined && size.height === undefined) //only width
    {
        s.width = size_p.width;
        if (s.width > size.width)
            s.width = size.width;
        $e.css({"width":s.width,"height":"auto"});
        s.width = $e.width();
        s.height = $e.height();
        var css = lib.position(options.hpos,options.vpos,s.width,s.height,size_p.width,size_p.height);
        $e.css(css);
        /*
        if (s.width < size_p.width && options.hcenter)
        {
            s.mleft = ((size_p.width-s.width)/2)|0;
            s.mright = size_p.width-s.width-s.mleft;
        }
        if (s.height < size_p.height && options.vcenter)
        {
            s.mtop = ((size_p.height-s.height)/2)|0;
            s.mbottom = size_p.height-s.height-s.m_top;
        }
        $e.css({"marginLeft":s.mleft,"marginTop":s.mtop});
        */
        return true;
    }
    else if (size.height !== undefined && size.width === undefined) //only height
    {
        s.height = size_p.height;
        if (s.height > size.height)
            s.height = size.height;
        $e.css({"height":s.height,"width":"auto"});
        s.width = $e.width();
        s.height = $e.height();
        var css = lib.position(options.hpos,options.vpos,s.width,s.height,size_p.width,size_p.height);
        $e.css(css);
        /*
        if (s.width < size_p.width && options.hcenter)
        {
            s.mleft = ((size_p.width-s.width)/2)|0;
            s.mright = size_p.width-s.width-s.mleft;
        }
        if (s.height < size_p.height && options.vcenter)
        {
            s.mtop = ((size_p.height-s.height)/2)|0;
            s.mbottom = size_p.height-s.height-s.m_top;
        }
        $e.css({"marginLeft":s.mleft,"marginTop":s.mtop});
        */
        return true;
    }
    else //width & height
    {
        //var _s = calculateAspectRatioFit(size.width,size.height,size_p.width,size_p.height);
        var _s = lib.scale("BEST_FIT_DOWN",size.width,size.height,size_p.width,size_p.height);
        s.width = _s.width;
        s.height = _s.height;
        var css = lib.position(options.hpos,options.vpos,s.width,s.height,size_p.width,size_p.height);
        css.width = s.width;
        css.height = s.height;
        $e.css(css);
        /*
        if (s.width < size_p.width && options.hcenter)
        {
            s.mleft = ((size_p.width-s.width)/2);
            s.mright = size_p.width-s.width-s.mleft;
        }
        if (s.height < size_p.height && options.vcenter)
        {
            s.mtop = ((size_p.height-s.height)/2);
            s.mbottom = size_p.height-s.height-s.m_top;
        }
        $e.css({"width":s.width,"height":s.height,"marginLeft":s.mleft,"marginTop":s.mtop});
        */
        return true;

    }
    return false;
};
lib.position = function(hpos,vpos, width, height, pWidth, pHeight) {
var css = {};
    switch(hpos.toLowerCase())
    {
        case "right":
            css.marginLeft = pWidth-width;
            css.marginRight = 0;
        break;
        case "center":
            var size = pWidth-width;
            css.marginLeft = parseInt(size/2);
            css.marginRight = size-css.marginLeft;
        break;
        case "left":
            css.marginLeft = 0;
            css.marginRight = 0;
        break;
    }
    switch(vpos.toLowerCase())
    {
        case "bottom":
            css.marginTop = pHeight-height;
            css.marginBottom = 0;
        break;
        case "center":
        case "middle":
            var size = pHeight-height;
            css.marginTop = parseInt(size/2);
            css.marginBottom = size-css.marginTop;
        break;
        case "top":
            css.marginTop = 0;
            css.marginBottom = 0;
        break;
    }
    return css;
}
lib.scale = function(scale, sourceWidth, sourceHeight, destWidth, destHeight) {
      var scaleX,
          scaleY,
          result;

      // Fast path
      result = {width: destWidth, height: destHeight };
      if (scale == "FILL") return result;

      // Determine the appropriate scale
      scaleX = destWidth / sourceWidth;
      scaleY = destHeight / sourceHeight;

      switch (scale) {
        case "BEST_FILL":
          scale = scaleX > scaleY ? scaleX : scaleY;
          break;
        case "BEST_FIT":
          scale = scaleX < scaleY ? scaleX : scaleY;
          break;

        case "NONE":
          scale = 1.0;
          break;
        //case this.BEST_FIT_DOWN_ONLY:
        default:
          if ((sourceWidth > destWidth) || (sourceHeight > destHeight)) {
            scale = scaleX < scaleY ? scaleX : scaleY;
          } else {
            scale = 1.0;
          }
          break;
      }

      sourceWidth *= scale;
      sourceHeight *= scale;
      result.width = Math.round(sourceWidth);
      result.height = Math.round(sourceHeight);
    return result;
};
lib.getScrollbarSize = function()
{
    if (lib.getScrollbarSize.szScroll === undefined)
        lib.getScrollbarSize.szScroll = _getSBSize(window);
    return lib.getScrollbarSize.szScroll;
    function _getSBSize(w)
    {
        var d = w.document, b = d.body, r = {h:16,v:16}, t;
        if (b)
        {
            t = d.createElement('div');
            t.style.cssText = 'position:absolute;overflow:scroll;top:-100px;left:-100px;width:100px;height:100px;';
            b.insertBefore(t, b.firstChild);
            r = {h:t.offsetHeight - t.clientHeight, v:t.offsetWidth - t.clientWidth};
            b.removeChild(t);
        }
        return r;
    };
};
lib.getScrollbarVisible = function()
{
    return _getSBLive(window);
    function _getSBLive(w)
    {
        var d = w.document, c = d.compatMode;
        r = c && /CSS/.test(c) ? d.documentElement : d.body;
        if (typeof w.innerWidth == 'number')
        {
            return {h:w.innerHeight > r.clientHeight, v:w.innerWidth > r.clientWidth };
        }
        else
        {
            return {h:r.scrollWidth > r.clientWidth, v:r.scrollHeight > r.clientHeight };
        }
    };
};
  lib.clientWidth = function(sbAlways)
  {
    var v=0,d=document,w=window,sz = lib.getScrollbarSize();
    if((!d.compatMode || d.compatMode == 'CSS1Compat') && !w.opera && d.documentElement && d.documentElement.clientWidth)
        {v=d.documentElement.clientWidth;}
    else if(d.body && d.body.clientWidth)
        {v=d.body.clientWidth;}
    else if(xDef(w.innerWidth,w.innerHeight,d.height))
    {
        v=w.innerWidth;
        if(d.height>w.innerHeight) v-=sz.v;
    }
    if (sbAlways === true)
    {
        var s = lib.getScrollbarVisible();
        if (!s.v)
            v -= sz.v;
    }
    return v;
  };
  lib.clientHeight = function(sbAlways)
{
  var v=0,d=document,w=window,sz = lib.getScrollbarSize();
  if((!d.compatMode || d.compatMode == 'CSS1Compat') /* && !w.opera */ && d.documentElement && d.documentElement.clientHeight)
    {v=d.documentElement.clientHeight;}
  else if(d.body && d.body.clientHeight)
    {v=d.body.clientHeight;}
  else if(xDef(w.innerWidth,w.innerHeight,d.width)) {
    v=w.innerHeight;
    if(d.width>w.innerWidth) v-=sz.h;
  }
    if (sbAlways === true)
    {
        var s = lib.getScrollbarVisible();
        if (!s.h)
            v -= sz.h;
    }
  return v;
}








  lib.initThumbs_old=function(selector)
  {
    $(selector).find("img").each(function()
    {
      var img = this;
      var par = $(this).parent()[0];
      $(this).imagesLoaded().done(function() {
        lib.prepareMouseOverImage(img,par);
        });
    });
  }
  lib.prepareMouseOverImage=function(image,parent)
  {
    // Save the original Image URL
    image.mouseOverImage=image.src;
    // Create the grayscale image
    image.normalImage=image.src+"?filter=sepia";
    // Override the old handler (otherwise the onmouse over event handler will call it again).
    //image.onload=function(){return true;};
    //parent = image.parentNode||image.parentElement;
    // Assign onmouseover and onmouseout event handlers
    if (parent)
    {
        parent.onmouseover=function()
        {
            image.src=image.mouseOverImage;
        }
        parent.onmouseout=function()
        {
            image.src=image.normalImage;
        }
    }
    // Set the grayscale as the "normal" state image
    image.src=image.normalImage;
  }
  lib.initThumbs=function(selector)
  {
    $(selector).find("img").each(function()
    {
      var $img=$(this);
      $(this).imagesLoaded().done(function() {
            makeThumbOver($img);
        });
    });
    function makeThumbOver($image)
    {
        var src = $image.attr("src")+"?filter=sepia",
        $overimage = $("<img/>")
        .attr("width",$image.attr("width"))
        .attr("height",$image.attr("height"))
        .attr("src",$image.attr("src")+"?filter=sepia").addClass("over");
        $overimage.imagesLoaded().done(function() {
            $image.parent().append($overimage);
            });
    }
  }
/* resize fix */
	    var $window = $(window);
	    lib._curWidth = $window.width();
	    lib._curHeight = $window.height();
	    lib._oldWidth = lib._curWidth;
	    lib._oldHeight = lib._curHeight;

        $window.off('resize.olli');
	    $window.on('resize.olli',
		function( e )
		{
			var _nWidth = $window.width(),
				_nHeight= $window.height();

			if ( lib._curWidth == _nWidth && lib._curHeight == _nHeight )
			{
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
			}
	        lib._oldWidth = lib._curWidth;
	        lib._oldHeight = lib._curHeight;
	        lib._curWidth = _nWidth;
	        lib._curHeight = _nHeight;
		}
	);

return lib;
}));
