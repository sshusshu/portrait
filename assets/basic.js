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

const input = document.querySelector('input');
const img = document.querySelector('img');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models")
]).then(start)


function start(){

    input.addEventListener('change',async()=>{
        const image = await faceapi.bufferToImage(input.files[0]);
        img.src = image.src;
        //img.width = 600;
        
        canvas.width = img.width;
        canvas.height = img.height;

        const displaySize = {width:canvas.width, height:canvas.height};
        const detecting = await faceapi.detectSingleFace(img).withFaceLandmarks()
        faceapi.matchDimensions(canvas, displaySize);
        const points = detecting.landmarks._positions

        console.log(detecting)
      
        for(let i =0;i<points.length;i++){
          ctx.fillText ( `${i}`,points[i]._x,points[i]._y)
          ctx.beginPath();
          ctx.arc(points[i]._x,points[i]._y,2,0,Math.PI*2,false)
          ctx.stroke();
          ctx.closePath();
        }

        const lefteye = { 
          r:{
            x:points[39]._x +((points[38]._x - points[37]._x)/2) , 
            y:points[40]._y
            },
          l:{
            x:points[36]._x-5,
            y:points[37]._y + ((points[41]._y+5 - points[37]._y)/2)
            },
          center: {
            x:points[37]._x+((points[38]._x - points[37]._x)/2),
            y:points[41]._y+7
            },
            radius : ((points[38]._x - points[37]._x)/2)
          }

        const righteye = { 
          r:{
            x:points[25]._x, 
            y:points[44]._y + ((points[44]._y+5 - points[46]._y)/2)
            },
          l:{
            x:points[35]._x + ((points[42]._x-points[35]._x)/2),
            y:points[47]._y
            }
          }

          const nose = {
            l :{
              x:points[31]._x - ((points[31]._x-points[39]._x)/2),
              y:points[31]._y
            },
            r :{
              x:points[35]._x + ((points[42]._x-points[35]._x)/2),
              y:points[35]._y
            }
          }

          const chin = points[8]._y + (points[7]._y-points[6]._y)
          

        // ctx.beginPath();
        // ctx.strokeStyle = '#555'
        // ctx.moveTo(points[17]._x,points[17]._y-100)
        // //왼쪽 눈썹
        //     ctx.lineTo(points[17]._x,points[17]._y);
        //     ctx.lineTo(points[18]._x,points[18]._y);
        //     ctx.lineTo(points[21]._x,points[21]._y);
        //     ctx.lineTo(points[21]._x+15,points[21]._y+15);
        //     ctx.lineTo(points[18]._x,points[18]._y+15);
        //     ctx.lineTo(points[17]._x,points[17]._y+15);
        // //왼쪽 눈
        // ctx.lineTo(points[36]._x-15,points[36]._y+15);
        // ctx.lineTo(points[37]._x,points[37]._y-5);
        // ctx.lineTo(points[38]._x,points[38]._y-5);
        // ctx.lineTo(points[39]._x+10,points[39]._y+10);
        // ctx.lineTo(points[38]._x,points[38]._y);
        // ctx.arc(points[38]._x-10,points[38]._y+10,10,Math.PI*1.5,Math.PI*3.5,false)
        // ctx.lineTo(points[37]._x,points[37]._y);
        // ctx.lineTo(points[36]._x-20,points[36]._y+15);
        // ctx.lineTo(points[41]._x,points[41]._y+5);
        // ctx.lineTo(points[40]._x,points[40]._y+5);
        // ctx.lineTo(points[39]._x+10,points[39]._y+10);
        // //볼
        // ctx.lineTo(points[39]._x+10,points[39]._y+20);
        // ctx.lineTo(points[36]._x-15,points[36]._y+25);
        // ctx.lineTo(points[37]._x,points[30]._y);
        // //코
        // ctx.lineTo(points[27]._x,points[27]._y);
        // ctx.lineTo(points[30]._x,points[30]._y);
        // ctx.arc(points[30]._x,points[30]._y,15,Math.PI*0.5,Math.PI*2.5,false)
        // ctx.lineTo(points[35]._x,points[35]._y);
        // ctx.arc(points[35]._x-10,points[35]._y,10,Math.PI*0.5,Math.PI*2.5,false)
        // ctx.lineTo(points[31]._x,points[31]._y);
        // ctx.arc(points[31]._x,points[31]._y,10,Math.PI*0.5,Math.PI*2.5,false)
        // ctx.lineTo(points[33]._x,points[33]._y);

        // //턱
        // ctx.lineTo(points[8]._x,points[8]._y);
        // ctx.arc(points[8]._x,points[8]._y,30,Math.PI*1.5,Math.PI*4.5,false)
        // //볼라인
        // ctx.lineTo(points[7]._x,points[7]._y);
        // ctx.lineTo(points[5]._x,points[5]._y);
        // ctx.lineTo(points[2]._x,points[2]._y);
        // ctx.lineTo(points[4]._x,points[4]._y);
        // ctx.lineTo(points[6]._x,points[6]._y);
        // ctx.lineTo(points[8]._x,points[8]._y+10);
        // ctx.lineTo(points[9]._x,points[9]._y);
        // ctx.lineTo(points[12]._x,points[12]._y);
        // ctx.lineTo(points[15]._x,points[15]._y);
        // //오른쪽 눈
        // ctx.lineTo(points[45]._x+15,points[45]._y+15);
        // ctx.lineTo(points[46]._x,points[46]._y+15);
        // ctx.lineTo(points[47]._x,points[47]._y+15);
        // ctx.lineTo(points[42]._x-15,points[42]._y+15);
        // ctx.lineTo(points[47]._x,points[47]._y+5);
        // ctx.lineTo(points[46]._x,points[46]._y+5);
        // ctx.lineTo(points[45]._x+15,points[45]._y+15);
        // ctx.lineTo(points[44]._x,points[44]._y);
        // ctx.lineTo(points[43]._x,points[43]._y);
        // ctx.arc(points[43]._x+10,points[43]._y+10,10,Math.PI*1.5,Math.PI*3.5,false)
        // ctx.lineTo(points[42]._x-15,points[42]._y+10);
        // ctx.lineTo(points[43]._x,points[43]._y-5);
        // ctx.lineTo(points[44]._x,points[44]._y-5);
        // ctx.lineTo(points[45]._x+20,points[45]._y+10);
        // //오른쪽 눈썹
        // ctx.lineTo(points[26]._x,points[26]._y+15);
        // ctx.lineTo(points[25]._x,points[25]._y+15);
        // ctx.lineTo(points[22]._x,points[22]._y+15);
        // ctx.lineTo(points[22]._x-15,points[22]._y);
        // ctx.lineTo(points[22]._x,points[22]._y);
        // ctx.lineTo(points[25]._x,points[25]._y);
        // ctx.lineTo(points[26]._x,points[26]._y);
        
        
        // ctx.stroke()
        // ctx.closePath()

const box = document.createElement('div')
        const noseRadius = points[33]._y-points[30]._y
        box.innerHTML =
   `<svg width="1000" height="1000" viewBox="0 0 1000 1000">
    <path d="M ${points[17]._x}, ${points[17]._y-100}
             C ${points[17]._x-20},${points[17]._y-95} 
               ${points[17]._x-20},${points[17]._y+5}
               ${points[17]._x}, ${points[17]._y}
               
             L ${points[18]._x-5},${points[18]._y}
             C ${points[18]._x+10},${points[18]._y-10}
               ${lefteye.r.x},${points[21]._y}
               ${lefteye.r.x},${points[21]._y}
               
             C ${lefteye.r.x+5},${points[21]._y}
               ${lefteye.r.x+5},${points[21]._y+15}
               ${lefteye.r.x},${points[21]._y+15}
               
             C ${lefteye.r.x},${points[21]._y+10}
               ${points[18]._x},${points[18]._y+10}
               ${points[18]._x},${points[18]._y+15}
             
             L ${points[17]._x+5},${points[17]._y+15}
             C ${points[17]._x-5},${points[17]._y+20}
               ${lefteye.l.x-15},${lefteye.l.y-10}
               ${lefteye.l.x-10},${lefteye.l.y-5}
               
             C ${lefteye.l.x+5},${lefteye.l.y-15}
               ${points[38]._x-10},${points[38]._y-10}
               ${points[38]._x},${points[38]._y-5}
            
             C ${points[38]._x+5},${points[38]._y-5}
               ${lefteye.r.x},${lefteye.r.y-10}
               ${lefteye.r.x},${lefteye.r.y-5}
            
             L ${lefteye.r.x},${lefteye.r.y}
             C ${lefteye.r.x},${lefteye.r.y-5}
               ${points[38]._x+5},${points[38]._y}
               ${points[38]._x},${points[38]._y}
             
             C ${points[38]._x+5},${points[38]._y+lefteye.radius}
               ${lefteye.center.x+lefteye.radius},${lefteye.center.y}  
               ${lefteye.center.x},${lefteye.center.y} 
             
             C ${lefteye.center.x - lefteye.radius},${lefteye.center.y} 
               ${points[37]._x-5},${points[37]._y+lefteye.radius}
               ${points[37]._x},${points[37]._y}
             
             C ${lefteye.center.x-10},${points[38]._y}
               ${lefteye.l.x+5},${lefteye.l.y-10}
               ${lefteye.l.x},${lefteye.l.y}

             C ${lefteye.l.x},${lefteye.l.y+10} 
               ${lefteye.center.x-10},${lefteye.center.y}
               ${lefteye.center.x},${lefteye.center.y}
               
             C ${lefteye.center.x+5},${lefteye.center.y}
               ${lefteye.r.x-5},${lefteye.r.y}
               ${points[39]._x},${points[39]._y+5}
               
             C ${points[39]._x},${points[39]._y+3}
               ${lefteye.r.x},${lefteye.r.y-3}  
               ${lefteye.r.x},${lefteye.r.y}

             C ${lefteye.r.x},${lefteye.r.y+10}
               ${points[19]._x},${lefteye.r.y+20}
               ${points[19]._x},${lefteye.r.y+20}
               
             C ${points[17]._x-10},${lefteye.r.y+20}
               ${points[37]._x},${points[30]._y}
               ${points[37]._x},${points[30]._y}
          
             C ${points[37]._x+20},${points[30]._y+20}
               ${points[32]._x+20},${points[27]._y}
               ${points[32]._x+10},${points[27]._y-10}
               
             C ${points[32]._x},${points[27]._y-30}
               ${nose.l.x+20},${nose.l.y-20}
               ${nose.l.x},${nose.l.y-20}

             C ${nose.l.x-5},${nose.l.y-20}
               ${nose.l.x-5},${nose.l.y}
               ${nose.l.x},${nose.l.y}
       
             C ${nose.l.x},${nose.l.y}
               ${points[33]._x-10},${points[33]._y+10}
               ${points[31]._x},${points[31]._y}
               
             C ${points[31]._x},${points[31]._y-5}
               ${points[32]._x+5},${points[32]._y-5}
               ${points[32]._x+5},${points[32]._y}
                       
             Q ${points[33]._x},${points[33]._y+5}
               ${points[34]._x-5},${points[34]._y}
            
             C ${points[34]._x-5},${points[34]._y-5}
               ${points[35]._x},${points[35]._y-5}
               ${points[35]._x},${points[35]._y}
               
             C ${points[33]._x+10},${points[33]._y+10}
               ${nose.r.x},${nose.r.y}
               ${nose.r.x},${nose.r.y}
               
             C ${nose.r.x+5},${nose.r.y}
               ${nose.r.x+5},${nose.r.y-20}
               ${nose.r.x},${nose.r.y-20}
             
             C ${points[33]._x-noseRadius*1.5},${points[33]._y}
               ${points[30]._x-noseRadius*1.5},${points[30]._y-noseRadius}
               ${points[30]._x},${points[30]._y-noseRadius}
             
             C ${points[30]._x+noseRadius*1.5},${points[30]._y}
               ${points[33]._x+noseRadius*1.5},${points[33]._y}
               ${points[33]._x},${points[33]._y}
               
             C ${points[33]._x+10},${points[33]._y}
               ${points[51]._x+10},${points[51]._y}
               ${points[51]._x},${points[51]._y}
            
             L ${points[50]._x},${points[50]._y}  
             C ${points[50]._x},${points[50]._y-5}  
               ${points[48]._x},${points[48]._y}
               ${points[48]._x},${points[48]._y}
              
             L ${points[62]._x},${points[62]._y}
               ${points[54]._x},${points[54]._y}
               ${points[62]._x},${points[62]._y} 
               ${points[52]._x},${points[52]._y}
               ${points[54]._x},${points[54]._y}
               ${points[57]._x},${points[57]._y}
               ${points[59]._x},${points[59]._y}
               ${points[58]._x},${points[58]._y} 

               ${points[8]._x}, ${points[8]._y}

                ${points[7]._x},${points[7]._y}
                ${points[5]._x},${points[5]._y}
                ${points[2]._x},${points[2]._y}
                ${points[4]._x},${points[4]._y}
                ${points[6]._x},${points[6]._y}
                ${points[8]._x},${points[8]._y+10}
                ${points[9]._x},${points[9]._y}
                ${points[12]._x},${points[12]._y}
                ${points[15]._x},${points[15]._y}
        
                ${points[45]._x+15},${points[45]._y+15}
                ${points[46]._x},${points[46]._y+15}
                ${points[47]._x},${points[47]._y+15}
                ${points[42]._x-15},${points[42]._y+15}
                ${points[47]._x},${points[47]._y+5}
                ${points[46]._x},${points[46]._y+5}
                ${points[45]._x+15},${points[45]._y+15}
                ${points[44]._x},${points[44]._y}
                ${points[43]._x},${points[43]._y}
                ${points[42]._x-15},${points[42]._y+10}
                ${points[43]._x},${points[43]._y-5}
                ${points[44]._x},${points[44]._y-5}
                ${points[45]._x+20},${points[45]._y+10}
        
                ${points[26]._x},${points[26]._y+15}
                ${points[25]._x},${points[25]._y+15}
                ${points[22]._x},${points[22]._y+15}
                ${points[22]._x-15},${points[22]._y}
                ${points[22]._x},${points[22]._y}
                ${points[25]._x},${points[25]._y}
                ${points[26]._x},${points[26]._y}
           " 
            fill = "none"
            stroke="#F1F1F1"
            stroke-width="1"
            stroke-linecap="round"
            />
    </svg>`

     document.body.append(box)
    })
}




