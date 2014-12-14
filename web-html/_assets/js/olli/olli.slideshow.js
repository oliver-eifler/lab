/**
 * Olli Framework
 * This file is part of the Olli-Framework
 * Copyright (c) 2012-2013 Oliver Jean Eifler
 *
 * version 0.0.1
 * link http://www.framework.dd/
 * author Oliver Jean Eifler <oliver.eifler@gmx.de>
 * license http://www.opensource.org/licenses/mit-license.php MIT License
 */
//var olli = (olli!==undefined)?olli:{};
(function(lib,$) {
lib.slideshow = function(selector,options)
{
    var opt = $.extend({},lib.slideshow.options,options);
    return new slideshow(selector,opt);
}
lib.slideshow.ver="0.0.1";
lib.slideshow.options = {fade: 1000,show: 5000,hpos:"center",autostart:true};

    var slideshow = function(selector,_options) {
      var plugin = this;
      //plugin.options = {fade: 1000,show: 2000,autostart:true};
      plugin.options = _options;
      //constructor
      //option
      plugin.init = function(selector)
      {
          var $this = $(selector);
          var ret = $this.each(function(){
            var elem = $(this);
            var flag = elem.data("flags");
            if (flag === undefined || flag != "add")
              plugin.slideshows.push(new slider($(this),plugin.options));

          })
          plugin.length = plugin.slideshows.length;
          return $this;
      }
      plugin.get = function(id)
      {
          if (typeof(id) === 'number')
              return plugin.slideshows[id];
          else if (typeof(id) === 'string')
          {
              var length = plugin.slideshows.length;
              for (i=0;i<length;i++)
              {
                  var slide = plugin.slideshows[i];
                  if (slide.id == id)
                      return slide;

              }
              return undefined;
          }
      return undefined;
      }
      plugin.clear = function()
      {
          while (plugin.slideshows.length > 0)
          {
              var slide = plugin.slideshows.pop();
              slide.stop();
              slide.$.data("flags","");
              delete slide;
          }
          plugin.length = plugin.slideshows.length;
      }
      plugin.stop = function()
      {
        var length = plugin.slideshows.length;
        for (i=0;i<length;i++)
          plugin.slideshows[i].stop();
      }
      plugin.start = function()
      {
        var length = plugin.slideshows.length;
        for (i=0;i<length;i++)
          plugin.slideshows[i].start();
      }
      plugin.resize = function()
      {
        var length = plugin.slideshows.length;
        for (i=0;i<length;i++)
          plugin.slideshows[i].resize();
      }
      plugin.each = function(f)
      {
      if (typeof(f) !== 'function')
          return;
        var length = plugin.slideshows.length;
        for (i=0;i<length;i++)
          f(plugin.slideshows[i], i);
      };
      plugin.length = 0;
      //Slideshow Internal data & class
      plugin.slideshows = new Array();

      var slider=function(parent,defaults)
      {
          var self = this,$parent = $(parent),
              parentHeight = $parent.innerHeight(),
              options = $.extend({},defaults,$parent.data("slide")),
              images = new Array(),current = 0,
              timeout_id=null,
              timeout2_id=null,
              run = false,
              id = $parent.attr('id');
          if (id===undefined)
              id = "_slideshow"+plugin.slideshows.length;
          this.id = id;
          this.$ = $parent;
          this.options = options;
          $parent.data("flags","add");
          $parent.find("[data-img]").each(function()
          {
            var $e = $(this);
            var src = $e.data("img");
            if (src !== undefined)
            {
              var $img =$("<img/>");
              $img.attr("src",src);//+"?"+new Date().getTime());
              var size = $e.data("size");
              if (size !== undefined)
                 $img.data("size",size);
              $e.replaceWith($img);

            }

          });
          $parent.imagesLoaded().progress( check ).always( loaded );
        function getOriginalImgSize(img_element)
        {
            var t = new Image();
            t.src = (img_element.getAttribute ? img_element.getAttribute("src") : false) || img_element.src;
            return ({width:t.width,height:t.height});
        }
         function check(loader,image)
          {
            $img = $(image.img);
            if (!image.isLoaded)
                $img.remove();
            else
            {
                var size = $img.data("size");
                if (size === undefined)
                    $img.data("size",getOriginalImgSize($img[0]));
                lib.autoSize($img);
            }

          }
          function loaded()
          {
            $parent.find("img").each(function(index)
            {
                var $this = $(this);
                var $thumb = $("#"+self.id+"_"+index);
                if ($thumb.length > 0)
                    $this.data("thumb",$thumb.get(0));

                if ($this.hasClass('first') || $this.hasClass('active'))
                {
                    $this.css({"opacity":1,"display":"block","z-index":2}).removeClass('first');
                    self.showThumb($this,true);
                }
                else
                {
                    $this.css({"opacity":0,"display":"block","z-index":1});
                    self.showThumb($this,false);
                }
                lib.autoSize($this);
                images.push($this);
            });
            if (images.length > 1 && options.autostart === true)
            {
                run = true;
                timeout_id=setTimeout(function(){self.cycle();},options.show+options.fade);
            }
          }
          this.showThumb = function(elem,set)
          {
            var thumb = elem.data("thumb");
            if (thumb!==undefined)
            {
                if (set)
                    $(thumb).addClass('active');
                else
                    $(thumb).removeClass('active');
            }
          };
          this.cycle=function()
          {
              timeout_id=null;
              timeout2_id=null;
              if (run !== true)
                  return;

              var $active = images[current];//$parent.find('img.active:first');
              var $next = images[current < images.length-1?current+1:0];//($active.next().length > 0) ? $active.next() : $parent.find('img:first');
  			  /*
              $active.animate({opacity:0.0,top:0,left:0,bottom:0,right:0},{duration:options.fade/2,easing:"linear"});
              $next.animate({opacity:1.0,top:0,left:0,bottom:0,right:0},{duration:options.fade,easing:"linear",complete:function(){
                  $next.css({"opacity":1.0,'z-index':2});//.addClass('active');//move the next image up the pile
                  self.showThumb($next,true);
                  $active.css({"opacity":0.0,'z-index':1});//.removeClass('active');
                  self.showThumb($active,false);
                  current = current < images.length-1?current+1:0;
                  timeout_id=setTimeout(function(){self.cycle();},options.show);
                  }});
              */
              $active.animate({opacity:0.0,top:0,left:0,bottom:0,right:0},{duration:options.fade,easing:"linear"});
              $next.animate({opacity:1.0,top:0,left:0,bottom:0,right:0},{duration:options.fade,easing:"linear",complete:function(){
                  $next.css({"opacity":1.0,'z-index':2});//.addClass('active');//move the next image up the pile
                  $active.css({"opacity":0.0,'z-index':1});//.removeClass('active');
                  current = current < images.length-1?current+1:0;
                  timeout_id=setTimeout(function(){self.cycle();},options.show);
                  }});
                  timeout2_id=setTimeout(function(){self.showThumb($next,true);self.showThumb($active,false);},options.fade/2);
          }
          this.running = function() {return run;}
          this.start = function()
          {
              if (run === true)
                  return;
              run = true;
              if(images.length > 1)
                self.cycle();
              return self;
          }
          this.stop = function()
          {
              run = false;
              clearTimeout(timeout_id);
              clearTimeout(timeout2_id);
              var $active = images[current];//$parent.find('img.active:first');
              var $next = images[current < images.length-1?current+1:0];//($active.next().length > 0) ? $active.next() : $parent.find('img:first');
              $active.clearQueue().finish();
              $next.clearQueue().finish();
              return self;
          }
          this.resize = function()
          {
            console.log("hallo"+self);
            parentHeight = $parent.innerHeight();
            olli.autoSize($parent,{hpos:self.options.hpos,vpos:"none"});
            $parent.find("img").each(function()
            {
                lib.autoSize(this);
            });
          }
      };
      if (selector !== undefined)
          plugin.init(selector);
    }
})(olli,jQuery);