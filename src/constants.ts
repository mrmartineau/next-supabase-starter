import { RequestOrder } from './types/api';

export const ALLOW_SIGNUP = false;
export const SETTINGS = {
  ALLOW_SIGNUP: false,
};
export const CONTENT = {
  appName: 'Starter',
  appNameLong: 'Next.js starter with Supabase',
  titleSeparator: ' — ',
  appNav: 'App',
  dashboardNav: 'Dashboard',
  feedTitle: 'Feed',
  feedNav: 'Feed',
  searchTitle: 'Search',
  newDescription: 'Add new item',
  topLinksTitle: 'Top links',
  topLinksNav: 'Top links',
  trashNav: 'Trash',
  settingsNav: 'Account',
  accountSettingsTitle: 'Account, settings & integrations',
  signInTitle: 'Sign in',
  signupTitle: 'Register',
  signOutNav: 'Sign out',

  // used in the feed pagination area
  noItems: 'No items',
  newerBtn: 'Newer',
  noNewerItems: 'No newer items',
  olderBtn: 'Older',
  noOlderItems: 'No older items',

  // used in the feed popover
  latestRssItems: 'Latest RSS feed items',
};

export const createTitle = (pageName?: string) => {
  // @ts-ignore
  const theTitle = pageName ? CONTENT[pageName] || pageName : '';
  return `${theTitle ? `${theTitle}${CONTENT.titleSeparator}` : ''}${
    CONTENT.appNameLong
  }`;
};

// App Routes
export const ROUTES = {
  HOME: '/',
  APP: '/app',
  DASHBOARD: '/dashboard',
  FEED: '/feed',
  SEARCH: '/search',
  SETTINGS: '/settings',
  SETTINGS_ACCOUNT: '/settings/account',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  NEW: '/new',
  EDIT: '/edit',
};

export const API_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export const DEFAULT_API_RESPONSE_LIMIT = 20;
export const DEFAULT_API_RESPONSE_ORDER: RequestOrder = 'desc';
