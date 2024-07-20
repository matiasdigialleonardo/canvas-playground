// TO DO. UPDATE ALL ELEMENTS ON SCREEN, ONLY THE LAST ELEMENT WHOSE UPDATE METHOD IS CALLED IS VISIBLE ON SCREEN.

class ActionMenuView extends HTMLElement
{
	constructor( drawingContext )
	{
		super();

        this.drawingContext = drawingContext;
        this.currentState = null;
	}

	set state( newState )
	{
		this.currentState = newState;
		this.update();
	}

	get state()
	{
		return this.currentState;
	}

	update()
	{
		console.log("Action menu start method called.")
		this.drawingContext.clearRect(0, 0, this.drawingContext.canvas.width, this.drawingContext.canvas.height);
		this.drawingContext.fillStyle = this.state.color;
		this.drawingContext.fillRect(this.state.position_x, this.state.position_y, this.state.width, this.state.height);
	}
}

customElements.define('action-menu-view', ActionMenuView );

class ActionMenuModel extends EventTarget
{
	constructor()
	{
		super();

		this.state =
		{
			width: 200,
	    	height: 200,
	    	color: 'black',
	    	position_x: 200,
	    	position_y: 550
		};
		
		this.delta_x = 20;
    	this.delta_y = 10;
 	}

}

class ActionMenuController
{
	constructor( model, view )
	{
		this.innerModel = model;
		this.innerView = view;		
	}

	connect()
	{

	}

	disconnect()
	{
		//To-do...
	}

	start()
	{
		this.innerView.state = this.innerModel.state;
	}

}

class PlayerView extends HTMLElement
{
	constructor( drawingContext )
	{
		super();

        this.drawingContext = drawingContext;
        this.currentState = null;
	}

	set state( newState )
	{
		this.currentState = newState;
		this.update();
	}

	get state()
	{
		return this.currentState;
	}

	update()
	{
		this.drawingContext.clearRect(0, 0, this.drawingContext.canvas.width, this.drawingContext.canvas.height);
		this.drawingContext.fillStyle = this.state.color;
		this.drawingContext.fillRect(this.state.position_x, this.state.position_y, this.state.width, this.state.height);
	}
}

customElements.define('x-view', PlayerView );


class Player extends EventTarget
{
	constructor()
	{
		super();

		this.state =
		{
			width: 30,
	    	height: 150,
	    	color: 'red',
	    	position_x: 200,
	    	position_y: 350
		};
		
		this.delta_x = 20;
    	this.delta_y = 10;
 	}

 	moveUp()
 	{
 		this.state.position_y -= this.delta_y;
 		this.dispatchEvent( new CustomEvent('moveup') );
 	}

 	moveDown()
 	{
 		this.state.position_y += this.delta_y;
 		this.dispatchEvent( new CustomEvent('movedown') );
 	}

 	moveLeft()
 	{
 		this.state.position_x -= this.delta_x;
 		this.dispatchEvent( new CustomEvent('moveleft') );
 	}

 	moveRight()
 	{
 		this.state.position_x += this.delta_x;
 		this.dispatchEvent( new CustomEvent('moveright') );
 	}

}

class PlayerController
{
	constructor( model, view )
	{
		this.innerModel = model;
		this.innerView = view;		
	}

	connect()
	{
		this.innerModel.addEventListener('moveup', this.onmoveup.bind(this) );
		this.innerModel.addEventListener('moveright', this.onmoveright.bind(this) );
		this.innerModel.addEventListener('moveleft', this.onmoveleft.bind(this) );
		this.innerModel.addEventListener('movedown', this.onmovedown.bind(this) );
	}

	disconnect()
	{
		//To-do...
	}

	start()
	{
		this.innerView.state = this.innerModel.state;
	}

	onmoveup(event)
	{
		this.innerView.state = this.innerModel.state;
	}

	onmoveright(event)
	{
		this.innerView.state = this.innerModel.state;
	}

	onmoveleft(event)
	{
		this.innerView.state = this.innerModel.state;
	}

	onmovedown(event)
	{
		this.innerView.state = this.innerModel.state;
	}
}

class KeyboardController
{
	constructor( model, view ) 
	{
		this.innerModel = model;
		this.innerView = view;

		this.keyCode = false;
		this.key = false;
	}

	connect()
	{
		window.onkeydown = (event) => {this.key = true; this.keyCode = event.keyCode; this.onkeydown(event); };
        window.onkeyup = (event) => this.key = false;
	}

	disconnect()
	{
		window.onkeydown = null;
        window.onkeyup = null;
	}

	onkeydown(event)
	{
		console.log('keypress:' + this.keyCode);
		if (this.key && this.keyCode == 37) {this.innerModel.moveLeft(); };
	    if (this.key && this.keyCode == 39) {this.innerModel.moveRight(); };
	    if (this.key && this.keyCode == 38) {this.innerModel.moveUp(); };
	    if (this.key && this.keyCode == 40) {this.innerModel.moveDown(); };
	}

	
}


function main()
{
	let canvas = document.createElement('canvas');
	canvas.width = 1200;
    canvas.height = 800;
    canvas.style.border = "1px solid black";
    canvas.style.backgroundColor = "white";
    
	let playerModel = new Player();
	let playerView = new PlayerView( canvas.getContext("2d") );
	let playerController = new PlayerController(playerModel, playerView);
	let keyboardController = new KeyboardController(playerModel, playerView);

	let actionMenuModel = new ActionMenuModel();
	let actionMenuView = new ActionMenuView( canvas.getContext("2d") );
	let actionMenuController = new ActionMenuController( actionMenuModel, actionMenuView);
	

	playerController.connect();
	keyboardController.connect();

	playerController.start();

	actionMenuController.start();

	document.body.appendChild(canvas);
}

window.onload = main;