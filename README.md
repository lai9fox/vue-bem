## 配置

允许修改全局配置：
- `prefix` 全局命名前缀，设置该值后，每个生成的类名均会附带该前缀;
- `element` 元素分割符，默认为 `__`;
- `modifier` 修饰分隔符，默认为 `--`;
```js
import vueBem from '@lai9fox/vue-bem';
vueBem.configure({ prefix: 'lai9fox' });
```
生成的类名: <font color="red">lai9fox-</font>blockName<font color="red">__</font>elementName<font color="red">--</font>modifierName

## 创建命名块

要使用 `bem` 命名规范，需要先创建一个命名块 `block` 以返回 `bem` 生成器。

通过生成器可以在该命名块下添加元素 `element`、修饰符 `modifier`，修饰符以 `:` 标识:

```js
import vueBem from '@lai9fox/vue-bem';
const bem = vueBem.createBem('header'); // header 块下的 bem 生成器

bem('logo') // header 块下添加元素 logo，最终结果： header__logo
bem(':focus') // header 块下添加修饰符 focus，最终结果： header--focus
bem('logo:focus') // header 块下添加元素 logo，且元素附带 focus 修饰符，最终结果：header__logo--focus
```

## 生成器

`const bem = createBem('block')`

生成器接收三种类型的参数，返回对应类型的结果

### **string**
```js
const bem = vueBem.createBem('block');
bem('element');  // 添加一个元素，返回结果: block__element
bem(':modifier'); // 添加一个修饰符，修饰符应该以 : 标识，返回结果: block--modifier
bem('element:modifier'); // 添加一个带修饰符的元素，返回结果: block__element--modifier
```

### **array**

```js
const bem = vueBem.createBem('block');
bem(['header', 'nav', ':hover', 'nav:focus']); // 一次性生成多个 class => ['block__header', 'block__nav', 'block--hover', 'block__nav--focus']
```
也可以使用三元表达式或者对象形式，[结合响应式数据](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#%E7%BB%91%E5%AE%9A-HTML-Class)来决定类的渲染与否

```js
bem([ isHover ? ':hover' : 'unHover', { focus: isFocus, }]);
data: {
  isHover: Boolean,
  isFocus: Boolean,
}
```

### **object**
```js
const bem = vueBem.createBem('block');
bem({ active: isActive, 'text-danger': hasError });
data: {
  isActive: true,
  hasError: false,
}
// 结果 { block__active: isActive, block__text-danger: hasError }
```
## 绑定
```html
<div :class="bem(xxxx)"></div>

<script>
  import vueBem from '@lai9fox/vue-bem';
  const bem = vueBem.createBem('blockName');
  export default {
    data() {
      return {}
    },
    methods: {
      bem,
    }
  }
</script>
```