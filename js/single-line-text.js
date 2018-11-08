let scene, camera, renderer;
let textGroup;

function initWorld() {
  const {Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, Group} = THREE;

  let rootEl = document.getElementById('canvas-container');
  let rect = rootEl.getBoundingClientRect();

  scene = new Scene();
  camera = new PerspectiveCamera( 75, rect.width / rect.height, 0.1, 1000 );

  renderer = new WebGLRenderer();
  renderer.setSize( rect.width, rect.height );
  renderer.setClearColor(0x000000);
  rootEl.appendChild( renderer.domElement );

  const light = new DirectionalLight(0xffffff, 1.5);
  light.position.set(0, 0, 1);
  scene.add(light);

  textGroup = new Group();
  scene.add(textGroup);

  camera.position.z = 50;
}

function animate() {
  requestAnimationFrame(animate);
  textGroup.rotation.x += 0.003 * 2;
  textGroup.rotation.y += 0.005 * 2;
  textGroup.rotation.z += 0.004 * 2;
  renderer.render( scene, camera );
}

document.addEventListener('DOMContentLoaded', function() {
  fetch('../json/asteroids.json')
    .then(response => response.json())
    .then(json => {
      initWorld();
      write(json, 'SINGLE LINE TEXT IN 3D');
      animate();
    });
});

function write(fontData, str) {
  const {LineBasicMaterial, Geometry, BufferGeometry, Object3D, Color, Line, Vector3, Group} = THREE;

  const lineMaterial = new LineBasicMaterial({
    color: new Color( 0x00ff00 ),
    linewidth: 3,
  });

  const lineGroup = new Group();
  textGroup.add(lineGroup);

  let numRenderedChars = 0;

  for (let i = 0, n = str.length; i < n; i++) {
    const char = str.charAt(i);
    const svgPath = fontData.chars[char];

    if (svgPath) {
      numRenderedChars++;

      const svgSubPaths = svgPath.split('M');
      svgSubPaths.shift();
      
      svgSubPaths.forEach(svgSubPath => {
        const path = parsePathNode('M' + svgSubPath);
        const points = path.getPoints();

        const geometry = new BufferGeometry().setFromPoints( points );
        const line = new Line(geometry, lineMaterial);
        line.translateX((fontData.viewBox.width + fontData.spacing) * numRenderedChars);
        line.rotateX(-Math.PI);

        lineGroup.add(line);
      });
    }
  }

  // center line of text
  lineGroup.translateX((numRenderedChars * (fontData.viewBox.width + fontData.spacing)) / -2);
}

/**
 * From here the code is taken from threeJS's SVGLoader.
 */

function parsePathNode(pathString, style) {
  const path = new THREE.Path();
  const point = new THREE.Vector2();
  const control = new THREE.Vector2();
  const firstPoint = new THREE.Vector2();
  const commands = pathString.match( /[a-df-z][^a-df-z]*/ig );

  let isFirstPoint = true;
  let doSetFirstPoint = false;

  commands.forEach(command => {
    const type = command.charAt(0);
		const data = command.substr(1).trim();
    
    doSetFirstPoint = isFirstPoint;
    isFirstPoint = false;
    let numbers;

    switch ( type ) {

      case 'M':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 2 ) {
          point.x = numbers[ j + 0 ];
          point.y = numbers[ j + 1 ];
          control.x = point.x;
          control.y = point.y;
          if ( j === 0 ) {
            path.moveTo( point.x, point.y );
          } else {
            path.lineTo( point.x, point.y );
          }
        }
        break;

      case 'L':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 2 ) {
          point.x = numbers[ j + 0 ];
          point.y = numbers[ j + 1 ];
          control.x = point.x;
          control.y = point.y;
          path.lineTo( point.x, point.y );
        }
        break;

      case 'Z':
      case 'z':
        path.currentPath.autoClose = true;
        if ( path.currentPath.curves.length > 0 ) {
          // Reset point to beginning of Path
          point.copy( firstPoint );
          path.currentPath.currentPoint.copy( point );
          isFirstPoint = true;
        }
        break;

      default:
        console.warn( command );

    }

    if ( doSetFirstPoint ) {
      firstPoint.copy( point );
      doSetFirstPoint = false;
    }
  });

  return path;
}

function parseFloats( string ) {
  var array = string.split( /[\s,]+|(?=\s?[+\-])/ );
  for ( var i = 0; i < array.length; i ++ ) {
    var number = array[ i ];
    // Handle values like 48.6037.7.8
    // TODO Find a regex for this
    if ( number.indexOf( '.' ) !== number.lastIndexOf( '.' ) ) {
      var split = number.split( '.' );
      for ( var s = 2; s < split.length; s ++ ) {
        array.splice( i + s - 1, 0, '0.' + split[ s ] );
      }
    }
    array[ i ] = parseFloat( number );
  }
  return array;
}
