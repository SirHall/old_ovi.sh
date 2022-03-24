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
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        ratio: { value: window.innerWidth / window.innerHeight }
    },

    vertexShader: `
        varying vec2 vUv;

        void main()
        {
            vUv = uv;
            gl_Position = vec4( position, 1.0 );
        }
    `,


    // varying vec2 vUv;

    // uniform float time;

    fragmentShader: `
    #define M_PI 3.1415926535897932384626433832795

    #ifdef GL_FRAGMENT_PRECISION_HIGH
       precision highp float;
    #else
       precision mediump float;
    #endif
       precision mediump int;
    
    // uniform sampler2D gfxTex1;
    uniform float     time;
    uniform vec2      resolution;
    uniform float     ratio;
    
    varying vec2 vUv;
    
    float logInterp(vec2 pos, float i, float iter)
    {
        float modulus = sqrt(pos.x * pos.x + pos.y * pos.y);
        return i + 1.0 - (log2(log2(modulus))) / 2.0;
    }
    
    vec3 hsv2rgb(vec3 c)
    {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }
    
    void main()
    {
        float scale       = 4.0;
        int   iter        = 500;
        float iterRate    = 5.0;
        float maxZoomTime = 45.0;
        iter              = int(mod(time * iterRate, float(iter)));
        scale             = scale * scale;
    
        vec2 z = vec2(0.0);
    
        float zoomTime = mod(time, maxZoomTime) + 1.0;
        vec2  uv       = vUv - 0.5;
        vec2  c = (uv * vec2(ratio, 1.0)) / (pow(zoomTime, zoomTime / 10.0) / 100.0) +
                 vec2(-0.746, 0.1481643);
    
        int i;
    
        for (i = 1; i <= iter; i++)
        {
            float x = (z.x * z.x - z.y * z.y) + c.x;
            float y = (z.y * z.x + z.x * z.y) + c.y;
    
            if ((x * x + y * x) > scale)
                break;
            z.x = x;
            z.y = y;
        }
        // logInterp(z, float(i), float(iter))
        // sqrt(z.x * z.x + z.y * z.y)
        gl_FragColor = vec4((i >= iter)
                         ? vec3(0.0)
                        
                         // : mix(vec3(0.0, 0.0, 0.0),
                         //       vec3(abs(sin(3.0 * time / 10.0)) / 100.0, abs(cos(5.0 * time /
                         //       10.0)) / 100.0,
                         //            abs(sin(7.0 * time / 10.0)) / 100.0),
                         //       vec3(logInterp(z, float(i), float(iter)))),
                         : hsv2rgb(vec3(-time * -0.1, 0.0, 0.0) +
                                   mix(vec3(0.0, 1.0, 1.0), vec3(0.01, 1.0, 1.0),
                                       vec3(logInterp(z, float(i*2), float(iter))))),
                     1.0);
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