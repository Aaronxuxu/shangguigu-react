const { aliyunTheme } = require("@ant-design/aliyun-theme");
const {
  override,
  fixBabelImports,
  addLessLoader,
  adjustStyleLoaders,
} = require("customize-cra");
module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: aliyunTheme,
      javascriptEnabled: true,
    },
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  })
);
