/**
 * @typedef {import('./dep/three.js')} THREE
 */

const time = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const tau = 6.28318530717958647692528676655900577;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// const fontLoader = new THREE.FontLoader();


/**
 * Full-screen textured quad shader
 */

const copyShader = {

    uniforms: {

        'tDiffuse': { value: null },
        'opacity': { value: 1.0 }

    },

    vertexShader: /* glsl */`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

    fragmentShader: /* glsl */`
		uniform float opacity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;
		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;
		}`

};



// const composer = new THREE.EffectComposer(renderer);
// composer.addPass(copyShader);

function animate() {
    requestAnimationFrame(animate);

    const dt = time.getDelta();

    cube.rotation.x += 0.60 * dt;
    cube.rotation.y += 0.60 * dt;

    renderer.render(scene, camera);
};

animate();