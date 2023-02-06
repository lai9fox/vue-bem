import { typeOF } from '../utils/index.js';
import { kebabCase } from 'lodash-es';

class vueBem {
  constructor() {
    this._gP = null;
    this._eC = '__';
    this._mC = '--';
  }

  /**
   * 修改配置接口
   * @param {object} [configs]
   * @param {string} [configs.prefix] 全局的前缀
   * @param {string} [configs.element] 元素连接符
   * @param {string} [configs.modifier] 修饰连接符
   */
  configure(configs) {
    this._gP = configs.prefix || this._gP;
    this._eC = configs.element || this._eC;
    this._mC = configs.modifier || this._mC;
  }

  /**
   * 设置 bem 的 block 名称
   * @param {string} blockName 块名称
   * @returns {Function}
   */
  createBem(blockName) {

    if (!blockName || typeOF(blockName) !== typeOF.STRING) {
      throw new Error("A 'blockname' of type string is required");
    }

    const prefix = this._gP ? `${ this._gP }-${ kebabCase(blockName) }` : kebabCase(blockName);

    /**
     * 处理字符串类型的参数，返回处理后的字符串
     * @param {string} str 字符串参数
     * @param {string} [modifier] 附加到所有类上的修饰符，优先级低于内置 ':' 修饰符，可选
     * @returns {string}
     */
    const resolveString = (str, modifier) => {
      // 元素 | 携带修饰符的元素
      if (!str.startsWith(':')) {
        if (str.indexOf(':') === -1) {
          return `${ prefix }${ this._eC }${ str }${ modifier ? this._mC + modifier : '' }`;
        } else {
          const [ ele, modi ] = str.split(':');
          return `${ prefix }${ this._eC }${ ele }${ this._mC }${ modi }`;
        }
      // 修饰符
      } else {
        return `${ prefix }${ this._mC }${ str.substring(1) }`;
      }
    };

    /**
     * 处理对象类型的参数，返回处理后的对象
     * @param {object} obj 对象参数
     * @param {string} [modifier] 附加到所有类上的修饰符，优先级低于内置 ':' 修饰符，可选
     * @returns {object}
     */
    const resolveObject = (obj, modifier) => {
      const ret = {};
      const keys = Object.keys(obj);
      for (let index = 0, len = keys.length; index < len; index++) {
        let key = keys[index];
        let value = obj[key];
        ret[resolveString(key, modifier)] = value;
      }
      return ret;
    };

    /**
     * 生成 元素、修饰符
     * @param {string | string[] | object} description
     * @param {string} [modifier] 修饰符，当第一个参数为 Array 或者 Object 类型时该参数可用，否则忽略该参数
     * @returns {string | string[] | object}
     */
    const em = (description, modifier) => {
      if (!description) {
        return prefix;
      }
      let typeOFdescription = typeOF(description);
      if (typeOFdescription === typeOF.STRING) {
        return resolveString(description, modifier);
      } else if (typeOFdescription === typeOF.ARRAY) {
        const ret = [];
        for (let index = 0, len = description.length; index < len; index++) {
          let ele = description[index];
          if (!ele) {
            continue;
          }
          let typeOFele = typeOF(ele);
          if (typeOFele === typeOF.STRING) {
            ret.push(resolveString(ele, modifier));
          } else if (typeOFele === typeOF.OBJECT) {
            ret.push(resolveObject(ele, modifier));
          }
        }
        return ret;
      } else if (typeOFdescription === typeOF.OBJECT) {
        return resolveObject(description, modifier);
      } else {
        throw new Error('Illegal type, requires one of string, string[], object.');
      }
    };
    return em;
  }
}

export default new vueBem;
