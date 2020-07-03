// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/booking/bookForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookForm = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var availableDates = function availableDates() {
  var dateInput = document.querySelector('#date');
  var minDate = new Date(Date.now() + 86400000);
  var maxDate = new Date(Date.now() + 1296000000);
  dateInput.min = minDate.toISOString().split('T')[0];
  dateInput.max = maxDate.toISOString().split('T')[0];
  ;
};

var availableTimes = function availableTimes(event) {
  var timeInput = document.querySelector('#time');

  var hours = _defineProperty({
    "Mon": ["17:00", "21:00"],
    "Tues": ["17:00", "21:00"],
    "Wed": ["17:00", "21:00"],
    "Thurs": ["17:00", "21:00"],
    "Fri": ["17:00", "21:00"],
    "Sat": ["12:00", "21:00"]
  }, "Sat", ["17:00", "20:00"]);

  if (event.target.validity.valid) {
    var dayOfWeek = "Mon"; // edit to this to get day of week

    timeInput.min = hours[dayofWeek][0];
    timeInput.max = hours[dayoffWeek][1];
  }
};

var selectBtns = function selectBtns() {
  var selectBtn = function selectBtn(input, value) {
    return document.querySelector(input).value = value;
  };

  var restaurantBtns = document.querySelectorAll(".restaurant .dropdownContent button");
  var partyBtns = document.querySelectorAll(".party .dropdownContent button");
  var timeBtns = document.querySelectorAll(".time .dropdownContent button");
  restaurantBtns.forEach(function (btn) {
    return btn.addEventListener('click', function () {
      return selectBtn("#restaurant", btn.dataset.value);
    });
  });
  partyBtns.forEach(function (btn) {
    return btn.addEventListener('click', function () {
      return selectBtn("#party", btn.dataset.value);
    });
  });
  timeBtns.forEach(function (btn) {
    return btn.addEventListener('click', function () {
      return selectBtn("#time", btn.dataset.value);
    });
  });
};

var bookForm = function bookForm() {
  availableDates(); //document.querySelector('#date').addEventListener('onchange', availableTimes(event)) ;

  selectBtns();
};

exports.bookForm = bookForm;
},{}],"js/booking/getBooking.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBooking = void 0;

var getBooking = function getBooking(id) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/api/guest/booking/".concat(id), true);

    xhr.onload = function () {
      if (this.status === 200) resolve(this.responseText);else reject({
        error: "no booking found"
      });
    };

    xhr.send();
  });
};

exports.getBooking = getBooking;
},{}],"js/booking/validation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeError = exports.checkError = void 0;
var inputs = document.querySelectorAll('input');
var errorBoxes = document.querySelectorAll('.error');

var checkError = function checkError() {
  var error = false;
  inputs.forEach(function (input, index) {
    if (!input.validity.valid) {
      error = true;
      errorBoxes[index].classList.add('errorActive');
      inputs[index].classList.add('inputInvalid');
      inputs[index].scrollIntoView();
      removeError(index);
    }
  });
  return error;
};

exports.checkError = checkError;

var removeError = function removeError(index) {
  inputs[index].oninput = function () {
    if (inputs[index].validity.valid) {
      inputs[index].classList.remove('inputInvalid');
      errorBoxes[index].classList.remove('errorActive');
    }
  };
};

exports.removeError = removeError;
},{}],"js/booking/sendBooking.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.submitBooking = void 0;

var _validation = require("./validation");

var setParams = function setParams() {
  var form = document.querySelector('#bookForm');
  var name = form.elements["name"].value;
  var email = form.elements["email"].value;
  var restaurant = form.elements["restaurant"].value;
  var date = form.elements["date"].value;
  var time = form.elements["time"].value;
  var party = form.elements["party"].value;
  var message = form.elements["message"].value;
  return "name=".concat(name, "&email=").concat(email, "&restaurant=").concat(restaurant, "&date=").concat(date, "&time=").concat(time, "&party=").concat(party, "&message=").concat(message);
};

var sendBooking = function sendBooking(method, url) {
  var params = setParams();
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
      if (this.status === 200) {
        var _JSON$parse = JSON.parse(this.responseText),
            _id = _JSON$parse._id;

        resolve({
          message: "bookSuccess",
          id: _id
        });
      } else if (this.status === 403) {
        var _JSON$parse2 = JSON.parse(this.responseText),
            date = _JSON$parse2.date,
            time = _JSON$parse2.time;

        resolve({
          message: "bookFull",
          date: date,
          time: time
        });
      } else {
        reject({
          message: "bookFail"
        });
      }
    };

    xhr.onerror = function () {
      reject({
        message: "bookFail"
      });
    };

    xhr.send(params);
  });
};

