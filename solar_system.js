
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

var phobosGroup = null,
deimosGroup = null,
ioGroup = null,
europaGroup = null,
ganymedeGroup = null,
callistoGroup = null,
mimasGroup = null,
enceladusGroup = null,
tethysGroup = null,
dioneGroup = null,
rheaGroup = null,
titanGroup = null,
hyperionGroup = null,
iapetusGroup = null,
puckGroup = null,
mirandaGroup = null,
arielGroup = null,
umbrielGroup = null,
titaniaGroup = null,
oberonGroup = null,
proteusGroup = null,
tritonGroup = null;

var saturnRing = null,
uranusRing = null,
neptuneRing = null;


var duration = 20000; // ms
var currentTime = Date.now();

var materials = {};
var bgUrl = "./images/mwh.jpg";
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

var moonMapUrl = "./images/moonmap.jpg";
var moonBumpMapUrl = "./images/moonbump.jpg";



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

// Moon Radius
var earthMoonRadius = 1.7;
var marsMoonRadius = 0.8;
var jupiterMoonRadius = 2.6;
var saturnMoonRadius = 2.3;
var uranusMoonRadius = 2;
var neptuneMoonRadius = 2;
var plutoMoonRadius = 1;

// Planet Rotation Speed in Km/s
var sunRotation = .002;
var mercuryRotation = 0.03;
var venusRotation = 0.018;
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







