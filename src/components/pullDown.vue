<template>
	<div>
		<div class="main">
			<div class="show-arr">
				<ul>
					<li v-for="item in checkArr">
						{{item}}
					</li>
				</ul>
			</div>
			<div class="search">
				<div class="bar">
					<input type="text" placeholder="搜索" v-model="search">
					<span></span>
				</div>
			</div>

			<div class="searchBox">
				<div v-show="listShow">
					<ul class="list" v-for="item in searchData">
						<li>
							<input type="checkbox" :id="item" :value="item" v-model="checkArr">
							<label :for="item">{{item}}</label>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "search",
		props: {
			data1: {
				type: Array,
				default:()=>[]
			},
		},
		data() {
			return {
				listShow: false,
				search: '',
				checkArr: [],
				items: ['变更中', '未生效', '作废', '正常', '审核中']
			}
		},
		watch: { 
			search: {
				handler() { //搜索框输入变化触发
					this.listShow = true;
				},
				deep: true // 深度监听
			}
		},
		computed: {
			searchData: function() {
				var osearch = this.search;  //获取搜索框信息
				if(osearch) {
					return this.items.filter(function(product) {
						return Object.keys(product).some(function(key) {
							return String(product[key]).toLowerCase().indexOf(osearch) >= 0
						})
					})
				}
				return this.items;
			}
		}
	}
</script>
<style scoped>
	@import "http://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css";
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		list-style: none;
	}
	
	.main {
		width: 100%;
		height: 350px;
		-webkit-box-shadow: 0 10px 10px 5px #eaeaea;
		-moz-box-shadow: 0 10px 10px 5px #eaeaea;
		box-shadow: 0 10px 10px 5px #eaeaea;
	}
	
	.show-arr {
		width: 100%;
		height: 34px;
		border: 1px solid #d5d5d5;
		padding-top: 4px;
	}
	
	.show-arr>ul {
		display: flex;
		justify-content: center;
	}
	
	.show-arr>ul>li {
		height: 24px;
		border-radius: 8px;
		padding: 2px;
		background: #2c72de;
		margin-left: 8px;
		color: #fff;
	}
	
	.search {
		width: 100%;
		height: 100px;
		padding: 30px;
		background: #f5f5f5;
	}
	
	.bar {
		position: relative;
		width: 300px;
		margin: 0 auto;
	}
	
	.bar>input {
		width: 100%;
		height: 42px;
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
		height: 42px;
		width: 42px;
		display: block;
		position: absolute;
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
	
	.list>li {
		margin: 0 auto;
		width: 300px;
		height: 30px;
		text-align: left;
		line-height: 30px;
	}
	
	.list>li>input {
		display: inline-block;
		width: 30px;
		height: 27px;
		vertical-align: middle
	}
</style>