/**
 *
 * Copyright (c) 2008 Tom Deater (http://www.tomdeater.com)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * uses an iframe, sized in ems, to detect font size changes then trigger a "fontresize" event
 * heavily based on code by Hedger Wang: http://www.hedgerwow.com/360/dhtml/js-onfontresize.html
 *
 * "fontresize" event is triggered on the document object
 * subscribe to event using: $(document).bind("fontresize", function (event, data) {});
 * "data" contains the current size of 1 em unit (in pixels)
 *
 */

jQuery.onFontResize = (function ($) {
	// initialize
	$(document).ready(function () {
		var $resizeframe = $("<iframe />")
			.attr("id", "fontsize")
			.css({width: "1em", height: "1em", overflow:"hidden", visibility:"hidden", position: "absolute", borderWidth: 0, top: "0", left: "0"})
			.appendTo("body");

		if (isEventSupported($resizeframe[0],"resize")) {
			// use IE's native iframe resize event
			$resizeframe.bind("resize", function () {
        		$.onFontResize.trigger({width:$resizeframe[0].offsetWidth,height:$resizeframe[0].offsetHeight});
			});
		} else {
			// everyone else uses script inside the iframe to detect resize
			var doc = $resizeframe[0].contentWindow || $resizeframe[0].contentDocument || $resizeframe[0].document;
			doc = doc.document || doc;
			doc.open();
			doc.write('<div id="em" style="width:1em;height:1em;"></div>');
			doc.write('<scri' + 'pt>window.onload = function(){var em = document.getElementById("em");window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger({width:em.offsetWidth,height:em.offsetHeight});}}};</scri' + 'pt>');
			doc.close();
		}
	});

	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(document).trigger("fontresize", [em]);
		}
	};
}) (jQuery);
        function isEventSupported(el,eventName) {
          eventName = 'on' + eventName;
          var isSupported = (eventName in el);
          if (!isSupported) {
            el.setAttribute(eventName, 'return;');
            isSupported = typeof el[eventName] == 'function';
          }
          el = null;
          return isSupported;
        };
