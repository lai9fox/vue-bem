// vueBem.setPrefix = function(prefix) {
//   if (Object.prototype.toString.call(prefix) !== '[object String]') {
//     console.warn('GLOBALPREFIX expects the value of String type.');
//     return;
//   }
//   if (this.GLOBALPREFIX) {
//     console.warn('GLOBALPREFIX is already set, please do not set it again.');
//   } else {
//     this.GLOBALPREFIX = prefix;
//   }
// }

function typeOf(param) {
  return Object.prototype.toString.call(param);
}

function vueBem(globalIdentify) {
  if (typeOf(globalIdentify) !== '[object String]') {
    throw new Error('The value of global prefix should be of type string.');
  }
  if (createBem._GLOBALPREFIX) {
    throw new Error('Do not set GLOBALPREFIX repeatedly.');
  } else {
    createBem._GLOBALPREFIX = globalIdentify;
  }
}

/**
 * 创建一个区域块的函数 CSS 类名生成函数
 * @param {string} block 块的名称
 * @return {Function} 包含块的闭包函数
 */
function createBem(block) {
  if (!block) {
    throw new Error('block name is required.');
  }
  const concat = createBem._GLOBALPREFIX ? `${createBem._GLOBALPREFIX}-${block}` : block;
  /**
   * 添加元素、修饰符
   * @param {string | string[] | object} p 附加的元素、修饰符
   */
  return function bem(p) {
    if (p === undefined) {
      return concat;
    }
    if (typeOf(p) === '[object String]') {
      return `${concat}${p.charAt(0)}${p}`;
    } else if (typeOf(p) === '[object Array]') {
      return p.map(em => {
        return `${concat}__${em}`;
      });
    } else if (typeOf(p) === '[object Object]') {

    } else {
      throw new Error('Illegal type, requires one of string, string[], object.');
    }
  }
}

export { createBem };
export default vueBem;
