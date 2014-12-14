/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'ollicon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-empty': '&#x61;',
		'icon-empty2': '&#x62;',
		'icon-empty3': '&#x63;',
		'icon-empty4': '&#x64;',
		'icon-empty5': '&#x65;',
		'icon-empty6': '&#x66;',
		'icon-empty7': '&#x67;',
		'icon-empty8': '&#x68;',
		'icon-empty9': '&#x69;',
		'icon-empty10': '&#x6a;',
		'icon-empty11': '&#x6b;',
		'icon-empty12': '&#x6c;',
		'icon-empty13': '&#x6d;',
		'icon-empty14': '&#x6e;',
		'icon-empty15': '&#x6f;',
		'icon-empty16': '&#x70;',
		'icon-empty17': '&#x71;',
		'icon-empty18': '&#x72;',
		'icon-empty19': '&#x73;',
		'icon-empty20': '&#x74;',
		'icon-empty21': '&#x75;',
		'icon-empty22': '&#x76;',
		'icon-empty23': '&#x77;',
		'icon-empty24': '&#x78;',
		'icon-empty25': '&#x79;',
		'icon-empty26': '&#x7a;',
		'icon-menu': '&#xe600;',
		'icon-Invader': '&#xe601;',
		'icon-cool': '&#xe602;',
		'icon-hamburger': '&#x55;',
		'icon-lab': '&#x4c;',
		'icon-search': '&#x53;',
		'icon-twitter': '&#x54;',
		'icon-googleplus': '&#x47;',
		'icon-facebook': '&#x46;',
		'icon-github': '&#x48;',
		'icon-mail': '&#x4d;',
		'icon-logo': '&#x2d;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
