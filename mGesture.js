(function(){
    var mouseTrace = [];

    var drawing = 0;
    var canvas;
    var context;

    var dollarRecognizer = new Dollar

    function mouseMoveHandler(e) {
        if(e.button === 1) {
            
            if(drawing==1){
                var eX=e.pageX - window.scrollX;
                var eY=e.pageY - window.scrollY;

                mouseTrace.push({X: eX, Y: eY})

                context.lineTo(eX,eY);
                context.lineWidth=6;
                context.strokeStyle = 'red';
                context.stroke();
            } else {return false}
        }
    }

    function mouseDownHandler(e) {
        if(e.button === 1) {
            console.log('down');
            
            e.preventDefault();
            
            insertCanvas()
            canvas = document.getElementById('mouseTraceCanvas')
            context = canvas.getContext("2d");

          
            context.beginPath();
            drawing=1;
        }
    }

    function mouseUpHandler(e) {
        console.log('up')
        if(e.button === 1) {

            context.closePath();
            drawing=0;   
            
            removeCanvas();
            console.log(dollarRecognizer.Recognize(mouseTrace, false))
            
            mouseTrace.length = 0;
        }
    }

    function insertCanvas() {
        var canvasEle = document.createElement('canvas');
        canvasEle.setAttribute('id', 'mouseTraceCanvas');
        canvasEle.setAttribute('oncontextmenu', 'return false');
        document.body.appendChild(canvasEle);
        
        canvasEle.style.position = 'fixed';
        canvasEle.style.top = '0px';
        canvasEle.style.left = '0px';
        canvasEle.style.zIndex = 1000;
        document.getElementById('mouseTraceCanvas').width=window.innerWidth;
        document.getElementById('mouseTraceCanvas').height=window.innerHeight;
        
        canvasEle.onmouseout=function(){
            console.log('out')
            context.closePath();
            drawing=0;      

            removeCanvas();
        }
    }

    function removeCanvas() {
        setTimeout(function(){
            var canvasEle = document.getElementById('mouseTraceCanvas');
            canvasEle.parentElement.removeChild(canvasEle);
        }, 500)
        
    }



    document.addEventListener('mousemove', mouseMoveHandler, false);
    document.addEventListener('mousedown', mouseDownHandler, false);
    document.addEventListener('mouseup', mouseUpHandler, false);
})();


