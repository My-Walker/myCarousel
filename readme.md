# 问题思考记录

> 轮播图形式众多，之前封装的只是其中某个形式的而已，并不是实现复用

## 事先封装真正可复用的轮播图的必要性

轮播图形式众多，可以是图片，也可以是个div盒子，或许是其他。

但轮播的背后原理是差不多的，封装真正可复用轮播图，可减少轮播原理核心代码的冗余。

## 轮播图构成

一个轮播容器，里面有轮播元素 + 左右控制器按钮 + 原点按钮

## 编写思路随笔

new一个类时传入id，根据id获取my-carousel-container元素

从my-carousel-container元素上获取width和height，
获取my-carousel-container元素下的my-carousel-list元素
复制my-carousel-item的第一个到最后一个，最后一个到第一个，进行占位
获取my-carousel-list下的my-carousel-item数量count
设置my-carousel-list的width为count * 第一步获取的width


想要更改圆点选中后样式，覆盖.carousel-current样式即可

按照顺序为my-carousel-btn-item圆点添加data-slide-to

## 使用注意：

my-carousel-container元素css样式需要设置宽高

## 使用方式：

1. 按照如下html相应类名

```html
<div id="match">
    <div class="my-carousel-container">
        <ul class="my-carousel-list my-carousel-clearfix">
            <li class="my-carousel-item item">
                <!-- 自定义img，text均可 -->
            </li>
            <li class="my-carousel-item item"></li>
            <li class="my-carousel-item item"></li>
            <li class="my-carousel-item item"></li>
            <li class="my-carousel-item item"></li>  
        </ul>
        <ul class="my-carousel-btn-list"> 
            <li class="my-carousel-btn-item carousel-current">
                <!-- 想要修改，修改对应类名css样式进行覆盖即可 -->
            </li>
            <li class="my-carousel-btn-item"></li>
            <li class="my-carousel-btn-item"></li>
            <li class="my-carousel-btn-item"></li>
            <li class="my-carousel-btn-item"></li>
            <li class="my-carousel-btn-item"></li>                
        </ul>
        <div class="my-carousel-prev prev">
            <!-- 自定义 -->
            <!-- <span>&lt;</span> -->
        </div>
        <div class="my-carousel-next next">
            <!-- 自定义 -->
            <!-- <span>&gt;</span> -->
        </div>
    </div>
</div>
```

2. 引入carousel.js和carousel.css

3. 轮播的元素、左右控制器在相应类名下自定义

4. 圆点可根据相应类名编写样式进行覆盖

5. 一个要部署轮播图的容器元素，将其id传入MyCarousel，然后第二个参数传入一个json配置文件，可对轮播间隔、左右控制器的显示、圆点按钮的显示进行控制
```js  
var carousel = new MyCarousel('match', {
            playSpeed: 1500,
            showController: true,
            showBtn: true
        });
```

## 组件思路

固定的html和相应类名

根据传入id，配合事先定好的类名获取需要的dom元素

根据dom元素，改变my-carousel-list类名元素的width和left，width根据轮播元素的个数计算为百分比，left设置为一个轮播元素的负值

操作dom，添加占位轮播元素，实现循环轮播效果

为圆点添加相应data-slide-to，为第一个圆点添加carousel-current类名

添加事件

调用轮播函数

