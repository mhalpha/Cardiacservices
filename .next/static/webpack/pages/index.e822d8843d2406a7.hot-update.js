"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/StoreCard.tsx":
/*!**********************************!*\
  !*** ./components/StoreCard.tsx ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/material */ \"./node_modules/@mui/material/index.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"C:\\\\store-locations\\\\components\\\\StoreCard.tsx\",\n  _this = undefined;\n\n\n\nvar StoreCard = function StoreCard(_ref) {\n  var store = _ref.store,\n    onClick = _ref.onClick;\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Card, {\n    onClick: onClick,\n    sx: {\n      borderRadius: '10px',\n      cursor: 'pointer'\n    },\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.CardContent, {\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {\n        variant: \"h6\",\n        children: store.name\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 22,\n        columnNumber: 9\n      }, _this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {\n        variant: \"body2\",\n        children: [store.address, \", \", store.city, \", \", store.state, \" \", store.zip]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 23,\n        columnNumber: 9\n      }, _this), store.distance !== undefined && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_mui_material__WEBPACK_IMPORTED_MODULE_2__.Typography, {\n        variant: \"body2\",\n        color: \"textSecondary\",\n        children: [\"Approx. \", store.distance.toFixed(2), \" km away\"]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 27,\n        columnNumber: 11\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 21,\n      columnNumber: 7\n    }, _this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 20,\n    columnNumber: 5\n  }, _this);\n};\n_c = StoreCard;\n/* harmony default export */ __webpack_exports__[\"default\"] = (StoreCard);\nvar _c;\n$RefreshReg$(_c, \"StoreCard\");\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL1N0b3JlQ2FyZC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBMEI7QUFDb0M7QUFBQTtBQWdCOUQsSUFBTU0sU0FBbUMsR0FBRyxTQUF0Q0EsU0FBbUNBLENBQUFDLElBQUEsRUFBMkI7RUFBQSxJQUFyQkMsS0FBSyxHQUFBRCxJQUFBLENBQUxDLEtBQUs7SUFBRUMsT0FBTyxHQUFBRixJQUFBLENBQVBFLE9BQU87RUFDM0Qsb0JBQ0VKLDZEQUFBLENBQUNKLCtDQUFJO0lBQUNRLE9BQU8sRUFBRUEsT0FBUTtJQUFDQyxFQUFFLEVBQUU7TUFBRUMsWUFBWSxFQUFFLE1BQU07TUFBRUMsTUFBTSxFQUFFO0lBQVUsQ0FBRTtJQUFBQyxRQUFBLGVBQ3RFUiw2REFBQSxDQUFDSCxzREFBVztNQUFBVyxRQUFBLGdCQUNWUiw2REFBQSxDQUFDRixxREFBVTtRQUFDVyxPQUFPLEVBQUMsSUFBSTtRQUFBRCxRQUFBLEVBQUVMLEtBQUssQ0FBQ087TUFBSTtRQUFBQyxRQUFBLEVBQUFDLFlBQUE7UUFBQUMsVUFBQTtRQUFBQyxZQUFBO01BQUEsR0FBQUMsS0FBYSxDQUFDLGVBQ2xEZiw2REFBQSxDQUFDRixxREFBVTtRQUFDVyxPQUFPLEVBQUMsT0FBTztRQUFBRCxRQUFBLEdBQ3hCTCxLQUFLLENBQUNhLE9BQU8sRUFBQyxJQUFFLEVBQUNiLEtBQUssQ0FBQ2MsSUFBSSxFQUFDLElBQUUsRUFBQ2QsS0FBSyxDQUFDZSxLQUFLLEVBQUMsR0FBQyxFQUFDZixLQUFLLENBQUNnQixHQUFHO01BQUE7UUFBQVIsUUFBQSxFQUFBQyxZQUFBO1FBQUFDLFVBQUE7UUFBQUMsWUFBQTtNQUFBLEdBQUFDLEtBQzdDLENBQUMsRUFDWlosS0FBSyxDQUFDaUIsUUFBUSxLQUFLQyxTQUFTLGlCQUMzQnJCLDZEQUFBLENBQUNGLHFEQUFVO1FBQUNXLE9BQU8sRUFBQyxPQUFPO1FBQUNhLEtBQUssRUFBQyxlQUFlO1FBQUFkLFFBQUEsR0FBQyxVQUN4QyxFQUFDTCxLQUFLLENBQUNpQixRQUFRLENBQUNHLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUNyQztNQUFBO1FBQUFaLFFBQUEsRUFBQUMsWUFBQTtRQUFBQyxVQUFBO1FBQUFDLFlBQUE7TUFBQSxHQUFBQyxLQUFZLENBQ2I7SUFBQTtNQUFBSixRQUFBLEVBQUFDLFlBQUE7TUFBQUMsVUFBQTtNQUFBQyxZQUFBO0lBQUEsR0FBQUMsS0FDVTtFQUFDO0lBQUFKLFFBQUEsRUFBQUMsWUFBQTtJQUFBQyxVQUFBO0lBQUFDLFlBQUE7RUFBQSxHQUFBQyxLQUNWLENBQUM7QUFFWCxDQUFDO0FBQUNTLEVBQUEsR0FoQkl2QixTQUFtQztBQWtCekMsK0RBQWVBLFNBQVMsRUFBQztBQUFBLElBQUF1QixFQUFBO0FBQUFDLFlBQUEsQ0FBQUQsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1N0b3JlQ2FyZC50c3g/NmMzOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2FyZCwgQ2FyZENvbnRlbnQsIFR5cG9ncmFwaHkgfSBmcm9tICdAbXVpL21hdGVyaWFsJztcblxuaW50ZXJmYWNlIFN0b3JlQ2FyZFByb3BzIHtcbiAgc3RvcmU6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIGNpdHk6IHN0cmluZztcbiAgICBzdGF0ZTogc3RyaW5nO1xuICAgIHppcDogc3RyaW5nO1xuICAgIGxhdDogbnVtYmVyO1xuICAgIGxuZzogbnVtYmVyO1xuICAgIGRpc3RhbmNlPzogbnVtYmVyOyAvLyBJbmNsdWRlIGRpc3RhbmNlIGluIHRoZSBzdG9yZSBvYmplY3RcbiAgfTtcbiAgb25DbGljazogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgU3RvcmVDYXJkOiBSZWFjdC5GQzxTdG9yZUNhcmRQcm9wcz4gPSAoeyBzdG9yZSwgb25DbGljayB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhcmQgb25DbGljaz17b25DbGlja30gc3g9e3sgYm9yZGVyUmFkaXVzOiAnMTBweCcsIGN1cnNvcjogJ3BvaW50ZXInIH19PlxuICAgICAgPENhcmRDb250ZW50PlxuICAgICAgICA8VHlwb2dyYXBoeSB2YXJpYW50PVwiaDZcIj57c3RvcmUubmFtZX08L1R5cG9ncmFwaHk+XG4gICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MlwiPlxuICAgICAgICAgIHtzdG9yZS5hZGRyZXNzfSwge3N0b3JlLmNpdHl9LCB7c3RvcmUuc3RhdGV9IHtzdG9yZS56aXB9XG4gICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAge3N0b3JlLmRpc3RhbmNlICE9PSB1bmRlZmluZWQgJiYgKFxuICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJib2R5MlwiIGNvbG9yPVwidGV4dFNlY29uZGFyeVwiPlxuICAgICAgICAgICAgQXBwcm94LiB7c3RvcmUuZGlzdGFuY2UudG9GaXhlZCgyKX0ga20gYXdheVxuICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgPC9DYXJkPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU3RvcmVDYXJkO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ2FyZCIsIkNhcmRDb250ZW50IiwiVHlwb2dyYXBoeSIsImpzeERFViIsIl9qc3hERVYiLCJTdG9yZUNhcmQiLCJfcmVmIiwic3RvcmUiLCJvbkNsaWNrIiwic3giLCJib3JkZXJSYWRpdXMiLCJjdXJzb3IiLCJjaGlsZHJlbiIsInZhcmlhbnQiLCJuYW1lIiwiZmlsZU5hbWUiLCJfanN4RmlsZU5hbWUiLCJsaW5lTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiX3RoaXMiLCJhZGRyZXNzIiwiY2l0eSIsInN0YXRlIiwiemlwIiwiZGlzdGFuY2UiLCJ1bmRlZmluZWQiLCJjb2xvciIsInRvRml4ZWQiLCJfYyIsIiRSZWZyZXNoUmVnJCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/StoreCard.tsx\n"));

/***/ })

});