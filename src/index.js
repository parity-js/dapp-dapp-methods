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

import ReactDOM from 'react-dom';
import React from 'react';
import ContextProvider from '@parity/ui/lib/ContextProvider';
import { Provider as MobxProvider } from 'mobx-react';
import DappsStore from '@parity/mobx/lib/dapps/DappsStore';
import DappsPermissionsStore from '@parity/mobx/lib/dapps/DappsPermissionsStore';

import api from './api';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';

registerServiceWorker();

const rootStore = {
  dappsStore: DappsStore.get(api),
  dappsPermissionsStore: DappsPermissionsStore.get(api)
};

ReactDOM.render(
  <ContextProvider api={api}>
    <MobxProvider {...rootStore}>
      <App />
    </MobxProvider>
  </ContextProvider>,
  document.querySelector('#root')
);
