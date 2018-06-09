"use strict";

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * High-level function to coordinate fetching data from a WordPress
 * site.
 */
var fetch = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var baseUrl = _ref.baseUrl,
        _verbose = _ref._verbose,
        _siteURL = _ref._siteURL,
        _useACF = _ref._useACF,
        _hostingWPCOM = _ref._hostingWPCOM,
        _auth = _ref._auth,
        _perPage = _ref._perPage,
        _concurrentRequests = _ref._concurrentRequests,
        _excludedRoutes = _ref._excludedRoutes,
        typePrefix = _ref.typePrefix,
        refactoredEntityTypes = _ref.refactoredEntityTypes;

    var url, _accessToken, allRoutes, options, entities, validRoutes, _iterator, _isArray, _i, _ref3, route;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // If the site is hosted on wordpress.com, the API Route differs.
            // Same entity types are exposed (excepted for medias and users which need auth)
            // but the data model contain slights variations.
            url = void 0;
            _accessToken = void 0;

            if (!_hostingWPCOM) {
              _context.next = 9;
              break;
            }

            url = `https://public-api.wordpress.com/wp/v2/sites/${baseUrl}`;
            _context.next = 6;
            return getWPCOMAccessToken(_auth);

          case 6:
            _accessToken = _context.sent;
            _context.next = 10;
            break;

          case 9:
            url = `${_siteURL}/wp-json`;

          case 10:

            if (_verbose) console.log();
            if (_verbose) console.log(colorized.out(`=START PLUGIN=====================================`, colorized.color.Font.FgBlue));
            if (_verbose) console.time(`=END PLUGIN=====================================`);
            if (_verbose) console.log(``);
            if (_verbose) console.log(colorized.out(`Site URL: ${_siteURL}`, colorized.color.Font.FgBlue));
            if (_verbose) console.log(colorized.out(`Site hosted on Wordpress.com: ${_hostingWPCOM}`, colorized.color.Font.FgBlue));
            if (_verbose) console.log(colorized.out(`Using ACF: ${_useACF}`, colorized.color.Font.FgBlue));
            if (_verbose) console.log(colorized.out(`Using Auth: ${_auth.htaccess_user} ${_auth.htaccess_pass}`, colorized.color.Font.FgBlue));
            if (_verbose) console.log(colorized.out(`Verbose output: ${_verbose}`, colorized.color.Font.FgBlue));
            if (_verbose) console.log(``);
            if (_verbose) console.log(colorized.out(`Mama Route URL: ${url}`, colorized.color.Font.FgBlue));
            if (_verbose) console.log(``);

            // Call the main API Route to discover the all the routes exposed on this API.
            allRoutes = void 0;
            _context.prev = 23;
            options = {
              method: `get`,
              url: url
            };

            if (_auth) {
              options.auth = {
                username: _auth.htaccess_user,
                password: _auth.htaccess_pass
              };
            }
            _context.next = 28;
            return axios(options);

          case 28:
            allRoutes = _context.sent;
            _context.next = 34;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](23);

            httpExceptionHandler(_context.t0);

          case 34:
            entities = [];

            if (!allRoutes) {
              _context.next = 63;
              break;
            }

            validRoutes = getValidRoutes({
              allRoutes,
              url,
              baseUrl,
              _verbose,
              _useACF,
              _hostingWPCOM,
              _excludedRoutes,
              typePrefix,
              refactoredEntityTypes
            });


            if (_verbose) console.log(``);
            if (_verbose) console.log(colorized.out(`Fetching the JSON data from ${validRoutes.length} valid API Routes...`, colorized.color.Font.FgBlue));
            if (_verbose) console.log(``);

            _iterator = validRoutes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();

          case 41:
            if (!_isArray) {
              _context.next = 47;
              break;
            }

            if (!(_i >= _iterator.length)) {
              _context.next = 44;
              break;
            }

            return _context.abrupt("break", 60);

          case 44:
            _ref3 = _iterator[_i++];
            _context.next = 51;
            break;

          case 47:
            _i = _iterator.next();

            if (!_i.done) {
              _context.next = 50;
              break;
            }

            return _context.abrupt("break", 60);

          case 50:
            _ref3 = _i.value;

          case 51:
            route = _ref3;
            _context.t1 = entities;
            _context.next = 55;
            return fetchData({
              route,
              _verbose,
              _perPage,
              _hostingWPCOM,
              _auth,
              _accessToken,
              _concurrentRequests
            });

          case 55:
            _context.t2 = _context.sent;
            entities = _context.t1.concat.call(_context.t1, _context.t2);

            if (_verbose) console.log(``);

          case 58:
            _context.next = 41;
            break;

          case 60:

            if (_verbose) console.timeEnd(`=END PLUGIN=====================================`);
            _context.next = 64;
            break;

          case 63:
            console.log(colorized.out(`No routes to fetch. Ending.`, colorized.color.Font.FgRed));

          case 64:
            return _context.abrupt("return", entities);

          case 65:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[23, 31]]);
  }));

  return function fetch(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Gets wordpress.com access token so it can fetch private data like medias :/
 *
 * @returns
 */


var getWPCOMAccessToken = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_auth) {
    var result, oauthUrl, options;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = void 0;
            oauthUrl = `https://public-api.wordpress.com/oauth2/token`;
            _context2.prev = 2;
            options = {
              url: oauthUrl,
              method: `post`,
              data: querystring.stringify({
                client_secret: _auth.wpcom_app_clientSecret,
                client_id: _auth.wpcom_app_clientId,
                username: _auth.wpcom_user,
                password: _auth.wpcom_pass,
                grant_type: `password`
              })
            };
            _context2.next = 6;
            return axios(options);

          case 6:
            result = _context2.sent;

            result = result.data.access_token;
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);

            httpExceptionHandler(_context2.t0);

          case 13:
            return _context2.abrupt("return", result);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 10]]);
  }));

  return function getWPCOMAccessToken(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Fetch the data from specified route url, using the auth provided.
 *
 * @param {any} route
 * @param {any} createNode
 */


var fetchData = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref5) {
    var route = _ref5.route,
        _verbose = _ref5._verbose,
        _perPage = _ref5._perPage,
        _hostingWPCOM = _ref5._hostingWPCOM,
        _auth = _ref5._auth,
        _accessToken = _ref5._accessToken,
        _concurrentRequests = _ref5._concurrentRequests;

    var type, url, routeResponse, entities, _iterator2, _isArray2, _i2, _ref7, menu, length;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            type = route.type;
            url = route.url;


            if (_verbose) console.log(colorized.out(`=== [ Fetching ${type} ] ===`, colorized.color.Font.FgBlue), url);
            if (_verbose) console.time(`Fetching the ${type} took`);

            _context3.next = 6;
            return getPages({
              url,
              _perPage,
              _hostingWPCOM,
              _auth,
              _accessToken,
              _verbose,
              _concurrentRequests
            }, 1);

          case 6:
            routeResponse = _context3.sent;
            entities = [];

            if (!routeResponse) {
              _context3.next = 34;
              break;
            }

            // Process entities to creating GraphQL Nodes.
            if (Array.isArray(routeResponse)) {
              routeResponse = routeResponse.map(function (r) {
                return (0, _extends3.default)({}, r, { __type: type });
              });
              entities = entities.concat(routeResponse);
            } else {
              routeResponse.__type = type;
              entities.push(routeResponse);
            }
            // WordPress exposes the menu items in meta links.

            if (!(type == `wordpress__wp_api_menus_menus`)) {
              _context3.next = 31;
              break;
            }

            _iterator2 = routeResponse, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();

          case 12:
            if (!_isArray2) {
              _context3.next = 18;
              break;
            }

            if (!(_i2 >= _iterator2.length)) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("break", 31);

          case 15:
            _ref7 = _iterator2[_i2++];
            _context3.next = 22;
            break;

          case 18:
            _i2 = _iterator2.next();

            if (!_i2.done) {
              _context3.next = 21;
              break;
            }

            return _context3.abrupt("break", 31);

          case 21:
            _ref7 = _i2.value;

          case 22:
            menu = _ref7;

            if (!(menu.meta && menu.meta.links && menu.meta.links.self)) {
              _context3.next = 29;
              break;
            }

            _context3.t0 = entities;
            _context3.next = 27;
            return fetchData({
              route: { url: menu.meta.links.self, type: `${type}_items` },
              _verbose,
              _perPage,
              _hostingWPCOM,
              _auth,
              _accessToken
            });

          case 27:
            _context3.t1 = _context3.sent;
            entities = _context3.t0.concat.call(_context3.t0, _context3.t1);

          case 29:
            _context3.next = 12;
            break;

          case 31:
            // TODO : Get the number of created nodes using the nodes in state.
            length = void 0;

            if (routeResponse && Array.isArray(routeResponse)) {
              length = routeResponse.length;
            } else if (routeResponse && !Array.isArray(routeResponse)) {
              length = Object.keys(routeResponse).length;
            }
            console.log(colorized.out(` -> ${type} fetched : ${length}`, colorized.color.Font.FgGreen));

          case 34:

            if (_verbose) {
              console.timeEnd(`Fetching the ${type} took`);
            }

            return _context3.abrupt("return", entities);

          case 36:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function fetchData(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

/**
 * Get the pages of data
 *
 * @param {any} url
 * @param {number} [page=1]
 * @returns
 */


var getPages = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(_ref8) {
    var url = _ref8.url,
        _perPage = _ref8._perPage,
        _hostingWPCOM = _ref8._hostingWPCOM,
        _auth = _ref8._auth,
        _accessToken = _ref8._accessToken,
        _concurrentRequests = _ref8._concurrentRequests,
        _verbose = _ref8._verbose;
    var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    var result, getOptions, options, _ref10, headers, data, wpTotal, total, totalPages, pageOptions, pages, pageData;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            result = [];

            getOptions = function getOptions(page) {
              var o = {
                method: `get`,
                url: `${url}?${querystring.stringify({
                  per_page: _perPage,
                  page: page
                })}`
              };
              if (_hostingWPCOM) {
                o.headers = {
                  Authorization: `Bearer ${_accessToken}`
                };
              } else {
                o.auth = _auth ? { username: _auth.htaccess_user, password: _auth.htaccess_pass } : null;
              }
              return o;
            };

            // Initial request gets the first page of data
            // but also the total count of objects, used for
            // multiple concurrent requests (rather than waterfall)


            options = getOptions(page);
            _context4.next = 6;
            return axios(options);

          case 6:
            _ref10 = _context4.sent;
            headers = _ref10.headers;
            data = _ref10.data;


            result = result.concat(data);

            // Some resources have no paging, e.g. `/types`
            wpTotal = headers[`x-wp-total`];
            total = parseInt(wpTotal);
            totalPages = parseInt(headers[`x-wp-totalpages`]);

            if (!(!wpTotal || totalPages <= 1)) {
              _context4.next = 15;
              break;
            }

            return _context4.abrupt("return", result);

          case 15:

            if (_verbose) {
              console.log(`\nTotal entities :`, total);
              console.log(`Pages to be requested :`, totalPages);
            }

            // We got page 1, now we want pages 2 through totalPages
            pageOptions = _.range(2, totalPages + 1).map(function (getPage) {
              return getOptions(getPage);
            });
            _context4.next = 19;
            return requestInQueue(pageOptions, {
              concurrent: _concurrentRequests
            });

          case 19:
            pages = _context4.sent;
            pageData = pages.map(function (page) {
              return page.data;
            });

            pageData.forEach(function (list) {
              result = result.concat(list);
            });

            return _context4.abrupt("return", result);

          case 25:
            _context4.prev = 25;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", httpExceptionHandler(_context4.t0));

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 25]]);
  }));

  return function getPages(_x5) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * Extract valid routes and format its data.
 *
 * @param {any} allRoutes
 * @param {any} url
 * @param {any} baseUrl
 * @returns
 */


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var querystring = require(`querystring`);
var axios = require(`axios`);
var _ = require(`lodash`);
var minimatch = require(`minimatch`);
var colorized = require(`./output-color`);
var httpExceptionHandler = require(`./http-exception-handler`);
var requestInQueue = require(`./request-in-queue`);function getValidRoutes(_ref11) {
  var allRoutes = _ref11.allRoutes,
      url = _ref11.url,
      baseUrl = _ref11.baseUrl,
      _verbose = _ref11._verbose,
      _useACF = _ref11._useACF,
      _hostingWPCOM = _ref11._hostingWPCOM,
      _excludedRoutes = _ref11._excludedRoutes,
      typePrefix = _ref11.typePrefix,
      refactoredEntityTypes = _ref11.refactoredEntityTypes;

  var validRoutes = [];
  for (var _iterator3 = Object.keys(allRoutes.data.routes), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
    var _ref12;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref12 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref12 = _i3.value;
    }

    var key = _ref12;

    if (_verbose) console.log(`Route discovered :`, key);
    var route = allRoutes.data.routes[key];

    // A valid route exposes its _links (for now)
    if (route._links) {
      (function () {
        var entityType = getRawEntityType(route);

        // Excluding the "technical" API Routes
        var excludedTypes = [undefined, `v2`, `v3`, `1.0`, `2.0`, `embed`, `proxy`, ``, baseUrl];

        var routePath = getRoutePath(url, route._links.self);

        if (excludedTypes.includes(entityType)) {
          if (_verbose) console.log(colorized.out(`Invalid route.`, colorized.color.Font.FgRed));
        } else if (_excludedRoutes.some(function (excludedRoute) {
          return minimatch(routePath, excludedRoute);
        })) {
          if (_verbose) console.log(colorized.out(`Excluded route from excludedRoutes pattern.`, colorized.color.Font.FgYellow));
        } else {
          if (_verbose) console.log(colorized.out(`Valid route found. Will try to fetch.`, colorized.color.Font.FgGreen));

          var manufacturer = getManufacturer(route);

          var rawType = ``;
          if (manufacturer === `wp`) {
            rawType = `${typePrefix}${entityType}`;
          }

          var validType = void 0;
          switch (rawType) {
            case `${typePrefix}posts`:
              validType = refactoredEntityTypes.post;
              break;
            case `${typePrefix}pages`:
              validType = refactoredEntityTypes.page;
              break;
            case `${typePrefix}tags`:
              validType = refactoredEntityTypes.tag;
              break;
            case `${typePrefix}categories`:
              validType = refactoredEntityTypes.category;
              break;
            default:
              validType = `${typePrefix}${manufacturer.replace(/-/g, `_`)}_${entityType.replace(/-/g, `_`)}`;
              break;
          }
          validRoutes.push({ url: route._links.self, type: validType });
        }
      })();
    } else {
      if (_verbose) console.log(colorized.out(`Invalid route.`, colorized.color.Font.FgRed));
    }
  }

  if (_useACF) {
    // The OPTIONS ACF API Route is not giving a valid _link so let`s add it manually.
    validRoutes.push({
      url: `${url}/acf/v2/options`,
      type: `${typePrefix}acf_options`
    });
    if (_verbose) console.log(colorized.out(`Added ACF Options route.`, colorized.color.Font.FgGreen));
    if (_hostingWPCOM) {
      // TODO : Need to test that out with ACF on Wordpress.com hosted site. Need a premium account on wp.com to install extensions.
      if (_verbose) console.log(colorized.out(`The ACF options pages is untested under wordpress.com hosting. Please let me know if it works.`, colorized.color.Effect.Blink));
    }
  }

  return validRoutes;
}

/**
 * Extract the raw entity type from route
 *
 * @param {any} route
 */
var getRawEntityType = function getRawEntityType(route) {
  return route._links.self.substring(route._links.self.lastIndexOf(`/`) + 1, route._links.self.length);
};

/**
 * Extract the route path for an endpoint
 *
 * @param {any} baseUrl The base site URL that should be removed
 * @param {any} fullUrl The full URL to retrieve the route path from
 */
var getRoutePath = function getRoutePath(baseUrl, fullUrl) {
  return fullUrl.replace(baseUrl, ``);
};

/**
 * Extract the route manufacturer
 *
 * @param {any} route
 */
var getManufacturer = function getManufacturer(route) {
  return route.namespace.substring(0, route.namespace.lastIndexOf(`/`));
};

module.exports = fetch;