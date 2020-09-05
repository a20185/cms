module.exports = {
  configureWebpack: {
    module: {
      rules: [
        { test: /\.ejs$/, use: "text-loader" },
        { test: /\.txt$/, use: "text-loader" },
      ],
    },
  },

  runtimeCompiler: true
};
