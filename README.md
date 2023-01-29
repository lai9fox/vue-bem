## 全局引入

### 配置修改

> 引入时，可指定配置，用于修改 `bem` 生成器的行为属性，所有的选项都是可选的:

```js
Vue.use(BEM, { name: '', prefix: '', element: '', modifier: '' });
```

- `name`: 调用生成器时使用的函数名称，默认调用名称为 `$bem`;
- `prefix`: 全局前缀，设置该值后所有生成的类名均会附带该前缀，默认无前缀;
- `element`: bem 中的元素分隔符，默认值 `__`;
- `modifier`: bem 中的修饰分隔符，默认值 `--`;

### Vue 2 中引入与使用

>入口文件（如 index.js，app.js）：

```js
import Vue from 'vue';
import BEM from '@lai9fox/vue-bem';
Vue.use(BEM, { name: '', prefix: '', element: '', modifier: '' });
```

> `<script>` 中使用：
> - 为使`bem`生成正常工作，需要指定 `name` 属性或者 `bemNS` 属性（自定义）：
> - `name` 或者 `bemNS` 中至少有一个设置值，用作于 `bem` 的命名空间，`bemNS` 优先级大于 `bem`；
> - 命名空间将转为 `kebab-case` 形式；

```html
<template>
  <!-- 若在引入时配置了 name 属性，将 $bem 替换为设置的值即可 -->
  <div :class="$bem('123')">Data</div>
</template>

<script>
export default {
  // 至少设置 name 或者 bemNS 中的一个值，否则 bem 生成器不会生效
  name: 'custom-name',
  bemNS: 'custom-bemns',
} 
</script>

<style lang="less">
.custom-bem {
  &__123 {
    color: green;
  }
}
.custom-bemns {
  &__123 {
    color: pink;
  }
}
</style>

```


### Vue 3 中引入与使用

>入口文件（如 index.js，app.js）：

```js
import { createApp } from 'vue'
import App from './App.vue';
import BEM from '@lai9fox/vue-bem';
createApp(App).use(BEM, { name: '', prefix: '', element: '', modifier: '' }).mount('#app');
```
> `<script setup>` 中使用：
> - 若在引入的时候配置了 `name` 属性，在 `inject` 时需要将默认值 `$bem` 替换为配置的值；
> - 需要手动指定命名空间 `namespace`；
> - 命名空间将转为 `kebab-case` 形式；

```html
<template>
  <div :class="customBemName('...')">Data</div>
</template>

<script setup>
import { inject } from 'vue';
const customBemName = inject('$bem')(namespace);
</script>
```

> `<script>` 中使用：
> - 为使`bem`生成正常工作，需要指定 `name` 属性或者 `bemNS` 属性（自定义）：
> - `name` 或者 `bemNS` 中至少有一个设置值，用作于 `bem` 的命名空间，`bemNS` 优先级大于 `bem`；
> - 命名空间将转为 `kebab-case` 形式；

```html
<template>
  <!-- 若在引入时配置了 name 属性，将 $bem 替换为设置的值即可 -->
  <div :class="$bem('123')">Data</div>
</template>

<script>
export default {
  // 至少设置 name 或者 bemNS 中的一个值，否则 bem 生成器不会生效
  name: 'custom-name',
  bemNS: 'custom-bemns',
} 
</script>

<style lang="less">
.custom-bem {
  &__123 {
    color: green;
  }
}
.custom-bemns {
  &__123 {
    color: pink;
  }
}
</style>

```

### 局部引入

> 请 》》**避免** 《《 局部引入和全局引入混用！

```html
<template>
  <div :class="myBem('123')">Data</div>
</template>

<script>
import { vueBem } from '@lai9fox/vue-bem';
// 修改分隔符（可选），将会影响其他局部引入的表现
// 请勿多次修改配置
// vueBem.configure({ element: '', modifier: '' });
const myBem = vueBem.createBem('NameSpace'); // 设置命名空间，必须的，内部会转为 name-space

export default {
  methods: {
    myBem, // 需要在这里注册生成器
  }
}
</script>
<style lang="less">
.name-space {
  &__123 {
    color: red;
  }
}
</style>
```

## 生成器

### 语法

通过生成器可以在该命名空间下添加元素 `element`、修饰符 `:modifier`，或者携带修饰符的元素 `element:modifier`，修饰符以 `:` 标识:

```js
import { vueBem } from '@lai9fox/vue-bem';
// header 命名空间下的 bem 生成器
const bem = vueBem.createBem('header');

// header 命名空间下添加元素 logo，最终结果： header__logo
bem('logo');
// header 命名空间下添加修饰符 focus，最终结果： header--focus
bem(':focus');
// header 命名空间下添加元素 logo，且元素附带 focus 修饰符，最终结果：header__logo--focus
bem('logo:focus');
```

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
- 传入第二个参数作为附加修饰符时，将会为第一个参数的所有内容附加上修饰符；
- 附加修饰符的优先级低于 `:` 标识的内置修饰符，附加的修饰符 》》**不需要**《《 使用 `:` 标识:
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
