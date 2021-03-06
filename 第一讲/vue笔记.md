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

### Class 与 Style 绑定

#### 绑定class

##### 对象语法

```
.active{
    background: antiquewhite;
}
.text-danger{
    color: red;
}

<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>

data: {
  isActive: true,
  hasError: false
}
```

##### 数组语法

```
<div v-bind:class="[activeClass, errorClass]"></div>
//根据条件切换class
<div v-bind:class="[isActive ? 'active' : '', errorClass]"></div> 
等价于
<div v-bind:class="[{ active: isActive }, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

#### 绑定内联样式

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}

等价于

<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '30px'
  }
}

等价于
<div v-bind:style="[baseStyles, overridingStyles]">内联样式绑定</div>
data: function () {
    return {
        baseStyles:{
        	'color':"red"
        },
        overridingStyles:{
        	"font-size": '30px'
        }
    }
}
```



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
  <li v-for="(value,key) in object" :key="key">
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
				this.count = this.count + n
      }
  }
})
<div id="app">
	<div>{{count}}</div>
  	<button v-on:click="add(2)">加2</button>
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
  

### 表单输入绑定

#### 文本

```
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

#### 多行文本

```
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br>
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

#### 复选框

##### 单个复选框

```
<input type="checkbox" id="checkbox" v-model="checked">
<label for="checkbox">{{ checked }}</label>
```

##### 多个复选框

```
<div id='example-3'>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <br>
  <span>Checked names: {{ checkedNames }}</span>
</div>

								arr:[{
                    id:1,
                    name:'Jack',
                    value:'Jack1'
                },{
                    id:2,
                    name:'John',
                    value:'John1'
                },{
                    id:3,
                    name:'Mike',
                    value:'Mik1'
                }]
```

#### 单选按钮

```
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>
  <br>
  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>
  <br>
  <span>Picked: {{ picked }}</span>
</div>

```

#### 选择框

```
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>

//值绑定
<div id="example-6">
	<select v-model="selectedValue">
        <option disabled value="">请选择</option>
        <option value="第一项">A</option>
        <option value="第二项">B</option>
        <option value="第三项">C</option>
	</select>
	<span>Selected: {{ selectedValue }}</span>
</div>


```

#### 修饰符

```
.lazy
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >

.number  自动将用户的输入值转为数值类型
<input v-model.number="age" type="number">

.trim  如果要自动过滤用户输入的首尾空白字符
<input v-model.trim="msg">
```

### 对象的响应式数据变化

```
vm.$el(target,prop,value)

```

### 数组的响应式数据变化

```
vue提供了观察数组变异的方法，使用这些方法将会触发试图更新
push()  pop()  shift()  unshift()  splice()  sort()  reverse()

不能触发试图更新
1.利用索引直接设置一个项时
2.修改数组长度时
```



### vue组件

#### count组件

```
<body>
    <div id="app">
        {{total}}
        <div>
            <button-counter @change-total="addTotal" :add-num="10" />
            <!--注意传值要用烤串命名方式-->
        </div>
        <p>------------------</p>
        <div>
            <button-counter @change-total="addTotal" :add-num="2" />
        </div>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                    total: 0,
                }
            },
            methods: {
                addTotal(value) {
                    this.total = this.total + value
                }
            },
            mounted() {
                // eventBus.$on('parent-change', function (value) {
                //     console.log(value)
                // })
            }
        })
    </script>
</body>
```

component.js

```
// 定义一个名为 button-counter 的新组件


var eventBus = new Vue();   //事件总线程方式实现组件之间的通信


// 父组件
Vue.component('button-counter', {
    props: {
        addNum: {    //接收要用驼峰方式
            type: Number,
            default: 2
        }
    },
    data: function () {
        return {
            count: 0
        }
    },
    template: `
    <div>
        <p>我是count组件</p>
        <p>当前的count的值为{{count}}</p>
        <button @click="addCount">You clicked me {{ addNum }} times.</button>
        <button-child :count="count"/>
    </div>
    `,
    methods:{
        addCount(){
            this.count = this.count + this.addNum;
            //父子组件通信
            this.$emit('change-total',{  //注意，这里不能用驼峰方式
                total:this.count,
                addNum:3
            });   
            eventBus.$emit('parent-change',{
                total:this.count,
                addNum:3
            })
        },
    },
    mounted() {
    }
})


//子组件
Vue.component('button-child',{
    props:{
        count:{
            type:Number,
            default:0
        }
    },
    template:`
        <div>
            <p>我是子组件</p>
            <p>我是button-counter传入的值{{count}}</p>
        </div>
    `,
    mounted(){
        eventBus.$on('parent-change',function(value){
            console.log(value)
        })
    }
})
```

