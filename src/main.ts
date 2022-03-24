import * as THREE from 'three';

const time = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.01, 1.0);
camera.position.z = 0.5;
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const tau = 6.28318530717958647692528676655900577;

const renderer = new THREE.WebGLRenderer({
    powerPreference: "high-performance",
    antialias: false,
    stencil: false,
    depth: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(2.0, 2.0);


const material = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },

    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            vUv = uv;
            gl_Position = vec4( position, 1.0 );
        }
    `,


    fragmentShader: `
        varying vec2 vUv;

        uniform float time;

        void main()	{

            gl_FragColor = vec4(1.0);

        }

    `,
});


const quad = new THREE.Mesh(geometry, material);
scene.add(quad);

// const fontLoader = new THREE.FontLoader();




function animate() {
    requestAnimationFrame(animate);

    const dt = time.getDelta();

    // cube.rotation.x += 0.60 * dt;
    // cube.rotation.y += 0.60 * dt;

    material.uniforms.time.value = performance.now() / 1000.0;

    renderer.render(scene, camera);
};

animate();