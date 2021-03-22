class j_slider{
    
    public main: any; 
    public items: any; 
    public button1:any;
    public button2: any; 
    public button_bk:any;
    public button_bk2: any; 
    public count: number;
    public lenghtImg:number;
    public count2:number; 

    public currentFrame:number; 
    public container:any; 
    public img0:any; 
    
    public porcentaje:number; 
    public actualFrame: number; 
    public animation_type: string; 
    public slideNums: number;
   

    constructor(options:any = {
        
        animationType: "fade", 
        interval: false,
        interval_time: 3,
        
     
        border: false,
        border_color: "#fff",
        border_width: "1px",
        
        hoverEffect: false,
        slideNum: 0, 
        buttons: true
        }
         
        ){

       
        // animation selection
        this.animation_type = options.animationType; 
    
        this.slideNums = options.slideNum; 
    
        console.log(this.slideNums);

        
        if(this.slideNums > 0){

            let lMain = ".j-slider-" + options.slideNum;
            let lItems = "j-slider-item-" + options.slideNum;
            let lImg0 = ".j-slider-" + options.slideNum + " > :first-child";
            let lcontainer = ".j-slider-container-" + options.slideNum;
         
            this.main = document.querySelector(lMain);
            this.items = document.getElementsByClassName(lItems);
            this.img0 = document.querySelector(lImg0);       
            this.container = document.querySelector(lcontainer);
            
            
        }
        else {
            console.log("solo un slider");
            this.main = document.querySelector(".j-slider");
            this.items = document.getElementsByClassName("j-slider-item");
            this.img0 = document.querySelector(".j-slider > :first-child");       
            this.container = document.querySelector(".j-slider-container");
            
            
        }
        
        // styles of main 
   
        this.container.style.position = "relative";
        this.container.style.overflow = "hidden";

        this.main.style.position = "relative";
        this.main.style.margin = "0px";
        this.main.style.left = "0";
        this.main.style.transitionProperty = "transform";
        this.main.style.transitionDuration = "1s";
        this.main.style.display=  "flex"; 




        // estilos de botones

        this.button1 = document.createElement("div");
        this.button2= document.createElement("div");
        
        this.button_bk = document.createElement("div");
        this.button_bk2 = document.createElement("div");
        
        this.button2.className = "j-slider-button";
        this.button1.className = "j-slider-button";

        this.button1.append(this.button_bk);
        this.button2.append(this.button_bk2);
       
        this.button_bk.className ="j-slider-clip-path";
        this.button_bk2.className = "j-slider-clip-path-left j-slider-clip-path";

        // style buttons

    
        this.button1.style.right = "10px";
        this.button2.style.left = "10px";
        
        this.container.append(this.button1);
        this.container.append(this.button2);
      
        
        // functions 

        this.lenghtImg =this.items.length; 

        // set none display other img, except first one
       
        if(this.animation_type == "slide"){
           
           
           this.count = 1; 
          
           
            this.porcentaje = 100 / this.lenghtImg; 

            console.log(this.porcentaje);
          
            this.main.style.width = (100 * this.lenghtImg) + "%"; 

       

            for(let a =0; a < this.lenghtImg; a++){

                if(100 % this.porcentaje > 0){
                    
                    console.log("entra a tu ksita");
                    this.items[a].style.width = (this.porcentaje + 0.01) + "%";     
                }
                else{
                    
                    this.items[a].style.width = this.porcentaje + "%";
                }
            }

    
           
        }
        /*else if(this.animation_type == "slideDown"){
 
            this.count = 1; 
          
          
            this.porcentaje = 100 / this.lenghtImg; 

            this.main.style.top = "0";
            this.main.style.height = (100 * this.lenghtImg) + "%"; 
            this.main.style.flexDirection = "column";
            
            this.container.style.height =  (this.porcentaje/100 * this.main.clientHeight) + "px"; 
            
          

            for(let a =0; a < this.lenghtImg; a++){
                this.items[a].style.height = this.porcentaje + "%";
            }

            this.main.style.transitionDuration =  options.animationTime;
           

        }
        */
        
        else{

            this.count = -1; 
          
    
            for( var i:number = 1; i < this.lenghtImg; i++){
           
                this.items[i].style.width = "100%";
                this.items[i].style.display = "none";
                
            }
            this.items[0].style.width = "100%";
        
        }
     

        // set animation in the slider 

        this.setAnimation(this.animation_type);
        // algoritm next page

        this.button1.addEventListener("click", ()=>{


            if(this.animation_type == "slide"){
                this.pruebaRight();
            }
            
            else if(this.animation_type == "fade"){
                
                this.nextSlide();
            }
            else if (this.animation_type == "slideDown"){

                this.slideDown_Right();

            }
            else{
                 
                this.nextSlide();
            }

           
        });

        this.button2.addEventListener("click", ()=>{

            if(this.animation_type == "slide"){
        
                this.pruebaLeft();
            }
            
            else if(this.animation_type == "fade"){
                
                this.slideBefore();
            }
            else if (this.animation_type == "slideDown"){

                this.slideDown_Left();

            }
            else{
                 
                this.slideBefore();
            }       
        });




        // OPTIONS 


        if(options.interval){

            let time = options.interval_time * 1000; 

            this.setTimeInterval(time);
        }
        
        if(options.border){
            
            
            this.setBorder(options.border_color, options.border_width);

        } 
        
        if(options.hoverEffect){

            this.setHoverEfect();
        }


        if(options.buttons == false){

            this.setButtons(false);
        }
    }


    public nextSlide():void{
        
        if((this.count + 2) < this.lenghtImg){
            
            
            this.count++;


            this.items[this.count].style.display = "none";
            this.items[this.count + 1].style.display = "block";

           
       }
    }

    public slideBefore():void{
        if(this.count > -1){

            this.items[this.count + 1].style.display = "none";
            this.items[this.count].style.display = "block";
            
            this.count--;
        
        }
    }

    
    private setAnimation(type:string):void {
        // set animation in the slider 


        if(type == "fade"){

            for(var i:number= 0; i < this.lenghtImg; i++){
                var actualClass = this.items[i].className;
                this.items[i].className = "j-slider-animation-fade "+ actualClass ;
            }
        }     
      
       
    }

    private setTimeInterval(time:number):void{
        setInterval(()=>{
            if(this.animation_type == "slide"){
                this.pruebaRight();
            }
            
            else if(this.animation_type == "fade"){
                
                this.nextSlide();
            }
            else if (this.animation_type == "slideDown"){

                this.slideDown_Right();

            }
            else{
                 
                this.nextSlide();
            }
        }, (time));
    }


    private setBorder(color:string = "#fff", border_width:string = "1px"):void{
        this.container.style.border = border_width + " solid " + color;
    }
   
    private setHoverEfect():void{
        
        // set hover animation to buttons

        this.button1.style.opacity = "0";
        this.button2.style.opacity = "0";
        

        this.container.addEventListener("mouseover", ()=>{
   
            this.button1.className = "j-slider-button j-slider-button-animation";
            this.button2.className =  "j-slider-button j-slider-button-animation";

        });   
        
        this.container.addEventListener("mouseout", ()=>{
          
            this.button1.className = "j-slider-button j-slider-button-animation-out"; 
            this.button2.className = "j-slider-button j-slider-button-animation-out";
           

        });   
    }

    public setButtons(a:boolean){

        if(a){
            this.button1.style.opacity = "1";
            this.button2.style.opacity = "1";
        }
        else {
            this.button1.style.opacity = "0";
            this.button2.style.opacity = "0";
            this.button1.style.width = "100px";
            this.button1.style.height = "100%";
            this.button2.style.width = "100px";
            this.button2.style.height = "100%";
           
            this.button1.style.top = "0%";
            this.button2.style.top = "0%";
           
        }

    }

    public setContainerHeight(h:string):void{
        this.main.style.height = h;

    }
    
    public pruebaRight():void{

        if(this.count <  this.lenghtImg){
            this.actualFrame  = this.count * this.porcentaje;
        
            this.main.style.transform = "translateX(-" + this.actualFrame+"%)";
        
            this.count++;
    
        }
        
    }

    public pruebaLeft():void{

    
        if(this.count > 1){
            this.actualFrame = this.actualFrame - this.porcentaje;
        
            this.main.style.transform = "translateX(-" + this.actualFrame+  "%)";
        
            this.count--;
    
        }
    }
    

    public slideDown_Right():void{
        if(this.count <  this.lenghtImg){
            this.actualFrame  = this.count * this.porcentaje;
        
            this.main.style.transform = "translateY(-" + this.actualFrame+"%)";
        
            this.count++;
    
        }
    }
    public slideDown_Left():void{
        
        if(this.count > 1){
            this.actualFrame = this.actualFrame - this.porcentaje;
        
            this.main.style.transform = "translateY(-" + this.actualFrame+  "%)";
        
            this.count--;
    
        }
    }


}

