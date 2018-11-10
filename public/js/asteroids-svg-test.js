/**
 * Asteroids font paths found at:
 * @see https://github.com/osresearch/vst/blob/master/teensyv/asteroids_font.c
 */

const asteroids_font = {
	'0': 'M0 0 L8 0 L8 12 L0 12 L0 0 L8 12',
	'1': 'M4 0 L4 12 L3 10',
	'2': 'M0 12 L8 12 L8 7 L0 5 L0 0 L8 0',
	'3': 'M0 12 L8 12 L8 0 L0 0 M0 6 L8 6',
	'4': 'M0 12 L0 6 L8 6 M8 12 L8 0',
	'5': 'M0 0 L8 0 L8 6 L0 7 L0 12 L8 12',
	'6': 'M0 12 L0 0 L8 0 L8 5 L0 7',
	'7': 'M0 12 L8 12 L8 6 L4 0',
	'8': 'M0 0 L8 0 L8 12 L0 12 L0 0 M0 6 L8 6 ',
	'9': 'M8 0 L8 12 L0 12 L0 7 L8 5',
	' ': '',
	'.': 'M3 0 L4 0',
	',': 'M2 0 L4 2',
	'-': 'M2 6 L6 6',
	'+': 'M1 6 L7 6 M4 9 L4 3',
	'!': 'M4 0 L3 2 L5 2 L4 0 M4 4 L4 12',
	'#': 'M0 4 L8 4 L6 2 L6 10 L8 8 L0 8 L2 10 L2 2',
	'^': 'M2 6 L4 12 L6 6',
	'=': 'M1 4 L7 4 M1 8 L7 8',
	'*': 'M0 0 L4 12 L8 0 L0 8 L8 8 L0 0',
	'_': 'M0 0 L8 0',
	'/': 'M0 0 L8 12',
	'\\': 'M0 12 L8 0',
	'@': 'M8 4 L4 0 L0 4 L0 8 L4 12 L8 8 L4 4 L3 6',
	'$': 'M6 2 L2 6 L6 10 M4 12 L4 0',
	'&': 'M8 0 L4 12 L8 8 L0 4 L4 0 L8 4',
	'': 'M6 0 L2 0 L2 12 L6 12',
	']': 'M2 0 L6 0 L6 12 L2 12',
	'(': 'M6 0 L2 4 L2 8 L6 12',
	')': 'M2 0 L6 4 L6 8 L2 12',
	'{': 'M6 0 L4 2 L4 10 L6 12 M2 6 L4 6',
	'}': 'M4 0 L6 2 L6 10 L4 12 M6 6 L8 6',
	'%': 'M0 0 L8 12 M2 10 L2 8 M6 4 L6 2',
	'<': 'M6 0 L2 6 L6 12',
	'>': 'M2 0 L6 6 L2 12',
	'|': 'M4 0 L4 5 M4 6 L4 12',
	':': 'M4 9 L4 7 M4 5 L4 3',
	';': 'M4 9 L4 7 M4 5 L1 2',
	'"': 'M2 10 L2 6 M6 10 L6 6',
	'\'': 'M2 6 L6 10',
	'`': 'M2 10 L6 6',
	'~': 'M0 4 L2 8 L6 4 L8 8',
	'?': 'M0 8 L4 12 L8 8 L4 4 M4 1 L4 0',
	'A': 'M0 0 L0 8 L4 12 L8 8 L8 0 M0 4 L8 4',
	'B': 'M0 0 L0 12 L4 12 L8 10 L4 6 L8 2 L4 0 L0 0',
	'C': 'M8 0 L0 0 L0 12 L8 12',
	'D': 'M0 0 L0 12 L4 12 L8 8 L8 4 L4 0 L0 0',
	'E': 'M8 0 L0 0 L0 12 L8 12 M0 6 L6 6',
	'F': 'M0 0 L0 12 L8 12 M0 6 L6 6',
	'G': 'M6 6 L8 4 L8 0 L0 0 L0 12 L8 12',
	'H': 'M0 0 L0 12 M0 6 L8 6 M8 12 L8 0',
	'I': 'M0 0 L8 0 M4 0 L4 12 M0 12 L8 12',
	'J': 'M0 4 L4 0 L8 0 L8 12',
	'K': 'M0 0 L0 12 M8 12 L0 6 L6 0',
	'L': 'M8 0 L0 0 L0 12',
	'M': 'M0 0 L0 12 L4 8 L8 12 L8 0',
	'N': 'M0 0 L0 12 L8 0 L8 12',
	'O': 'M0 0 L0 12 L8 12 L8 0 L0 0',
	'P': 'M0 0 L0 12 L8 12 L8 6 L0 5',
	'Q': 'M0 0 L0 12 L8 12 L8 4 L0 0 M4 4 L8 0',
	'R': 'M0 0 L0 12 L8 12 L8 6 L0 5 M4 5 L8 0',
	'S': 'M0 2 L2 0 L8 0 L8 5 L0 7 L0 12 L6 12 L8 10',
	'T': 'M0 12 L8 12 M4 12 L4 0',
	'U': 'M0 12 L0 2 L4 0 L8 2 L8 12',
	'V': 'M0 12 L4 0 L8 12',
	'W': 'M0 12 L2 0 L4 4 L6 0 L8 12',
	'X': 'M0 0 L8 12 M0 12 L8 0',
	'Y': 'M0 12 L4 6 L8 12 M4 6 L4 0',
	'Z': 'M0 12 L8 12 L0 0 L8 0 M2 6 L6 6',
};

document.addEventListener('DOMContentLoaded', function() {
  const rootEl = document.getElementById('asteroids');

  // invert vertical
  Object.keys(asteroids_font).forEach(key => {
    let path = asteroids_font[key].split(' ');
    path = path.map(node => {
      const first = node.substring(0, 1);
      if ('LM'.indexOf(first) === -1) {
        node = 12 - Number.parseInt(node, 10);
      }
      return node;
    });
    asteroids_font[key] = path.join(' ');
  });

  console.log(JSON.stringify(asteroids_font));
  
  // create svgs
  Object.keys(asteroids_font).forEach(key => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('style', 'border: 1px solid #ddf');
    svg.setAttribute('viewBox', '0 0 8 12');
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', 'blue');
    path.setAttribute('fill', 'none');
    path.setAttribute('d', asteroids_font[key]);  
    path.setAttribute('stroke-width', 1);  
    path.setAttribute('opacity', 1);  

    svg.appendChild(path);
    rootEl.appendChild(svg);
  });
});
