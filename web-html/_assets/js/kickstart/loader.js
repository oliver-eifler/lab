/* loader for $ LAB
   env:production
*/
 $LAB
  .script((!Array.prototype.indexOf) ? "js/extra/es5-shim.js":null).wait()
  .script("js/esential.js")
  .script("js/jquery.js")
  .script("js/olli.js").wait(layout.init);
