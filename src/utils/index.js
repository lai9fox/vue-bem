function typeOF(param) {
  return Object.prototype.toString.call(param);
}
typeOF.STRING = '[object String]';
typeOF.ARRAY = '[object Array]';
typeOF.OBJECT = '[object Object]';

export { typeOF };
