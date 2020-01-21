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
            this.$emit('change-total',this.addNum);   //注意，这里不能用驼峰方式
        },
    },
    mounted() {
    }
}