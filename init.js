// Auto-detect browser and set native new tab logo via Data URI (Zero disk I/O, 0ms lag)
(function () {
  var link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  var BRAVE_ICON = "data:image/png;base64,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";
  var EDGE_ICON = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22e1%22%20x1%3D%220%25%22%20y1%3D%22100%25%22%20x2%3D%22100%25%22%20y2%3D%220%25%22%3E%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%230c59a4%22%2F%3E%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23114a8b%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20d%3D%22M88%2068c-4%2014-17%2024-33%2024-21%200-38-17-38-38%200-14%207-26%2018-33%205-3%2011-5%2017-5%2013%200%2024%206%2031%2016l-13%2010c-4-6-11-10-18-10-12%200-22%2010-22%2022%200%2011%208%2020%2019%2022%202%200%205%200%207-1%207-2%2013-8%2015-15h-22v-16h38c1%203%201%206%201%209%200%205-1%2010-3%2015z%22%20fill%3D%22url(%23e1)%22%2F%3E%3C%2Fsvg%3E";

  var ua = navigator.userAgent;
  var isEdge = /Edg\//i.test(ua);
  var brave = window.navigator.brave;

  function setIcon(iconUrl) {
    link.href = iconUrl;
  }

  if (isEdge) {
    setIcon(EDGE_ICON);
  } else if (brave && typeof brave.isBrave === 'function') {
    brave.isBrave().then(function (isBrave) {
      setIcon(isBrave ? BRAVE_ICON : "icons/icon-128.png");
    }).catch(function () {
      setIcon("icons/icon-128.png");
    });
  } else {
    setIcon("icons/icon-128.png");
  }
})();

// Only Chromium can run an SVG filter inside backdrop-filter; everyone else gets frosted glass.
if (/Chrome\//.test(navigator.userAgent)) {
  document.documentElement.classList.add("liquid");
}
