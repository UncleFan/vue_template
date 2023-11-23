const webpack = require("webpack");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.plugin("provide").use(webpack.ProvidePlugin, [
      {
        $: "jquery",
        jquery: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      },
    ]),
    config.module.rule("svg").exclude.add(resolve("./src/assets/svg"));
    const svgRule = config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("./src/assets/svg"))
      .end();
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
  },
  devServer: {
    proxy: {
      "/sys": {
        //这里最好有一个 /
        target: "https://api-analysis.guokai-dev.showcode.fun", // 后台接口域名
        ws: true, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {},
      },
    },
  },
};
