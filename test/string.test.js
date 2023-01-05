import vueBem from '../src/index.js';

const bem = vueBem.createBem('string');

test('TEST STRING: plain block name', () => {
  expect(bem()).toBe('string');
});

test('TEST STRING: empty string block name', () => {
  expect(bem('')).toBe('string');
});

test('TEST STRING: 1 element arg', () => {
  expect(bem('input')).toBe('string__input');
});

test('TEST STRING: 1 modifier arg', () => {
  expect(bem(':focus')).toBe('string--focus');
});

test('TEST STRING: element with modifier', () => {
  expect(bem('input:hover')).toBe('string__input--hover');
});

