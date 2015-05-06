//create canvas

var cw = 500;
var ch = 500;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.height = ch;
canvas.width = cw;






document.body.appendChild(canvas);

//create sprite

var mySprite = {
    x: 200,
    y: 200,
    width: 50,
    height: 50,
    speed: 200,
    color: '#c00'
};

var badGuy = {
    x: 350,
    y: 350,
    width: 25,
    height: 5,
    speed: 200,
    color: '#c00'
};

function update(mod) {

	if(isCollide(mySprite,badGuy)) {
		console.log('collision');
	}

	if (37 in keysDown) { //left
		mySprite.color = '#0f0';
		if(mySprite.x >= 0) {
        	mySprite.x -= mySprite.speed * mod;
		}
    }
    if (38 in keysDown) { //up
    	mySprite.color = '#00f';
    	if(mySprite.y >= 0){
        	mySprite.y -= mySprite.speed * mod;
    	}
    }
    if (39 in keysDown) { //right
    	mySprite.color = '#f00';
    	if((mySprite.x + mySprite.width)<= cw) {
        	mySprite.x += mySprite.speed * mod;
    	}
    }
    if (40 in keysDown) { //down
    	mySprite.color = '#823';
    	if((mySprite.y + mySprite.height) <= ch) {
        	mySprite.y += mySprite.speed * mod;
    	}
    }
}

function render() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, cw, ch);
    ctx.fillStyle = mySprite.color;
    ctx.fillRect(mySprite.x, mySprite.y, mySprite.width, mySprite.height);
    ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, cw, ch);

	ctx.fillStyle = "pink";
	ctx.fillRect(badGuy.x,badGuy.y,badGuy.width,badGuy.height);
}

function run() {
	update((Date.now() - time) / 1000);
	render();
	time = Date.now();
}

var time = Date.now();
setInterval(run, 10);

var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

function isCollide(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}