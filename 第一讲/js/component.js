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
        <slot name="other"></slot>
        <slot></slot>
        <button-child :count="count"/>
    </div>
    `,
    methods:{
        addCount(){
            this.count = this.count + this.addNum;
            //父子组件通信
            this.$emit('change-total',this.addNum);   //注意，这里不能用驼峰方式
            eventBus.$emit('parent-change',this.addNum)
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