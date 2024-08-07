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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mssql */ \"mssql\");\n/* harmony import */ var mssql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mssql__WEBPACK_IMPORTED_MODULE_0__);\n\nconst config = {\n  user: 'nhf_azure',\n  password: '29{w{u4637b7CdWK',\n  server: 'nhfdev.database.windows.net',\n  database: 'Cardiac-Services-Directory_Copy',\n  options: {\n    encrypt: true\n  }\n};\nconst getStores = async (req, res) => {\n  try {\n    await mssql__WEBPACK_IMPORTED_MODULE_0___default().connect(config);\n    const result = await (mssql__WEBPACK_IMPORTED_MODULE_0___default().query)`SELECT * FROM [dbo].[FormServices]`;\n    res.status(200).json(result.recordset);\n  } catch (err) {\n    res.status(500).json({\n      error: err.message\n    });\n  } finally {\n    mssql__WEBPACK_IMPORTED_MODULE_0___default().close();\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getStores);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3RvcmVzLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUV3QjtBQUV4QixNQUFNQyxNQUFNLEdBQUc7RUFDWEMsSUFBSSxFQUFFLFdBQVc7RUFDakJDLFFBQVEsRUFBRSxrQkFBa0I7RUFDNUJDLE1BQU0sRUFBRSw2QkFBNkI7RUFDckNDLFFBQVEsRUFBRSxpQ0FBaUM7RUFDM0NDLE9BQU8sRUFBRTtJQUNMQyxPQUFPLEVBQUU7RUFDYjtBQUNKLENBQUM7QUFFRCxNQUFNQyxTQUFTLEdBQUcsTUFBQUEsQ0FBT0MsR0FBbUIsRUFBRUMsR0FBb0IsS0FBSztFQUNuRSxJQUFJO0lBQ0EsTUFBTVYsb0RBQVcsQ0FBQ0MsTUFBTSxDQUFDO0lBQ3pCLE1BQU1XLE1BQU0sR0FBRyxNQUFNWixvREFBVSxvQ0FBbUM7SUFDbEVVLEdBQUcsQ0FBQ0ksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUNILE1BQU0sQ0FBQ0ksU0FBUyxDQUFDO0VBQzFDLENBQUMsQ0FBQyxPQUFPQyxHQUFHLEVBQUU7SUFDVlAsR0FBRyxDQUFDSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztNQUFFRyxLQUFLLEVBQUVELEdBQUcsQ0FBQ0U7SUFBUSxDQUFDLENBQUM7RUFDaEQsQ0FBQyxTQUFTO0lBQ05uQixrREFBUyxDQUFDLENBQUM7RUFDZjtBQUNKLENBQUM7QUFFRCxpRUFBZVEsU0FBUyIsInNvdXJjZXMiOlsid2VicGFjazovL3N0b3JlLWxvY2F0aW9ucy8uL3BhZ2VzL2FwaS9zdG9yZXMudHM/ZDRhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gJ25leHQnO1xyXG5pbXBvcnQgc3FsIGZyb20gJ21zc3FsJztcclxuXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICAgIHVzZXI6ICduaGZfYXp1cmUnLFxyXG4gICAgcGFzc3dvcmQ6ICcyOXt3e3U0NjM3YjdDZFdLJyxcclxuICAgIHNlcnZlcjogJ25oZmRldi5kYXRhYmFzZS53aW5kb3dzLm5ldCcsXHJcbiAgICBkYXRhYmFzZTogJ0NhcmRpYWMtU2VydmljZXMtRGlyZWN0b3J5X0NvcHknLFxyXG4gICAgb3B0aW9uczoge1xyXG4gICAgICAgIGVuY3J5cHQ6IHRydWUsXHJcbiAgICB9LFxyXG59O1xyXG5cclxuY29uc3QgZ2V0U3RvcmVzID0gYXN5bmMgKHJlcTogTmV4dEFwaVJlcXVlc3QsIHJlczogTmV4dEFwaVJlc3BvbnNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IHNxbC5jb25uZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgc3FsLnF1ZXJ5YFNFTEVDVCAqIEZST00gW2Rib10uW0Zvcm1TZXJ2aWNlc11gOyBcclxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXN1bHQucmVjb3Jkc2V0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IGVyci5tZXNzYWdlIH0pO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzcWwuY2xvc2UoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGdldFN0b3JlcztcclxuXHJcbiJdLCJuYW1lcyI6WyJzcWwiLCJjb25maWciLCJ1c2VyIiwicGFzc3dvcmQiLCJzZXJ2ZXIiLCJkYXRhYmFzZSIsIm9wdGlvbnMiLCJlbmNyeXB0IiwiZ2V0U3RvcmVzIiwicmVxIiwicmVzIiwiY29ubmVjdCIsInJlc3VsdCIsInF1ZXJ5Iiwic3RhdHVzIiwianNvbiIsInJlY29yZHNldCIsImVyciIsImVycm9yIiwibWVzc2FnZSIsImNsb3NlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/stores.ts\n");

