(function() {

  window.sandbox = function(options) {
    var allScripts, css, doc, external, externalCSS, externalJS, html, iframe, js, script, scripts, src, stopDialogs;
    if (options == null) {
      options = {};
    }
    options = $.extend(true, {}, {
      html: '',
      css: '',
      js: '',
      external: {
        js: {},
        css: {}
      },
      dialogs: true,
      onLog: (function() {})
    }, options);
    js = options.js, html = options.html, css = options.css, external = options.external;
    iframe = $('<iframe seamless sandbox="allow-scripts allow-forms allow-top-navigation allow-same-origin">').appendTo(options.el || 'body')[0];
    doc = iframe.contentDocument || iframe.contentWindow.document;
    stopDialogs = "var dialogs = ['alert', 'prompt', 'confirm']; for (var i = 0; i < dialogs.length; i++) window[dialogs[i]] = function() {};";
    scripts = [js];
    if (!options.dialogs) {
      scripts = [stopDialogs].concat(scripts);
    }
    allScripts = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = scripts.length; _i < _len; _i++) {
        script = scripts[_i];
        _results.push("(function() { " + script + " })();");
      }
      return _results;
    })()).join('');
    externalJS = (function() {
      var _i, _len, _ref, _results;
      _ref = external.js;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        src = _ref[_i];
        _results.push("<script src='" + src + "'></script>");
      }
      return _results;
    })();
    externalCSS = (function() {
      var _i, _len, _ref, _results;
      _ref = external.css;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        src = _ref[_i];
        _results.push("<link rel='stylesheet' type='text/css' href='" + src + "' media='screen' />");
      }
      return _results;
    })();
    doc.open();
    doc.write("" + html + "\n" + externalJS + "\n" + externalCSS + "\n<script>" + allScripts + "</script>\n<style>" + css + "</style>");
    doc.close();
    return iframe;
  };

}).call(this);
