
var renderer = null,
scene = null,
camera = null,
root = null,
group = null,
sphere = null,
sphereEnvMapped = null,
orbitControls = null;
var loader;

var systemGroup = null,
mercuryGroup = null,
venusGroup = null,
earthGroup = null,
marsGroup = null,
jupiterGroup = null,
saturnGroup = null,
uranusGroup = null,
neptuneGroup = null,
plutoGroup = null;

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

// Planet Distance to Sun in Millions of KM
var mercuryDistanceToSun = 57;
var venusDistanceToSun = 108;
var earthDistanceToSun = 149;
var marsDistanceToSun = 227;
var jupiterDistanceToSun = 778;
var saturnDistanceToSun = 1433;
var uranusDistanceToSun = 2871;
var neptuneDistanceToSun = 4495;
var plutoDistanceToSun = 5906;

// Planet Radius in Thousands of Kilometers
var sunRadius = 23;
var mercuryRadius = 2;
var venusRadius = 6;
var earthRadius = 6.3;
var marsRadius = 3.3;
var jupiterRadius = 69;
var saturnRadius = 58;
var uranusRadius = 25;
var neptuneRadius = 24;
var plutoRadius = 1.1;

// Planet Rotation Speed in Km/s
var sunRotation = .002;
var mercuryRotation = 0.0003;
var venusRotation = 0.00018;
var earthRotation = 0.046;
var marsRotation = 0.024;
var jupiterRotation = .0126;
var saturnRotation = .00987;
var uranusRotation = .00259;
var neptuneRotation = .00268;
var plutoRotation = 0.0013;

// Planet Translation Speed in Km/s ^-4
var mercuryTranslation = 0.0047;
var venusTranslation = 0.0035;
var earthTranslation = 0.0029;
var marsTranslation = 0.0024;
var jupiterTranslation = 0.0013;
var saturnTranslation = 0.0009;
var uranusTranslation = 0.0006;
var neptuneTranslation = 0.0005;
var plutoTranslation = 0.0004;

// Planet Satellites
var mercurySatellites = 0;
var venusSatelittes = 0;
var earthSatelittes = 1;
var marsSatelittes = 2;
var jupiterSatelittes = 79;
var saturnSatelittes = 62;
var uranusSatelittes = 27;
var neptuneSatelittes = 14;
var plutoSatelittes = 5; 





function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    //console.log("ANGULLO",angle);
    //console.log("FRACT",fract);

    // Rotate all the system
    //systemGroup.rotation.y += angle;

    // Rotate the sun
    // ?

    // Planet translation around the sun in days ^-4 km/s
    mercuryGroup.rotation.y += mercuryTranslation;
    venusGroup.rotation.y += venusTranslation;
    earthGroup.rotation.y += earthTranslation;
    marsGroup.rotation.y += marsTranslation;
    jupiterGroup.rotation.y += jupiterTranslation;
    saturnGroup.rotation.y += saturnTranslation;
    uranusGroup.rotation.y += uranusTranslation;
    neptuneGroup.rotation.y += neptuneTranslation;
    plutoGroup.rotation.y += plutoTranslation;


    // Planet rotation on its axis
    sun.rotation.y += sunRotation;
    mercury.rotation.y += mercuryRotation;
    // VENUS ROTATES TO THE OPPOSITE SIDE
    venus.rotation.y -= venusRotation;
    earth.rotation.y += earthRotation;
    mars.rotation.y += marsRotation;
    jupiter.rotation.y += jupiterRotation;
    saturn.rotation.y += saturnRotation;
    uranus.rotation.y += uranusRotation;
    neptune.rotation.y += neptuneRotation;
    pluto.rotation.y += plutoRotation;


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
    systemGroup = new THREE.Object3D;
    root.add(systemGroup);

    // Creathe the Planet Groups
    mercuryGroup = new THREE.Object3D;
    venusGroup = new THREE.Object3D;
    earthGroup = new THREE.Object3D;
    marsGroup = new THREE.Object3D;
    jupiterGroup = new THREE.Object3D;
    saturnGroup = new THREE.Object3D;
    uranusGroup = new THREE.Object3D;
    neptuneGroup = new THREE.Object3D;
    plutoGroup = new THREE.Object3D;

    // Create the Planets
    sun = createPlanet("sun",sunRadius,50,50,sunMapUrl);
    mercury = createPlanet("mercury",mercuryRadius,50,50,mercuryMapUrl,mercuryBumpMapUrl);
    mercury.position.x = mercuryDistanceToSun;
    venus = createPlanet("venus",venusRadius,50,50,venusMapUrl,venusBumpMapUrl);
    venus.position.x = venusDistanceToSun;
    earth = createPlanet("earth",earthRadius,50,50,earthMapUrl,earthBumpMapUrl);
    earth.position.x = earthDistanceToSun;
    mars = createPlanet("mars",marsRadius,50,50,marsMapUrl,marsBumpMapUrl);
    mars.position.x = marsDistanceToSun;
    jupiter = createPlanet("jupiter",jupiterRadius,50,50,jupiterMapUrl);
    jupiter.position.x = jupiterDistanceToSun;
    saturn = createPlanet("saturn",saturnRadius,50,50,saturnMapUrl);
    saturn.position.x = saturnDistanceToSun;
    uranus = createPlanet("uranus",uranusRadius,50,50,uranusMapUrl);
    uranus.position.x = uranusDistanceToSun;
    neptune = createPlanet("neptune",neptuneRadius,50,50,neptuneMapUrl);
    neptune.position.x = neptuneDistanceToSun;
    pluto = createPlanet("pluto",plutoRadius,50,50,plutoMapUrl,plutoBumpMapUrl);
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

    mercuryGroup.add(mercury);
    venusGroup.add(venus);
    earthGroup.add(earth);
    marsGroup.add(mars);
    jupiterGroup.add(jupiter);
    saturnGroup.add(saturn);
    uranusGroup.add(uranus);
    neptuneGroup.add(neptune);
    plutoGroup.add(pluto);


    systemGroup.add(mercuryOrbit);
    systemGroup.add(venusOrbit);
    systemGroup.add(earthOrbit);
    systemGroup.add(marsOrbit);
    systemGroup.add(jupiterOrbit);
    systemGroup.add(saturnOrbit);
    systemGroup.add(uranusOrbit);
    systemGroup.add(neptuneOrbit);
    systemGroup.add(plutoOrbit);





    // Add the mesh to our group
    systemGroup.add(sun);
    systemGroup.add(mercuryGroup);
    systemGroup.add(venusGroup);
    systemGroup.add(earthGroup);
    systemGroup.add(marsGroup);
    systemGroup.add(jupiterGroup);
    systemGroup.add(saturnGroup);
    systemGroup.add(uranusGroup);
    systemGroup.add(neptuneGroup);
    systemGroup.add(plutoGroup);



    // Now add the group to our scene
    scene.add( root );
}
