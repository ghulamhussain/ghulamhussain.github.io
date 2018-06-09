"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetch = require(`./fetch`);
var normalize = require(`./normalize`);

var typePrefix = `wordpress__`;
var refactoredEntityTypes = {
  post: `${typePrefix}POST`,
  page: `${typePrefix}PAGE`,
  tag: `${typePrefix}TAG`,
  category: `${typePrefix}CATEGORY`

  /* If true, will output many console logs. */
};var _verbose = void 0;
var _siteURL = void 0;
var _useACF = true;
var _hostingWPCOM = void 0;
var _auth = void 0;
var _perPage = void 0;
var _concurrentRequests = void 0;
var _excludedRoutes = void 0;
var _normalizer = void 0;

exports.sourceNodes = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref, _ref2) {
    var boundActionCreators = _ref.boundActionCreators,
        getNode = _ref.getNode,
        store = _ref.store,
        cache = _ref.cache,
        createNodeId = _ref.createNodeId;
    var baseUrl = _ref2.baseUrl,
        protocol = _ref2.protocol,
        hostingWPCOM = _ref2.hostingWPCOM,
        _ref2$useACF = _ref2.useACF,
        useACF = _ref2$useACF === undefined ? true : _ref2$useACF,
        _ref2$auth = _ref2.auth,
        auth = _ref2$auth === undefined ? {} : _ref2$auth,
        verboseOutput = _ref2.verboseOutput,
        _ref2$perPage = _ref2.perPage,
        perPage = _ref2$perPage === undefined ? 100 : _ref2$perPage,
        _ref2$searchAndReplac = _ref2.searchAndReplaceContentUrls,
        searchAndReplaceContentUrls = _ref2$searchAndReplac === undefined ? {} : _ref2$searchAndReplac,
        _ref2$concurrentReque = _ref2.concurrentRequests,
        concurrentRequests = _ref2$concurrentReque === undefined ? 10 : _ref2$concurrentReque,
        _ref2$excludedRoutes = _ref2.excludedRoutes,
        excludedRoutes = _ref2$excludedRoutes === undefined ? [] : _ref2$excludedRoutes,
        normalizer = _ref2.normalizer;
    var createNode, touchNode, entities;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            createNode = boundActionCreators.createNode, touchNode = boundActionCreators.touchNode;

            _verbose = verboseOutput;
            _siteURL = `${protocol}://${baseUrl}`;
            _useACF = useACF;
            _hostingWPCOM = hostingWPCOM;
            _auth = auth;
            _perPage = perPage;
            _concurrentRequests = concurrentRequests;
            _excludedRoutes = excludedRoutes;
            _normalizer = normalizer;

            _context.next = 12;
            return fetch({
              baseUrl,
              _verbose,
              _siteURL,
              _useACF,
              _hostingWPCOM,
              _auth,
              _perPage,
              _concurrentRequests,
              _excludedRoutes,
              typePrefix,
              refactoredEntityTypes
            });

          case 12:
            entities = _context.sent;


            // Normalize data & create nodes

            // Remove ACF key if it's not an object
            entities = normalize.normalizeACF(entities);

            // Creates entities from object collections of entities
            entities = normalize.normalizeEntities(entities);

            // Standardizes ids & cleans keys
            entities = normalize.standardizeKeys(entities);

            // Converts to use only GMT dates
            entities = normalize.standardizeDates(entities);

            // Lifts all "rendered" fields to top-level.
            entities = normalize.liftRenderedField(entities);

            // Exclude entities of unknown shape
            entities = normalize.excludeUnknownEntities(entities);

            // Creates Gatsby IDs for each entity
            entities = normalize.createGatsbyIds(createNodeId, entities);

            // Creates links between authors and user entities
            entities = normalize.mapAuthorsToUsers(entities);

            // Creates links between posts and tags/categories.
            entities = normalize.mapPostsToTagsCategories(entities);

            // Creates links between tags/categories and taxonomies.
            entities = normalize.mapTagsCategoriesToTaxonomies(entities);

            // Creates links from entities to media nodes
            entities = normalize.mapEntitiesToMedia(entities);

            // Downloads media files and removes "sizes" data as useless in Gatsby context.
            _context.next = 26;
            return normalize.downloadMediaFiles({
              entities,
              store,
              cache,
              createNode,
              touchNode,
              _auth
            });

          case 26:
            entities = _context.sent;


            // Creates links between elements and parent element.
            entities = normalize.mapElementsToParent(entities);

            // Search and replace Content Urls
            entities = normalize.searchReplaceContentUrls({
              entities,
              searchAndReplaceContentUrls
            });

            // apply custom normalizer
            if (typeof _normalizer === `function`) {
              entities = _normalizer({
                entities,
                store,
                cache,
                createNode,
                createNodeId,
                touchNode,
                getNode,
                typePrefix,
                refactoredEntityTypes,
                baseUrl,
                protocol,
                _siteURL,
                hostingWPCOM,
                useACF,
                auth,
                verboseOutput,
                perPage,
                searchAndReplaceContentUrls,
                concurrentRequests,
                excludedRoutes
              });
            }

            // creates nodes for each entry
            normalize.createNodesFromEntities({ entities, createNode });

            return _context.abrupt("return");

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();