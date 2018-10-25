var myData;
var myImage;
var sfondo;
var pokemon1;
var logo;
function preload(){
  // put preload code here
  myImage = loadImage('assets/pokeball.png');
  sfondo = loadImage('assets/sfondo.png');
  logo = loadImage('assets/Logo_pokemon.png');
  myData = loadJSON('assets/pokedex.json');

}

var balls = [];

function setup() {
	createCanvas(windowWidth, windowHeight);


  frameRate(12)
    for(var i=0; i<myData.pokemon.length; i++){
       pokemon1 = myData.pokemon[i];
    var x=random(width);
    var y=random(height);
    var l= pokemon1.name;
    var n= pokemon1.type;

    var newpokeBall = new pokeBall(x,y,l,n);
    balls.push(newpokeBall);
    console.log(pokemon1);
    }
}

function mousePressed() {
  for (var j = 0; j < balls.length; j++) {
    balls[j].click();
      balls[j].testoscompare()
  }
}

function draw() {
  imageMode(CORNER);
  image(sfondo,0,0,width, height);
imageMode(CENTER);
  image(logo, width/2, height/6, myImage.width/2, myImage.height/2);
	for(var j = 0; j < balls.length; j++) {
		balls[j].move();
		balls[j].display();
    balls[j].testo();
	}
}

function pokeBall(_x, _y, _label,_type) {
	// Properties defined by constructor

	this.x = _x;
	this.y = _y;
  this.label=_label;
  this.type=_type;
	// Hardcoded properties
	this.color = 'black';
	this.speed = 2;
  this.size= 25;
  this.text=14;

	this.yDir = 1;
	this.xDir = 1;
	// Methods
	this.move = function() {
		this.x += this.speed * this.xDir;
		this.y += this.speed * this.yDir;

		if (this.y >= height || this.y <= 0) {
			// if 1, set to -1, if -1, set to 1
			this.yDir *= -1;
		}

		if (this.x >= width || this.x <= 0) {
			this.xDir *= -1;
		}
	}

	this.display = function() {
    image(myImage,this.x, this.y,this.size,this.size);
    fill(this.color);
  textSize(this.text);
    text(this.label,this.x,this.y);
	}
  this.testo = function(){
    background(200)
    fill(this.color);
    textSize(60);
    text('gotta catch em all ',width/3,height/2);
    textSize(30);
    text('click on the pokeball and catch all the pokemon ',width/3+30,height/2+30);
  }

  this.click = function() {
      var d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.size) {
        this.display = function() {
          fill(this.color);
          textSize(this.text);
          text(this.type,this.x,this.y);
        }
      }
    }
    this.testoscompare= function(){
      this.testo = function() {

      }
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)

}
