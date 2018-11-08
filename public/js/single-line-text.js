let scene, camera, renderer;
let text;
let fontData;
let textGroup;

function initWorld() {
  const {Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, Group} = THREE;

  scene = new Scene();
  camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  renderer = new WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0x000000);
  document.body.appendChild( renderer.domElement );

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
      fontData = json;
      initWorld();
      write('HIJKLM');
      animate();
    });
});

function write(str) {
  const {LineBasicMaterial, Geometry, BufferGeometry, Object3D, Color, Line, Vector3} = THREE;

  const lineMaterial = new LineBasicMaterial({
    color: new Color( 0x00ff00 ),
    linewidth: 3,
  });

  for (let i = 0, n = str.length; i < n; i++) {
    const char = str.charAt(i);
    const svgPath = fontData.chars[char];
    const svgSubPaths = svgPath.split('M');
    svgSubPaths.shift();
    
    svgSubPaths.forEach(svgSubPath => {
      const path = parsePathNode('M' + svgSubPath);
      const points = path.getPoints();

      const geometry = new BufferGeometry().setFromPoints( points );
      const line = new Line(geometry, lineMaterial);
      line.translateX((fontData.viewBox.width + fontData.spacing) * i);
      line.rotateX(-Math.PI);

      textGroup.add(line);
    });
  }
}

