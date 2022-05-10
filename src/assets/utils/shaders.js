import * as THREE from 'three'
const vertexShader = `
		varying vec3 vPosition;
		varying vec2 vUv;
		void main() { 
			vUv = uv; 
			vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
			gl_Position = projectionMatrix * mvPosition;
		}
		`;
const getMesh = (fragmentShader) => {
    console.log(window.iChannel0)
    const geometry = new THREE.PlaneGeometry(20, 20);
    const material = new THREE.ShaderMaterial({
        uniforms: {
            iTime: {
                value: 0
            },
            iResolution: {
                value: new THREE.Vector2(1900, 1900)
            },
            iChannel0: {
                value: window.iChannel0
            },
        },
        side: 2,
        depthWrite: false,
        transparent: true,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    })
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    return plane;
}
