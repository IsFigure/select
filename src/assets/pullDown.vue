<template>
    <div>
        <input type="text" placeholder="输入以模糊查询" v-model="search">
        <div class="searchBox">
            <input type="text" class="select" v-model="checkedNames">
            <div class="down" @click="show"></div>
            <div v-show="listShow">
                <ul class="list" v-for="(item,index) in searchData">
                    <li>
                        <input type="checkbox" :id="item" class="checkItem" :value="item" v-model="checkedNames">
                        <label :for="item">{{item}}</label>
                    </li>
                </ul>
                <input id="quan" type="checkbox" @click="checkAll($event)">
                <label for="quan">全选</label>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "search",
        props:{//接收父组件传递过来的数据
            data1: {
                type: Array,
                default: []
            },
        },
        data(){
            return{
                listShow:false,
                search:'',
                checkedNames:[],
                items:['jack','mike','rose','jan']//下拉列表的选项数据，此数据可以从父组件传过来，通过props接收，接收到props数据后赋值给该数据即可
            }
        },
        created(){
           console.log(this.data1)
        },
        watch: { // 监视双向绑定的数据数组
            checkedNames: {
                handler(){ // 数据数组有变化将触发此函数
                    var checkObj1 = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
                    if(this.checkedNames.length == checkObj1.length){
                        document.querySelector('#quan').checked = true;
                    }else {
                        document.querySelector('#quan').checked = false;
                    }
                },
                deep: true // 深度监视
            },
            search:{
                handler(){//搜索框输入变化触发
                    this.listShow=true;
                },
                deep: true // 深度监视
            }
        },
        methods: {
            checkAll(e){ // 点击全选事件函数
                var checkObj = document.querySelectorAll('.checkItem'); // 获取所有checkbox项
                if(e.target.checked){ // 判定全选checkbox的勾选状态
                    for(var i=0;i<checkObj.length;i++){
                        if(!checkObj[i].checked){ // 将未勾选的checkbox选项push到绑定数组中
                            this.checkedNames.push(checkObj[i].value);
                        }
                    }
                }else { // 如果是去掉全选则清空checkbox选项绑定数组
                    this.checkedNames = [];
                }
            },
            show(){
                this.listShow=!this.listShow;
                if(this.listShow==true){
                    this.checkedNames = [];
                }

            }
        },
        computed: {
            searchData: function() {
                var search1 = this.search;
                if (search1) {
                    return this.items.filter(function(product) {
                        return Object.keys(product).some(function(key) {
                            return String(product[key]).toLowerCase().indexOf(search1) > -1
                        })
                    })
                }
                return this.items;
            }
        }
    }
</script>

<style scoped>
/*@import "mohuSearch.css";*/
*{margin: 0;padding: 0;box-sizing: border-box;}
			input {
				width: 100%;
				height: 42px;
			}
			
			span {
				height: 42px;
				width: 42px;
				display: block;
				position: absolute;
			}
			.show-arr{
				width: 100%;
				height: 34px;
				border: 1px solid #d5d5d5;
			}
			.search {
				width: 100%;
				height: 45px;
				background: #f5f5f5;
			}
			
			.bar {
				position: relative;
				width: 300px;
				margin: 0 auto;
			}
			
			.bar>input {
				border: 2px solid #d5d5d5;
				border-left: none;
				outline: none;
				font-size: 18px;
				border-radius: 0 42px 42px 0;
				color: #9E9C9C;
			}
			
			.bar span {
				top: 0;
				right: 300px;
				border: 2px solid #d5d5d5;
				border-radius: 42px 0 0 42px;
				border-right: none;
				background: #fff;
			}
			
			.bar span:before {
				content: "\f002";
				font-family: FontAwesome;
				font-size: 24px;
				position: absolute;
				top: 6px;
				left: 8px;
				color: #d5d5d5;
			}
</style>