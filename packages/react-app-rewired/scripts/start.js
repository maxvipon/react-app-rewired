process.env.NODE_ENV = process.env.NODE_ENV || "development";

const paths = require("./utils/paths");
const overrides = require('../config-overrides');
const webpackConfigPath = paths.scriptVersion + "/config/webpack.config.dev";
const devServerConfigPath = paths.scriptVersion + "/config/webpackDevServer.config.js";

// load environment variables from .env files
require(paths.scriptVersion + '/config/env');
// load original configs
const webpackConfig = require(webpackConfigPath);
const devServerConfigFn = require(devServerConfigPath);
// override config in memory
require.cache[require.resolve(webpackConfigPath)].exports =
  overrides.webpack(webpackConfig, process.env.NODE_ENV);

require.cache[require.resolve(devServerConfigPath)].exports = (proxy, allowedHost) => {
  config = devServerConfigFn(proxy, allowedHost);
  return overrides.devServer(config);
}

// run original script
require(paths.scriptVersion + "/scripts/start");
