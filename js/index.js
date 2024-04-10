window.onload=function() {
     
     function navPataDataBind() {
         //动态加载导航
         var $navPath = document.getElementById("navPath")
         var pathData = goodData.path
         for (var i=0;i<pathData.length-1;i++) {
            //创建a元素，并加载到navpath中
            let $a=document.createElement("a")
            let $i=document.createElement("i")
            $a.href=pathData[i].url
            $a.innerHTML = pathData[i].title;
            $i.innerHTML = "/"
            $navPath.appendChild($a)
            $navPath.appendChild($i)
         }
         let $span=document.createElement("span")
         $span.innerHTML = pathData[pathData.length-1].title;
         $navPath.appendChild($span)

     }

   //   放大镜移入移出

     function zoomPic() {
       //获取需要设置的事件元素(onmouseover,onmouseenter(没有冒泡))
        var $smallPic= document.getElementById("smallPic");
        //进入的时候，就要创建蒙板元素
        $smallPic.onmouseenter=function() {
          var $mask = document.createElement("div")
          var $bigPic = document.createElement("div")
          var $bigPicImg = document.createElement("img")
          $mask.className="mask"
          $mask.id="mask"

          $bigPic.className="bigPic"
          $bigPic.id="bigPic"
          $bigPicImg.src="./images/b1.png"
          $bigPicImg.id="bigPicImg"
          $bigPic.appendChild($bigPicImg);
          
          //显示蒙板
          $smallPic.appendChild($mask);
          // 显示右则大图
          $smallPic.append($bigPic);

        }


       //mouse 移动事件开始 获取当前mouse位置，并设置
       $smallPic.onmousemove=function(e){
         var $mask= document.getElementById("mask");
         //事件的
         var mouseX = e.clientX
         var mouseY = e.clientY
         //元素针对浏览器宽
         var smallPicX = $smallPic.getBoundingClientRect().left;
         var smallPicY = $smallPic.getBoundingClientRect().top;

         //元素本身的宽
         var maskX = $mask.offsetWidth/2
         var maskY = $mask.offsetHeight/2
         
         //给元素新的定位值
         distanceX = e.clientX - smallPicX - maskX;
         distanceY = e.clientY -  smallPicY - maskY
 
         //设置元素的样式值
         //移动边界控制
         if (distanceX<=0 )  {
            distanceX = 0
         }
         if (distanceY<=0) {
            distanceY = 0
         }
         if (distanceX>200)  {
            distanceX = 200
         }
         if (distanceY>200)  {
            distanceY = 200
         }
         $mask.style.left= distanceX +'px'
         $mask.style.top = distanceY+'px'

         //放大图片的距离
         var $bigPicImg = document.getElementById("bigPicImg")
         $bigPicImg.style.transform='translate(-'+distanceX*2+'px,-'+distanceY*2+'px)'
         
       }
 

       //移出时，需要移除元素
       $smallPic.onmouseleave=function() {
         var $mask = document.getElementById("mask")
         var $bigPic = document.getElementById("bigPic")
   

         // 移除蒙版
         $smallPic.removeChild($mask)
         //移除大图片
         $bigPic.remove()
       }

     }
   
     navPataDataBind();  
     zoomPic();
}