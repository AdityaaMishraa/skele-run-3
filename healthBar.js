class healthBar{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 10;
        this.color = "green";
    }

    display(){
        noStroke();
        fill(this.color);
        rect(this.x,this.y,this.width,this.height)
    }
}