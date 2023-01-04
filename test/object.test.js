import vueBem from '../src/index.js';
const bem = vueBem.createBem('object');

test('TEST OBJECT: empty object', () => {
  expect(bem({})).toEqual({});
});

test('TEST OBJECT: element', () => {
  expect(bem({
    'element': true
  })).toEqual({
    'object__element': true
  });
});

test('TEST OBJECT: modifier', () => {
  expect(bem({
    ':modifier': false
  })).toEqual({
    'object--modifier': false
  });
});

test('TEST OBJECT: element with modifier', () => {
  expect(bem({
    'ele:modi': true
  })).toEqual({
    'object__ele--modi': true
  });
});

test('TEST OBJECT: mutil properties object', () => {
  expect(bem({
    abc: false,
    '3aw': true,
    ':awh2': false,
    ':123': true,
    'xy:123a': true,
    'i:kis': false
  })).toEqual({
    'object__abc': false,
    'object__3aw': true,
    'object--awh2': false,
    'object--123': true,
    'object__xy--123a': true,
    'object__i--kis': false
  });
});
