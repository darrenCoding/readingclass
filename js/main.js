(function(window){
    var Drag = function(settings){
        function Drag(){
            this.init.apply(this,arguments);
        }

        Drag.prototype = {
       	    constructor : Drag,
       	    d : document,
       	    w : window,
       	    getId : function(id){
       	    	return document.getElementById(id)
       	    },

       	    init : function(opts){
       	    	var _this = this;
       	    	var getDom  = function(opts){
                    _this.wrap = _this.getId("wrap");
                    _this.img_small = _this.wrap.getElementsByTagName("img")[0];
	       	    _this.img_clip = _this.wrap.getElementsByTagName("img")[1];
       	   	    _this.pop = _this.getId("pop");
       	   	    _this.preview = _this.getId("preview");
       	   	    _this.img_big = _this.preview.getElementsByTagName("img")[0];
       	   	    _this.widthMinus = opts.big_width / opts.small_width;
       	   	    _this.heightMinus = opts.big_height / opts.big_height;
       	   	    _this.method = opts.method;

       	    	};

       	    	var setStyle = function(opts){
                    _this.img_small.style.filter = 'alpha(opacity:'+opts.opacity * 100+')';
		    _this.img_small.style.opacity = opts.opacity ;
		    _this.pop.style.width = opts.clip_width + "px";
	            _this.pop.style.height = opts.clip_height + "px";
       	    	}
       	    	_this.d.onselectstart = function(event){
       	    	    var e = EventUtil.getEvent(event);
       	    	    EventUtil.preventDefault(e);
       	    	}

                getDom(opts);
       	    	setStyle(opts);
       	    	this.renderPosition();
       	    	this.dragStart();
       	    	if(_this.method == "mouse"){
       	           _this.pop.style.display = 'none';
                   _this.img_clip.style.display = 'none';
                   _this.preview.style.display = 'none';
                   _this.img_small.style.zIndex = '1000';
                   _this.moveStart();
       	        }
       	    },

       	    renderPosition : function(){
       	    	var _this = this;
       	    	var current_top = _this.pop.offsetTop;
       	    	var current_left = _this.pop.offsetLeft;
		var current_right = _this.pop.offsetLeft + _this.pop.offsetWidth;
		var current_bottom = _this.pop.offsetTop + _this.pop.offsetHeight;
		_this.img_clip.style.clip = "rect("+current_top+"px,"+current_right+"px,"+current_bottom+"px,"+current_left+"px)";
       	        _this.img_big.style.left = -(current_left * _this.widthMinus) + "px";
       	        _this.img_big.style.top = -(current_top * _this.heightMinus) + "px";
       	    },

       	    dragStart : function(){
       	    	var _this = this;
       	    	var disX = 0;
				var disY = 0;
       	    	var moveHandlder = function(ev){
	                var e = EventUtil.getEvent(ev);
	                if(_this.method == "move"){
	                    var l = e.clientX-disX;
			    var t = e.clientY-disY;
	                }else{
	                    var l=e.clientX-_this.img_small.offsetLeft-_this.pop.offsetWidth/2;
			    var t=e.clientY-_this.img_small.offsetTop-_this.pop.offsetHeight/2;
	                }

			if(l < 0){
			    l = 0;
			}else if(l > _this.img_small.offsetWidth - _this.pop.offsetWidth) {
			    l = _this.img_small.offsetWidth - _this.pop.offsetWidth;
			}
			if(t < 0){
			    t = 0;
			}else if(t > _this.img_small.offsetHeight - _this.pop.offsetHeight) {
			    t = _this.img_small.offsetHeight - _this.pop.offsetHeight;
			}
			   _this.pop.style.left = l + 'px';
		           _this.pop.style.top = t + 'px';
			   _this.renderPosition();
			};
       	    	if(_this.method == "move"){
			var downHandler = function(ev){
				console.log(1);
				var e = EventUtil.getEvent(ev);
				disX = e.clientX - _this.pop.offsetLeft;
				disY = e.clientY - _this.pop.offsetTop;
				EventUtil.preventDefault(e);
				EventUtil.stopPropagation(e);
				EventUtil.addHandler(_this.d,"mousemove",moveHandlder);
				EventUtil.addHandler(_this.d,"mouseup",upHandler);
			};
			var upHandler = function(){
				EventUtil.removeHandler(_this.d,"mousemove",moveHandlder);
				EventUtil.removeHandler(_this.d,"mouseup",upHandler);
			};
                	EventUtil.addHandler(_this.pop,"mousedown",downHandler);
       	    	}else{
       	    		return {
       	    			moveEvent : moveHandlder
       	    		};
       	    	}
       	    },

       	    moveStart : function(){
       	    	var _this = this;
       	    	var showHandler = function(){
                    _this.pop.style.display = 'block';
                    _this.img_clip.style.display = 'block';
                    _this.preview.style.display = 'block';
       	    	};
       	    	var hideHandler = function(){
                    _this.pop.style.display = 'none';
                    _this.img_clip.style.display = 'none';
                    _this.preview.style.display = 'none';
       	    	}
       	    	this.img_small.onmouseover = showHandler;
       	    	this.img_small.onmouseout = hideHandler;
       	    	this.img_small.onmousemove = this.dragStart().moveEvent;
       	    }
        };

        return new Drag(settings);
    };

    //封装事件处理程序
	var EventUtil = {
		addHandler : function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
	            element.attachEvent("on" + type,handler);
			}else{
				element["on" + type] = handler;
			}
		},

		getEvent : function(event){
			return event ? event : window.event;
		},

		preventDefault : function(event){
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		},

		removeHandler : function(element,type,handler){
			if(element.removeEventListener){
				element.removeEventListener(type,handler,false);
			}else if(element.detachEvent){
	            element.detachEvent("on" + type,handler);
			}else{
				element["on" + type] = null;
			}
		},

		stopPropagation : function(event){
			if(event.stopPropagation){
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		}
	};

    window.Drag = Drag;
})(window)
