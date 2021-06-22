import drawingCvs from './library/drawCanvas.js'
import drawingFace from './library/drawFace.js'

const Page = (()=>{
    //DOM content variables
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const preloader = document.querySelector('.preloader');
    const alertBox = document.querySelector('.alert');
    const otherPicBtn = alertBox.querySelector('.btn-other');
    const uploadFile = document.querySelector('#ex_file');
    const drawingBox = document.querySelector('.drawing-container .img-box');
    const downloadBtn = document.querySelector('.download');

//function variables
    let detecting,points,gender,mh,mw;
    let svgUrl;
//functions
    function init(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        drawingBox.innerHTML = ''
    }
    function showing(el) {
        el.classList.add('show');
    }
    function hiding(el) {
        el.classList.remove('show');
    }

    async function resizedImg(faceapi){
        const image = await faceapi.bufferToImage(uploadFile.files[0]);
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
        canvas.style.visibility = 'hidden'
        ctx.drawImage(image,sx,sy,ex-sx,ey-sy,0,0,mw,mh);
    }

    async function landmarks(faceapi){
        detecting = await faceapi
            .detectSingleFace(canvas)
            .withFaceLandmarks()
        points = detecting.landmarks.positions;
        gender = detecting.gender;
    }

    async function drawStart(){
        showing(preloader);
        try{
            await resizedImg(faceapi);
            await landmarks(faceapi);
        }catch(e){
            hiding(preloader);
            showing(alertBox);
            otherPicBtn.addEventListener('click', ()=> hiding(alertBox));
            init();
            return;
        }
        hiding(preloader);
        drawingCvs(points,ctx)
        drawingFace(drawingBox,points,mw,mh);
        saveSvg(drawingBox.querySelector('svg'),"sshu's drawing.svg")
        downloadBtn.setAttribute('href',svgUrl)
        console.dir(drawingBox.querySelector('svg').outerHTML)
    }

    function saveSvg(svgEl) {
        svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svgEl.style.fill = 'transparent';
        svgEl.style.stroke = '#000';
        const svgData = svgEl.outerHTML;
        const preface = '<?xml version="1.0" standalone="no"?>\r\n';
        const svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
        svgUrl = URL.createObjectURL(svgBlob);
    }


    const _load_init = () => {
        Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
            faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
        ]).then((res)=>{
            uploadFile.addEventListener('change', drawStart)

        })
    }

    return {
        load_init:_load_init
    }

})();

window.addEventListener('load',()=>{Page.load_init()})

