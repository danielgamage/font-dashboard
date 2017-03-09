const __DEV__ = (process.env.NODE_ENV !== "production");
module.exports = {
  "use": [
    "postcss-url",
    "postcss-import",
    "postcss-cssnext",
    "postcss-browser-reporter",
    "cssnano"
  ],
	"input": "src/css/style.css",
	"output": "src/style.css",
	"local-plugins": true,
	"watch": __DEV__,
  "map": __DEV__,
  "postcss-cssnext": {
    "features": {
      "customProperties": {
        "preserve": true
      }
    },
    "browsers": "> 2%"
  },
  "cssnano" : {
    "discardComments": {
      "removeAll": true
    }
  }
};
