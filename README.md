#nvue编译模式：uni-app
#注意：目前不支持ios， 在下没有ios设备，如果你有并且愿意适配还请帮帮忙

# QQ交流群: 750104037 [点我加入](https://jq.qq.com/?_wv=1027&k=5OyZoXa)

# 快速导航
* ## [示例项目目录结构](#mddir)
* ## [Attributes](#Attributes)
* ## [Methods](#Methods)
* ## [Slots](#Slots)
* ## [tabs参数详解](#tabs)
* ## [组件运行原理](#run)
* ## [分页加载](#doPageDemand)

# <span id="mddir">示例项目目录结构<span>
```
|-- QS-tabs-list-nvue
    |-- App.vue
    |-- main.js
    |-- manifest.json
    |-- pages.json
    |-- README.md
    |-- components
    |   |-- QS-tabs-list-nvue	//组件文件夹
    |       |-- QS-tabs-list-nvue.nvue	//核心文件
    |       |-- components	//子组件
    |       |   |-- contentComponents.nvue	//由type区分模板
    |       |   |-- components	//自定义模板, 由type区分
    |       |       |-- defComponent.nvue
    |       |-- js
    |           |-- config.js
    |           |-- pageDemand.js	//分页加载js
    |           |-- util.js
    |-- pages
    |   |-- backgroundImage
    |   |   |-- backgroundImage.nvue
    |   |-- default
    |   |   |-- default.nvue
    |   |-- index
    |   |   |-- index.nvue
    |   |-- randomColor
    |   |   |-- randomColor.nvue
    |   |-- setColor
    |       |-- setColor.nvue
    |   |-- customBackToTop
    |       |-- customBackToTop.nvue
    |-- static
    |   |-- logo.png
    |-- util
        |-- getTabList.js
        |-- request
            |-- app.js
            |-- interfaces.js
            |-- mock.js
            |-- QS-request.js

```

# <span id="Attributes">Attributes<span>
```
props: {
	type: { //自定义逻辑判断标识
		type: String,
		default: ''
	},
	activeType: { //线条动画类型
		type: String,
		default: 'moveLine'
	},
	height: { //tabs+list组件的高度 单位固定像素px
		type: [String, Number],
		default: 500
	},
	minWidth: { //单个tab最小宽度
		type: String,
		default: '150rpx'
	},
	tabsHeight: { //tabs高度
		type: String,
		default: '44px'
	},
	lineWidth: { //tabsLine线条宽度
		type: [String, Number],
		default: uni.upx2px(50)
	},
	lineColor: { //线条颜色
		type: String,
		default: '#f1505c'
	},
	lineHeight: { //线条高度
		type: [String, Number],
		default: 3
	},
	lineBottom: { //线条距离底部距离
		type: [String, Number],
		default: 0
	},
	tabsFontSize: { //默认文字大小
		type: String,
		default: '30rpx'
	},
	tabsActiveFontSize: { //当前项文字大小
		type: String,
		default: '32rpx'
	},
	tabsBackgroundColor: { //tabs背景颜色
		type: String,
		default: '#fff'
	},
	swiperBackgroundColor: { //swiper背景颜色
		type: String,
		default: '#f8f8f8'
	},
	space: { //单个tab左右间距
		type: String,
		default: '10px'
	},
	defCurrent: { //默认初始项
		type: [String, Number],
		default: 0
	},
	activeColor: { //当前项主题颜色
		type: String,
		default: '#666'
	},
	defColor: { //非当前项主题颜色
		type: String,
		default: '#999'
	},
	lowerThreshold: { //默认初始项
		type: [String, Number],
		default: 0
	},
	getDataFnName: { //在子组件示例中获取数据的方法名称
		type: String,
		default: 'getData'
	},
	// 下拉刷新设置
	hasRefresh: { //是否开启下拉刷新, 目前只支持app-nvue
		type: [Boolean, String],
		default: true
	},
	refreshDistance: { //刷新距离
		type: [Number, String],
		default: 88
	},
	beforRefreshText: { //刷新前文字
		type: String,
		default: '下拉刷新'
	},
	releaseRefreshText: { //释放刷新文字
		type: String,
		default: '松开刷新'
	},
	isRefreshingText: { //刷新中文字
		type: String,
		default: '刷新中...'
	},
	successRefreshText: { //刷新成功文字
		type: String,
		default: '刷新成功'
	},
	failRefreshText: { //刷新失败文字
		type: String,
		default: '刷新失败'
	},
	refreshTextColor: { //刷新文字的颜色
		type: String,
		default: '#666'
	},
	refreshTextFontSize: { //刷新文字的大小
		type: String,
		default: '30rpx'
	},
	statusTextColor: { //列表状态提示文字颜色
		type: String,
		default: '#666'
	},
	backToTopDistance: { //显示返回顶部的距离
		type: [String, Number],
		default: 300
	},
	backToTop: {	//是否开启回到顶部功能
		type: [Boolean, String],
		default: true
	},
	backToTopIsSlot: {	//回到顶部按钮是否显示slot内容
		type: [Boolean, String],
		default: false
	},
	backToTopRight: {	//回到顶部按钮距离组件右边距离
		type: [String, Number],
		default: '30rpx'
	},
	backToTopBottom: {	//回到顶部按钮距离组件底部距离
		type: [String, Number],
		default: '70rpx'
	}
}
```

# <span id="Methods">Methods<span>
| 方法名| 说明|  参数|
| --------- | -------- | -----: |
| setTabs| 设置tabs数据| [详见tabs属性详解](#tabs)|

# <span id="Slots">Slots<span>
| slot name| 说明|
| --------- | -------- |
| backToTopSlot| 回到顶部插槽， 在backToTopIsSlot为true时生效|

## <span id="tabs">tabs参数详解</span>
* ### 注: tabs由组件ref实例调用setTabs方法设置
```
|tabs Array
|----String
|--------tab名称
|----Object
|--------name: tab名称
|--------tabsBackgroundColor: 当前项tabs背景颜色
|--------swiperBackgroundColor: 当前项swiper背景颜色
|--------lineColor: 当前项线条颜色
|--------statusTextColor: 列表状态说明文字颜色
|--------refreshTextColor: 刷新文字颜色
```

# <span id="run">组件运行原理<span>
* ## 设置tabs数据(使用ref调用setTabs方法传入)
* ## 获取tabs高度, 计算swiper高度(height属性 - tabs高度)
* ## 计算各项tab布局信息(用于线条动画)
* ## 调用子组件方法初始化默认项数据(进入[分页数据加载](#doPageDemand))

# <span id="doPageDemand">分页加载数据(子组件中)<span>
* ## 引入doPageDemand.js与加载数据方法(示例为getTabList)
* ## call调用doPageDemand传入this实例
* ## doPageDemand.js内部实现分页加载数据
