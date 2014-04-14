$(document).ready(function() {

	var w = 992;
	var h = 600;
	var energy = 100;

	function planet(nom, x, y, poids, r){
		this.nom=nom;
		this.x=x;
		this.y=y;
		this.poids=poids;
		this.r=r;
		this.pic_x=x-r;
		this.pic_y=y-r;
		this.zone = 4*r;
	}
	function etoile(nom, x, y, poids, r){
		this.nom=nom;
		this.x=x;
		this.y=y;
		this.poids=poids;
		this.r=r;
		this.pic_x=x-r;
		this.pic_y=y-r;
		this.zone = 3*r;
	}
	function satel(nom, x, y, poids, r){
		this.nom=nom;
		this.x=x;
		this.y=y;
		this.poids=poids;
		this.r=r;
		this.pic_x=x-r;
		this.pic_y=y-r;
		this.zone = 3*r;
	}
	
	var planet_terre = new planet('terre',100, 200, 120, 42 );
	var planet_venus = new planet('venus', w/2, h/2, 80, 40);
	var theSun = new etoile('soleil', w-90, 150, 180, 80);
	var theSatellite = new satel('satellite', 200, 140, 50, 12);

    var stage = new Kinetic.Stage({
        container: 'container',
        width: w,
        height: h
    });

    var layer_pla = new Kinetic.Layer(); // Calque des planètes

    var layer_sat = new Kinetic.Layer(); // Calque du satellite

    stage.add(layer_pla);
    stage.add(layer_sat);
	
	var layer_GO = new Kinetic.Layer(); // New layer for the GO
    stage.add(layer_GO);
	
    var game_over_text = new Kinetic.Text({
        x: stage.width() / 2,
        y: stage.height() / 2.5,
        text: 'GAME OVER',
        fontSize: 50,
        fontFamily: 'Calibri',
        fill: 'White'
    });
	
	game_over_text.offsetX(game_over_text.width()/2);

	var bubble_GO = new Kinetic.Text({
		x: stage.width()/3.1,
		y: stage.height()/2,
		text: 'Dear pilot, \n\n You lack training. \n\n You may do better next time ! \n\n Press space bar to relaunch.',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		width: 380,
		padding: 20,
		align: 'justify'
	});

	var rect_GO = new Kinetic.Rect({
		x: stage.width()/3.1,
		y: stage.height()/2,
		stroke: '#555',
		strokeWidth: 5,
		fill: '#ddd',
		width: 380,
		height: bubble_GO.height(),
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: {x:10,y:10},
		shadowOpacity: 0.2,
		cornerRadius: 10
	});

	layer_GO.add(game_over_text);
	layer_GO.add(rect_GO);
	layer_GO.add(bubble_GO);
	
	var layer_vic = new Kinetic.Layer(); // New layer for the victory
    stage.add(layer_vic);
	
    var vic_text = new Kinetic.Text({
        x: stage.width() / 2,
        y: stage.height() / 2.5,
        text: 'Victory !',
        fontSize: 50,
        fontFamily: 'Calibri',
        fill: 'White'
    });
	
	vic_text.offsetX(vic_text.width()/2);

	var bubble_vic = new Kinetic.Text({
		x: stage.width()/3.1,
		y: stage.height()/2,
		text: 'Dear pilot, \n\n You succeeded the mission. \n\n Next mission : Coming soon. \n\n Press space bar to relaunch.',
		fontSize: 18,
		fontFamily: 'Calibri',
		fill: '#555',
		width: 380,
		padding: 20,
		align: 'justify'
	});

	var rect_vic = new Kinetic.Rect({
		x: stage.width()/3.1,
		y: stage.height()/2,
		stroke: '#555',
		strokeWidth: 5,
		fill: '#ddd',
		width: 380,
		height: bubble_vic.height(),
		shadowColor: 'black',
		shadowBlur: 10,
		shadowOffset: {x:10,y:10},
		shadowOpacity: 0.2,
		cornerRadius: 10
	});

	layer_vic.add(vic_text);
	layer_vic.add(rect_vic);
	layer_vic.add(bubble_vic);
	
	var jauge_v = new Kinetic.Rect({
		x: w-120,
		y: 20,
		width: 100,
		height: 20,
		fill: "#446e9b",
	});
	
	var jauge_v_text = new Kinetic.Text({
        x: jauge_v.getX() - 80,
        y: jauge_v.getY(),
        text: 'Velocity :',
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: 'White'
    });
	
	layer_sat.add(jauge_v);
	layer_sat.add(jauge_v_text);
	
    var soleilObj = new Image();
      soleilObj.onload = function() {
        var soleil = new Kinetic.Image({
          x: theSun.pic_x,
          y: theSun.pic_y,
          image: soleilObj,
          width: theSun.r*2,
          height: theSun.r*2,
        });

        layer_pla.add(soleil);
	    soleil.on('click', function() {
			alert('I am the sun');
			
		});
	    layer_pla.draw();
 };
 
 	var layer_energy = new Kinetic.Layer();

	stage.add(layer_energy);

	var jauge = new Kinetic.Rect({
		x: 70,
		y: 20,
		width: 300,
		height: 30,
		fillLinearGradientStartPoint: {x:20, y:35},
		fillLinearGradientEndPoint: {x:320,y:35},
		fillLinearGradientColorStops: [0, 'red', 0.3, 'orange', 0.4, 'yellow', 1, 'green'],
		stroke: 'black',
		strokeWidth: 4,
		draggable: true
	});
	
	var jauge_text = new Kinetic.Text({
        x: 20,
        y: jauge.getY()+5,
        text: 'Fuel :',
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: 'White'
    });
	
	var victory_text = new Kinetic.Text({
        x: w - 300,
        y: h - 40,
        text: 'Time before victory :',
        fontSize: 18,
        fontFamily: 'Calibri',
        fill: 'White'
    });

	layer_energy.add(jauge);
	layer_energy.add(jauge_text);
	layer_energy.add(victory_text);
	layer_energy.draw();
	
	function updateJauge() {
		energy = energy-0.5;
		jauge.setWidth(3*energy);
		layer_energy.draw();

		if (energy <= 0){
			
			layer_GO.fire("game_over");

		}
	}

    soleilObj.src = "image/Sun.png";
	var satelliteObj = new Image();
	satelliteObj.onload = function() {
		var satellite = new Kinetic.Image({
			x: theSatellite.pic_x,
			y: theSatellite.pic_y,
			image: satelliteObj,
			width: theSatellite.r*2,
			height: theSatellite.r,
		});

		layer_sat.add(satellite);
		satellite.on('click', function() {
		alert('Hello Captain !');
		});

		var vit = new Object();
		vit.x = 0;
		vit.y = 0;
		
		var acc = new Object();
		acc.x = 0;
		acc.y = 0;
		
		var force = Math.pow(10,-3); // variables à changer
		var const_gra = 2*Math.pow(10,-1);// variables à changer
		
		var force_planets = new Object();
		force_planets.x = 0;
		force_planets.y = 0;
		
		var dist_terre = 0;
		var dist_terre_cube = 0;
		var dist_venus = 0;
		var dist_venus_cube = 0;
		var dist_sun = 0;
		var dist_sun_cube = 0;


		var sat_center_x = 0;
		var sat_center_y = 0;
		
		var time = 0;

		function force_planet(planet, dist_cube){
					
			acc.x = (const_gra/dist_cube)*(planet.x - sat_center_x) + acc.x;
			acc.y = (const_gra/dist_cube)*(planet.y - sat_center_y) + acc.y;

		};
		
		var anima = new Kinetic.Animation(function(frame) {

			sat_center_x = satellite.getX()+theSatellite.r;
			sat_center_y = satellite.getY()+theSatellite.r;
			
			dist_terre = Math.sqrt(Math.pow(planet_terre.x - sat_center_x, 2) + Math.pow(planet_terre.y - sat_center_y, 2));
			
			if (dist_terre < planet_terre.r){
				layer_GO.fire("game_over");
			}

			else if (dist_terre < planet_terre.zone) {
			
				dist_terre_cube = Math.pow(dist_terre, 3);

				force_planet(planet_terre, dist_terre_cube)	;

			}
			
			dist_venus = Math.sqrt(Math.pow(planet_venus.x - satellite.getX(), 2) + Math.pow(planet_venus.y - satellite.getY(), 2));
			
			if (dist_venus < planet_venus.r){
				layer_GO.fire("game_over");
			}
			
			else if (dist_venus < planet_venus.zone ) {
			
				dist_venus_cube = Math.pow(dist_venus, 3);

				force_planet(planet_venus, dist_venus_cube)	;
				
				time += 0.01;
				
				victory_text.setText('Time before victory : '+(10-time).toPrecision(3));
				layer_energy.draw();
				
				if (time >= 10) {
					layer_vic.fire('victory');
				}

			}
			
			else {
				time = 0;
				victory_text.setText('Time before victory : ');
				layer_energy.draw();
			}
			
			dist_sun = Math.sqrt(Math.pow(theSun.x - satellite.getX(), 2) + Math.pow(theSun.y - satellite.getY(), 2));
			
			if (dist_sun < theSun.r){
				layer_GO.fire("game_over");
			}
			
			vit.x = frame.timeDiff*acc.x + vit.x;
			vit.y = frame.timeDiff*acc.y + vit.y;
			
			jauge_v.setWidth(Math.sqrt(Math.pow(vit.x, 2) + Math.pow(vit.y, 2)) * 100);
			
			satellite.setX(satellite.getX() + vit.x*frame.timeDiff);
			satellite.setY(satellite.getY() + vit.y*frame.timeDiff);
			// console.log(satellite.getX());
			acc.x = 0;
			acc.y = 0;
			
			
		
		}, layer_sat);
		
		KeyboardJS.on('space', function() {

			layer_GO.clear();
			layer_vic.clear();
			
			satellite.setX(theSatellite.pic_x);
			satellite.setY(theSatellite.pic_y);
			
			acc.x = 0;
			acc.y = 0;
			vit.x = 0;
			vit.y = 0;
			energy = 100;
			
			jauge.setWidth(300);
			
			layer_energy.draw();
			
			anima.start();
			
		}); 
		
		anima.start();
		
		
		KeyboardJS.on('a', function() {
			// anima.stop();
			
		});

		KeyboardJS.on('left', function() {

			updateJauge();
			
			acc.x -= force;
			time = 0;
			victory_text.setText('Time before victory : ');
			layer_energy.draw();
		});
			
		KeyboardJS.on('right', function() {

			updateJauge();

			acc.x += force;
			time = 0;
			victory_text.setText('Time before victory : ');
			layer_energy.draw();
			
		});
		
		KeyboardJS.on('up', function() {

			updateJauge();
			acc.y -= force;
			time = 0;
			victory_text.setText('Time before victory : ');
			layer_energy.draw();
		});
		
		KeyboardJS.on('down', function() {

			updateJauge();

			acc.y += force;
			time = 0;
			victory_text.setText('Time before victory : ');
			layer_energy.draw();
		});
		
		layer_GO.on("game_over", function() {		
			this.draw();

			anima.stop();

		});
		
		layer_vic.on("victory", function() {		
			this.draw();

			anima.stop();

		});
	};

    satelliteObj.src="image/Satellite.png";
    
    var terreObj = new Image();
      terreObj.onload = function() {
        var terre = new Kinetic.Image({
          x: planet_terre.pic_x,
          y: planet_terre.pic_y,
          image: terreObj,
          width: planet_terre.r*2,
          height: planet_terre.r*2,
        });

        layer_pla.add(terre);
	    terre.on('click', function() {
        alert('I am the earth');
      });

	    layer_pla.draw();

	    };

    terreObj.src="image/Earth.png";

    var venusObj = new Image();
      venusObj.onload = function() {
        var venus = new Kinetic.Image({
          x: planet_venus.pic_x,
          y: planet_venus.pic_y,
          image: venusObj,
          width: planet_venus.r*2,
          height: planet_venus.r*2,
        });

        layer_pla.add(venus);
	    venus.on('click', function() {
        alert('I am venus ! But dont eat me');
      });

	    layer_pla.draw();
	};

    venusObj.src="image/Venus.png";
	
	var layer_fond = new Kinetic.Layer();
	
	stage.add(layer_fond);
	
	layer_fond.moveToBottom();
	
	var background_count = 0;
	
	var starsObj1 = new Image();
    starsObj1.onload = function() {
	  
		background_count++;
		
		if (background_count == 3){
			background();
		}
    };
    starsObj1.src = 'image/etoiles1.png';
	
	var starsObj2 = new Image();
    starsObj2.onload = function() {
	  
		background_count++;
		
		if (background_count == 3){
			background();
		}
    };
    starsObj2.src = 'image/etoiles2.png';
	
	var starsObj3 = new Image();
    starsObj3.onload = function() {
	  
		background_count++;
		
		if (background_count == 3){
			background();
		}
    };
    starsObj3.src = 'image/etoiles3.png';
	  
	function background() {
		var stars1_1 = new Kinetic.Rect({
			x: -w,
			y: 0,
			width: w,
			height: h,
			fillPatternImage: starsObj1,
			fillPatternRepeat: "repeat"
		});
		
		var stars1_2 = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: w,
			height: h,
			fillPatternImage: starsObj1,
			fillPatternRepeat: "repeat"
		});
		
		var stars2_1 = new Kinetic.Rect({
			x: -w,
			y: 0,
			width: w,
			height: h,
			fillPatternImage: starsObj2,
			fillPatternRepeat: "repeat"
		});
		
		var stars2_2 = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: w,
			height: h,
			fillPatternImage: starsObj2,
			fillPatternRepeat: "repeat"
		});
		
		var stars3_1 = new Kinetic.Rect({
			x: -w,
			y: 0,
			width: w,
			height: h,
			fillPatternImage: starsObj3,
			fillPatternRepeat: "repeat"
		});
		
		var stars3_2 = new Kinetic.Rect({
			x: 0,
			y: 0,
			width: w,
			height: h,
			fillPatternImage: starsObj3,
			fillPatternRepeat: "repeat"
		});
	
		layer_fond.add(stars1_1);
		layer_fond.add(stars1_2);
		layer_fond.add(stars2_1);
		layer_fond.add(stars2_2);
		layer_fond.add(stars3_1);
		layer_fond.add(stars3_2);
		
		layer_fond.draw();
		
		var a_stars1 = new Kinetic.Animation(function(frame) {
			stars1_1.setX(stars1_1.getX()+1);
			stars1_2.setX(stars1_2.getX()+1);
			
			if (stars1_2.getX() == w) stars1_2.setX(-w);
			if (stars1_1.getX() == w) stars1_1.setX(-w);
			
		}, layer_fond);

		a_stars1.start();
		
		var a_stars2 = new Kinetic.Animation(function(frame) {
			stars2_1.setX(stars2_1.getX()+2);
			stars2_2.setX(stars2_2.getX()+2);
			
			if (stars2_2.getX() == w) stars2_2.setX(-w);
			if (stars2_1.getX() == w) stars2_1.setX(-w);
			
		}, layer_fond);

		a_stars2.start();
		
		var a_stars3 = new Kinetic.Animation(function(frame) {
		
			stars3_1.setX(stars1_1.getX()+3);
			stars3_2.setX(stars1_2.getX()+3);
			
			if (stars3_2.getX() == w) stars3_2.setX(-w);
			if (stars3_1.getX() == w) stars3_1.setX(-w);
			
		}, layer_fond);

		a_stars3.start();
		
	};
	

});
