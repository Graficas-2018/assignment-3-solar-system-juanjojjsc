
var renderer = null,
scene = null,
camera = null,
root = null,
group = null,
sphere = null,
sphereEnvMapped = null,
orbitControls = null;
var loader;

var duration = 20000; // ms
var currentTime = Date.now();

var materials = {};
var bgUrl = "./images/milkyway.jpg";
var sunMapUrl = "./images/sunmap.jpg";
//var sunBumpMapUrl = "./images/sunbump.jpg";
var mercuryMapUrl = "./images/mercurymap.jpg";
var mercuryBumpMapUrl = "./images/mercurybump.jpg";
var venusMapUrl = "./images/venusmap.jpg";
var venusBumpMapUrl = "./images/venusbump.jpg";
var earthMapUrl = "./images/earthmap.jpg";
var earthBumpMapUrl = "./images/earthbump.jpg";
var marsMapUrl = "./images/marsmap.jpg";
var marsBumpMapUrl = "./images/marsbump.jpg";
var jupiterMapUrl = "./images/jupitermap.jpg";
//var jupiterBumpMapUrl = "./images/jupiterbump.jpg";
var saturnMapUrl = "./images/saturnmap.jpg";
//var saturnBumpMapUrl = "./images/saturnbump.jpg";
var uranusMapUrl = "./images/uranusmap.jpg";
//var uranusBumpMapUrl = "./images/uranusbump.jpg";
var neptuneMapUrl = "./images/neptunemap.jpg";
//var neptuneBumpMapUrl = "./images/neptunebump.jpg";
var plutoMapUrl = "./images/plutomap.jpg";
var plutoBumpMapUrl = "./images/plutobump.jpg";

var mercuryDistanceToSun = 30;
var venusDistanceToSun = 60;
var earthDistanceToSun = 100;
var marsDistanceToSun = 130;
var jupiterDistanceToSun = 160;
var saturnDistanceToSun = 200;
var uranusDistanceToSun = 240;
var neptuneDistanceToSun = 280;
var plutoDistanceToSun = 333;


function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotate the sphere group about its Y axis
    group.rotation.y += angle;
    mercury.rotation.y += angle;
    venus.rotation.y += angle;
    earth.rotation.y += angle;
    mars.rotation.y += angle;
    jupiter.rotation.y += angle;
    saturn.rotation.y += angle;
    uranus.rotation.y += angle;
    neptune.rotation.y += angle;
    pluto.rotation.y += angle;


}

function run() {
    requestAnimationFrame(function() { run(); });

        // Render the scene
        renderer.render( scene, camera );

        // Spin the cube for next frame
        animate();

        // Update the camera controller
        orbitControls.update();
}


function setLightColor(light, r, g, b)
{
    r /= 255;
    g /= 255;
    b /= 255;

    light.color.setRGB(r, g, b);
}


function toggleTexture()
{
    textureOn = !textureOn;
    var names = materialName.split("-");
    if (!textureOn)
    {
        setMaterial(names[0]);
    }
    else
    {
        setMaterial(names[0] + "-textured");
    }
}

function createPlanet(name,x,y,z,planetMapUrl,planetBumpMapUrl)
{

    planetMap = new THREE.TextureLoader().load(planetMapUrl);
    planetBumpMap = new THREE.TextureLoader().load(planetBumpMapUrl);


    if (!planetBumpMapUrl)
    {
      material = name + "-phong";
      materials[material] = new THREE.MeshPhongMaterial({ map: planetMap });
    } else {
      material = name + "-phong-textured";
      materials[material] = new THREE.MeshPhongMaterial({ map: planetMap, bumpMap: planetBumpMap, bumpScale: 0.5 });
    }

    planetGeometry = new THREE.SphereGeometry(x,y,z);
    planet = new THREE.Mesh(planetGeometry, materials[material]);
    planet.visible = true;
    return planet;
}

