import vueBem from '../src/core/index.js';
vueBem.configure({ element: '$$' });
vueBem.configure({ prefix: 'CONFIGS', modifier: '@@' });
const configBem = vueBem.createBem('config2');

test('TEST CONFIG: configs prefix', () => {
  expect(configBem()).toBe('CONFIGS-config-2');
});

test('TEST CONFIG: configs element', () => {
  expect(configBem('element')).toBe('CONFIGS-config-2$$element');
});

test('TEST CONFIG: configs modifier', () => {
  expect(configBem(':modifier')).toBe('CONFIGS-config-2@@modifier');
});