function animate() {


    // Planet rotation on its axis
    sun.rotation.y += sunRotation;
    mercury.rotation.y += mercuryRotation;
    // VENUS ROTATES TO THE OPPOSITE SIDE
    venus.rotation.y -= venusRotation;
    earth.rotation.y += earthRotation;
    mars.rotation.y += marsRotation;
    jupiter.rotation.y += jupiterRotation;
    saturn.rotation.y += saturnRotation;
    // URANUS ROTATES ON THE X AXIS
    uranus.rotation.x += uranusRotation;
    neptune.rotation.y += neptuneRotation;
    pluto.rotation.y += plutoRotation;


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

    // Moon translation around the Planet
    phobosGroup.rotation.y += 0.0004;
    deimosGroup.rotation.y += 0.004;

    ioGroup.rotation.y += 0.004;
    europaGroup.rotation.y += 0.009;
    ganymedeGroup.rotation.y += 0.003;
    callistoGroup.rotation.y += 0.005;

    mimasGroup.rotation.y += 0.001;
    enceladusGroup.rotation.y += 0.0006;
    tethysGroup.rotation.y += 0.0045;
    dioneGroup.rotation.y += 0.0029;
    rheaGroup.rotation.y += 0.0007;
    titanGroup.rotation.y += 0.0084;
    hyperionGroup.rotation.y += 0.001;
    iapetusGroup.rotation.y += 0.009;

    puckGroup.rotation.z += 0.004;
    mirandaGroup.rotation.z += 0.007;
    arielGroup.rotation.z += 0.005;
    umbrielGroup.rotation.z += 0.009;
    titaniaGroup.rotation.z += 0.01;
    oberonGroup.rotation.z += 0.006;

    proteusGroup.rotation.y += 0.009;
    tritonGroup.rotation.y += 0.0009;

    // Satellites Rotation
    earthMoon.rotation.y += earthRotation;

    phobos.rotation.y += marsRotation;
    deimos.rotation.y += marsRotation;

    io.rotation.y += jupiterRotation;
    europa.rotation.y += jupiterRotation;
    ganymede.rotation.y += jupiterRotation;
    callisto.rotation.y += jupiterRotation;

    mimas.rotation.y += saturnRotation;
    enceladus.rotation.y += saturnRotation;
    tethys.rotation.y += saturnRotation;
    dione.rotation.y += saturnRotation;
    rhea.rotation.y += saturnRotation;
    titan.rotation.y += saturnRotation;
    hyperion.rotation.y += saturnRotation;
    iapetus.rotation.y += saturnRotation;

    puck.rotation.z += uranusRotation;
    miranda.rotation.z += uranusRotation;
    ariel.rotation.z += uranusRotation;
    umbriel.rotation.z += uranusRotation;
    titania.rotation.z += uranusRotation;
    oberon.rotation.z += uranusRotation;

    proteus.rotation.y += neptuneRotation;
    triton.rotation.y += neptuneRotation;

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

function createRing(radius,ringWidth,distanceToSun,color,inverted)
{
  var ringGeometry = new THREE.TorusGeometry( radius, ringWidth, 2, 200 );
  var material = new THREE.MeshBasicMaterial( { color: color } );
  var ring = new THREE.Mesh( ringGeometry, material );
  if(!inverted) {
      ring.rotation.x = Math.PI / 2;
  }
  ring.position.x = distanceToSun;
  return ring;
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

    // // Add a directional light to show off the object
    // directionalLight = new THREE.DirectionalLight( 0xffffff, 2);
    // directionalLight.position.set(.5, 0, 1);
    // root.add(directionalLight);
    //
    // Add an Ambient Light
    ambientLight = new THREE.AmbientLight ( 0x888888 );
    root.add(ambientLight);


    var light = new THREE.PointLight( 0xffffff, 1000, 100 );
    light.position.set( 100, 100, 100 );
    light.castShadow = true;
    light.shadow.bias = 0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    root.add( light );


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

    // Creathe the Moon Groups
    phobosGroup = new THREE.Object3D;
    deimosGroup = new THREE.Object3D;
    ioGroup = new THREE.Object3D;
    europaGroup = new THREE.Object3D;
    ganymedeGroup = new THREE.Object3D;
    callistoGroup = new THREE.Object3D;
    mimasGroup = new THREE.Object3D;
    enceladusGroup = new THREE.Object3D;
    tethysGroup = new THREE.Object3D;
    dioneGroup = new THREE.Object3D;
    rheaGroup = new THREE.Object3D;
    titanGroup = new THREE.Object3D;
    hyperionGroup = new THREE.Object3D;
    iapetusGroup = new THREE.Object3D;
    puckGroup = new THREE.Object3D;
    mirandaGroup = new THREE.Object3D;
    arielGroup = new THREE.Object3D;
    umbrielGroup = new THREE.Object3D;
    titaniaGroup = new THREE.Object3D;
    oberonGroup = new THREE.Object3D;
    proteusGroup = new THREE.Object3D;
    tritonGroup = new THREE.Object3D;






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


    // Create the Rings radius,ringWidth,distanceToSun,inverted
    saturnRing = createRing(saturnRadius+50,10,saturnDistanceToSun,0xffe18e);
    saturnGroup.add(saturnRing);
    uranusRing = createRing(uranusRadius+50,2,uranusDistanceToSun,0xffffff,true);
    uranusGroup.add(uranusRing);
    neptuneRing = createRing(neptuneRadius+40,4,neptuneDistanceToSun,0xffffff);
    neptuneGroup.add(neptuneRing);

    // Earth Moon
    earthMoon = createPlanet("moon",earthMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    earthMoon.position.x = 15;

    // Mars Moons
    phobos = createPlanet("phobos",marsMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    phobos.position.x = 25;
    deimos = createPlanet("deimos",marsMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    deimos.position.x = 10;

    // Jupiter Moons
    io = createPlanet("io",jupiterMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    io.position.x = 100;
    europa = createPlanet("europa",jupiterMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    europa.position.x = 130;
    ganymede = createPlanet("ganymede",jupiterMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    ganymede.position.x = 200;
    callisto = createPlanet("callisto",jupiterMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    callisto.position.x = 260;

    // Saturn Moons
    mimas = createPlanet("mimas",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    mimas.position.x = 150;
    enceladus = createPlanet("enceladus",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    enceladus.position.x = 165;
    tethys = createPlanet("tethys",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    tethys.position.x = 180;
    dione = createPlanet("dione",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    dione.position.x = 200;
    rhea = createPlanet("rhea",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    rhea.position.x = 250;
    titan = createPlanet("titan",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    titan.position.x = 350;
    hyperion = createPlanet("hyperion",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    hyperion.position.x = 370;
    iapetus = createPlanet("iapetus",saturnMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    iapetus.position.x = 420;

    // Uranus Moons
    puck = createPlanet("puck",uranusMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    puck.position.y = 110;
    miranda = createPlanet("miranda",uranusMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    miranda.position.y = 130;
    ariel = createPlanet("ariel",uranusMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    ariel.position.y = 150;
    umbriel = createPlanet("umbriel",uranusMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    umbriel.position.y = 170;
    titania = createPlanet("titania",uranusMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    titania.position.y = 220;
    oberon = createPlanet("oberon",uranusMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    oberon.position.y = 250;

    // Neptune Moons
    proteus = createPlanet("proteus",neptuneMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    proteus.position.x = 100;
    triton = createPlanet("triton",neptuneMoonRadius,50,50,moonMapUrl,moonBumpMapUrl);
    triton.position.x = 160;



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


    earth.add(earthMoon);

    phobosGroup.add(phobos);
    deimosGroup.add(deimos);
    mars.add(phobosGroup);
    mars.add(deimosGroup);

    ioGroup.add(io);
    europaGroup.add(europa);
    ganymedeGroup.add(ganymede);
    callistoGroup.add(callisto);
    jupiter.add(ioGroup);
    jupiter.add(europaGroup);
    jupiter.add(ganymedeGroup);
    jupiter.add(callistoGroup);

    mimasGroup.add(mimas);
    enceladusGroup.add(enceladus);
    tethysGroup.add(tethys);
    dioneGroup.add(dione);
    rheaGroup.add(rhea);
    titanGroup.add(titan);
    hyperionGroup.add(hyperion);
    iapetusGroup.add(iapetus);
    saturn.add(mimasGroup);
    saturn.add(enceladusGroup);
    saturn.add(tethysGroup);
    saturn.add(dioneGroup);
    saturn.add(rheaGroup);
    saturn.add(titanGroup);
    saturn.add(hyperionGroup);
    saturn.add(iapetusGroup);

    puckGroup.add(puck);
    uranus.add(puckGroup);
    mirandaGroup.add(miranda);
    uranus.add(mirandaGroup);
    arielGroup.add(ariel);
    uranus.add(arielGroup);
    umbrielGroup.add(umbriel);
    uranus.add(umbrielGroup);
    titaniaGroup.add(titania);
    uranus.add(titaniaGroup);
    oberonGroup.add(oberon);
    uranus.add(oberonGroup);

    proteusGroup.add(proteus);
    neptune.add(proteusGroup);
    tritonGroup.add(triton);
    neptune.add(tritonGroup);


    mercuryGroup.add(mercuryOrbit);
    venusGroup.add(venusOrbit);
    earthGroup.add(earthOrbit);
    marsGroup.add(marsOrbit);
    jupiterGroup.add(jupiterOrbit);
    saturnGroup.add(saturnOrbit);
    uranusGroup.add(uranusOrbit);
    neptuneGroup.add(neptuneOrbit);
    plutoGroup.add(plutoOrbit);





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
