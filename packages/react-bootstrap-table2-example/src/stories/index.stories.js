/* eslint import/no-unresolved: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';

// welcome
import Welcome from '../../examples/welcome';

storiesOf('Welcome', module).add('react bootstrap table 2 ', () => <Welcome />);

