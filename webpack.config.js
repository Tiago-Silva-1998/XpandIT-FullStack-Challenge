const path = require('path')

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ]
            }
        ],
    },
    entry: './client/src/index.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'client/public')
    }
};