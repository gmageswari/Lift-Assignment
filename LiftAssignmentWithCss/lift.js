let requestNow = [];
let liftStatus = "atRest";
let waitingRequests = [];
let liftIsAt = 1;
let movingUpTimerId;
let onTheWayPickOrDrop = [];
let leftDoorElement = document.getElementById("left-door");
let rightDoorElement = document.getElementById("right-door");
let liftElement = document.getElementById("lift");




function liftOpenClose(){
    leftDoorElement.classList.add("left-lift-open-animation");
        rightDoorElement.classList.add("right-lift-open-animation");
        setTimeout(function(){
            leftDoorElement.classList.add("left-lift-close-animation");
            rightDoorElement.classList.add("right-lift-close-animation");
        },2000);
        setTimeout(function(){
            leftDoorElement.classList.remove("left-lift-open-animation");
            rightDoorElement.classList.remove("right-lift-open-animation");
            leftDoorElement.classList.remove("left-lift-close-animation");
            rightDoorElement.classList.remove("right-lift-close-animation");
        },5000)
}


function goUp(floorNumber){
    console.log("goup function");
    let toMarginValue =(4-liftIsAt-1) * 160;
    liftIsAt += 1;
    
    
    if(liftIsAt === floorNumber){
        setTimeout(liftOpenClose,2000);
    }
    else{
        setTimeout(function(){
            liftElement.classList.remove("lift-move-up");
            liftElement.style.marginTop = `${toMarginValue}px`;
            move(liftIsAt,floorNumber)
            
        },3000);
    }
    
    
    
    
    
}

function goDown(floorNumber){
    console.log("godown function");
    let toMarginValue =(4-liftIsAt-1) * 160;
    liftIsAt -= 1;
    
    
    if(liftIsAt === floorNumber){
        setTimeout(liftOpenClose,2000);
    }
    else{
        setTimeout(function(){
            liftElement.classList.remove("lift-down-up");
            liftElement.style.marginTop = `${toMarginValue}px`;
            move(liftIsAt,floorNumber)
            
        },3000);
    }
    
}

function move(floorX,floorY){
    console.log("move function")
    if(liftIsAt < floorY){
        
        setTimeout(function(){
            let fromMarginValue = (4-liftIsAt) * 160;
            let toMarginValue =(4-liftIsAt-1) * 160;
            document.getElementById('lift').style.setProperty('--from',`${fromMarginValue}px`);
            document.getElementById('lift').style.setProperty('--to',`${toMarginValue}px`);
            liftElement.classList.add("lift-move-up");
            setTimeout(function(){
                goUp(floorY);
            },2000);
            
        },6000)
    }
    else{
        setTimeout(function(){
            let fromMarginValue = (4-liftIsAt) * 160;
            let toMarginValue =(4-liftIsAt-1) * 160;
            document.getElementById('lift').style.setProperty('--from',`${fromMarginValue}px`);
            document.getElementById('lift').style.setProperty('--to',`${toMarginValue}px`);
            liftElement.classList.add("lift-move-down");
            setTimeout(function(){
                goDown(floorY);
            },2000);
            
        },6000)
    }
}


function startMoving(){ // takes the first request in requestNow and starts moving
    if(requestNow.length === 0){
        liftStatus = "atRest";
    }

    let currentFrom = requestNow[0].from;
    let currentTo = requestNow[0].to;

    if(currentFrom !== liftIsAt){
        move(liftIsAt,currentFrom);
    }
    else{
        liftOpenClose();
        
        move(currentFrom,currentTo);
    }
}

function findingFloor(from,to){ //gets the input and finds the from floor and to floor and pushes into the array
    if(liftStatus === "atRest"){
        requestNow = [{
            from,
            to
        }];
        liftStatus = "atMotion";
        startMoving();
        i=0;
        setInterval(function(){
            console.log(i+1);
        },1000);
        
    }
    else{
        waitingRequests = [...waitingRequests,{
            from,
            to
        }];
    }
}
