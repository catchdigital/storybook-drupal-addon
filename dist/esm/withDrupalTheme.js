function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// const globalWindow = require('global/window');
import { useStoryContext, useEffect, useGlobals, useState } from '@storybook/addons';
var heartBeatEmoji = "\uD83D\uDC93";
export var withDrupalTheme = function withDrupalTheme() {
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    gWindow = _useState2[0],
    setGWindow = _useState2[1];
  var _useGlobals = useGlobals(),
    _useGlobals2 = _slicedToArray(_useGlobals, 2),
    globals = _useGlobals2[0],
    updateGlobals = _useGlobals2[1];
  var drupalTheme = globals === null || globals === void 0 ? void 0 : globals.drupalTheme;
  var supportedDrupalThemes = globals === null || globals === void 0 ? void 0 : globals.supportedDrupalThemes;
  var context = useStoryContext();
  useEffect(function () {
    if (window) {
      setGWindow(window);
    }
  }, []);
  useEffect(function () {
    var _context$parameters = context.parameters,
      drupalTheme = _context$parameters.drupalTheme,
      supportedDrupalThemes = _context$parameters.supportedDrupalThemes;
    if (supportedDrupalThemes) {
      if (drupalTheme && !drupalTheme) {
        updateGlobals({
          drupalTheme: drupalTheme,
          supportedDrupalThemes: supportedDrupalThemes
        });
      } else {
        updateGlobals({
          supportedDrupalThemes: supportedDrupalThemes
        });
      }
    }
  }, [drupalTheme, supportedDrupalThemes]);
  var currentHash = globals === null || globals === void 0 ? void 0 : globals.hash;
  useEffect(function () {
    var _gWindow$__whmEventSo;
    var hmr = gWindow === null || gWindow === void 0 ? void 0 : (_gWindow$__whmEventSo = gWindow.__whmEventSourceWrapper) === null || _gWindow$__whmEventSo === void 0 ? void 0 : _gWindow$__whmEventSo['/__webpack_hmr'];
    if (!hmr) {
      return;
    }
    hmr.addMessageListener(handleMessage);
    function handleMessage(event) {
      var _data;
      if (event.data == heartBeatEmoji) {
        return;
      }
      var data;
      try {
        data = JSON.parse(event.data);
      } catch (ex) {
        console.warn('Invalid HMR message: ' + event.data + '\n' + ex);
        return;
      }
      var newHash = (_data = data) === null || _data === void 0 ? void 0 : _data.hash;
      if (!newHash) {
        return;
      }
      currentHash === newHash
      // If nothing changed in the Webpack hash, it may mean changes in the
      // server components.
      ? gWindow.document.location.reload()
      // Store the hash in the globals because state will reset every time.
      : updateGlobals({
        hash: newHash
      });
    }
  }, [currentHash]);
  return undefined;
};