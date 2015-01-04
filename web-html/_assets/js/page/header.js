/** MODULE (olli.page.header)
* not reuseable
**/

(function (root, factory) {
    var olli = olli_namespace(root),
    module = olli_namespace(olli,"page");
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define(["dependings"], function (lib) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (module = factory(module,olli,jQuery));
        });
    } else {
        // Browser globals
        module = factory(module,olli,jQuery);
    }
}(this, function (lib,olli,$) {

    lib.header = function(element)
    {
        if (element.olliHook === undefined)
            element.olliHook = new header(element);
        return element.olliHook;

    };
    lib.header.ver="0.0.1";
    /* HEADER STUFF */
    var header = function(el)
    {
        var plugin = this,
            _oldzoom = 1.0,
            $header = null,
            $x=$a=$b=$c0=$c1=$d0=$d1=null,
            xw=aw=bw=c0w=c1w=d0w=d1w=0,
            headerWidth = 0,headerHeight = 0,
            minWidth = 0;

        function cacheData()
        {
            xw = rwidth($x[0]),
            aw = rwidth($a[0]),
            bw = rwidth($b[0]),
            c0w = rwidth($c0[0]);c1w = rwidth($c1[0]);
            d0w = rwidth($d0[0]);d1w = rwidth($d1[0]);
            headerHeight = $header.outerHeight();
            if (minWidth == 0)
                minWidth = xw+aw+xw+c1w+d1w;

        }

        plugin.getWidth = function() {return headerWidth;}
        plugin.getHeight = function() {return headerHeight;}

        function init(element)
        {
            $header = $(element);
            $header.attr('olli','true');
            $header.parent().attr('olli','true');
            $x = $('#hcx');
            $a = $('#hc0');
            $b = $('#hc1');
            $c0 = $('#hc2');$c1 = $('#contact');
            $d0 = $('#hc3');$d1 = $('#search');
            $header.removeClass('text-center').addClass("noflow");
            return plugin;

        }
        plugin.resize = function(data)
        {
                var $c = $c0,$d=$d0;
                //Reset
                var zoom=1.0, width = rwidth($header[0],true);
                if (width < minWidth)
                    zoom = Math.round(width/minWidth*100)/100;
                if (_oldzoom != zoom)
                {
                    _oldzoom = zoom;
                    $header.css({fontSize:""+zoom+"em"});
                    data.bFont = true;
                    //width = rwidth($header[0],true);
                }
                headerWidth = width;

                if (!(data.bFont || data.width != data.owidth))
                    return plugin;
                if (data.bFont == true)
                    cacheData();

                var cw = c0w,dw=d0w,
                space = xw,left = 0;

                if (aw + bw + c0w + d0w <= width)
                {
                  //$x.addClass("hidden");
                  //$b.removeClass("hidden").css({'left':aw});
                  olli.hide($x[0]);
                  olli.show($b[0]);
                  $b.css({'left':aw});
                }
                else
                {
                  //$x.removeClass("hidden");
                  //$b.addClass("hidden").css({'left':0});

                  olli.show($x[0]);
                  olli.hide($b[0]);
                  $b.css({'left':0});
                  left = xw;
                }
                //Logo Left
                $x.css({'left:':0});
                $a.css({'left':left});

             if (left+aw+c0w+d0w <=width)
                {
                  olli.hide($d1[0]);$d1/*.addClass("hidden")*/.css({'right':0});
                  olli.show($d0[0]);$d0/*.removeClass("hidden")*/.css({'right':0});
                  $d =$d0;
                  dw = d0w;
                }
                else
                {
                  olli.hide($d0[0]);$d0/*.addClass("hidden")*/.css({'right':0});
                  olli.show($d1[0]);$d1/*.removeClass("hidden")*/.css({'right':0});
                  $d =$d1;
                  dw = d1w;
                }
                if (left+aw+c0w+dw <=width)
                {
                  olli.hide($c1[0]);$c1/*.addClass("hidden")*/.css({'right':0});
                  olli.show($c0[0]);$c0/*.removeClass("hidden")*/.css({'right':dw});
                  $c =$c0;
                  cw = c0w;
                }
                else
                {
                  olli.hide($c0[0]);$c0/*.addClass("hidden")*/.css({'right':0});
                  olli.show($c1[0]);$c1/*.removeClass("hidden")*/.css({'right':dw});
                  $c =$c1;
                  $cx = $c0;
                  cw = c1w;
                }

                return plugin;
            }
            function rwidth(e,down)
            {
               var fx = (down === true) ? Math.floor:Math.ceil,
               rect = e.getBoundingClientRect();
               //return ((typeof rect.width !== "undefined") ? rect.width:(rect.right - rect.left));
               return fx((typeof rect.width !== "undefined") ? rect.width:(rect.right - rect.left));
            }
        return init(el);
        }
return lib;
}));
/*GLOBAL*/
