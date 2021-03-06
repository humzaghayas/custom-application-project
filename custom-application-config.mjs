import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptions}
 */
const config = {
  name: 'Rc Ct Poc',
  entryPointUriPath,
  cloudIdentifier: 'gcp-au',
  env: {
    development: {
      initialProjectKey: 'rc-ct-poc',
    },

    production: {
      applicationId: 'cl0jbiwby1105301td9ucg1twp',
      url: 'https://custom-application-project.pages.dev',
    },
  },

  oAuthScopes: {
    view: ['view_products'],
    manage: ['manage_key_value_documents'],
  },

  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Rc Ct Poc',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },

  submenuLinks: [
    /*{
      uriPath: 'channels',
      defaultLabel: 'Channels',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },*/
    {
      uriPath: 'uploadclaim',
      defaultLabel: 'Add Claim',
      labelAllLocales: [],
      permissions: [PERMISSIONS.Manage],
    },
    {
      uriPath: 'viewclaims',
      defaultLabel: 'View Claims',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
  ],
};

export default config;
