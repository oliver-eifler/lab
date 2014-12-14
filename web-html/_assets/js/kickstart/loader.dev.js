/* loader for $ LAB
   env:development
*/
if (typeof DEBUG === 'undefined') DEBUG = true;
;(function( window, document, undefined ) {

    function xAddEventListener(e,eT,eL,cap)
    {
        if(!e)return;
        eT=eT.toLowerCase();
        if(e.addEventListener)e.addEventListener(eT,eL,cap||false);
        else if(e.attachEvent)e.attachEvent('on'+eT,eL);
        else {
        var o=e['on'+eT];
        e['on'+eT]=typeof o=='function' ? function(v){o(v);eL(v);} : eL;
        }
    }
    function loaded()
    {
      var docElement = document.documentElement;
          /*>>cssclasses*/
      // Remove "no-js" class from <html> element, if it exists:
      docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                              // Add the new classes to the <html> element.
                              (' js deactivated');
      /*>>cssclasses*/
      $bu=$buo({test:true});
    }



  if ($LAB && 'JSON' in window && 'parse' in JSON && 'stringify' in JSON) /*check to old browsers*/
  { //load and run all the javascript stuff
   $LAB
    .script((!Array.prototype.indexOf) ? "_assets/js/extra/es5-shim.js":null).wait(function(){console.log("es5-shim loaded")})
    .script("_assets/js/esential/modernizr-custom.js").wait(function(){console.log("modernizr loaded")})
    .script("_assets/js/esential/modernizr.olli.js")
    .script("_assets/js/esential/svgfix.js")
    //JQUERY STUFF
    .script("_assets/js/jquery/jquery-1.11.1.js").wait()
    .script("_assets/js/jquery/jquery.velocity.js")
    .script("_assets/js/jquery/jquery.mousewheel.js")
    .script("_assets/js/jquery/jquery.disablescroll.js")
    .script("_assets/js/jquery/jquery.onfontresize.js").wait()
    //OLLI STUFF
    .script("_assets/js/olli/olli.js").wait()
    .script("_assets/js/olli/olli.move.js")
    .script("_assets/js/olli/olli.overlay.js")
    .script("_assets/js/olli/olli.scroller.js")
    .script("_assets/js/olli/olli.panelmenu.js")
    //PAGE STUFF
    .script("_assets/js/layout.js").wait(function(){layout.init();});
  }
  else
  {
        xAddEventListener(window, 'load', loaded, false);
  }
})(this, this.document);