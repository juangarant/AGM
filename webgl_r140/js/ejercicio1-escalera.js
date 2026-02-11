// Variables globales que van siempre
var renderer, scene, camera;
var cameraControls;
var angulo = -0.01;

// 1-inicializa 
init();
// 2-Crea una escena
loadScene();
// 3-renderiza
render();

function init()
{
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( new THREE.Color(0xFFFFFF) );
  document.getElementById('container').appendChild( renderer.domElement );

  scene = new THREE.Scene();

  var aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera( 50, aspectRatio , 0.1, 100 );
  camera.position.set( 2, 2, 4 );

  cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
  cameraControls.target.set( 0, 0, 0 );

  // Luz para ver materiales
  const light = new THREE.DirectionalLight(0xffffff, 1.0);
  light.position.set(3, 4, 2);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x666666));

  window.addEventListener('resize', updateAspectRatio );
}


function loadScene()
{
  // 1. Definir dimensiones de los peldaños
  const peldañoAncho = 2;
  const peldañoAlto = 0.2;
  const peldañoFondo = 0.5;
  const numPeldaños = 10;

  // 2. Crear la geometría y el material común
  const geomPeldaño = new THREE.BoxGeometry(peldañoAncho, peldañoAlto, peldañoFondo);
  const material = new THREE.MeshNormalMaterial();

  // 3. Bucle para crear y posicionar cada peldaño
  for (let i = 0; i < numPeldaños; i++) {
    const peldaño = new THREE.Mesh(geomPeldaño, material);
    
    // Posicionamiento: 
    // Y (altura): sube una unidad de 'peldañoAlto' por cada peldaño
    // Z (profundidad): avanza una unidad de 'peldañoFondo' por cada peldaño
    let y = i * peldañoAlto;
    let z = -i * peldañoFondo;
    
    peldaño.position.set(0, y, z);
    scene.add(peldaño);
  }

  // 4. Añadir el piso
  const geomPiso = new THREE.PlaneGeometry(10, 10);
  const materialPiso = new THREE.MeshNormalMaterial();
  const piso = new THREE.Mesh(geomPiso, materialPiso);
  
  // Rotar el piso para que sea horizontal y bajarlo un poco
  piso.rotateX(-Math.PI / 2);
  piso.position.y = -peldañoAlto / 2;
  
  scene.add(piso);
}


function updateAspectRatio()
{
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

function update()
{
  cameraControls.update();
}

function render()
{
  requestAnimationFrame( render );
  update();
  renderer.render( scene, camera );
}
