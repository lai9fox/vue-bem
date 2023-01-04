import { typeOF } from "./utils/index.js";

class vueBem {
  constructor() {
    this._gPrefix = null;
    this._eConnector = '__';
    this._mConnector = '--';
  }

  /**
   * 修改配置接口
   * @param {object} configs
   * @param {string} [configs.prefix] 全局的前缀
   * @param {string} [configs.element] 元素连接符
   * @param {string} [configs.modifier] 修饰连接符
   */
  configure(configs) {
    this._gPrefix = configs.prefix || this._gPrefix;
    this._eConnector = configs.element || this._eConnector;
    this._mConnector = configs.modifier || this._mConnector;
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

    const prefix = this._gPrefix ? `${this._gPrefix}-${blockName}` : blockName;
    /**
     * 
     * @param {*} obj 
     * @returns {object}
     */
    const resolveObject = (obj) => {
      const ret = {};
      for (const [key, value] of Object.entries(obj)) {
        if (key.startsWith(':')) {
          ret[`${prefix}${this._mConnector}${key.substring(1)}`] = value;
        } else if (key.indexOf(':') !== -1) {
          const [ ele, modi ] = key.split(':');
          ret[`${prefix}${this._eConnector}${ele}${this._mConnector}${modi}`] = value; 
        } else {
          ret[`${prefix}${this._eConnector}${key}`] = value;
        }
      }
      return ret;
    };
    /**
     * 生成 元素、修饰符
     * @param {string|string[]|object} description
     * @param {string} modifier 修饰符，以 ":" 开始
     * @returns {string|string[]|object}
     */
    const em = (description, modifier) => {

      if (!description) {
        return prefix;
      }

      if (typeOF(description) === typeOF.STRING) {
        if (!description.startsWith(':')) {
          if (description.indexOf(':') === -1) {
            return `${prefix}${this._eConnector}${description}`;
          } else {
            const [ ele, modi ] = description.split(':');
            return `${prefix}${this._eConnector}${ele}${this._mConnector}${modi}`;
          }
        } else {
          return `${prefix}${this._mConnector}${description.substring(1)}`;
        }
      } else if (typeOF(description) === typeOF.ARRAY) {
        const ret = [];
        for (const ele of description) {
          if (!ele) continue;
          if (typeOF(ele) === typeOF.OBJECT) {
            ret.push(resolveObject(ele));
          } else if (!ele.startsWith(':')) {
            if (ele.indexOf(':') === -1) {
              ret.push(`${prefix}${this._eConnector}${ele}`);
            } else {
              const [ el, modi ] = ele.split(':');
              ret.push(`${prefix}${this._eConnector}${el}${this._mConnector}${modi}`);
            }
          } else {
            ret.push(`${prefix}${this._mConnector}${ele.substring(1)}`);
          }
        }
        return ret;
      } else if (typeOF(description) === typeOF.OBJECT) {
        /**
         * 
         * {
         *   element: Boolean, // element
         *   ":modifier": Boolean, // modifier
         *   "element:modifier": Boolean, // element with modifier
         * }
         */
        return resolveObject(description);
      } else {
        throw new Error('Illegal type, requires one of string, string[], object.')
      }
    };
    return em;
  }
}

export default new vueBem;
