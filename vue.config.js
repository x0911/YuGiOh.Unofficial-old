let productName = "YuGiOh - Unofficial";
module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true,
  transpileDependencies: ["vuetify", "@firebase"],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName,
        appId: "com.dash.yugioh",
        win: {
          icon: "public/icons/icon.ico"
          // target: [
          //   {
          //     target: "nsis",
          //     arch: ["x64", "ia32"]
          //   }
          // ],
          // publisherName: "Hamdi Mohamed"
        }
        // nsis: {
        //   allowToChangeInstallationDirectory: true,
        //   oneClick: false,
        //   perMachine: true,
        //   runAfterFinish: false,
        //   license: "public/Licence.html",
        //   uninstallerIcon: "public/icons/uninstallerIcon.ico"
        // }
      }
    }
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true
    }
  },
  devServer: {
    host: "localhost"
  },
  chainWebpack: config => {
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader");
    config.plugin("html").tap(args => {
      args[0].title = productName;
      args[0]["version"] = require("./package.json").version;
      return args;
    });
  }
};
