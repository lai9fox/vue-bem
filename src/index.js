import vueBem from './core/index.js';
import { kebabCase } from 'lodash-es';

/**
 * @param {Vue} Vue Vue 构造器
 * @param {object} options 配置项
 */
function install(Vue, options) {
  const version = Number(Vue.version.split('.')[0]);
  vueBem.configure(options || {});
  if (version === 2) {
    Vue.prototype.$bem = function(description, modifier) {
      const namespace = this.$options.bemNamespace || this.$options.name; // 自定义属性名 || 组件名
      if (!namespace) {
        throw new Error("Set at least one of the attributes 'bemNamespace' or 'name'.");
      }
      const bem = vueBem.createBem(kebabCase(namespace));
      return bem(description, modifier);
    };
  } else if (version === 3) {
    //
  } else {
    throw new Error(`vue-bem do not support version ${ version }.`);
  }
}

export default install;

export { vueBem };
