const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            plugins: ['@babel/plugin-proposal-class-properties']
                        }
                    },
                    'eslint-loader'
                ]
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/,
              use: [
                'file-loader'
              ],
              exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new CircularDependencyPlugin({
            // exlude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // set the current working directory for displaying module paths
            cwd: process.cwd()
        })
    ]
};