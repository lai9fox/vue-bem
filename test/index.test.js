import vueBem from "../src/index.js";
import { createBem } from "../src/index.js";

vueBem('Jest');

const bem = createBem('test');

test('test: block name', () => {
  expect(bem()).toBe('Jest-test');
});