function createOrbit(name)
{
    var orbitGeometry;
    switch (name) {
      case 'mercury':
        orbitGeometry = new THREE.TorusGeometry( mercuryDistanceToSun, 0.1, 16, 800 );
        break;
      case 'venus':
        orbitGeometry = new THREE.TorusGeometry( venusDistanceToSun, 0.1, 16, 800 );
        break;
      case 'earth':
        orbitGeometry = new THREE.TorusGeometry( earthDistanceToSun, 0.1, 16, 800 );
        break;
      case 'mars':
        orbitGeometry = new THREE.TorusGeometry( marsDistanceToSun, 0.1, 16, 800 );
        break;
      case 'jupiter':
        orbitGeometry = new THREE.TorusGeometry( jupiterDistanceToSun, 0.1, 16, 800 );
        break;
      case 'saturn':
        orbitGeometry = new THREE.TorusGeometry( saturnDistanceToSun, 0.1, 16, 800 );
        break;
      case 'uranus':
        orbitGeometry = new THREE.TorusGeometry( uranusDistanceToSun, 0.1, 16, 800 );
        break;
      case 'neptune':
        orbitGeometry = new THREE.TorusGeometry( neptuneDistanceToSun, 0.1, 16, 800 );
        break;
      case 'pluto':
        orbitGeometry = new THREE.TorusGeometry( plutoDistanceToSun, 0.1, 16, 800 );
        break;
      default:
        orbitGeometry = new THREE.TorusGeometry( 30, 0.1, 16, 100 );
        break;
    }
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
    var orbit = new THREE.Mesh( orbitGeometry, material );
    orbit.rotation.x = Math.PI / 2;
    return orbit;
}


var directionalLight = null;
var spotLight = null;
var pointLight = null;
var ambientLight = null;


function createScene(canvas) {

    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();
    // Background image
    var backgroundImg = new THREE.TextureLoader().load(bgUrl);
    backgroundImg.wrapS = backgroundImg.wrapT = THREE.RepeatWrapping;
    backgroundImg.repeat.set(1, 1);
    scene.background = backgroundImg

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(-2, 6, 12);
    scene.add(camera);

    // Create a group to hold all the objects
    root = new THREE.Object3D;

    // Add a directional light to show off the object
    directionalLight = new THREE.DirectionalLight( 0xffffff, 2);
    directionalLight.position.set(.5, 0, 1);
    root.add(directionalLight);

    // Add an Ambient Light
    ambientLight = new THREE.AmbientLight ( 0x888888 );
    root.add(ambientLight);


    // Create a group to hold the spheres
    group = new THREE.Object3D;
    root.add(group);


    // Create the Planets
    sun = createPlanet("sun",20,50,50,sunMapUrl);
    mercury = createPlanet("mercury",3,50,50,mercuryMapUrl,mercuryBumpMapUrl);
    mercury.position.x = mercuryDistanceToSun;
    venus = createPlanet("venus",5,50,50,venusMapUrl,venusBumpMapUrl);
    venus.position.x = venusDistanceToSun;
    earth = createPlanet("earth",8,50,50,earthMapUrl,earthBumpMapUrl);
    earth.position.x = earthDistanceToSun;
    mars = createPlanet("mars",6,50,50,marsMapUrl,marsBumpMapUrl);
    mars.position.x = marsDistanceToSun;
    jupiter = createPlanet("jupiter",15,50,50,jupiterMapUrl);
    jupiter.position.x = jupiterDistanceToSun;
    saturn = createPlanet("saturn",11,50,50,saturnMapUrl);
    saturn.position.x = saturnDistanceToSun;
    uranus = createPlanet("uranus",7,50,50,uranusMapUrl);
    uranus.position.x = uranusDistanceToSun;
    neptune = createPlanet("neptune",5,50,50,neptuneMapUrl);
    neptune.position.x = neptuneDistanceToSun;
    pluto = createPlanet("pluto",2,50,50,plutoMapUrl,plutoBumpMapUrl);
    pluto.position.x = plutoDistanceToSun;

    // Create the orbits
    var mercuryOrbit = createOrbit('mercury');
    var venusOrbit = createOrbit('venus');
    var earthOrbit = createOrbit('earth');
    var marsOrbit = createOrbit('mars');
    var jupiterOrbit = createOrbit('jupiter');
    var saturnOrbit = createOrbit('saturn');
    var uranusOrbit = createOrbit('uranus');
    var neptuneOrbit = createOrbit('neptune');
    var plutoOrbit = createOrbit('pluto');


    group.add(mercuryOrbit);
    group.add(venusOrbit);
    group.add(earthOrbit);
    group.add(marsOrbit);
    group.add(jupiterOrbit);
    group.add(saturnOrbit);
    group.add(uranusOrbit);
    group.add(neptuneOrbit);
    group.add(plutoOrbit);


    // Add the mesh to our group
    group.add(sun);
    group.add(mercury);
    group.add(venus);
    group.add(earth);
    group.add(mars);
    group.add(jupiter);
    group.add(saturn);
    group.add(uranus);
    group.add(neptune);
    group.add(pluto);



    // Now add the group to our scene
    scene.add( root );
}
