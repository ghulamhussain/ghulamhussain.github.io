"use strict";

var fs = require(`fs`);
var fetchData = require(`../fetch`);

// Fetch data from our sample site and save it to disk.

var typePrefix = `wordpress__`;
var refactoredEntityTypes = {
  post: `${typePrefix}POST`,
  page: `${typePrefix}PAGE`,
  tag: `${typePrefix}TAG`,
  category: `${typePrefix}CATEGORY`
};

fetchData({
  _verbose: false,
  _siteURL: `http://dev-gatbsyjswp.pantheonsite.io`,
  baseUrl: `dev-gatbsyjswp.pantheonsite.io`,
  _useACF: true,
  _hostingWPCOM: false,
  _perPage: 100,
  typePrefix,
  refactoredEntityTypes
}).then(function (data) {
  fs.writeFileSync(`${__dirname}/../__tests__/data.json`, JSON.stringify(data, null, 4));
});