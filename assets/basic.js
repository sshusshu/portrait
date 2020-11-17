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
        img.style.opacity = '0.2';
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.style.opacity = '0.5';


        const displaySize = {width:canvas.width, height:canvas.height};
        const detecting = await faceapi.detectSingleFace(img).withFaceLandmarks()
        faceapi.matchDimensions(canvas, displaySize);
        const points = detecting.landmarks.positions



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
            y:points[40]._y+5
            },
            radius : ((points[38]._x - points[37]._x)/2)
          }

        const righteye = { 
          r:{
            x:points[45]._x+5,
            y:points[44]._y + ((points[46]._y+5 - points[44]._y)/2)
            },
          l:{
            x:points[42]._x - ((points[42]._x-points[35]._x)/2),
            y:points[47]._y
            },
            center: {
                x:points[43]._x+((points[44]._x - points[43]._x)/2),
                y:points[47]._y+5
            },
            radius : ((points[44]._x - points[43]._x)/2)
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

          const chin = points[8]._y + ((points[7]._y-points[6]._y)/2)

const box = document.createElement('div')
        const noseRadius = points[33]._y-points[30]._y
        box.innerHTML =
   `<svg width="1000" height="1000" viewBox="0 0 1000 1000">
        
    <path id="line"
            d="M ${points[17]._x}, ${points[17]._y-100}
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
               
             C ${points[38]._x},${points[38]._y-3}
               ${points[37]._x},${points[37]._y-3}
               ${points[37]._x},${points[37]._y}
             
             C ${points[37]._x-5},${points[37]._y+lefteye.radius}
               ${lefteye.center.x - lefteye.radius},${lefteye.center.y} 
               ${lefteye.center.x},${lefteye.center.y} 
               
             C ${lefteye.center.x+lefteye.radius},${lefteye.center.y}
               ${points[38]._x+5},${points[38]._y+lefteye.radius}
               ${points[38]._x},${points[38]._y}
               
             C ${points[38]._x},${points[38]._y-3}
               ${points[37]._x},${points[37]._y-3}
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
               ${points[33]._x-10},${points[33]._y+5}
               ${points[31]._x},${points[31]._y}
               
             C ${points[31]._x},${points[31]._y-5}
               ${points[32]._x+5},${points[32]._y-5}
               ${points[32]._x+5},${points[32]._y}
                       
             Q ${points[33]._x},${points[33]._y+3}
               ${points[34]._x-5},${points[34]._y}
            
             C ${points[34]._x-5},${points[34]._y-5}
               ${points[35]._x},${points[35]._y-5}
               ${points[35]._x},${points[35]._y}
               
             C ${points[33]._x+10},${points[33]._y+5}
               ${nose.r.x},${nose.r.y}
               ${nose.r.x},${nose.r.y}
               
             C ${nose.r.x+5},${nose.r.y}
               ${nose.r.x+5},${nose.r.y-20}
               ${nose.r.x},${nose.r.y-20}

             C ${nose.r.x-5},${nose.r.y-35}
               ${points[33]._x+10},${points[33]._y-20}
               ${points[33]._x},${points[33]._y}
             
             C ${points[33]._x-noseRadius*1.2},${points[33]._y}
               ${points[30]._x-noseRadius*1.2},${points[30]._y-noseRadius}
               ${points[30]._x},${points[30]._y-noseRadius}

             C ${points[30]._x+noseRadius*1.2},${points[30]._y-noseRadius}
               ${points[33]._x+noseRadius*1.2},${points[33]._y}
               ${points[33]._x},${points[33]._y}

             C ${points[33]._x+10},${points[33]._y}
               ${points[62]._x},${points[48]._y}
               ${points[48]._x},${points[48]._y}
             
             C ${points[48]._x},${points[48]._y-5}
               ${points[50]._x},${points[50]._y-5} 
               ${points[50]._x},${points[50]._y} 

             L ${points[51]._x},${points[51]._y}  
               ${points[52]._x},${points[52]._y} 

             C ${points[52]._x},${points[52]._y-5}
               ${points[54]._x},${points[54]._y-5}
               ${points[54]._x},${points[54]._y}

             C ${points[54]._x-5},${points[54]._y+5}
               ${points[62]._x+5},${points[62]._y+5} 
               ${points[62]._x},${points[62]._y}

             C ${points[62]._x-5},${points[62]._y+5}
               ${points[48]._x+5},${points[48]._y+5}
               ${points[48]._x},${points[48]._y}
            
             C ${points[48]._x+5},${points[48]._y+5}
               ${points[57]._x-20},${points[57]._y+5}
               ${points[57]._x},${points[57]._y}

             C ${points[57]._x+20},${points[57]._y+5}
               ${points[54]._x-5},${points[54]._y+5}
               ${points[54]._x},${points[54]._y}

             C ${points[54]._x},${points[54]._y+5}
               ${points[57]._x},${points[57]._y+5}
               ${points[57]._x},${points[57]._y}

             C ${points[57]._x+30},${points[57]._y}
               ${points[8]._x+30}, ${chin}
               ${points[8]._x}, ${chin}

             C ${points[8]._x}, ${chin+10}
               ${points[5]._x+5},${points[5]._y+10}
               ${points[5]._x},${points[5]._y}
             
             L ${points[4]._x}, ${points[4]._y+10}

             C ${points[4]._x},${points[4]._y+10}
               ${points[2]._x},${points[2]._y+20}
               ${points[2]._x},${points[2]._y+10}

             C ${points[2]._x-40},${points[2]._y}
               ${points[0]._x-40},${points[0]._y-30}
               ${points[0]._x},${points[0]._y}

             C ${points[0]._x+10},${points[0]._y}
               ${points[1]._x+10},${points[1]._y}
               ${points[1]._x},${points[1]._y}

             C ${points[1]._x-20},${points[1]._y+30}
               ${points[1]._x-20},${points[1]._y-30}
               ${points[1]._x},${points[1]._y}
             
             C ${points[1]._x+10},${points[1]._y}
               ${points[2]._x+10},${points[2]._y+10}
               ${points[2]._x},${points[2]._y+10}
       
             L ${points[4]._x},${points[4]._y}
               ${points[5]._x},${points[5]._y}
               ${points[6]._x},${points[6]._y}
               ${points[7]._x},${points[7]._y+5}
            
             C ${points[7]._x+10},${points[7]._y+15}
               ${points[8]._x-10},${points[8]._y+20}
               ${points[8]._x},${points[8]._y+10}
              
              
             C ${points[8]._x+10},${points[8]._y+20}
               ${points[9]._x-10},${points[9]._y+15}
               ${points[9]._x},${points[9]._y+5}
               
             L ${points[10]._x},${points[10]._y}
               ${points[11]._x},${points[11]._y}
               ${points[12]._x},${points[12]._y}
               ${points[13]._x},${points[13]._y}
               ${points[14]._x},${points[14]._y}
               ${points[15]._x},${points[15]._y}
               ${points[24]._x},${righteye.r.y+20}
             
             C ${points[24]._x},${righteye.r.y+20}
               ${righteye.l.x},${righteye.l.y+10}
               ${righteye.l.x},${righteye.l.y}
               
             C ${righteye.l.x},${righteye.l.y-3}
               ${points[42]._x},${points[42]._y+3}
               ${points[42]._x},${points[42]._y}
               
             C ${points[42]._x},${points[42]._y+10}
               ${righteye.center.x-10},${righteye.center.y}
               ${righteye.center.x},${righteye.center.y}
                 
             C ${righteye.center.x+10},${righteye.center.y}
               ${righteye.r.x},${righteye.r.y+5}
               ${righteye.r.x},${righteye.r.y}
               
             C ${righteye.r.x},${righteye.r.y-5}
               ${points[44]._x+10},${points[44]._y}
               ${points[44]._x},${points[44]._y}
               
             C ${points[44]._x},${points[44]._y-3}
               ${points[43]._x},${points[43]._y-3}
               ${points[43]._x},${points[43]._y}
               
             C ${points[43]._x-5},${points[43]._y+righteye.radius}
               ${righteye.center.x-righteye.radius},${righteye.center.y}
               ${righteye.center.x},${righteye.center.y}
               
             C ${righteye.center.x + righteye.radius},${righteye.center.y} 
               ${points[44]._x+5},${points[44]._y+righteye.radius}
               ${points[44]._x},${points[44]._y}
             
             C ${points[44]._x},${points[44]._y-3}
               ${points[43]._x},${points[43]._y-3}
               ${points[43]._x},${points[43]._y}
               
             C ${points[43]._x-5},${points[43]._y}
               ${righteye.l.x},${righteye.l.y-5}
               ${righteye.l.x},${righteye.l.y}
                    
             L ${righteye.l.x},${righteye.l.y-5}  
                
             C ${righteye.l.x},${righteye.l.y-10}  
               ${points[43]._x-5},${points[43]._y-5} 
               ${points[43]._x},${points[43]._y-5} 
             
             C ${points[43]._x+10},${points[43]._y-10} 
               ${righteye.r.x},${righteye.r.y-15}
               ${righteye.r.x+10},${righteye.r.y-5}    
             
             C ${righteye.r.x+15},${righteye.r.y-10}
               ${points[26]._x+10},${points[26]._y+20}
               ${points[26]._x},${points[26]._y+15}
                
             L ${points[25]._x},${points[25]._y+15}
             C ${points[25]._x},${points[25]._y+10}
               ${righteye.l.x},${points[22]._y+10}
               ${righteye.l.x},${points[22]._y+15}
               
              C ${righteye.l.x-5},${points[22]._y+15}
                ${righteye.l.x-5},${points[22]._y}
                ${righteye.l.x},${points[22]._y}
                
              C ${righteye.l.x},${points[22]._y}
                ${points[25]._x-10},${points[25]._y-10}
                ${points[25]._x+5},${points[25]._y}
                
              L ${points[26]._x+5},${points[26]._y} 
              
              C ${points[26]._x+25},${points[26]._y-10} 
               ${points[26]._x+20}, ${points[26]._y-90}
               ${points[26]._x}, ${points[26]._y-100}
           " 
            />
    </svg>`

     document.body.append(box)
    })
}




