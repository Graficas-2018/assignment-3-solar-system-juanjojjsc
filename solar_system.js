
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
    mercury.position.x = 30;
    venus = createPlanet("venus",5,50,50,venusMapUrl,venusBumpMapUrl);
    venus.position.x = 60;
    earth = createPlanet("earth",8,50,50,earthMapUrl,earthBumpMapUrl);
    earth.position.x = 100;
    mars = createPlanet("mars",6,50,50,marsMapUrl,marsBumpMapUrl);
    mars.position.x = 160;
    jupiter = createPlanet("jupiter",15,50,50,jupiterMapUrl);
    jupiter.position.x = 220;
    saturn = createPlanet("saturn",11,50,50,saturnMapUrl);
    saturn.position.x = 300;
    uranus = createPlanet("uranus",7,50,50,uranusMapUrl);
    uranus.position.x = 350;
    neptune = createPlanet("neptune",5,50,50,neptuneMapUrl);
    neptune.position.x = 400;
    pluto = createPlanet("pluto",2,50,50,plutoMapUrl,plutoBumpMapUrl);
    pluto.position.x = 444;



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
