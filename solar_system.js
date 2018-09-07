
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
var sunMapUrl = "./images/earthmap.jpg";
var textureMap = null;
var sunBumpMapUrl = "./images/earthbump.jpg";
var bumpMap = null;
var mapUrl = "./images/earthmap.jpg";
var bgUrl = "./images/milkyway.jpg";

function animate() {

    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotate the sphere group about its Y axis
    group.rotation.y += angle;


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
      materials[material] = new THREE.MeshPhongMaterial({ map: planetMap, bumpMap: planetBumpMap, bumpScale: 0.06 });
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
    sun = createPlanet("sun",2,50,50,sunMapUrl,sunBumpMapUrl);



    // Add the mesh to our group
    group.add( sun );



    // Now add the group to our scene
    scene.add( root );
}
