module.exports = function override(config, env) {
  // Force webpack to use polling for file watching
  config.watchOptions = {
    poll: 1000, // Check for changes every second
    aggregateTimeout: 300,
    ignored: /node_modules/
  };
  
  // Ensure dev server uses polling
  if (config.devServer) {
    config.devServer.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
      ignored: /node_modules/
    };
  }
  
  return config;
};