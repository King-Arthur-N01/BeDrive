import {
  IAppearanceConfig,
  MenuSectionConfig,
} from '../../common/admin/appearance/types/appearance-editor-config';
import {message} from '../../common/i18n/message';
import {LandingPageSectionGeneral} from './sections/landing-page-section/landing-page-section-general';
import {LandingPageSectionActionButtons} from './sections/landing-page-section/landing-page-section-action-buttons';
import {LandingPageSectionPrimaryFeatures} from './sections/landing-page-section/landing-page-section-primary-features';
import {LandingPageSecondaryFeatures} from './sections/landing-page-section/landing-page-section-secondary-features';
import {AppearanceEditorBreadcrumbItem} from '../../common/admin/appearance/types/appearance-editor-section';
import {Route} from 'react-router-dom';
import {Fragment} from 'react';

export const AppAppearanceConfig: IAppearanceConfig = {
  preview: {
    defaultRoute: 'drive',
    navigationRoutes: ['s', 'drive'],
  },
  sections: {
    'landing-page': {
      label: message('Landing Page'),
      position: 1,
      previewRoute: '/',
      routes: (
        <Fragment key="landing-page-routes">
          <Route path="landing-page" element={<LandingPageSectionGeneral />} />
          <Route
            path="landing-page/action-buttons"
            element={<LandingPageSectionActionButtons />}
          />
          <Route
            path="landing-page/primary-features"
            element={<LandingPageSectionPrimaryFeatures />}
          />
          <Route
            path="landing-page/secondary-features"
            element={<LandingPageSecondaryFeatures />}
          />
        </Fragment>
      ),
      buildBreadcrumb: (pathname, formValue) => {
        const parts = pathname.split('/').filter(p => !!p);
        const sectionName = parts.pop();
        // admin/appearance
        const breadcrumb: AppearanceEditorBreadcrumbItem[] = [
          {
            label: message('Landing page'),
            location: 'landing-page',
          },
        ];
        if (sectionName === 'action-buttons') {
          breadcrumb.push({
            label: message('Action buttons'),
            location: 'landing-page/action-buttons',
          });
        }

        if (sectionName === 'primary-features') {
          breadcrumb.push({
            label: message('Primary features'),
            location: 'landing-page/primary-features',
          });
        }

        if (sectionName === 'secondary-features') {
          breadcrumb.push({
            label: message('Secondary features'),
            location: 'landing-page/secondary-features',
          });
        }

        return breadcrumb;
      },
    },
    // missing label will get added by deepMerge from default config
    // @ts-ignore
    menus: {
      config: {
        positions: [
          'drive-navbar',
          'drive-sidebar',
          'homepage-navbar',
          'shareable-link-page',
          'footer',
          'footer-secondary',
        ],
        availableRoutes: [
          '/drive',
          '/drive/shares',
          '/drive/recent',
          '/drive/starred',
          '/drive/trash',
          '/drive/workspaces',
        ],
      } as MenuSectionConfig,
    },
  },
};
