"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/stores";
exports.ids = ["pages/api/stores"];
exports.modules = {

/***/ "mssql":
/*!************************!*\
  !*** external "mssql" ***!
  \************************/
/***/ ((module) => {

module.exports = require("mssql");

/***/ }),

/***/ "next/dist/compiled/next-server/pages-api.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages-api.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages-api.runtime.dev.js");

/***/ }),

/***/ "(api)/./pages/api/stores.ts":
/*!*****************************!*\
  !*** ./pages/api/stores.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mssql */ \"mssql\");\n/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_0__);\n\nconst config = {\n  user: 'lumadmin',\n  password: '3?VV$Wnc*7re*B^4gr',\n  server: 'heartfoundationstagingsql.database.windows.net',\n  database: 'Cardiac-Services-Directory',\n  options: {\n    encrypt: true\n  }\n};\nconst getStores = async (req, res) => {\n  try {\n    await mssql__WEBPACK_IMPORTED_MODULE_0___default().connect(config);\n    const result = await (mssql__WEBPACK_IMPORTED_MODULE_0___default().query)`SELECT * FROM [dbo].[FormServices]`; // Replace 'Stores' with your actual table name\n    res.status(200).json(result.recordset);\n  } catch (err) {\n    res.status(500).json({\n      error: err.message\n    });\n  } finally {\n    mssql__WEBPACK_IMPORTED_MODULE_0___default().close();\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getStores);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3RvcmVzLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUV3QjtBQUV4QixNQUFNQyxNQUFNLEdBQUc7RUFDWEMsSUFBSSxFQUFFLFVBQVU7RUFDaEJDLFFBQVEsRUFBRSxvQkFBb0I7RUFDOUJDLE1BQU0sRUFBRSxnREFBZ0Q7RUFDeERDLFFBQVEsRUFBRSw0QkFBNEI7RUFDdENDLE9BQU8sRUFBRTtJQUNMQyxPQUFPLEVBQUU7RUFDYjtBQUNKLENBQUM7QUFFRCxNQUFNQyxTQUFTLEdBQUcsTUFBQUEsQ0FBT0MsR0FBbUIsRUFBRUMsR0FBb0IsS0FBSztFQUNuRSxJQUFJO0lBQ0EsTUFBTVYsb0RBQVcsQ0FBQ0MsTUFBTSxDQUFDO0lBQ3pCLE1BQU1XLE1BQU0sR0FBRyxNQUFNWixvREFBVSxvQ0FBbUMsQ0FBQyxDQUFFO0lBQ3JFVSxHQUFHLENBQUNJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDSCxNQUFNLENBQUNJLFNBQVMsQ0FBQztFQUMxQyxDQUFDLENBQUMsT0FBT0MsR0FBRyxFQUFFO0lBQ1ZQLEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7TUFBRUcsS0FBSyxFQUFFRCxHQUFHLENBQUNFO0lBQVEsQ0FBQyxDQUFDO0VBQ2hELENBQUMsU0FBUztJQUNObkIsa0RBQVMsQ0FBQyxDQUFDO0VBQ2Y7QUFDSixDQUFDO0FBRUQsaUVBQWVRLFNBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdG9yZS1sb2NhdGlvbnMvLi9wYWdlcy9hcGkvc3RvcmVzLnRzP2Q0YWQiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0JztcclxuaW1wb3J0IHNxbCBmcm9tICdtc3NxbCc7XHJcblxyXG5jb25zdCBjb25maWcgPSB7XHJcbiAgICB1c2VyOiAnbHVtYWRtaW4nLFxyXG4gICAgcGFzc3dvcmQ6ICczP1ZWJFduYyo3cmUqQl40Z3InLFxyXG4gICAgc2VydmVyOiAnaGVhcnRmb3VuZGF0aW9uc3RhZ2luZ3NxbC5kYXRhYmFzZS53aW5kb3dzLm5ldCcsXHJcbiAgICBkYXRhYmFzZTogJ0NhcmRpYWMtU2VydmljZXMtRGlyZWN0b3J5JyxcclxuICAgIG9wdGlvbnM6IHtcclxuICAgICAgICBlbmNyeXB0OiB0cnVlLFxyXG4gICAgfSxcclxufTtcclxuXHJcbmNvbnN0IGdldFN0b3JlcyA9IGFzeW5jIChyZXE6IE5leHRBcGlSZXF1ZXN0LCByZXM6IE5leHRBcGlSZXNwb25zZSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBzcWwuY29ubmVjdChjb25maWcpO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNxbC5xdWVyeWBTRUxFQ1QgKiBGUk9NIFtkYm9dLltGb3JtU2VydmljZXNdYDsgIC8vIFJlcGxhY2UgJ1N0b3Jlcycgd2l0aCB5b3VyIGFjdHVhbCB0YWJsZSBuYW1lXHJcbiAgICAgICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzdWx0LnJlY29yZHNldCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiBlcnIubWVzc2FnZSB9KTtcclxuICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgc3FsLmNsb3NlKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBnZXRTdG9yZXM7XHJcblxyXG4iXSwibmFtZXMiOlsic3FsIiwiY29uZmlnIiwidXNlciIsInBhc3N3b3JkIiwic2VydmVyIiwiZGF0YWJhc2UiLCJvcHRpb25zIiwiZW5jcnlwdCIsImdldFN0b3JlcyIsInJlcSIsInJlcyIsImNvbm5lY3QiLCJyZXN1bHQiLCJxdWVyeSIsInN0YXR1cyIsImpzb24iLCJyZWNvcmRzZXQiLCJlcnIiLCJlcnJvciIsIm1lc3NhZ2UiLCJjbG9zZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/stores.ts\n");

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fstores&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cstores.ts&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fstores&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cstores.ts&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\stores.ts */ \"(api)/./pages/api/stores.ts\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/stores\",\n        pathname: \"/api/stores\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRnN0b3JlcyZwcmVmZXJyZWRSZWdpb249JmFic29sdXRlUGFnZVBhdGg9LiUyRnBhZ2VzJTVDYXBpJTVDc3RvcmVzLnRzJm1pZGRsZXdhcmVDb25maWdCYXNlNjQ9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNMO0FBQzFEO0FBQ29EO0FBQ3BEO0FBQ0EsaUVBQWUsd0VBQUssQ0FBQyxpREFBUSxZQUFZLEVBQUM7QUFDMUM7QUFDTyxlQUFlLHdFQUFLLENBQUMsaURBQVE7QUFDcEM7QUFDTyx3QkFBd0IsZ0hBQW1CO0FBQ2xEO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RvcmUtbG9jYXRpb25zLz81YWU4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzQVBJUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgaG9pc3QgfSBmcm9tIFwibmV4dC9kaXN0L2J1aWxkL3RlbXBsYXRlcy9oZWxwZXJzXCI7XG4vLyBJbXBvcnQgdGhlIHVzZXJsYW5kIGNvZGUuXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiLi9wYWdlc1xcXFxhcGlcXFxcc3RvcmVzLnRzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsIFwiZGVmYXVsdFwiKTtcbi8vIFJlLWV4cG9ydCBjb25maWcuXG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsIFwiY29uZmlnXCIpO1xuLy8gQ3JlYXRlIGFuZCBleHBvcnQgdGhlIHJvdXRlIG1vZHVsZSB0aGF0IHdpbGwgYmUgY29uc3VtZWQuXG5leHBvcnQgY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgUGFnZXNBUElSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuUEFHRVNfQVBJLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3RvcmVzXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc3RvcmVzXCIsXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlbid0IHVzZWQgaW4gcHJvZHVjdGlvbi5cbiAgICAgICAgYnVuZGxlUGF0aDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwiXCJcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fstores&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cstores.ts&middlewareConfigBase64=e30%3D!\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fstores&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cstores.ts&middlewareConfigBase64=e30%3D!")));
module.exports = __webpack_exports__;

})();