#### 插槽

```
<button-counter @change-total="addTotal" :add-num="10" >
    <h3>我是要进入插槽的内容</h3>
    <div slot="other">
    	<p>我是有名字的插槽</p>
    </div>
</button-counter>
```

```
// 父组件
Vue.component('button-counter', {
    props: {
        addNum: {    //接收要用驼峰方式
            type: Number,
            default: 2
        }
    },
    data: function () {
        return {
            count: 0
        }
    },
    template: `
    <div>
        <p>我是count组件</p>
        <p>当前的count的值为{{count}}</p>
        <button @click="addCount">You clicked me {{ addNum }} times.</button>
        <slot name="other"></slot>
        <slot></slot>
        <button-child :count="count"/>
    </div>
    `,
    methods:{
        addCount(){
            this.count = this.count + this.addNum;
            //父子组件通信
            this.$emit('change-total',{
                total:this.count,
                addNum:3
            });   //注意，这里不能用驼峰方式
            eventBus.$emit('parent-change',{
                total:this.count,
                addNum:3
            })
        },
    },
    mounted() {
    }
})
```

#### 局部组件

```
<body>
    <div id="app">
        {{total}}

        <button-counter2 :add-num="10" @change-total="addTotal"/>  
    </div>
   
    <script>
         console.log(buttonCounter2)
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                    total: 0,
                }
            },
            methods: {
                addTotal(value) {
                    this.total = this.total + value
                }
            },
            components:{
                'button-counter2': buttonCounter2
            }
        })
    </script>
</body>
```



```
var buttonCounter2 =  {
    props: {
        addNum: {    //接收要用驼峰方式
            type: Number,
            default: 2
        }
    },
    data: function () {
        return {
            count: 0
        }
    },
    template: `
    <div>
        <p>我是count组件</p>
        <p>当前的count的值为{{count}}</p>
        <button @click="addCount">You clicked me {{ addNum }} times.</button>
        <slot name="other"></slot>
        <slot></slot>
        <button-child :count="count"/>
    </div>
    `,
    methods:{
        addCount(){
            this.count = this.count + this.addNum;
            //父子组件通信
            this.$emit('change-total',{
                total:this.count,
                addNum:3
            });   //注意，这里不能用驼峰方式
        },
    },
    mounted() {
    }
}
```



## vue-cli

https://cli.vuejs.org/zh/

