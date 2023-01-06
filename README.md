## 引入
可通过插件形式全局注入或者手动在每个文件中引入
### 插件形式(目前支持vue2)
在入口文件如 `index.js`、`main.js` 等文件中引入：
```js
import Vue from 'vue';
import vBem from '@lai9fox/vue-bem';
Vue.use(vBem, { name: '', prefix: '', element: '', modifier: '' });
```
选项用于修改 `bem` 生成器的行为属性:

- `name`: 调用生成器时使用的函数名称，默认调用名称为 `$bem`;
- `prefix`: 全局前缀，设置该值后所有生成的类名均会附带该前缀，默认无前缀;
- `element`: bem 中的元素分隔符，默认值 `__`;
- `modifier`: bem 中的修饰分隔符，默认值 `--`;

使用插件时，注入生成器时会尝试从当前实例获取 `bemNS` 或者 `name` 属性作为命名空间，并且将命名空间转为 `kebab-case` 命名形式，上述属性不存在时将<font color=red>不会</font>注入生成器:
```html
<script>
export default {
  bemNS: 'CustomName123', // 自定义属性，优先级高于 name 属性: => custom-name-123
  name: 'App', // 当没有设置 bemNS 时，使用该属性作为命名空间
  data() {},
  methods: {},
}
</script>
```

### 手动引入
要修改 `bem` 生成器的行为属性，在入口文件如 `index.js`、`main.js` 等文件中设置：
```js
import { vueBem } from '@lai9fox/vue-bem';
vueBem.configure({ prefix: '', element: '', modifier: '' });
```
- `prefix`: 全局前缀，设置该值后所有生成的类名均会附带该前缀，默认无前缀;
- `element`: bem 中的元素分隔符，默认值 `__`;
- `modifier`: bem 中的修饰分隔符，默认值 `--`;

在需要使用生成器的地方：
```html
<script>
import { vueBem } from '@lai9fox/vue-bem';
const bem = vueBem.createBem('NameSpace'); // 设置命名空间，必须的，内部会转为 name-space

export default {
  methods: {
    bem, // 需要在这里注册生成器
  }
}
</script>
```

## 创建命名块

通过生成器可以在该命名块下添加元素 `element`、修饰符 `:modifier`，或者携带修饰符的元素 `element:modifier`，修饰符以 `:` 标识:

```js
import { vueBem } from '@lai9fox/vue-bem';
// header 块下的 bem 生成器
const bem = vueBem.createBem('header');

// header 块下添加元素 logo，最终结果： header__logo
bem('logo');
// header 块下添加修饰符 focus，最终结果： header--focus
bem(':focus');
// header 块下添加元素 logo，且元素附带 focus 修饰符，最终结果：header__logo--focus
bem('logo:focus');
```

## 生成器

生成器接收三种类型的参数，返回对应类型的结果

### **bem(string) => string**
```js
const bem = vueBem.createBem('block');

bem('element'); 
// 添加一个元素，返回结果: block__element
bem(':modifier');
// 添加一个修饰符，修饰符应该以 : 标识，返回结果: block--modifier
bem('element:modifier');
// 添加一个带修饰符的元素，返回结果: block__element--modifier
```

### **bem(array, [string]) => string[]**

```js
const bem = vueBem.createBem('block');
bem(['header', 'nav', ':hover', 'nav:focus']);
// 一次性生成多个 class => ['block__header', 'block__nav', 'block--hover', 'block__nav--focus']
```
也可以使用三元表达式或者对象形式，[结合响应式数据](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#%E7%BB%91%E5%AE%9A-HTML-Class)来决定类的渲染与否

```js
bem([ isHover ? ':hover' : ':unHover', { focus: isFocus, }]);
data: {
  isHover: Boolean,
  isFocus: Boolean,
}
```
传入第二个参数作为附加修饰符时，将会为第一个参数的所有内容附加上修饰符，附加修饰符的优先级低于 `:` 标识的内置修饰符，附加的修饰符不需要使用 `:` 标识:
```js
const bem = vueBem.createBem('BN'); 
bem(['a', 'b', 'c:focus', ':hover'], 'append')
// append 是附加的修饰符，优先级低于内置的修饰符
// 结果 => ['BN__a--append', 'BN__b--append', 'BN__c--focus', 'BN--hover']
```

### **bem(object, [string]) => {}**
```js
const bem = vueBem.createBem('block');
bem({ active: isActive, 'text-danger': hasError });
data: {
  isActive: true,
  hasError: false,
}
// 结果 { block__active: isActive, block__text-danger: hasError }
```

第二个参数的使用参考 [数组类型附加修饰符](#bemarray-string--string)

## 绑定
```html
<!-- 手动引入 -->
<div :class="bem(xxxx)"></div>
<div :class="bem([ a, b, c, ... ])"></div>
<div :class="bem({ d: Boolean, e: Boolean, ... })"></div>

<script>
  import { vueBem } from '@lai9fox/vue-bem';
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

<!-- 插件注入 -->
<div :class="$bem(xxxx)"></div>
<div :class="$bem([ a, b, c, ... ])"></div>
<div :class="$bem({ d: Boolean, e: Boolean, ... })"></div>

<script>
  export default {
    name: 'xxx', // name 或者 bemNS 至少设置一个
    bemNS: 'yyy',
    data() {
      return {}
    }
  }
</script>
```