function parsePathNode(d, style) {
  const path = new THREE.Path();
  // const path = new THREE.ShapePath();
  // path.color.setStyle( 0x6666ff );

  const point = new THREE.Vector2();
  const control = new THREE.Vector2();

  const firstPoint = new THREE.Vector2();
  let isFirstPoint = true;
  let doSetFirstPoint = false;
  // const d = fontData.chars[char];
  const commands = d.match( /[a-df-z][^a-df-z]*/ig );

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

      case 'H':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j ++ ) {
          point.x = numbers[ j ];
          control.x = point.x;
          control.y = point.y;
          path.lineTo( point.x, point.y );
        }
        break;

      case 'V':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j ++ ) {
          point.y = numbers[ j ];
          control.x = point.x;
          control.y = point.y;
          path.lineTo( point.x, point.y );
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

      case 'C':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 6 ) {
          path.bezierCurveTo(
            numbers[ j + 0 ],
            numbers[ j + 1 ],
            numbers[ j + 2 ],
            numbers[ j + 3 ],
            numbers[ j + 4 ],
            numbers[ j + 5 ]
          );
          control.x = numbers[ j + 2 ];
          control.y = numbers[ j + 3 ];
          point.x = numbers[ j + 4 ];
          point.y = numbers[ j + 5 ];
        }
        break;

      case 'S':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 4 ) {
          path.bezierCurveTo(
            getReflection( point.x, control.x ),
            getReflection( point.y, control.y ),
            numbers[ j + 0 ],
            numbers[ j + 1 ],
            numbers[ j + 2 ],
            numbers[ j + 3 ]
          );
          control.x = numbers[ j + 0 ];
          control.y = numbers[ j + 1 ];
          point.x = numbers[ j + 2 ];
          point.y = numbers[ j + 3 ];
        }
        break;

      case 'Q':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 4 ) {
          path.quadraticCurveTo(
            numbers[ j + 0 ],
            numbers[ j + 1 ],
            numbers[ j + 2 ],
            numbers[ j + 3 ]
          );
          control.x = numbers[ j + 0 ];
          control.y = numbers[ j + 1 ];
          point.x = numbers[ j + 2 ];
          point.y = numbers[ j + 3 ];
        }
        break;

      case 'T':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 2 ) {
          let rx = getReflection( point.x, control.x );
          let ry = getReflection( point.y, control.y );
          path.quadraticCurveTo(
            rx,
            ry,
            numbers[ j + 0 ],
            numbers[ j + 1 ]
          );
          control.x = rx;
          control.y = ry;
          point.x = numbers[ j + 0 ];
          point.y = numbers[ j + 1 ];
        }
        break;

      case 'A':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 7 ) {
          let start = point.clone();
          point.x = numbers[ j + 5 ];
          point.y = numbers[ j + 6 ];
          control.x = point.x;
          control.y = point.y;
          parseArcCommand(
            path, numbers[ j ], numbers[ j + 1 ], numbers[ j + 2 ], numbers[ j + 3 ], numbers[ j + 4 ], start, point
          );
        }
        break;

      //

      case 'm':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 2 ) {
          point.x += numbers[ j + 0 ];
          point.y += numbers[ j + 1 ];
          control.x = point.x;
          control.y = point.y;
          if ( j === 0 ) {
            path.moveTo( point.x, point.y );
          } else {
            path.lineTo( point.x, point.y );
          }
        }
        break;

      case 'h':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j ++ ) {
          point.x += numbers[ j ];
          control.x = point.x;
          control.y = point.y;
          path.lineTo( point.x, point.y );
        }
        break;

      case 'v':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j ++ ) {
          point.y += numbers[ j ];
          control.x = point.x;
          control.y = point.y;
          path.lineTo( point.x, point.y );
        }
        break;

      case 'l':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 2 ) {
          point.x += numbers[ j + 0 ];
          point.y += numbers[ j + 1 ];
          control.x = point.x;
          control.y = point.y;
          path.lineTo( point.x, point.y );
        }
        break;

      case 'c':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 6 ) {
          path.bezierCurveTo(
            point.x + numbers[ j + 0 ],
            point.y + numbers[ j + 1 ],
            point.x + numbers[ j + 2 ],
            point.y + numbers[ j + 3 ],
            point.x + numbers[ j + 4 ],
            point.y + numbers[ j + 5 ]
          );
          control.x = point.x + numbers[ j + 2 ];
          control.y = point.y + numbers[ j + 3 ];
          point.x += numbers[ j + 4 ];
          point.y += numbers[ j + 5 ];
        }
        break;

      case 's':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 4 ) {
          path.bezierCurveTo(
            getReflection( point.x, control.x ),
            getReflection( point.y, control.y ),
            point.x + numbers[ j + 0 ],
            point.y + numbers[ j + 1 ],
            point.x + numbers[ j + 2 ],
            point.y + numbers[ j + 3 ]
          );
          control.x = point.x + numbers[ j + 0 ];
          control.y = point.y + numbers[ j + 1 ];
          point.x += numbers[ j + 2 ];
          point.y += numbers[ j + 3 ];
        }
        break;

      case 'q':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 4 ) {
          path.quadraticCurveTo(
            point.x + numbers[ j + 0 ],
            point.y + numbers[ j + 1 ],
            point.x + numbers[ j + 2 ],
            point.y + numbers[ j + 3 ]
          );
          control.x = point.x + numbers[ j + 0 ];
          control.y = point.y + numbers[ j + 1 ];
          point.x += numbers[ j + 2 ];
          point.y += numbers[ j + 3 ];
        }
        break;

      case 't':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 2 ) {
          let rx = getReflection( point.x, control.x );
          let ry = getReflection( point.y, control.y );
          path.quadraticCurveTo(
            rx,
            ry,
            point.x + numbers[ j + 0 ],
            point.y + numbers[ j + 1 ]
          );
          control.x = rx;
          control.y = ry;
          point.x = point.x + numbers[ j + 0 ];
          point.y = point.y + numbers[ j + 1 ];
        }
        break;

      case 'a':
        numbers = parseFloats( data );
        for ( let j = 0, jl = numbers.length; j < jl; j += 7 ) {
          let start = point.clone();
          point.x += numbers[ j + 5 ];
          point.y += numbers[ j + 6 ];
          control.x = point.x;
          control.y = point.y;
          parseArcCommand(
            path, numbers[ j ], numbers[ j + 1 ], numbers[ j + 2 ], numbers[ j + 3 ], numbers[ j + 4 ], start, point
          );
        }
        break;

      //

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

    // console.log( type, parseFloats( data ), parseFloats( data ).length  )

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