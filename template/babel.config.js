module.exports = {
  "presets": [
  ["@babel/env", {
    "modules": false,
    "targets": {
      "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
    }
  }]
],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
    "transform-vue-jsx"{{#if_eq hasComponent "Yes"}},
    ["import", {
      "libraryName": "@varied/mobile",
      "libraryDirectory": "es",
      "style": name => `${name}/style`
    }]
    {{/if_eq}}
      {{#if_eq hasHotUpdate "Yes"}},
      ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }, 'vant']
    {{/if_eq}}
],
  "env": {
    "test": {
      "presets": ["@babel/env"],
        "plugins": ["@babel/plugin-syntax-jsx", "istanbul"]
    }
  }
};
