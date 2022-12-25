import vueBem from "./src/index.js";

vueBem('HORIZEN-UI');

import { createBem } from "./src/index.js";

const bem = createBem('lai9fox');
// const bem = createBem();

// console.log(bem(['header', 'nav', 'body']));
// console.log(bem('123', '451', 'asd123'));

let a = true;
let b = false;
const t = [ a ? 1 : 2, 1024 ];

console.log(t);
