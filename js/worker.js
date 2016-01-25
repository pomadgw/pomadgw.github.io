onmessage = function(event) {
  importScripts('/js/highlight.pack.js');

  var result;

  if (event.data['lang'] != '') {
  	result = self.hljs.highlight(event.data['lang'], event.data['code']);
  } else {
  	result = self.hljs.highlightAuto(event.data['code']);
  }

  postMessage(result.value);
}