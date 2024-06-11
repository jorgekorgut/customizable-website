module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  proxy: env.bool('PROXY', true),
  url: env('URL', 'http://localhost:1337'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
