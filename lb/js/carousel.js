function MyCarousel(id, json) {
    this.init(id, json);
}
MyCarousel.prototype = {
     // 获取元素样式，兼容IE
     getStyle: function (ele, prop) {
        if (ele.currentStyle) {
            return obj.currentStyle[prop];
        } else {
            return window.getComputedStyle(ele, null)[prop];
        }
    },
    // 绑定事件，兼容IE
    addEvent(ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false);
        } else if (ele.attachEvent) {
            ele[type + handler] = handler.call(ele);
            ele.attachEvent('on' + type, ele[type + handler]);
        } else {
            ele['on' + type] = handler;
        }
    },
    // 检测该dom是否含有该class
    hasClass: function (ele, str) {
        return ele.className.indexOf(str) === -1 ? false : true;
    },
    // 添加class
    addClass: function (ele, str) {
        ele.className = ele.className.trim() + ' ' + str;
    },
    // 删除class，如果有
    removeClass: function (ele, str) {
        ele.className = ele.className.split(str).join('').trim();
    },
    getData: function (id, json) {
        // console.log(document.getElementById(id));
        // 获取dom
        this.container = document.getElementById(id);
        this.oCarouselContainer = this.container.getElementsByClassName('my-carousel-container')[0];
        this.oMyCarouselList = this.oCarouselContainer.getElementsByClassName('my-carousel-list')[0];
        this.oMyCarouselItems = this.oMyCarouselList.getElementsByClassName('my-carousel-item');
        // console.log(this.oMyCarouselList);
        // this.count = this.oMyCarouselItems.length;
        this.oMyCarouselBtnList = this.container.getElementsByClassName('my-carousel-btn-list')[0];
        this.oMyCarouselBtnItems = this.oMyCarouselBtnList.getElementsByClassName('my-carousel-btn-item');
        this.oPrevBtn = this.container.getElementsByClassName('my-carousel-prev')[0];
        this.oNextBtn = this.container.getElementsByClassName('my-carousel-next')[0];
        // 获取相应参数数据
        this.playSpeed = json.playSpeed || 1500;
        if (json.showController === undefined) {
            this.showController = true;
        } else {
            this.showController = json.showController;
        }
        if (json.showBtn === undefined) {
            this.showBtn = true;
        } else {
            this.showBtn = json.showBtn;
        }
        // 方向，-1和1
        this.point = 1;
        this.timer = null;
        this.flag = true;
        this.currentIndex = 1;
        this.count = this.oMyCarouselItems.length;
        this.picWidth = parseInt(this.getStyle(this.oCarouselContainer, 'width'));
        this.picHeight = parseInt(this.getStyle(this.oCarouselContainer, 'height'));
        this.range = -this.picWidth;
    },
    changeStyle: function () {
        console.log(this.oMyCarouselItems);
        for (var i = 0; i < this.count + 2; i++) {
            this.oMyCarouselItems[i].style.width = this.picWidth + 'px';
            this.oMyCarouselItems[i].style.height = this.picHeight + 'px';
        }
        this.oMyCarouselList.style.width = 100 * (this.count + 2) + '%';
        this.oMyCarouselList.style.left = -this.picWidth + 'px';
    },
    isShowController: function (showController) {
        if (showController) {
            this.oPrevBtn.style.display = 'block';
            this.oNextBtn.style.display = 'block';
        } else {
            this.oPrevBtn.style.display = 'none';
            this.oNextBtn.style.display = 'none';
        }
    },
    isShowBtn: function (showBtn) {
        if (this.showBtn) {
            this.oMyCarouselBtnList.display = 'block';
        } else {
            this.oMyCarouselBtnList.display = 'none';
        }
    },
    changeDom: function () {
        // 增加占位dom，实现循环轮播
        var cloneFirst = this.oMyCarouselItems[0].cloneNode(true);
        var cloneLast = this.oMyCarouselItems[this.count - 1].cloneNode(true);
        this.oMyCarouselList.appendChild(cloneFirst);
        this.oMyCarouselList.insertBefore(cloneLast, this.oMyCarouselItems[0]);
        // 为第一个圆点增加carousel-current类名
        this.addClass(this.oMyCarouselBtnItems[0], '.carousel-current');
        // 按顺序为圆点增加属性
        for (var i = 0; i < this.oMyCarouselBtnItems.length; i++) {
            this.oMyCarouselBtnItems[i].setAttribute('data-slide-to', i + 1);
        }
    },
    scrollPrev: function () {
        var $this = this;
        if (this.flag) {
            // 关闭锁
            this.flag = !this.flag;
            // 最后一张恢复过渡
            // if (this.currentIndex === this.count) {
            this.oMyCarouselList.style.transitionDuration = '1s';
            // } 
            // 正常轮播
            this.currentIndex--;
            this.oMyCarouselList.style.left = this.currentIndex * this.range + 'px';
            if (this.currentIndex === this.count + 1) {
                this.changeRound(1);
            } else if (this.currentIndex === 0) {
                this.changeRound(this.count);
            } else {
                this.changeRound(this.currentIndex);
            }
            // console.log(currentIndex, ' ', parseInt(getStyle(oUl, 'left')));
            var flagTimer = setTimeout(function () {
                $this.flag = !$this.flag;
            }, 1000);
            // 移动到第一张，取消动画过渡，移到最后一张
            if (this.currentIndex === 0) {
                var tempTimer = setTimeout(function () {
                    $this.currentIndex = $this.count;
                    $this.oMyCarouselList.style.transitionDuration = '0s';
                    $this.oMyCarouselList.style.left = $this.range * $this.currentIndex  + 'px';
                }, 1000);
            }
        }
    },
    scrollNext: function () {
        var $this = this;
        if (this.flag) {
            // 关闭锁
            this.flag = !this.flag;
            // 第一张恢复过渡
            // if (this.currentIndex === 1) {
            this.oMyCarouselList.style.transitionDuration = '1s';
            // } 
            
            // 正常轮播
            this.currentIndex++;
            this.oMyCarouselList.style.left = this.currentIndex * this.range + 'px';
            if (this.currentIndex === this.count + 1) {
                this.changeRound(1);
            } else if (this.currentIndex === 0) {
                this.changeRound(this.count);
            } else {
                this.changeRound(this.currentIndex);
            }
            var flagTimer = setTimeout(function () {
                $this.flag = !$this.flag;
            }, 1000);
            // console.log(this.currentIndex, parseInt(this.getStyle(this.oMyCarouselList, 'left')));
            // 移动到最后一张，取消动画过渡，移到第一张
            if (this.currentIndex === this.count + 1) {
                // console.log(currentIndex);
                var tempTimer = setTimeout(function () {
                    console.log('this = ', $this);
                    $this.currentIndex = 1;
                    $this.oMyCarouselList.style.transitionDuration = '0s';
                    $this.oMyCarouselList.style.left = $this.currentIndex * $this.range + 'px';
                }, 1000);
            }
        }
    },
    autoPlay: function () {
        var $this = this;
        this.timer = setInterval(function () {
            console.log($this.playSpeed);
            // console.log('this is ', $this);
            // console.log('autoplay');
            if ($this.point === 1) {
                $this.scrollNext();
            } else {
                $this.scrollPrev();
            }
            
            // console.log('this = ', $this);
        }, this.playSpeed);
        console.log(this.playSpeed);
    },
    stopAutoPlay: function () {
        clearInterval(this.timer);
    },
    scrollTo: function (targetIndex) {
        this.oMyCarouselList.style.transitionDuration = '1s';
        this.currentIndex = targetIndex;
        this.oMyCarouselList.style.left = this.currentIndex * this.range + 'px';
    },
    changeRound: function (targetIndex) {
        for (var len = this.oMyCarouselBtnItems.length, i = 0; i < len; i++) {
            this.removeClass(this.oMyCarouselBtnItems[i], 'carousel-current');
        }
        this.addClass(this.oMyCarouselBtnItems[targetIndex - 1], 'carousel-current'); 
    },
    btnHandler: function () {
        event = event || window.event;
        var target = event.target || event.srcElement;
        var targetIndex = target.getAttribute('data-slide-to');
        this.changeRound(targetIndex);
        this.scrollTo(targetIndex);
    },
    addClickEvent: function () {
        this.addEvent(this.oPrevBtn, 'click', this.scrollPrev.bind(this));
        this.addEvent(this.oNextBtn, 'click', this.scrollNext.bind(this));
        for (var i = 0; i < this.count; i++) {
            this.addEvent(this.oMyCarouselBtnItems[i], 'click', this.btnHandler.bind(this));
        }
    },
    addMouseEvent: function () {
        this.addEvent(this.oCarouselContainer, 'mouseover', this.stopAutoPlay.bind(this));
        this.addEvent(this.oCarouselContainer, 'mouseout', this.autoPlay.bind(this));
    },
    changePoint: function (num) {
        this.point = num;
    },
    init: function (id, json) {
        this.getData(id, json);
        this.changeDom();
        this.changeStyle();
        this.isShowBtn(this.showBtn);
        this.isShowController(this.showController);
        this.addClickEvent();
        this.addMouseEvent();
        this.autoPlay();
    }
}