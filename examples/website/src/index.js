import './styles/html.sss';

import './styles/index.sss';
import './styles/nav.sss';
import './styles/source.sss';

var SOURCE = 'source';
var __HIDDEN = '--hidden';

window.app = window.app || {};
var app = window.app;
app.openSource = function(e) {
  if (window.innerWidth <= 1024) {
    return;
  }
  e.preventDefault();
  document.getElementById(SOURCE).classList.remove(SOURCE + __HIDDEN);
}

app.closeSource = function(e) {
  e.preventDefault();
  document.getElementById(SOURCE).classList.add(SOURCE + __HIDDEN);
}