/***/ }),

/***/ "(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fstores&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cstores.ts&middlewareConfigBase64=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fstores&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cstores.ts&middlewareConfigBase64=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   routeModule: () => (/* binding */ routeModule)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/pages-api/module.compiled */ \"(api)/./node_modules/next/dist/server/future/route-modules/pages-api/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(api)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/build/templates/helpers */ \"(api)/./node_modules/next/dist/build/templates/helpers.js\");\n/* harmony import */ var _pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages\\api\\stores.ts */ \"(api)/./pages/api/stores.ts\");\n\n\n\n// Import the userland code.\n\n// Re-export the handler (should be the default export).\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__, \"default\"));\n// Re-export config.\nconst config = (0,next_dist_build_templates_helpers__WEBPACK_IMPORTED_MODULE_2__.hoist)(_pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__, \"config\");\n// Create and export the route module that will be consumed.\nconst routeModule = new next_dist_server_future_route_modules_pages_api_module_compiled__WEBPACK_IMPORTED_MODULE_0__.PagesAPIRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.PAGES_API,\n        page: \"/api/stores\",\n        pathname: \"/api/stores\",\n        // The following aren't used in production.\n        bundlePath: \"\",\n        filename: \"\"\n    },\n    userland: _pages_api_stores_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n\n//# sourceMappingURL=pages-api.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LXJvdXRlLWxvYWRlci9pbmRleC5qcz9raW5kPVBBR0VTX0FQSSZwYWdlPSUyRmFwaSUyRnN0b3JlcyZwcmVmZXJyZWRSZWdpb249JmFic29sdXRlUGFnZVBhdGg9LiUyRnBhZ2VzJTVDYXBpJTVDc3RvcmVzLnRzJm1pZGRsZXdhcmVDb25maWdCYXNlNjQ9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNMO0FBQzFEO0FBQ29EO0FBQ3BEO0FBQ0EsaUVBQWUsd0VBQUssQ0FBQyxpREFBUSxZQUFZLEVBQUM7QUFDMUM7QUFDTyxlQUFlLHdFQUFLLENBQUMsaURBQVE7QUFDcEM7QUFDTyx3QkFBd0IsZ0hBQW1CO0FBQ2xEO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLFlBQVk7QUFDWixDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3RvcmUtbG9jYXRpb25zLz8zMWJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhZ2VzQVBJUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUtbW9kdWxlcy9wYWdlcy1hcGkvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9mdXR1cmUvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgaG9pc3QgfSBmcm9tIFwibmV4dC9kaXN0L2J1aWxkL3RlbXBsYXRlcy9oZWxwZXJzXCI7XG4vLyBJbXBvcnQgdGhlIHVzZXJsYW5kIGNvZGUuXG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiLi9wYWdlc1xcXFxhcGlcXFxcc3RvcmVzLnRzXCI7XG4vLyBSZS1leHBvcnQgdGhlIGhhbmRsZXIgKHNob3VsZCBiZSB0aGUgZGVmYXVsdCBleHBvcnQpLlxuZXhwb3J0IGRlZmF1bHQgaG9pc3QodXNlcmxhbmQsIFwiZGVmYXVsdFwiKTtcbi8vIFJlLWV4cG9ydCBjb25maWcuXG5leHBvcnQgY29uc3QgY29uZmlnID0gaG9pc3QodXNlcmxhbmQsIFwiY29uZmlnXCIpO1xuLy8gQ3JlYXRlIGFuZCBleHBvcnQgdGhlIHJvdXRlIG1vZHVsZSB0aGF0IHdpbGwgYmUgY29uc3VtZWQuXG5leHBvcnQgY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgUGFnZXNBUElSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuUEFHRVNfQVBJLFxuICAgICAgICBwYWdlOiBcIi9hcGkvc3RvcmVzXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvc3RvcmVzXCIsXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgYXJlbid0IHVzZWQgaW4gcHJvZHVjdGlvbi5cbiAgICAgICAgYnVuZGxlUGF0aDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IFwiXCJcbiAgICB9LFxuICAgIHVzZXJsYW5kXG59KTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGFnZXMtYXBpLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?kind=PAGES_API&page=%2Fapi%2Fstores&preferredRegion=&absolutePagePath=.%2Fpages%5Capi%5Cstores.ts&middlewareConfigBase64=e30%3D!\n");

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