// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

// Notes
//
// This webpack config is only to include `src/messages.js` in the final build.
// This way, other repos can access these messages via:
// `import messages from '@parity/dapp-dapp-methods/messages';`
// -Amaury 28.03.2018

const path = require('path');

module.exports = {
  entry: './src/messages.js',
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../build'),
    filename: 'messages.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
