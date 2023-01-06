import vueBem from '../src/core/index.js';

test("TEST ERROR: illegal 'blockName' input", () => {
  expect(() => { vueBem.createBem(); })
  .toThrow(new Error("A 'blockname' of type string is required"));
});

test('TEST ERROR: illegal element/modifier input', () => {
  expect(() => { vueBem.createBem('error-test')(99); })
  .toThrow(new Error('Illegal type, requires one of string, string[], object.'));
});
