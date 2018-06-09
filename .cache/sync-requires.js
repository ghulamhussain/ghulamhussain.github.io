// prefer default export if available
const preferDefault = m => m && m.default || m


exports.layouts = {
  "layout---index": preferDefault(require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/layouts/index.js"))
}

exports.components = {
  "component---src-templates-page-js": preferDefault(require("/home/ghulamhussain/my/ghulamhussain.github.io/src/templates/page.js")),
  "component---src-templates-post-js": preferDefault(require("/home/ghulamhussain/my/ghulamhussain.github.io/src/templates/post.js")),
  "component---cache-dev-404-page-js": preferDefault(require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/dev-404-page.js")),
  "component---src-pages-404-js": preferDefault(require("/home/ghulamhussain/my/ghulamhussain.github.io/src/pages/404.js")),
  "component---src-pages-blog-js": preferDefault(require("/home/ghulamhussain/my/ghulamhussain.github.io/src/pages/blog.js")),
  "component---src-pages-index-js": preferDefault(require("/home/ghulamhussain/my/ghulamhussain.github.io/src/pages/index.js"))
}

exports.json = {
  "layout-index.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/layout-index.json"),
  "projects.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/projects.json"),
  "home-page.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/home-page.json"),
  "blog-email-automation-with-node-and-dropbox.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/blog-email-automation-with-node-and-dropbox.json"),
  "blog-site-generating-with-the-great-gatsbyjs.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/blog-site-generating-with-the-great-gatsbyjs.json"),
  "dev-404-page.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/dev-404-page.json"),
  "404.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/404.json"),
  "blog.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/blog.json"),
  "index.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/index.json"),
  "404-html.json": require("/home/ghulamhussain/my/ghulamhussain.github.io/.cache/json/404-html.json")
}