> Node 版本要求
>
> Vue CLI 需要 [Node.js](https://nodejs.org/) 8.9 或更高版本 (推荐 8.11.0+)。

```
npm install -g @vue/cli
```

创建一个项目

```
vue create my-project
```

项目创建好的目录结构

![alt](.\imgs\vue-cli.jpg)

## vue-router

https://router.vuejs.org/zh/

```
vue add vue-router
```

####  路由对象实例

```javascript
//router/index.js
export default new Router({
    mode:'history',   //模式：hash | history
    base:process.env.BASE_URL,  //http://localhost:8080/vue
    routes:[{
        path:'/',
        name:'home',
        component:Home
    },{
        path:'/about',
        name:'about',
        // 路由级代码分割，生成分片（about.[hash].js）
        // 当访问路由时会懒加载
        component:()=>import(/* webpackChunkName: "about" */ './views/About.vue')
    }
   ]
})
```

#### 指定路由器

```
//main.js
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

#### 路由视图

```
<router-view/>
```

#### 导航链接

```
<router-link to="/">Home</router-link>
<router-link to="/about">About</router-link>
```

#### 路由嵌套

应用界面通常由多层嵌套的组件组合而成。同样的，URL中各段动态路径也按某种结构对应嵌套的各层组件。

	1. 创建List.vue并移动商品列表部分内容
 2. 配置路由  router/index.js

```
{
	path:'/',
	component:Home,
	children:[{
		path:'list',
		name:'list',
		component:List
	}]
}
```

3. 添加路由插槽  Home.vue

```
<template>
	<div class="home">
		<h1>首页</h1>
		<router-view></router-view>
	</div>
</template>
```

#### 动态路由

	1. 创建Detail.vue

```
<template>
	<div>
		<h2>商品详情</h2>
		<p>{{$route.params.id}}</p>
	</div>
</template>
```

​	2. 详情页路由配置  router/index.js

```
{
	path:'/',
	component:Home,
	children:[
		{
			path:'',
			name:'home',
			component:List
		},
		{
			path:'detail/:id',
			component:Detail
		}
	]
}
```

	3. 跳转， List.vue

```
<ul>
	<li><router-link to="/detail/1">详情1</router-link></li>
	<li><router-link to="/detail/2">详情2</router-link></li>
</ul>
```

>传递路由组件参数：
>
>```
>{ path:"detail/:id",component:Detail,props:true}
>```
>
>组建中以属性方式获取：
>
>```
>export default { props:['id'] }
>
>export default {
>	props: {
>		id: {
>			type:String,
>			default:''
>		}
>	}
>}
>```
>
>可以有效解耦，增强组件通用性

#### 路由守卫

路由导航过程中有若干生命周期钩子，可以在这里实现逻辑控制。

##### 全局守卫  

```
router/index.js
const router = new Router({
    mode:'history',   //模式：hash | history
    base:process.env.BASE_URL,  //http://localhost:8080/vue
    routes:[{
        path:'/',
        name:'home',
        component:Home
    },{
        path:'/about',
        name:'about',
        meta:{
        	auth: true,    //需要登录才可访问
        },
        // 路由级代码分割，生成分片（about.[hash].js）
        // 当访问路由时会懒加载
        component:()=>import(/* webpackChunkName: "about" */ './views/About.vue')
    }
   ]
})
router.beforeEach((to,from,next) => {
	if(to.meta.auth &&  !window.isLogin){
		if(window.confirm("请登录")){
			window.isLogin = true;
			next();     //登录成功，请继续
		}else{
			next('/');  //放弃登录，回首页
		}
	}else{
		next();         //不需要登录，继续
	}
})
export default router
```

##### 组件内的守卫

```
export default{
	beforeRouteEnter(to,from,next){},
	beforeRouteUpdate(to,from,next){},
	beforeRouteLeave(to,from,next){}
}
```

#### vue-router扩展

##### 动态路由

利用$router.addRoutes()可以实现动态路由添加，常用于用户权限控制

```
// router/index.js
//返回数据可能是这样子的
// [{ path: '/', name:'home', component:'Home'}]

//异步获取路由
api.getRoutes().then(routes=>{
	const routeConfig = routes.map(route => mapComponent(route));
	router.addRoutes(routeConfig);
})

//映射关系
const comMap = {
	'Home': () => import('./view/Home.vue')
}

//递归替换
function mapComponent(route){
	route.component = compMap[route.component];
	if(route.children){
		route.children = route.children.map(child => mapComponent(child))
	}
	return route
}
```

##### 面包屑

利用$route.matched可得到路由匹配数组，按顺序解析可得到路由层次关系。

```
watch:{
	$route(){
		console.log(this.$route.matched);
		this.crumbData = this.$route.matched.map(m => {name:m.name,path:m.path})
	}
}
```

## vuex

#### 安装  

 https://vuex.vuejs.org/zh/

```
vue add vuex
```

#### 核心概念

* state 状态，数据
* mutations 更改状态的函数
* actions 异步操作
* getters  状态数据的衍生变量
* store 包含以上概念的容器

#### 状态和状态变更

state 保存数据状态，mutations用于修改状态，store/index.js

```
export default new Vuex.Store({
	state:{ count: 0 },
	mutations:{
		add(state, n=1 ){
			state.count += n
		}
	}
})
```

使用状态， vuex/index.vue

```
<template>
	<div>
		<div>{{$store.getters.score}}</div>
		<div>{{$store.state.count}}</div>
		<button @click="add">增加</button>
	</div>
</template>
export default{
	methods:{
		add(){
			//提交mutations
			this.$store.commit('add',2)
			//提交actions
			this.$store.dispatch('addAsync',2)
		}
	}
}
```

#### 派生状态-getters

从state派生出新的状态

```
export default new Vuex.Store({
	getters:{
		score(state){
			return `我是派生出来的变量：${state.count}`
		}
	}
})
```

#### 异步操作-actions

复杂的业务逻辑，类似于controller

```
export default new Vuex.Store({
	actions:{
		addAsync({commit}){
			setTimeOut(()=>{
				commit('add',3)
			},1000)
		}
	}
})
```

#### 模块化

按模块的方式编写代码  store/index.js

```
const count = {
	namespaced:true,
	state:{ count: 0 },
	mutations:{
		add(state, n=1 ){
			state.count += n
		}
	},
	getters:{
		score(state){
			return `我是派生出来的变量：${state.count}`
		}
	},
	actions:{
		addAsync({commit},{n}){
			setTimeOut(()=>{
				commit('add',n)
			},1000)
		}
	}
};
export default new Vuex.Store({
	modules:{
		a : count
	}
})
```

使用，  components/vuex/module.vue

```
<template>
	<div>
		<div>{{$store.getters['a/score']}}</div>
		<div>{{$store.state.a.count}}</div>
		<button @click="add">增加</button>
		<button @click="addAsync">增加Async</button>
	</div>
</template>
export default{
	methods:{
		add(){
			this.$store.commit('a/add');
		},
		addAsync(){
			this.$store.dispatch('a/addAsync',{
				n : 5
			})
		}
	}
}
```

## Nuxt.js

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

#### 安装和启动

确保安装了npx（npx在NPM版本5.2.0默认安装了）：npm -v  查询npm版本

```
1.npx create-nuxt-app b2b-mobile-nuxt

2.cd b2b-mobile-nuxt

3.npm install

4.npm run dev
```

#### 别名

～ 或 @

>模板中, 如果需要引入 `assets` 或者 `static` 目录, 使用 `~/assets/your_image.png` 和 `~/static/your_image.png`方式。

#### ui框架

[轻量可靠的移动端Vue框架vant](https://youzan.github.io/vant/#/zh-CN/)

1.安装：npm i vant -S

2.导入所有组件 新建文件 plugins/vant.js

```
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
```

3.nuxt.config.js配置插件

```
plugins: [
    "~/plugins/vant.js"
],
```

####  路由

>在pages文件夹新建vue文件，会自动生成路由配置

##### 基础路由

```
pages/index.vue   -> /
pages/find.vue    -> /find
pages/order.vue   -> /order
pages/member/index.vue   ->/member/
```

##### 动态路由

>新建带下划线名称带vue文件，即可生成动态路由 即 pages/travel/detail/_id.vue

```
pages/detail/xxx
```

路由参数校验

```
validate ({ params }) {   
	// 必须是number类型    
	return /^\d+$/.test(params.id)  
}
```

##### 嵌套路由



##### 导航

添加路由导航，layouts/nav-footer.vue

```
<nuxt-link tag="li" to="/">
   <van-icon name="wap-home-o" :color="navActive === 0 ? '#E3324C' : ''" />首页
</nuxt-link>
```

>禁用预加载行为<nuxt-link tag="li" to="/" no-prefetch>page not per-fected</nuxt-link>

>注意：store中的state 的返回对象要用（）包裹起来，不然初始值会有问题
>
>设置了keep-alive之后，第二次渲染组件不会重新走mounted

### Nuxt.js  spa方式

* nuxt.config.js    mode -> spa

* plugins/api.js  生产环境的请求配置需要修改一下

* nuxtServerInit 方法不执行了

* 由于后台设置的cookie在前端不可以读取，所以，需要前端手动存取cookie  login.vue 存取 rememberMe

* Plugins/axios.js  添加$axios.defaults['withCredentials'] = true;  请求接口携带cookie过去给后台

* 跳转路由的时候都需要走一次权限验证. middleware/spa.js 

* 退出登录的时候，要清除cookie  rememberMe

  

