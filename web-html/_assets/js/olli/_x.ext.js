function xHasClass(e, c)
{
  e = xGetElementById(e);
  if (!e || e.className=='') return false;
  var re = new RegExp("(^|\\s)"+c+"(\\s|$)");
  return re.test(e.className);
}
function xAddClass(e, c)
{
  if ((e=xGetElementById(e))!=null) {
    var s = '';
    if (e.className.length && e.className.charAt(e.className.length - 1) != ' ') {
      s = ' ';
    }
    if (!xHasClass(e, c)) {
      e.className += s + c;
      return true;
    }
  }
  return false;
}
function xRemoveClass(e, c)
{
  if(!(e=xGetElementById(e))) return false;
  e.className = e.className.replace(new RegExp("(^|\\s)"+c+"(\\s|$)",'g'),
    function(str, p1, p2) { return (p1 == ' ' && p2 == ' ') ? ' ' : ''; }
  );
  return true;
}

function xOpacity(e, o)
{
  var set = xDef(o);
  if(!(e=xGetElementById(e))) return 2; // error
  if (xStr(e.style.opacity)) { // CSS3
    if (set) e.style.opacity = o + '';
    else o = parseFloat(e.style.opacity);
  }
  else if (xStr(e.style.filter)) { // IE5.5+
    if (set) e.style.filter = 'alpha(opacity=' + (100 * o) + ')';
    else if (e.filters && e.filters.alpha) { o = e.filters.alpha.opacity / 100; }
  }
  else if (xStr(e.style.MozOpacity)) { // Gecko before CSS3 support
    if (set) e.style.MozOpacity = o + '';
    else o = parseFloat(e.style.MozOpacity);
  }
  else if (xStr(e.style.KhtmlOpacity)) { // Konquerer and Safari
    if (set) e.style.KhtmlOpacity = o + '';
    else o = parseFloat(e.style.KhtmlOpacity);
  }
  return isNaN(o) ? 1 : o; // if NaN, should this return an error instead of 1?
}
function xParent(e, s)
{
  e = xGetElementById(e);
  if (e) {
    e = e.parentNode;
    if (s) {
      while (e && e.nodeName.toLowerCase() != s) e = e.parentNode;
    }
  }
  return e;
}
function xDocSize()
{
  var b=document.body, e=document.documentElement;
  var esw=0, eow=0, bsw=0, bow=0, esh=0, eoh=0, bsh=0, boh=0;
  if (e) {
    esw = e.scrollWidth;
    eow = e.offsetWidth;
    esh = e.scrollHeight;
    eoh = e.offsetHeight;
  }
  if (b) {
    bsw = b.scrollWidth;
    bow = b.offsetWidth;
    bsh = b.scrollHeight;
    boh = b.offsetHeight;
  }
  return {w:Math.max(esw,eow,bsw,bow),h:Math.max(esh,eoh,bsh,boh)};
}
function xDisplay(e,s)
{
  if ((e=xGetElementById(e)) && e.style && xDef(e.style.display)) {
    if (xStr(s)) {
      try { e.style.display = s; }
      catch (ex) { e.style.display = ''; } // Will this make IE use a default value
    }                                      // appropriate for the element?
    return e.style.display;
  }
  return null;
}
function xScrollTop(e, bWin)
{
  var w, offset=0;
  if (!xDef(e) || bWin || e == document || e.tagName.toLowerCase() == 'html' || e.tagName.toLowerCase() == 'body') {
    w = window;
    if (bWin && e) w = e;
    if(w.document.documentElement && w.document.documentElement.scrollTop) offset=w.document.documentElement.scrollTop;
    else if(w.document.body && xDef(w.document.body.scrollTop)) offset=w.document.body.scrollTop;
  }
  else {
    e = xGetElementById(e);
    if (e && xNum(e.scrollTop)) offset = e.scrollTop;
  }
  return offset;
}
function xScrollTo(e, bWin,offset)
{
  var w;
  if (!xDef(e) || bWin || e == document || e.tagName.toLowerCase() == 'html' || e.tagName.toLowerCase() == 'body') {
    w = window;
    if (bWin && e) w = e;
    if(w.document.documentElement && w.document.documentElement.scrollTop) w.document.documentElement.scrollTop = offset;
    else if(w.document.body && xDef(w.document.body.scrollTop)) w.document.body.scrollTop = offset;
  }
  else {
    e = xGetElementById(e);
    if (e && xNum(e.scrollTop)) e.scrollTop=offset;
  }
  return offset;
}
function xGetElementsByClassName(c,p,t,f)
{
  var r=[], re, e, i, l;
  re = new RegExp("(^|\\s)"+c+"(\\s|$)");
//  var e = p.getElementsByTagName(t);
  e = xGetElementsByTagName(t,p); // See xml comments.
  for (i=0, l=e.length; i<l; ++i) {
    if (re.test(e[i].className)) {
      r[r.length] = e[i];
      if (f) f(e[i]);
    }
  }
  return r;
}
// xGetElementsByTagName r5, Copyright 2002-2007 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL
function xGetElementsByTagName(t,p)
{
  var list = null;
  t = t || '*';
  p = xGetElementById(p) || document;
  if (typeof p.getElementsByTagName != 'undefined') { // DOM1
    list = p.getElementsByTagName(t);
    if (t=='*' && (!list || !list.length)) list = p.all; // IE5 '*' bug
  }
  else { // IE4 object model
    if (t=='*') list = p.all;
    else if (p.all && p.all.tags) list = p.all.tags(t);
  }
  return list || [];
}
function xFirstChild(e,t)
{
  e = xGetElementById(e);
  var c = e ? e.firstChild : null;
  while (c) {
    if (c.nodeType == 1 && (!t || c.nodeName.toLowerCase() == t.toLowerCase())){break;}
    c = c.nextSibling;
  }
  return c;
}

