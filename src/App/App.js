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

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Page from '@parity/ui/lib/Page';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';

import DappCard from '../DappCard';
import styles from './App.css';

export class App extends Component {
  static propTypes = {
    dappsPermissionsStore: PropTypes.object.isRequired
  };

  state = {
    selectedDapp: null
  };

  handleSelectDapp = appId => {
    if (this.state.selectedDapp === appId) {
      this.setState({ selectedDapp: null });
    } else {
      this.setState({ selectedDapp: appId });
    }
  };

  handleToggleAppPermissions = (method, appId) => {
    const { dappsPermissionsStore } = this.props;
    if (dappsPermissionsStore.hasAppPermission(method, appId)) {
      dappsPermissionsStore.removeAppPermission(method, appId);
    } else {
      dappsPermissionsStore.addAppPermission(method, appId);
    }
  };

  render() {
    const { dappsStore } = this.props;

    return (
      <Page
        title={
          <FormattedMessage
            id="dapps.methods.title"
            defaultMessage="Allowed methods"
          />
        }
      >
        <Card.Group stackable className={styles.cardGroup}>
          {dappsStore.apps.map((dapp, index) => (
            <DappCard
              key={`${dapp.id}-${index}`}
              editingMode={dapp.id === this.state.selectedDapp}
              dapp={dapp}
              onEdit={this.handleSelectDapp}
              onToggle={this.handleToggleAppPermissions}
            />
          ))}
        </Card.Group>
      </Page>
    );
  }
}

export default inject('dappsStore', 'dappsPermissionsStore')(observer(App));
