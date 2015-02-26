# readingclass
放大镜组件

How to use

     1. Include Slider on your site.

        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script type="text/javascript" src="js/main.js"></script>

     2. Structure of HTML.

        <div id="wrap">
	    <img class="img1" alt="" src="img/small.jpg" width="310" height="310" />
            <img class="img2" alt="" src="img/small.jpg" width="310" height="310"/>
	    <div id="pop" class="pop"></div>

	    <div id="preview">
		    <img class="img3" alt="" src="img/big.jpg" width="800" height="800"/>
	    </div>
        </div>

    3.Initialize Slider

        Drag({
           method : "move",//裁选方式, move(拖动裁选) or mouse(自动裁选)
	        opacity : 0.5,//裁选框的透明度
	        clip_width : 100,//裁选框的宽度
	        clip_height : 100,//裁选框的高度
	        small_width : 310,//小图的宽度
   	        small_height : 310,//小图的高度
	        big_width : 800,//大图的宽度
	        big_height : 800,//大图的高度
        });
