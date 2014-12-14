/* OLLI LIB BASE*/
"use strict"
function olli_namespace( ns, ns_string ) {
   if (typeof ns_string!=='string')
        ns_string = "olli";

    var parts = ns_string.split('.'),
        parent = ns,
        pl, i,name=(typeof ns.namespace==='string')?ns.namespace+".":"";

    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        name = name + (!i?"":".")+parts[i];
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {namespace:name};
        }

        parent = parent[parts[i]];
    }

    return parent;
}
//LIB (OLLI)
(function (root, factory) {
    var lib = olli_namespace(root);
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define([], function () {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (lib = factory(lib));
        });
    } else {
        // Browser globals
        lib = factory(lib);
    }
}(this, function (lib) {

/* add something */

return lib;
}));





/* MODULE (OLLI.MODULE)*/
"use strict";
(function (root, factory) {
    var lib = olli_namespace(root),
    module = olli_namespace(lib,"module");
    if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
        define(["dependings"], function (lib) {
            // Also create a global in case some scripts
            // that are loaded still are looking for
            // a global even when an AMD loader is in use.
            return (module = factory(module,lib));
        });
    } else {
        // Browser globals
        module = factory(module,lib);
    }
}(this, function (module,olli) {

/* add something */

return module;
}));
