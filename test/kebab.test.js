import vueBem from '../src/core/index.js';

test('TEST KebabCase NameSpace: upper case', () => {
  expect(vueBem.createBem('KebabCase')()).toBe('kebab-case');
});

test('TEST KebabCase NameSpace: upper case', () => {
  expect(vueBem.createBem('kebabCase')()).toBe('kebab-case');
});

test('TEST KebabCase NameSpace: upper case', () => {
  expect(vueBem.createBem('Kebab-Case')()).toBe('kebab-case');
});

test('TEST KebabCase NameSpace: upper case', () => {
  expect(vueBem.createBem('Kebab-case')()).toBe('kebab-case');
});

test('TEST KebabCase NameSpace: upper case', () => {
  expect(vueBem.createBem('KebabCase123')()).toBe('kebab-case-123');
});

test('TEST KebabCase NameSpace: upper case', () => {
  expect(vueBem.createBem('Kebab123case')()).toBe('kebab-123-case');
});
