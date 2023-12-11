import {Route} from 'react-router-dom';
import {DriveSettings} from './drive-settings';
import {Fragment} from 'react';

export const AppSettingsRoutes = (
  <Fragment>
    <Route path="drive" element={<DriveSettings />} />
  </Fragment>
);
