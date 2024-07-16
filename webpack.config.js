module.exports = (env) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
  const envConfig = require(`./build-utils/webpack.${env.env}.js`);

  return envConfig;
};
