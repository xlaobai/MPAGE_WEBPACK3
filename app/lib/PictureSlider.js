/**轮播通用插件**
 *
 *基础功能
 *  方向按钮图片切换 *
 *  定时器图片切换 *
 *  传参通用化
 *  缓存
 *  
 *加强功能
 *  手尾位置btn消失
 *  按钮式索引切换
 *  轮播图位移式切换
 *   
 *  
 * make in lusixin  （维护中）
 */

'use strict';

(function ($) {

  //使用
  var AdvSlide = function () {
    function AdvSlide(element, options) {
      this.settings = $.extend({}, $.fn.advSlide.defaults, options);
      this.element = element;
      this.init();
    }

    AdvSlide.prototype = {
      init: function () {
        this.adSlideImg = this.element.find(this.settings.adSlideImg);
        this.lbt = this.adSlideImg.parent().find(this.settings.lbt);
        this.rbt = this.adSlideImg.parent().find(this.settings.rbt);
        this.adSlideBtn = this.adSlideImg.parent().find(this.settings.adSlideBtn);
        this.btnLi = this.adSlideBtn.find('li');
        this.len = this.adSlideImg.find('li').length;
        this.settings.pageNum = this.len;    //根据轮播图的页面指定轮播图

        this.switch = false; //图片移动开关
        this.imgHover = false; //索引调整开关 
        this.index = 0; //图片当前索引
        this.auto; //循环播放器
        this.wayEvent(); 
        this.hoverEvent();
        this.scrollPage();
        this.btnEvent();
      },
      slide: function (indexDis) {
        //实现效果
        var slideWidth = -this.adSlideImg.find('li').width(); //adSlideImg li宽度
        var left;

        if (this.index == this.len - 1 && indexDis == this.settings.pageNum || indexDis == 0) {
          //方向键效果
          this.rbt.show();
          this.lbt.hide();
          //按钮效果
          indexDis = 0;
        } else if (this.index == this.len - 2) {
          this.rbt.hide();
          this.lbt.show();
        } else {
          this.lbt.show();
          this.rbt.show();
        }
        // 共同判断部分提取

        this.switch = true;
        this.btnLi.eq(indexDis).addClass(this.settings.activeTab);
        this.btnLi.eq(indexDis).siblings().removeClass(this.settings.activeTab);
        var _this = this;
        this.adSlideImg.animate({ 'left': slideWidth * indexDis + 'px' }, 1500, function () {
          _this.index = indexDis;
          _this.switch = false;
        });
      },
      scrollPage: function () {
        //循环触发
        var _this = this;
        this.auto = setInterval(function () {
          if (_this.switch || _this.imgHover) {
            return;
          } else {
            _this.slide(_this.index + 1);
          }
        }, 5000);
      },
      wayEvent: function () {
        //方向键事件
        var _this = this;        
        this.lbt.click(function () {
          if (_this.switch) {
            return;
          } else {
            _this.slide(_this.index - 1);
          }
        });

        this.rbt.click(function () {
          if (_this.switch) {
            return;
          } else {
            _this.slide(_this.index + 1);
          }
        });
      },
      hoverEvent: function () {
        var _this = this;
        this.adSlideImg.hover(function () {
          _this.imgHover = true;
        }, function () {
          _this.imgHover = false;
        }).trigger('mouseout');
      },
      btnEvent: function () {
        var _this = this;
        this.btnLi.click(function () {
          if (_this.switch) {
            return;
          } else {
            _this.slide($(_this).index());
          }
        });
      }
	};
	
    return AdvSlide;
  }();

  //jquery对象上挂载方法
  $.fn.advSlide = function (options) {
    return this.each(function () {
      var element = $(this),
          instance = element.data('AdvSlide');
      
      //AdvSlide立即执行函数，返回AdvSlide对象后即销毁不污染环境
      if (!instance) {
        element.data('AdvSlide', instance = new AdvSlide(element, options));
      }
    });
  };
  
  //方法上定义默认参数(即默认调用)
  $.fn.advSlide.defaults = {
    adSlideImg: '.adSlide-img',
    lbt: '.lbt',
    rbt: '.rbt',
    adSlideBtn: '.adSlide-btn',
    activeTab: 'active',
  };
})(jQuery);
//# sourceMappingURL=main.js.map
