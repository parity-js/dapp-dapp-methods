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

import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import DappsPermissionsStore from '@parity/mobx/lib/dapps/DappsPermissionsStore';
import DappsStore from '@parity/mobx/lib/dapps/DappsStore';

import { shallowWithIntl } from '../setupTests';
import { App } from './App';
import DappCard from '../DappCard';

const mockApps = [{ id: '123', name: '123' }, { id: '456', name: '456' }];
const mockPermissions = { 'shell_loadApp:123': true };
const mockApi = {
  shell: {
    getApps: () => Promise.resolve(mockApps),
    getMethodPermissions: () => Promise.resolve(mockPermissions),
    setMethodPermissions: () => Promise.resolve()
  }
};

const props = {
  dappsPermissionsStore: DappsPermissionsStore.get(mockApi),
  dappsStore: DappsStore.get(mockApi)
};

test('should render correctly', () => {
  const component = shallowWithIntl(<App {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should select a dapp when we click on its edit button', () => {
  const component = shallowWithIntl(<App {...props} />);

  component
    .find(DappCard)
    .last()
    .props()
    .onEdit('456');

  expect(component.state().selectedDapp).toEqual('456');
});

test('should render correctly when a dapp is selected', () => {
  const component = shallowWithIntl(<App {...props} />);
  component.setState({ selectedDapp: '456' });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should deselect a dapp when we click again on its edit button', () => {
  const component = shallowWithIntl(<App {...props} />);
  component.setState({ selectedDapp: '456' });

  component
    .find(DappCard)
    .last()
    .props()
    .onEdit('456');

  expect(component.state().selectedDapp).toEqual(null);
});

test('should call removeAppPermission when clicking on an existing permission', () => {
  const removeAppPermission = jest.fn();
  const dappsPermissionsStore = new DappsPermissionsStore(mockApi);
  dappsPermissionsStore.removeAppPermission = removeAppPermission;
  const component = shallowWithIntl(
    <App {...props} dappsPermissionsStore={dappsPermissionsStore} />
  );

  expect.assertions(1);
  // Wait for store to load permissions before clicking on toggle DappCard
  return dappsPermissionsStore.loadPermissions().then(() => {
    component
      .find(DappCard)
      .first()
      .props()
      .onToggle('shell_loadApp', '123');

    expect(removeAppPermission).toHaveBeenCalledWith('shell_loadApp', '123');
  });
});

test('should call addAppPermission when clicking on a non-existing permission', () => {
  const addAppPermission = jest.fn();
  const dappsPermissionsStore = new DappsPermissionsStore(mockApi);
  dappsPermissionsStore.addAppPermission = addAppPermission;
  const component = shallowWithIntl(
    <App {...props} dappsPermissionsStore={dappsPermissionsStore} />
  );

  expect.assertions(1);
  // Wait for store to load permissions before clicking on toggle DappCard
  return dappsPermissionsStore.loadPermissions().then(() => {
    component
      .find(DappCard)
      .first()
      .props()
      .onToggle('shell_getApps', '123');

    expect(addAppPermission).toHaveBeenCalledWith('shell_getApps', '123');
  });
});
