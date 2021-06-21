import drawingCvs from './library/drawCanvas.js'
import drawingFace from './library/drawFace.js'

//variables
const input = document.querySelector('#ex_file');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const preloader = document.querySelector('.preloader');

const alertBox = document.querySelector('.alert');
const otherPicBtn = alertBox.querySelector('.btn-other');

const drawingBox = document.querySelector('.drawing-container');
let detecting,points,gender,mh,mw;




//functions
function init(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawingBox.innerHTML = ''
}
function showing(target) {
    target.classList.add('show');
}
function hiding(target) {
    target.classList.remove('show');
}

async function resizedImg(faceapi){
        const image = await faceapi.bufferToImage(input.files[0]);
        const detect = await faceapi.detectSingleFace(image).withFaceLandmarks();
        const point = detect.landmarks.positions;
        const arrX = point.map(a=>a._x);
        const arrY = point.map(a=>a._y);
        const sx = Math.min(...arrX)-20;
        const sy = Math.min(...arrY)-20;
        const ex = Math.max(...arrX)+20;
        const ey = Math.max(...arrY)+20;
        mw = 350;
        mh = (mw*(ey-sy))/(ex-sx);
        canvas.width = mw;
        canvas.height = mh;
        canvas.style.opacity = '1'
        ctx.drawImage(image,sx,sy,ex-sx,ey-sy,0,0,mw,mh);
}

async function landmarks(faceapi){
    detecting = await faceapi
        .detectSingleFace(canvas)
        .withFaceLandmarks()
    points = detecting.landmarks.positions;
    gender = detecting.gender;
}





Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
]).then(res => console.log(res))

function start(){
    input.addEventListener('change', async function(){
        showing(preloader);
        try{
            await resizedImg(faceapi);
            await landmarks(faceapi);
        }catch(e){
            hiding(preloader);
            showing(alertBox);
            otherPicBtn.addEventListener('click', ()=> hiding(alertBox));
            init();
            return
        }
        hiding(preloader);
        drawingCvs(points,ctx)
        drawingFace(drawingBox,points,mw,mh);
    })
}
