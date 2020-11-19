
//variables
const input = document.querySelector('input');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
const preloader = document.querySelector('.preloader');
const alertBox = document.querySelector('.alert');
const otherPicBtn = document.querySelector('span');
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
let detecting,points,gender,mh=0,mw=0;

//functions
function init(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    box1.innerHTML = ''
    box2.innerHTML = ''
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
    const arrX =point.map(a=>a._x);
    const arrY =point.map(a=>a._y);
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
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptor()
    points = detecting.landmarks.positions;
    gender = detecting.gender;
}
function drawingPlant(gender,mw,mh){
    box1.style.left =`${mw}px`
    const genderPlant = {
        male:{
            leaf:
                `<svg width="${mw}" height="${mh}" viewBox="0 0 ${mw} ${mh}">
                <path class="genderLine" d="M63.5,350.5l12-21c0,0,6-10,33-7s71,4,87-26c0,0,6-12,10-14s-16,26-54,16s-47,3-53,9s-14,15-16,14s2-1,1-7
                s-7-42-7-42v-32c0,0,1-25-28-52s-44-31-44-31s-8-8-3-16s2,29,2,29s-1,61,36,79s45,48,45,48s4,7,11-14c0,0,5-6-2-36s33-35,54-43
                c0,0,7-3,3-7s1,17,1,17s1,8-5,14c-3.54,3.54-12.01,12.99-15,16c-2.33,2.34-18.52,17.52-15,21c38.53,38.04,123.13-41.39,119-29
                c-1,3-12,8-28,7c-10.18-0.64-20.89-5.35-32-3c-3.09,0.65-15,2-23,1c-5-0.63-13.4-4.98-18,0c-6.89,7.46-16.38,27.66-31.57,35.72
                c0,0-8.43,1.28,19.57-47.72l10-19c0,0-6-12,28-23s84-52,113-84c0,0,15-2-11,7s-48,12-48,12s-31,3-63,61c0,0-17.34,25.58-12.67-5.21
                c4.67-30.79,20.67-44.79,20.67-44.79s20-30,5-78c0,0-8-27,3-44s-7,32-25,43s-21,55-8,76s-7,75-7,75s-13.23,10-4.61-24
                c8.61-34,1.61-56-13.39-78s-33-42-30-58s7,14-1,33c0,0-3,16,0,56c0,0-2.79,8.45,26.6,44.73c0,0,21.4,27.27,16.4,39.27"/>
                </svg>`
        },
        female:{}
    }
    if (gender === 'female'){
        box1.innerHTML = genderPlant.male.leaf;
    }else{
        box1.innerHTML = genderPlant.male.leaf;
    }
}
function drawingFace(points,mw,mh){
    const leftEye = {
        r:{
            x:points[39]._x + 7,
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
    const rightEye = {
        r:{
            x:points[45]._x+5,
            y:points[44]._y + ((points[46]._y+5 - points[44]._y)/2)
        },
        l:{
            x:points[42]._x - 3,
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
            x:points[35]._x + ((points[31]._x-points[39]._x)/2),
            y:points[35]._y
        },
        radius :(points[33]._y-points[30]._y)/2
    }
    const chin = points[8]._y + 5
    const lastPoint = {
        x: points[26]._x,
        y: points[26]._y-100
    }
    box2.style.top = `${mh}px`
    box2.innerHTML =
        `<svg width="${mw}" height="${mh}" viewBox="0 0 ${mw} ${mh}">    
    <path id="line"
          d="M ${points[17]._x}, ${points[17]._y-100}
             C ${points[17]._x-20},${points[17]._y-95} 
               ${points[17]._x-20},${points[17]._y+5}
               ${points[17]._x}, ${points[17]._y}
               
             L ${points[18]._x-5},${points[18]._y}
             C ${points[18]._x+10},${points[18]._y-10}
               ${leftEye.r.x},${points[21]._y}
               ${leftEye.r.x},${points[21]._y}
               
             C ${leftEye.r.x+5},${points[21]._y}
               ${leftEye.r.x+5},${points[21]._y+15}
               ${leftEye.r.x},${points[21]._y+15}
               
             C ${leftEye.r.x},${points[21]._y+10}
               ${points[18]._x},${points[18]._y+10}
               ${points[18]._x},${points[18]._y+15}
             
             L ${points[17]._x+5},${points[17]._y+15}
             C ${points[17]._x-5},${points[17]._y+20}
               ${leftEye.l.x-15},${leftEye.l.y-10}
               ${leftEye.l.x-10},${leftEye.l.y-5}
               
             C ${leftEye.l.x+5},${leftEye.l.y-15}
               ${points[38]._x-10},${points[38]._y-10}
               ${points[38]._x},${points[38]._y-5}
            
             C ${points[38]._x+5},${points[38]._y-5}
               ${leftEye.r.x},${leftEye.r.y-10}
               ${leftEye.r.x},${leftEye.r.y-5}
            
             L ${leftEye.r.x},${leftEye.r.y}
             
             C ${leftEye.r.x},${leftEye.r.y-5}
               ${points[38]._x+5},${points[38]._y}
               ${points[38]._x},${points[38]._y}
               
             C ${points[38]._x},${points[38]._y-3}
               ${points[37]._x},${points[37]._y-3}
               ${points[37]._x},${points[37]._y}
             
             C ${points[37]._x-5},${points[37]._y+leftEye.radius}
               ${leftEye.center.x - leftEye.radius},${leftEye.center.y} 
               ${leftEye.center.x},${leftEye.center.y} 
               
             C ${leftEye.center.x+leftEye.radius},${leftEye.center.y}
               ${points[38]._x+5},${points[38]._y+leftEye.radius}
               ${points[38]._x},${points[38]._y}
               
             C ${points[38]._x},${points[38]._y-3}
               ${points[37]._x},${points[37]._y-3}
               ${points[37]._x},${points[37]._y}
               
             C ${leftEye.center.x-10},${points[38]._y}
               ${leftEye.l.x+5},${leftEye.l.y-10}
               ${leftEye.l.x},${leftEye.l.y}

             C ${leftEye.l.x},${leftEye.l.y+10} 
               ${leftEye.center.x-10},${leftEye.center.y}
               ${leftEye.center.x},${leftEye.center.y}
               
             C ${leftEye.center.x+5},${leftEye.center.y}
               ${leftEye.r.x-5},${leftEye.r.y}
               ${points[39]._x},${points[39]._y+5}
               
             C ${points[39]._x},${points[39]._y+3}
               ${leftEye.r.x},${leftEye.r.y-3}  
               ${leftEye.r.x},${leftEye.r.y}

             C ${leftEye.r.x},${leftEye.r.y+10}
               ${points[19]._x},${leftEye.r.y+20}
               ${points[19]._x},${leftEye.r.y+20}
               
             C ${points[17]._x-10},${leftEye.r.y+20}
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

             C ${nose.r.x-15},${nose.r.y-30}
               ${points[33]._x+10},${points[33]._y-20}
               ${points[33]._x},${points[33]._y}
               
             L ${points[33]._x},${points[33]._y-nose.radius}
             
             C ${points[33]._x-nose.radius*1.5},${points[33]._y-nose.radius}
               ${points[30]._x-nose.radius*1.5},${points[30]._y-nose.radius}
               ${points[30]._x},${points[30]._y-nose.radius}

             C ${points[30]._x+nose.radius*1.5},${points[30]._y-nose.radius}
               ${points[33]._x+nose.radius*1.5},${points[33]._y-nose.radius}
               ${points[33]._x},${points[33]._y-nose.radius}

             L ${points[33]._x},${points[33]._y}
             
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
            
             C ${points[48]._x},${points[48]._y+5}
               ${points[67]._x-5},${points[67]._y}
               ${points[67]._x},${points[67]._y}
             C ${points[67]._x},${points[67]._y+2}
               ${points[65]._x},${points[65]._y+2}
               ${points[65]._x},${points[65]._y}
             C ${points[65]._x+5},${points[65]._y}
               ${points[54]._x},${points[54]._y+5}
               ${points[54]._x},${points[54]._y}
            
             C ${points[54]._x-5},${points[54]._y+5}
               ${points[57]._x+20},${points[57]._y+5}
               ${points[57]._x},${points[57]._y}

             C ${points[57]._x-3},${points[57]._y+3}
               ${points[58]._x},${points[58]._y}
               ${points[58]._x},${points[58]._y}

             C ${points[58]._x+45},${points[58]._y-5}
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
               ${points[24]._x},${rightEye.r.y+20}
             
             C ${points[24]._x},${rightEye.r.y+20}
               ${rightEye.l.x},${rightEye.l.y+10}
               ${rightEye.l.x},${rightEye.l.y}
               
             C ${rightEye.l.x},${rightEye.l.y-3}
               ${points[42]._x},${points[42]._y+3}
               ${points[42]._x},${points[42]._y}
               
             C ${points[42]._x},${points[42]._y+10}
               ${rightEye.center.x-10},${rightEye.center.y}
               ${rightEye.center.x},${rightEye.center.y}
                 
             C ${rightEye.center.x+10},${rightEye.center.y}
               ${rightEye.r.x},${rightEye.r.y+5}
               ${rightEye.r.x},${rightEye.r.y}
               
             C ${rightEye.r.x},${rightEye.r.y-5}
               ${points[44]._x+10},${points[44]._y}
               ${points[44]._x},${points[44]._y}
               
             C ${points[44]._x},${points[44]._y-3}
               ${points[43]._x},${points[43]._y-3}
               ${points[43]._x},${points[43]._y}
               
             C ${points[43]._x-5},${points[43]._y+rightEye.radius}
               ${rightEye.center.x-rightEye.radius},${rightEye.center.y}
               ${rightEye.center.x},${rightEye.center.y}
               
             C ${rightEye.center.x + rightEye.radius},${rightEye.center.y} 
               ${points[44]._x+5},${points[44]._y+rightEye.radius}
               ${points[44]._x},${points[44]._y}
             
             C ${points[44]._x},${points[44]._y-3}
               ${points[43]._x},${points[43]._y-3}
               ${points[43]._x},${points[43]._y}
               
             C ${points[43]._x-5},${points[43]._y}
               ${rightEye.l.x},${rightEye.l.y-5}
               ${rightEye.l.x},${rightEye.l.y}
                    
             L ${rightEye.l.x},${rightEye.l.y-5}  
                
             C ${rightEye.l.x},${rightEye.l.y-10}  
               ${points[43]._x-5},${points[43]._y-5} 
               ${points[43]._x},${points[43]._y-5} 
             
             C ${points[43]._x+10},${points[43]._y-10} 
               ${rightEye.r.x},${rightEye.r.y-15}
               ${rightEye.r.x+10},${rightEye.r.y-5}    
             
             C ${rightEye.r.x+15},${rightEye.r.y-10}
               ${points[26]._x+10},${points[26]._y+20}
               ${points[26]._x},${points[26]._y+15}
                
             L ${points[25]._x},${points[25]._y+15}
             C ${points[25]._x},${points[25]._y+10}
               ${rightEye.l.x},${points[22]._y+10}
               ${rightEye.l.x},${points[22]._y+15}
               
              C ${rightEye.l.x-5},${points[22]._y+15}
                ${rightEye.l.x-5},${points[22]._y}
                ${rightEye.l.x},${points[22]._y}
                
              C ${rightEye.l.x},${points[22]._y}
                ${points[25]._x-10},${points[25]._y-10}
                ${points[25]._x+5},${points[25]._y}
                
              L ${points[26]._x+5},${points[26]._y} 
              
              C ${points[26]._x+25},${points[26]._y-10} 
               ${points[26]._x+20}, ${points[26]._y-90}
               ${points[26]._x}, ${points[26]._y-100}
           " 
            />
    </svg>`
}
function drawingCvs(points){
    for(let i =0;i<points.length;i++){
        ctx.fillText ( `${i}`,points[i]._x,points[i]._y)
        ctx.beginPath();
        ctx.arc(points[i]._x,points[i]._y,2,0,Math.PI*2,false)
        ctx.stroke();
        ctx.closePath();
    }
}

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models"),
    faceapi.nets.ageGenderNet.loadFromUri("./models"),
    faceapi.nets.faceLandmark68TinyNet.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models")
]).then(start)


function start(){
    input.addEventListener('change', async function(){
        showing(preloader);
        await resizedImg(faceapi);
        await landmarks(faceapi);
        hiding(preloader)
        if(!detecting){
            showing(alertBox);
            otherPicBtn.addEventListener('click', ()=> hiding(alertBox));
            init();
            return
        }
        drawingCvs(points)
        drawingFace(points,mw,mh);
       // drawingPlant(gender);
    })
}




