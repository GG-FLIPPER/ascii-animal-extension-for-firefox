// Keep animation callbacks queued while the new-tab page is backgrounded.
(function () {
  var nativeRequest = window.requestAnimationFrame.bind(window);
  var nativeCancel = window.cancelAnimationFrame.bind(window);
  var queued = new Map();
  var nextId = 0;
  var hidden = document.visibilityState !== "visible";

  window.requestAnimationFrame = function (callback) {
    if (!hidden) return nativeRequest(callback);

    var id = --nextId;
    queued.set(id, callback);
    return id;
  };

  window.cancelAnimationFrame = function (id) {
    if (id < 0) {
      queued.delete(id);
      return;
    }
    nativeCancel(id);
  };

  document.addEventListener("visibilitychange", function () {
    hidden = document.visibilityState !== "visible";
    if (hidden || queued.size === 0) return;

    var callbacks = Array.from(queued.values());
    queued.clear();
    var timestamp = performance.now();
    for (var i = 0; i < callbacks.length; i++) callbacks[i](timestamp);
  });
})();
