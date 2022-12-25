## 设定全局前缀

设定全局前缀后，生成的类名都会附加上给定的前缀, 在入口文件如 `index.js`、`app.js` 中设定:
```js
import vueBem from '@lai9fox/vueBem';
vueBem('lai9fox');

// 生成的类名: lai9fox-${ your custom class name }
```
## 创建命名块

要使用 `bem` 命名规范，需要先创建一个命名块 `block` 以返回类名生成器。

通过生成器可以在该命名块下添加元素 `element`、修饰符 `modifier`:

```js
import { createBem } from '@lai9fox/vueBem';
const bem = createBem('header');

bem('_logo') // 添加元素 => header__logo
bem('-focus') // 添加修饰符 => header--focus
```

## 生成器

`const bem = createBem('block')`

生成器接收三种类型的参数，返回对应类型的结果

### **string**
```js
bem('_element');  // 添加一个元素，元素应该以 _ 开头，返回结果: block__element
bem('-modifier'); // 添加一个修饰符，修饰符应该以 - 开头，返回结果: block--modifier
bem('_element--modifier'); // 添加一个带修饰符的元素，返回结果: block__element--modifier
```

### **array**

```js
bem(['header', 'nav', 'body']);
```

### **object**



```js
// 块名
.block {}
// 块__元素名
.block__element {}
// 块--修饰符
.block--modifier {}
// 块__元素--修饰符
.block__element--modifier {}
```