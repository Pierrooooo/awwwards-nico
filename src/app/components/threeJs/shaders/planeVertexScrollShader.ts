export const planeVertexScrollShader = `
    uniform float uScrollProgress;
    varying vec2 vUv;

    void main() {
        vUv = uv;

        float deformation = sin(uv.y * 10.0 + uScrollProgress * 10.0) * 0.1;

        vec3 newPosition = position;
        newPosition.z += deformation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`