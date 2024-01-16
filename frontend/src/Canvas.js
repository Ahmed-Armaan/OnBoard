import './Canvas.css';
import { useRef,useEffect } from 'react';
import io from 'socket.io-client';
let isDrawing = false,clear=false;
let lineWidth = 5;
let clearwidth = 0;
const socket = io.connect("http://localhost:4000");

const Canvas = (props) =>{
    const ref = useRef();
    useEffect(()=>{
        const canvas = ref.current;
        const context = canvas.getContext('2d');
        canvas.width = window.innerWidth*5;
        canvas.height = window.innerHeight*5;

        function startDrawing(e){
            if(e.button === 0){
            isDrawing = true;
            context.beginPath();
            context.moveTo(e.clientX,e.clientY);
            }
        }
        function draw(e){
            socket.emit("drawing");
            if(clear === true) context.strokeStyle = "white";
            else context.strokeStyle = "red";
            if(isDrawing){
                context.lineWidth = lineWidth;
                context.lineTo(e.clientX,e.clientY);
                context.stroke();
            }
        }
        function stopDrawing(e){
            isDrawing = false;
            context.closePath();
        }
        function clearScreen(){
            context.clearRect(0, 0, canvas.width, canvas.height);
        }

        document.getElementById('clear').addEventListener('click',clearScreen);
        canvas.addEventListener('mousedown',startDrawing);
        canvas.addEventListener('mouseup',stopDrawing);
        canvas.addEventListener('mousemove',draw);
        canvas.addEventListener('mouseout',stopDrawing);
        return()=>{
            document.getElementById('clear').removeEventListener('click',clearScreen);
            canvas.removeEventListener('mousedown',startDrawing);
            canvas.removeEventListener('mouseup',stopDrawing);
            canvas.removeEventListener('mousemove',draw);
            canvas.removeEventListener('mouseout',stopDrawing);
        }
    },[]);
    function setWidth(){
        lineWidth = document.getElementById('lineWidth').value;
    }
    function clear(){
        clear =!clear;
    }
      
    return (
        <div id="container">
            <div id = "inputs">
                <input type="text" id="lineWidth"></input>
                <input type="submit" onClick={setWidth} value="line width"></input>
                <input type="submit" onClick={clear} value="clear"></input>
                <input type="submit" id="clear" value="clear screen"></input>
            </div>
            <canvas ref={ref} {...props}/>
        </div>
    );
}

export default Canvas;
