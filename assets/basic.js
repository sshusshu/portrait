//const imageUpload = document.querySelector('#imageUpload')

// Promise.all([
//     faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
//     faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
//     faceapi.nets.ssdMobilenetv1.loadFromUri("./models")
// ]).then(start)
//
// function start() {
//     const container = document.createElement('div');
//     container.style.position="relative";
//     document.body.append(container);
//     document.body.append('Loaded');
//     imageUpload.addEventListener('change',async()=>{
//         const image = await faceapi.bufferToImage(imageUpload.files[0]);
//         container.append(image);
//         const canvas = faceapi.createCanvasFromMedia(image);
//         container.append(canvas);
//         const displaySize = {width:image.width, height:image.height}
//         faceapi.matchDimensions(canvas, displaySize)
//         const detections = await faceapi.detectAllFaces(image).withFaceLandmarks()
//         document.body.append(detections.length)
//         const resizedDetections = faceapi.resizeResults(detections,displaySize);
//         resizedDetections.forEach( detection =>{
//             const box = detection.detection.box
//             const drawBox = new faceapi.draw.DrawBox(box,{label:'Face'})
//             drawBox.draw(canvas)
//         })
//     })
// }

const input = document.getElementById('myImg')


Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models")
]).then(start)


function start(){
    const container = document.createElement('div');
    container.style.position="relative";
    document.body.append(container);

    input.addEventListener('change',async()=>{
        const image = await faceapi.bufferToImage(input.files[0]);
        container.append(image)
        const canvas = faceapi.createCanvas(image);
        container.append(canvas)
        const ctx =canvas.getContext('2d')
        const displaySize = {width:image.width, height:image.height};
        faceapi.matchDimensions(canvas, displaySize);


        const detecting = await faceapi.detectSingleFace(image).withFaceLandmarks();
        const points = detecting.landmarks._positions

        ctx.beginPath();
        ctx.strokeStyle = '#fff000'
        ctx.fillStyle = '#fff'
        for (let i =0;i<points.length;i++){
            ctx.fillText( `${i}`, points[i]._x, points[i]._y);
            ctx.lineTo(points[i]._x,points[i]._y);
            ctx.stroke()
        }
        ctx.closePath();

    })
}