var submitBooking = function submitBooking(method, url) {
  var bookBtn = document.querySelector('.bookBtn');
  document.querySelector('#bookForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var error = (0, _validation.checkError)();

    if (!error) {
      bookBtn.value = "Sending...";
      bookBtn.disabled = true;
      sendBooking(method, url).then(function (reply) {
        var message = reply.message,
            id = reply.id,
            date = reply.date,
            time = reply.time;
        if (document.querySelector('#id')) id = document.querySelector('#id').value;
        document.querySelector('#_id').innerHTML = "<a href=\"booking.html?".concat(id, "\">").concat(id, "</a>");
        document.querySelector('#date').innerHTML = date;
        document.querySelector('#time').innerHTML = time;
        document.querySelector(".".concat(message)).classList.add("modal-active");
      }).catch(function () {
        return document.querySelector(".bookFail").classList.add("modal-active");
      });
    }
  });
};

exports.submitBooking = submitBooking;
},{"./validation":"js/booking/validation.js"}],"js/booking/booking.js":[function(require,module,exports) {
"use strict";

var _bookForm = require("./bookForm");

var _getBooking = require("./getBooking");

var _sendBooking = require("./sendBooking");

//preparing form and form Buttons
(0, _bookForm.bookForm)(); //find existing booking

var findBtn = document.querySelector('#findBtn');

var inputForm = function inputForm(booking) {
  booking = JSON.parse(booking);
  var inputs = document.querySelectorAll('input');
  inputs.forEach(function (input) {
    if (input.name !== "id") input.value = booking[input.name];
  });
  document.querySelector('.modalBg').classList.remove("modalActive");
};

var findBooking = function findBooking(event) {
  event.preventDefault();
  (0, _getBooking.getBooking)(document.querySelector('#id').value).then(function (response) {
    inputForm(response);
    document.querySelector(".modal-active").classList.remove("modal-active");
  }).catch(function (error) {
    return console.log(error);
  });
};

var id = location.search.substr(1);

if (id !== "") {
  document.querySelector('#id').value = id;
  (0, _getBooking.getBooking)(id).then(function (response) {
    inputForm(response);
    document.querySelector(".modal-active").classList.remove("modal-active");
  }).catch(function (error) {
    return console.log(error);
  });
}

;

findBtn.onclick = function (event) {
  return findBooking(event);
}; //crud booking buttons


var editBtn = document.querySelector('#editBtn');
var updateBtn = document.querySelector('#updateBtn');
var deleteBtn = document.querySelector('#deleteBtn');

var editForm = function editForm(event) {
  var h2 = document.querySelector('#bookingForm h2');
  var form = document.querySelector('#bookForm');
  var inputs = document.querySelectorAll('input');
  event.preventDefault();
  inputs.forEach(function (input) {
    if (input.name !== "restaurant") input.readOnly = false;
  });
  form.classList.remove('formDisabled');
  form.classList.add('formEditable');
  h2.innerHTML = "Edit your booking";
  h2.scrollIntoView({
    behavior: "smooth"
  });
};

var deleteBooking = function deleteBooking(event) {
  console.log("delete me bro");
  event.preventDefault();
  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', "./api/guest/booking/".concat(id), true);

  xhr.onload = function () {
    if (this.status === 200) document.querySelector('.bookDeleted').classList.add("modal-active");else document.querySelector('.bookFail').classList.add("modal-active");
  };

  xhr.send();
};

editBtn.onclick = function (event) {
  return editForm(event);
};

deleteBtn.onclick = function (event) {
  return deleteBooking(event);
};

updateBtn.onclick = function (event) {
  return (0, _sendBooking.submitBooking)('PUT', "./api/guest/booking/".concat(document.querySelector('#id').value));
};
},{"./bookForm":"js/booking/bookForm.js","./getBooking":"js/booking/getBooking.js","./sendBooking":"js/booking/sendBooking.js"}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61804" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","js/booking/booking.js"], null)
//# sourceMappingURL=/booking.a62b7ad2.js.map