function xIterate(idPrefix, start, data, fn)
{
  var i = start, e = xGetElementById(idPrefix + i);
  while (e) {
    fn(e, data);
    e = xGetElementById(idPrefix + (++i));
  }
}
var xCookie = {
  get: function(name) {
    var c = document.cookie.match(new RegExp('(^|;)\\s*' + name + '=([^;\\s]*)'));
    return ((c && c.length >= 3) ? unescape(c[2]) : null);
  },
  set: function(name, value, days, path, domain, secure) {
    if (days) {
      var d = new Date();
      d.setTime(d.getTime() + (days * 8.64e7)); // now + days in milliseconds
    }
    document.cookie = name + '=' + escape(value) +
      (days ? ('; expires=' + d.toGMTString()) : '') +
      '; path=' + (path || '/') +
      (domain ? ('; domain=' + domain) : '') +
      (secure ? '; secure' : '');
  },
  del: function(name, path, domain) {
    this.set(name, '', -1, path, domain); // sets expiry to now - 1 day
  }
};
// xHttpRequest r11, Copyright 2006-2011 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL
function xHttpRequest() // object prototype
{
  // Private Properties
  var
    _i = this, // instance object
    _r = null, // XMLHttpRequest object
    _t = null, // timer
    _f = null, // callback function
    _x = false, // XML response pending
    _o = null, // user data object passed to _f
    _c = false; // self-clean after send() completed?
  // Public Properties
  _i.OK = 0;
  _i.NOXMLOBJ = 1;
  _i.REQERR = 2;
  _i.TIMEOUT = 4;
  _i.RSPERR = 8;
  _i.NOXMLCT = 16;
  _i.ABORTED = 32;
  _i.status = _i.OK;
  _i.error = null;
  _i.busy = false;
  // Private Methods
  function _clean()
  {
    _i = null;
    _r = null;
    _t = null;
    _f = null;
    _x = false;
    _o = null;
    _c = false;
  }
  function _clrTimer()
  {
    if (_t) {
      clearTimeout(_t);
    }
    _t = null;
  }
  function _endCall()
  {
    if (_f) {
      _f(_r, _i.status, _o);
    }
    _f = null; _x = false; _o = null;
    _i.busy = false;
    if (_c) {
      _clean();
    }
  }
  function _abort(s)
  {
    _clrTimer();
    try {
      _r.onreadystatechange = function(){};
      _r.abort();
    }
    catch (e) {
      _i.status |= _i.RSPERR;
      _i.error = e;
    }
    _i.status |= s;
    _endCall();
  }
  function _newXHR()
  {
    try { _r = new XMLHttpRequest(); }
    catch (e) { try { _r = new ActiveXObject('Msxml2.XMLHTTP'); }
    catch (e) { try { _r = new ActiveXObject('Microsoft.XMLHTTP'); }
    catch (e) { _r = null; _i.error = e; }}}
    if (!_r) { _i.status |= _i.NOXMLOBJ; }
  }
  // Private Event Listeners
  function _oc() // onReadyStateChange
  {
    var ct;
    if (_r.readyState == 4) {
      _clrTimer();
      try {
        if (_r.status != 200) _i.status |= _i.RSPERR;
        if (_x) {
          ct = _r.getResponseHeader('Content-Type');
          if (ct && ct.indexOf('xml') == -1) { _i.status |= _i.NOXMLCT; }
        }
        delete _r['onreadystatechange']; // _r.onreadystatechange = null;
      }
      catch (e) {
        _i.status |= _i.RSPERR;
        _i.error = e;
      }
      _endCall();
    }
  }
  function _ot() // onTimeout
  {
    _t = null;
    _abort(_i.TIMEOUT);
  }
  // Public Methods
  this.send = function(m, u, d, t, r, x, o, f, c)
  {
    var q, ct;
    if (!_r || _i.busy) { return false; }
    _c = (c ? true : false);
    m = m.toUpperCase();
    q = (u.indexOf('?') >= 0);
    if (m != 'POST') {
      if (d) {
        u += (q ? '&' : '?') + d;
        q = true;
      }
      d = null;
    }
    if (r) {
      var date = new Date();
      u += (q ? '&' : '?') + r + '=' + date.getTime();
    }
    _x = (x ? true : false);
    _o = o;
    _f = f;
    _i.busy = true;
    _i.status = _i.OK;
    _i.error = null;
    if (t) { _t = setTimeout(_ot, t); }
    try {
      _r.open(m, u, true);
      if (m == 'GET') {
        _r.setRequestHeader('Cache-Control', 'no-cache');
        ct = 'text/' + (_x ? 'xml':'plain');
        if (_r.overrideMimeType) {_r.overrideMimeType(ct);}
        _r.setRequestHeader('Content-Type', ct);
      }
      else if (m == 'POST') {
        _r.setRequestHeader('Method', 'POST ' + u + ' HTTP/1.1');
        _r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      _r.onreadystatechange = _oc;
      _r.send(d);
    }
    catch(e) {
      _clrTimer();
      _f = null; _x = false; _o = null;
      _i.busy = false;
      _i.status |= _i.REQERR;
      _i.error = e;
      if (_c) {
        _clean();
      }
      return false;
    }
    return true;
  };
  this.abort = function()
  {
    if (!_r || !_i.busy) { return false; }
    _abort(_i.ABORTED);
    return true;
  };
  this.reinit = function()
  {
    // Halt any HTTP request that may be in progress.
    this.abort();
    // Set all private vars to initial state.
    _clean();
    _i = this;
    // Set all (non-constant) public properties to initial state.
    _i.status = _i.OK;
    _i.error = null;
    _i.busy = false;
    // Create the private XMLHttpRequest object.
    _newXHR();
    return true;
  };
  // Constructor Code
  _newXHR();
}
