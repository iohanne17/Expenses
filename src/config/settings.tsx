/**
 * settings.js
 * Internal settings and configurations for various aspects of the mobile app project
 */

const namespace = 'my-expenses';

const devSettings = {
  namespace,
  uri: 'http://localhost:3000',
};

const prodSettings = {
  ...devSettings,
};

const settings =
  process.env.NODE_ENV === 'production' ? prodSettings : devSettings;
export default settings;
