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
    flecha = new THREE.Object3D();
      const material = new THREE.MeshNormalMaterial();
    let geometriaCilindro = new THREE.CylinderGeometry(1, 1, 10, 32); 
    let cilindro = new THREE.Mesh(geometriaCilindro, material);
    cilindro.position.y = 5; // Posicionar el cilindro sobre el origen
    flecha.add(cilindro); // Añadir el cilindro al nodo flecha
    let geometriaCono = new THREE.ConeGeometry(2, 4, 32); 
    let cono = new THREE.Mesh(geometriaCono, material);
    cono.position.y = 10; // Posicionar el cono en la parte superior del cilindro
    flecha.add(cono); // Añadir el cono al nodo flecha
    scene.add(flecha)
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
