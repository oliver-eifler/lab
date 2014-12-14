/*
 *	jQuery windowResizeFix
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function( $ )
{

	if ( document.windowResizeFixFired )
	{
		return;
	}
	document.windowResizeFixFired = true;

	var $window = $(window);
	window._wWidth = $window.width();
	window._wHeight = $window.height();
	window._oWidth = window._wWidth;
	window._oHeight = window._wHeight;

	$window.bind(
		'resize', {width:_wWidth,height:_wHeight,bWidth:true,bHeight:true},
		function( e )
		{
			var _nWidth = $window.width(),
				_nHeight= $window.height();

			if ( window._wWidth == _nWidth && window._wHeight == _nHeight )
			{
				e.preventDefault();
				e.stopImmediatePropagation();
				return;
			}
            window._oWidth = window._wWidth;
			window._oHeight = window._wHeight;
            window._wWidth = _nWidth;
			window._wHeight = _nHeight;
		}
	);

})( jQuery );