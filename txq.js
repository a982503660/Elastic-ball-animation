window.onload=function(){
    oDiv=document.getElementById('box');
    var l=0;
    var t=0;
    var ispeedX=0;
    var ispeedY=0;
    var timer=null;
    oDiv.onmousedown=function(ev){clearInterval(timer);
        var ev=ev||event;
        var disX=ev.clientX - oDiv.offsetLeft;
        var disY=ev.clientY - oDiv.offsetTop;
        document.onmousemove=function(ev){
            var ev=ev||event;
            oDiv.style.left= ev.clientX - disX + 'px';
            oDiv.style.top=ev.clientY -disY + 'px';

            ispeedX=oDiv.offsetLeft-l;
            ispeedY=oDiv.offsetTop-t;
            l=oDiv.offsetLeft;
            t=oDiv.offsetTop;
        }; //onmousemove

        document.onmouseup=function(){
            document.onmousemove=null;
            clearInterval(timer);
            boomMove(oDiv);

            function boomMove(obj){

                var clientX=document.documentElement.clientWidth-obj.offsetWidth||document.body.clientWidth-obj.offsetWidth;
                var clientY=document.documentElement.clientHeight-obj.offsetHeight||document.body.clientHeight-obj.offsetHeight;

                timer=setInterval(function(){

                    ispeedY +=3;

                    var x= obj.offsetLeft + ispeedX;
                    var t= obj.offsetTop + ispeedY;



                    if(x>clientX){
                        x=clientX;
                        ispeedX *=-1;
                    };
                    if(x<0){
                        x=0;
                        ispeedX *=-1;
                    };
                    if(t>clientY){
                        t=clientY;

                        ispeedY *=-0.8;
                        ispeedX *=0.9;
                    };
                    if(t<0){
                        t=0;
                        ispeedY *=-1
                    };


                    obj.style.left= x  + 'px';
                    obj.style.top= t   + 'px';

                    if(Math.abs(ispeedX)<1){ispeedX=0;};
                    if(Math.abs(ispeedY)<1){ispeedY=0;};
                    if(ispeedX==0&&ispeedY==0&&oDiv.offsetTop==clientY){clearInterval(timer); }

                },30) ;
            }
        }; //onmouseup
    }; //onmousedown
}