const webpack = require('webpack');

module.exports = function override(config, env) {
    // Add polyfills for Node.js core modules
    config.resolve.fallback = {
        url: require.resolve('url'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        // os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
    };

    // Add support for TypeScript and JavaScript file extensions
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];

    // Add plugins to provide polyfills
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
    ];

    return config;
}
