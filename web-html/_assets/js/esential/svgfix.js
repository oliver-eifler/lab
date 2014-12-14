var svgfix = svgfix||{};
(function(lib) {
    var doc,uses,requestAnimationFrame,CACHE,LTEIE8,IE9TO11;
	function embed(svg, g) {
		if (g) {
			var
			viewBox = g.getAttribute('viewBox'),
			fragment = doc.createDocumentFragment(),
			clone = g.cloneNode(true);

			if (viewBox) {
				svg.setAttribute('viewBox', viewBox);
			}

			while (clone.childNodes.length) {
				fragment.appendChild(clone.childNodes[0]);
			}

			svg.appendChild(fragment);
		}
	}

	function onload() {
		var xhr = this, x = doc.createElement('x'), s = xhr.s;

		x.innerHTML = xhr.responseText;
		xhr.onload = function () {
			s.splice(0).map(function (array) {
				embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
			});
		};

		xhr.onload();
	}
	function onframe() {
		var use;

		while ((use = uses[0])) {
			if (LTEIE8) {
				var
				img = new Image();
                var src  = use.getAttribute("data-img");
                if (src != null && src != "")
                    img.src = src;
                else
				    img.src = use.getAttribute('xlink:href').replace('#', '.').replace(/^\./, '') + '.png';
                var parent = use.parentNode;
                /*clone attributes
                var attr  = parent.getAttribute("class");
                if (attr != null && attr != "")
                    img.setAttribute("class",attr);
                attr  = parent.getAttribute("style");
                if (attr != null && attr != "")
                    img.setAttribute("style",attr);
                */
                if (parent.className !="")
                    img.className = parent.className;

    			parent.parentNode.replaceChild(img, parent);
				//use.parentNode.replaceChild(img, use);
                //parent.innerHTML = parent.innerHTML.replace(/svg/g, 'div');
			} else {
				var
				svg = use.parentNode,
				url = use.getAttribute('xlink:href').split('#'),
				url_root = url[0],
				url_hash = url[1];

				svg.removeChild(use);

				if (url_root.length) {
					var xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

					if (!xhr.s) {
						xhr.s = [];

						xhr.open('GET', url_root);

						xhr.onload = onload;

						xhr.send();
					}

					xhr.s.push([svg, url_hash]);

					if (xhr.readyState === 4) {
						xhr.onload();
					}

				} else {
					embed(svg, doc.getElementById(url_hash));
				}
			}
		}

		requestAnimationFrame(onframe);
	}
    function fixpage()
    {
	    document.createElement('svg');
        document.createElement('use');

        doc =                   document;
	    uses =                  document.getElementsByTagName('use');
	    requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
	    CACHE =                 {},
	    /*/MSIE\s[1-8]\b/.test(navigator.userAgent),*/
        LTEIE8 =                !Modernizr.inlinesvg;
	    /* /Trident\/[567]\b/.test(navigator.userAgent),*/
        IE9TO11 =               /Trident\/[567]\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537;

	    if (LTEIE8 || IE9TO11) {
		    onframe();
	    }
    }
    lib.fix = function(element)
    {
        uses = element.getElementsByTagName('use');
	    if (LTEIE8 || IE9TO11) {
		    onframe();
	    }
    }
    lib.fixPage = fixpage;
    //fixpage();

})(svgfix);
