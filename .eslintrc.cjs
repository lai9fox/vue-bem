module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'overrides': [
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		// 末尾分号
    semi: ['error', 'always'],
    // 使用单引号
    quotes: ['error', 'single', { avoidEscape: true }],
    // 每个文件最后一行是空行
    'eol-last': ['error', 'always'],
    // 不允许使用 var 关键字
    'no-var': 'error',
    // 强制变量驼峰命名
    camelcase: ['error', { properties: 'never' }],
    // if、while 等代码块只有一行时不允许省略 {}
    curly: ['error', 'all'],
    // 若 switch 语句中有 default case，强制最后
    'default-case-last': 'error',
    // 默认参数需放置于参数列表的最后
    'default-param-last': 'error',
		// 点符号优先
    'dot-notation': 'warn',
    // 强制使用 === !== 判断
    eqeqeq: 'error',
    // 变量声明时必须初始化，且不允许将其初始化值设置为 undefined
    'init-declarations': ['error', 'always'],
    'no-undef-init': 'error',
    // 最大嵌套层数不超过 4 层
    'max-depth': ['error', 4],
    // 不允许空语句块
    'no-empty': ['error', { 'allowEmptyCatch': true }],
    // 禁止不必要的布尔值转换
    'no-extra-boolean-cast': ['error', { 'enforceForLogicalOperands': true }],
		// 禁止多行字符串，但允许运算符拼接的字符串
    'no-multi-str': 'error',
    // 不允许在 return 语句中使用赋值运算
    'no-return-assign': ['error', 'always'],
    // 不允许逗号运算符
    'no-sequences': 'error',
    // 禁止不必要的拼接
    'no-useless-concat': 'error',
    // 数组[]换行保持一致性
    'array-bracket-newline': ['error', 'consistent'],
    // 数组元素换行保持一致性
    'array-element-newline': ['error', 'consistent'],
    // 禁止尾随逗号
    'comma-dangle': ['error', 'never'],
    // 逗号后面强制要求空格，某些情况不适用
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    // 不允许连续空行
    'no-multiple-empty-lines': ['error', { max: 1 }],
    // 不允许行尾空格
    'no-trailing-spaces': 'error',
    // { } 统一换行或者不换行
    'object-curly-newline': ['error', { 'consistent': true }],
    // {} 强制要求空格
    'object-curly-spacing': ['error', 'always'],
		// 字符串模板表达式中 {} 需要有空格
    'template-curly-spacing': ['error', 'always']
	}
};
