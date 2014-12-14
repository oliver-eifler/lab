/*
AMCSS Modules for olli-lib
!!!important IE-7 is case sensitive
*/
(function (root, factory) {
    var lib = olli_namespace(root);
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define([], function () {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (lib = factory(lib,jQuery,root));
        });
    } else {
        // Browser globals
        lib = factory(lib,jQuery,root);
    }
}(this, function (lib,$,root) {

    //private
    var vars = {};
    lib.vars = lib.vars||{};


  var refreshTest = /*private*/function()
  {
    console.log("refresh test");
    //create test div
    vars.refresh = true;
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "0";
    div.style.width = "100px";
    div.style.left = "-100px";
    div.style.zIndex = -1;
    div = document.body.appendChild(div);
    var height = div.clientHeight;
    div.setAttribute("wurstl","");
    if (height != div.clientHeight)
    {
        height = div.clientHeight;
        div.setAttribute("wurstl","test");
        vars.refresh = (height == div.clientHeight);
    }
    return vars.refresh;
  }
    /*private*/function forceRefresh(el)
    {
        //var old = el.style.display;
        //el.style.display = "none";
        //el.style.display = old;
        if ((vars.refresh !== undefined)?vars.refresh : refreshTest())
        {
            el.className = el.className;
            console.log("refresh forced");
        }
        moduleinfo(el);
    }
  var getAllModules = lib.getAllModules = /*public*/function(el)
  {
    var mods=[];
    for (var i = 0, atts = el.attributes, n = atts.length; i < n; i++)
    {
        if (atts[i].nodeName.indexOf("-") !== -1)
            mods.push(atts[i].nodeName);
    }
    return mods;
  }
  var hasModule = lib.hasModule = /*public*/function(el,module)
  {
    if (typeof el.hasAttribute !== 'function')
        return (el.attributes!==undefined && el.attributes[module]!==undefined)
    else
        return el.hasAttribute(module);
  }
  var getModule = lib.getModule = /*public*/function(el,module)
  {
    var rc=[];
    if (hasModule(el,module))
        rc= _toArray(el.getAttribute(module));
    return rc;
  }
  var setModule = lib.setModule = /*public*/function(el,module,values)
  {
        return setModuleFromArray(el,module,_toArray(values));
  }
  var setModuleFromArray = /*private*/function(el,module,array) //for internal use only
  {
    el.setAttribute(module,array.join(" "));
    forceRefresh(el);
    return hasModule(el,module);
  }
  var _toArray = /*private*/function(values)
  {
    if (typeof values === 'string' && !values._isBlank())
        return _cleanArray(values.trim().split(/\s*\s\s*/));
    else if(Array.isArray(values))
        return _cleanArray(values);
    else
        return [];
  }
  var _cleanArray = /*private*/function(array)
  {
    var v = [];
    for (var i = 0, n = array.length; i < n; i++)
    {
        if (typeof array[i]==='string' && !array[i]._isBlank())
            v.push(array[i].trim());
    }
    return v;
  }

  var removeModule = lib.removeModule = /*public*/function(el,module)
  {
    if (hasModule(el,module))
    {
        el.removeAttribute(module);
        forceRefresh(el);
    }
    return !hasModule(el,module);
  }

  //VALUEs
  var hasModuleValue = lib.hasModuleValue = /*public*/function(el,module,value)
  {
        var v = getModule(el,module);
        if (v.length === 0)
            return false;
        value = _toArray(value);
        if (value.length == 0)
            return false;
        for (var i = 0, n = value.length; i < n; i++)
        {
            if (v.indexOf(value[i])===-1)
                return false;
        }
        return true;
  }
  var setModuleValue = lib.setModuleValue = /*public*/function(el,module,value)
  {
        var v = getModule(el,module)
           ,update = !hasModule(el,module);
        value = _toArray(value);
        for (var i = 0,n = value.length; i < n; i++)
        {
            if (v.indexOf(value[i])===-1)
            {
                v.push(value[i]);
                update = true;
            }
        }
        if (update)
            setModuleFromArray(el,module,_cleanArray(v));
        return true;
  }
var removeModuleValue = lib.removeModuleValue = /*public*/function(el,module,value)
  {
        if (!hasModule(el,module))
            return false;

        var v = getModule(el,module)
           ,update = false;
        value = _toArray(value);
        for (var i = 0,n = value.length; i < n; i++)
        {
            var idx = v.indexOf(value[i]);
            if (idx !==-1)
            {
                v[idx]=false;
                update = true;
            }
        }
        if (update)
            setModuleFromArray(el,module,_cleanArray(v));
        return true;
  }
  var toggleModuleValue = lib.toggleModuleValue = /*public*/function(el,module,value)
  {
        if (!hasModule(el,module))
            return false;

        var v = getModule(el,module)
           ,update = false;
        value = _toArray(value);
        for (var i = 0,n = value.length; i < n; i++)
        {
            var idx = v.indexOf(value[i]);
            if (idx !==-1)
            {
                v[idx]=false;
                update = true;
            }
            else
            {
                v.push(value[i]);
                update = true;
            }

        }
        if (update)
            setModuleFromArray(el,module,_cleanArray(v));
        return true;
  }
    /* chainable am function */
    var amcss = root.$am = lib.amcss = (function(el) {
        var plugin = this;
        plugin.get = function(module) {return getModule(el,module);}
        plugin.has = function(module) {return hasModule(el,module);}
        plugin.set = function(module,values) {setModule(el,module,values);return plugin;}
        plugin.hasValue = function(module,values) {return hasModuleValue(el,module,values);}
        plugin.setValue = function(module,values) {setModuleValue(el,module,values);return plugin;}
        plugin.removeValue = function(module,values) {removeModuleValue(el,module,values);return plugin;}
        plugin.toggleValue = function(module,values) {toggleModuleValue(el,module,values);return plugin;}
        return plugin;
    }).bind(amcss);
    lib.amcss.ver = "0.0.1";
    //export to root

 return lib;
 }));
