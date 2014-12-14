/** MODULE (Page)
* final page rendering
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

    lib.ver = '0.0.1';
    lib.vars = lib.vars||{};
    //PRIVAT
    var header = null;

    lib.init = function()
    {
        $(document).ready(onReady);
    }
    function onReady()
    {
        header = new olli.page.header();
        header.init();
        resize();
        WebFont.load({
            custom: {
                families: ['ollicon','roboto_condensed','droid_serif:n4,n7,i4,i7']
            },
            fontactive: function(familyName, fvd) {console.log("font: "+familyName+":"+fvd+" loaded..");onFontResize();}
        });
        $(window).on("resize",onWinResize);
        $(document).on("fontresize",onFontResize);
    }
    function onFontResize()
    {
        resize({bFont:true});
    }
    function onWinResize()
    {
        resize({bFont:false});
    }
    function resize(options)
    {
        var opt = $.extend({},{bFont:true,width:olli._curWidth,height:olli._curHeight,owidth:olli._oldWidth,oheight:olli._oldHeight},options);
        header.resize(opt);
        //resize content
        var content = $('main').innerHeight(),
        page = olli._curHeight - $('header').outerHeight() - $('footer').outerHeight();
        $('#content').css({'minHeight':page});

    }

return lib;
}));
/*GLOBAL*/
