

# VUE介绍

Vue是一套用于构建用户界面的渐进式框架，Vue 的核心库只关注视图层  [官方网站](https://cn.vuejs.org/)





### Vue的两个核心点

1. 响应式的数据绑定

   * 当数据发生改变 -> 视图自动更新
   * 忘记操作DOM则这回事，而是专注于操作数据

2. 可组合的视图组件

   * 把视图按照功能，切分若干个基本单元

   * 组件可以一级一级组合成整个应用，形成了倒置的组件树

   * 使用组件的好处：可维护，可复用

     ![alt](.\imgs\component.png)

     

### Vue生命周期

```
var vm = new Vue({
            el:'#app',
            data:function(){
                return{
                    a:1
                }
            },
            //在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
            beforeCreate:function(){
                console.log("beforeCreate:",this.a)
            },
            //在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属
            //性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
            created:function(){
                console.log(this)
                console.log("created:",this.a)
            },
            //在挂载开始之前被调用
            beforeMount:function(){
                console.log("beforeMount:")
            },
            //在挂载完成被调用，此时可以访问$el
            mounted:function(){
                console.log("mounted:")
            },
            //数据更新之前
            beforeUpdate:function(){
                console.log(this.a)
            },
            //数据更新完成
            updated:function(){
                console.log("更新完成")
            }
        })
```

> 所有的生命周期钩子自动绑定 `this` 上下文到实例中，因此你可以访问数据，对属性和方法进行运算。这意味着你不能使用箭头函数来定义一个生命周期方法。

### 条件渲染 

>[ v-if / v-else-if / v-else  | v-show]

```javascript
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>

<h1 v-show="ok">Hello!</h1>
```

### 列表渲染

>  [v-for]

 #### 渲染数组

```javascript
var vm = new Vue({
  el: '#app',
  data: {
    items: [
      { message: '广之旅' },
      { message: '易起行' }
    ]
  }
})

<ul id="app">
  <li v-for="(item, index) in items" :key="item">
    {{ index }} - {{ item.message }}
  </li>
</ul>
```

#### 渲染对象

```
var vm = new Vue({
  el: '#app',
  data: {
    object: {
      title: 'vue学习',
      author: '小明',
      createTime: '2020-01-01'
    }
  }
})

<ul id="app" class="demo">
  <li v-for="value,key in object" :key="key">
    {{ key }}:{{ value }}
  </li>
</ul>
```

### 事件处理

#### 监听事件

```
var vm = new Vue({
  el: '#app',
  data: {
    count: 1
  },
  methods:{
      add:function(n){
		this.count+n
      }
  }
})
<div id="app">
	<div>{{count}}</div>
  	<button v-on:click="add(2)">加1</button>
</div>
```

> 访问原始的 DOM 事件  传入参数$event

#### 常用事件修饰符

* ```
  .stop    阻止单击事件继续传播
  ```

* ```
  .pevent  阻止默认事件
  ```

* ```
  .self    只当在 event.target 是当前元素自身时触发处理函数
  ```

```
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

#### 常用按键修饰符

* ```
  .enter 
  ```

* ```
  .tab
  ```

* ```
  .delete
  ```

* ```
  .esc
  ```

* ```
  .space
  ```

* ```
  .up
  ```

* ```
  .down
  ```

* ```
  .left
  ```

* ```
  .right
  ```

```
<input type="text" @keydown.enter="keyboardHandle">
<input type="text" @keydown.13="keyboardHandle">
keyboardHandle:function(e){
   console.log(e)
}
```

#### 表单输入绑定



