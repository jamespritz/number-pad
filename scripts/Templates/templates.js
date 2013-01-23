(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['numpad'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return '<div id=\"numpad\" onselectstart=\"return false\" class=\"numpad\" style=\"display: none\">\r\n    <span class=\"val\"><span class=\"content\">&nbsp;</span></span><ul>\r\n        <li class=\"key\">7</li>\r\n        <li class=\"key\">8</li>\r\n        <li class=\"key\">9</li>\r\n    </ul>\r\n    <ul>\r\n        <li class=\"key\">4</li>\r\n        <li class=\"key\">5</li>\r\n        <li class=\"key\">6</li>\r\n    </ul>\r\n    <ul>\r\n        <li class=\"key\">1</li>\r\n        <li class=\"key\">2</li>\r\n        <li class=\"key\">3</li>\r\n    </ul>\r\n    <ul>\r\n        <li class=\"key wide\">0</li>\r\n    </ul>\r\n    <ul>\r\n        <li class=\"key\" id=\"clear\">C</li>\r\n        <li class=\"key\" id=\"delete\">Del</li>\r\n        <li class=\"key\" id=\"accept\">OK</li>\r\n    </ul>\r\n</div>\r\n';});
})();