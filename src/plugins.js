import vueBem from './index.js';
import { kebabCase } from 'lodash-es';

/**
 * @param {Vue} Vue Vue 构造器
 * @param {object} options 配置项
 */
function install(Vue, options) {
  const version = Number(Vue.version.split('.')[0]);
  vueBem.configure(options);
  if (version === 2) {
    Vue.prototype.$bem = function() {
      // 自定义属性名
      const bemNameSpace = this.$options.bemNameSpace;
      // 组件名
      const name = this.$options.name;
      // 文件名 kebab-case 形式
      const relativeFileName = this.$options.__file;
      const fileName = relativeFileName.substring(relativeFileName.lastIndexOf('/') + 1).split('.');
      fileName.pop();
      const prefix = fileName.join('-');

      return vueBem.createBem(kebabCase(bemNameSpace || name || prefix));
    };
  } else if (version === 3) {
    //
  } else {
    throw new Error(`vue-bem do not support version ${ version }.`);
  }
}

export default install;

export { vueBem };
