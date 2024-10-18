const path = require('path')

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    entry: './client/src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client/public')
    }
};