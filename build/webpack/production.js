import webpack           from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpackConfig     from './_base';


webpackConfig.module.loaders = webpackConfig.module.loaders.map(loader => {
  if (/css/.test(loader.test)) {
    const [first, ...rest] = loader.loaders;

    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
    delete loader.loaders;
  }

  return loader;
});
//
// webpackConfig.module.loaders.push({
//   test: /constants\/app.js$/, loader: StringReplacePlugin.replace({
//     replacements: [
//       {
//         pattern: 'API_URL = \'http://localhost:1337/v1\';'
//       }
//     ]
//   })
// });

webpackConfig.plugins.push(
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress : {
      'unused'    : true,
      'dead_code' : true
    }
  })
);

export default webpackConfig;
