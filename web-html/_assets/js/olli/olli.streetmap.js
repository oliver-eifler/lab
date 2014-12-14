/**
 * Olli Framework
 * This file is part of the Olli-Framework
 * Copyright (c) 2012-2013 Oliver Jean Eifler
 *
 * @version 0.0.1
 * @link http://www.framework.dd/
 * @author Oliver Jean Eifler <oliver.eifler@gmx.de>
 * @license http://www.opensource.org/licenses/mit-license.php MIT License

 * asyncload & init jquery geo for streetmap display
 **/
olli.streetmap = {};
(function(lib,$) {
lib.load = function(callback)
{
//async load $.geo if not available
    var js = php.pathJS+"/extra/jquery.geo.js";
    if ($.geo !== undefined)
    {
        if(callback !== undefined && typeof callback == 'function')
            callback();
        return;
    }
    $.ajax({url:js,dataType:"script",cache:true,
            success:function(data){
                DEBUG && console.log(js+" loaded");
                if(callback !== undefined && typeof callback == 'function')
                    callback();
            }
    });
},
lib.init = function(selector,options)
{
    var $element = $(selector);
    options.services= [
          {
            "class": "basemap street",
            type: "tiled",
            src: function( view ) {
              return "http://otile" + ((view.index % 4) + 1) + ".mqcdn.com/tiles/1.0.0/osm/" + view.zoom + "/" + view.tile.column + "/" + view.tile.row + ".jpg";
            },
            attr: "Tiles Courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>"
          }
        ];
    $element.geomap(options);
    $element.geomap("append", { type: "Point", coordinates: options.center }, {width:'0',height:'0', color: '#000' }, "<div class='pin'></div>" );
}
})(olli.streetmap,jQuery);