/* eslint import/no-unresolved: 0 */
import React from 'react';
import { storiesOf } from '@storybook/react';

// welcome
import Welcome from 'examples/welcome';


// import bootstrap style by given version
import bootstrapStyle, { BOOTSTRAP_VERSION } from './bootstrap-style';

storiesOf('Welcome', module).add('react bootstrap table 2 ', () => <Welcome />);

