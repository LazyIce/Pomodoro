const path = require('path')

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
  
    devtool: "source-map",
  
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
  
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.scss$/, loader: "style-loader!css-loader"},
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader'},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
  
    plugins: [
    ],
  };