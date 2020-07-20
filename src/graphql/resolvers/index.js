import authResolver from "./authResolver";
import testResolver from './test'

const rootResolver = {
  ...authResolver,
  ...testResolver
};

module.exports = rootResolver;
