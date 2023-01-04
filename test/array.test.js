import vueBem from '../src/index.js';

const bem = vueBem.createBem('array');

test('TEST ARRAY: empty array', () => {
  expect(bem([])).toEqual([]);
});

test('TEST ARRAY: element', () => {
  expect(bem(['abc'])).toEqual([
    'array__abc'
  ]);
});

test('TEST ARRAY: modifier', () => {
  expect(bem([
    ':modifier'
  ])).toEqual([
    'array--modifier'
  ]);
});

test('TEST ARRAY: element with modifier', () => {
  expect(bem([
    'ele:modi'
  ])).toEqual([
    'array__ele--modi'
  ]);
});

test('TEST ARRAY: array', () => {
  expect(bem([
    'ele',
    'ele:modifi',
    ':modifi'
  ])).toEqual([
    'array__ele',
    'array__ele--modifi',
    'array--modifi'
  ]);
});

test('TEST ARRAY: array with ternary expressions', () => {
  expect(bem([
    'ele',
    'ele:modifi',
    ':modifi',
    5 > 1 ? '' : 'fbo',
    1 > 5 ? '' : 'obf',
  ])).toEqual([
    'array__ele',
    'array__ele--modifi',
    'array--modifi',
    'array__obf',
  ]);
});

test('TEST ARRAY: array with object', () => {
  expect(bem([
    'ele',
    'ele:modifi',
    ':modifi',
    {
      abc: true,
      ':123a': false,
      'ase:ntj': true,
    }
  ])).toEqual([
    'array__ele',
    'array__ele--modifi',
    'array--modifi',
    {
      'array__abc': true,
      'array--123a': false,
      'array__ase--ntj': true,
    }
  ]);
});
