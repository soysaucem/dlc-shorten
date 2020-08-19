const apiPrefix = '/api';
const dashboardPrefix = '/dashboard';

export const routes = {
  home: '/',
  auth: {
    login: '/login',
    signup: '/signup',
  },
  dashboard: {
    home: `${dashboardPrefix}`,
    links: `${dashboardPrefix}/links`,
    editLink: (id) => `${dashboardPrefix}/links/${id}/edit`,
    profile: `${dashboardPrefix}/profile`,
  },
  api: {
    shortenLink: `${apiPrefix}/shorten`,
    auth: {
      login: `${apiPrefix}/login`,
      signup: `${apiPrefix}/signup`,
      logout: `${apiPrefix}/logout`,
    },
    users: {
      id: `${apiPrefix}/users/:id`,
      shortenUrls: `${apiPrefix}/users/:id/shortenUrls`,
    },
    links: {
      base: `${apiPrefix}/links`,
      edit: (id) => `${apiPrefix}/links/${id}/edit`,
      delete: (id) => `${apiPrefix}/links/${id}/delete`,
    },
  },
};
