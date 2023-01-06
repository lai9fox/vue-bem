import vueBem from './core/index.js';

/**
 * @param {Vue} Vue Vue 构造器
 * @param {object} options 配置项
 * @param {string} [options.name] 自定义的 bem 生成器名称
 * @param {string} [options.prefix] 自定义的全局前缀
 * @param {string} [options.element] 自定义的元素连接符
 * @param {string} [options.modifier] 自定义的修饰连接符
 */
function install(Vue, options = {}) {
  const version = Number(Vue.version.split('.')[0]);
  vueBem.configure(options);
  if (version === 2) {
    Vue.mixin({
      created: function() {
        // 自定义属性名 || 组件名 => kebab-case 形式，bemNS 优先级高于 name
        const namespace = this.$options.bemNS || this.$options.name;
        if (typeof namespace !== 'string' || !namespace) {
          return;
        }
        const bemName = options.name || '$bem';
        this[bemName] = vueBem.createBem(namespace);
      }
    });
  } else if (version === 3) {
    //
  } else {
    throw new Error(`vue-bem do not support version ${ version }.`);
  }
}

export default install;

export { vueBem };
