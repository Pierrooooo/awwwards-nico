export const planeVertexShader = `
    uniform float uOffsetZ;
    uniform float uPreviousOffsetZ;
    uniform float uTime;
    uniform float uStartTime;
    varying vec2 vUv;

    void main() {
        vUv = uv;
        float localTime = max(0.0, uTime - uStartTime);
        float delayFactor = smoothstep(0.0, 0.7, (localTime - (vUv.x + (1.0 - vUv.y)) * 0.3));
        float displacement = mix(uPreviousOffsetZ, uOffsetZ, delayFactor);
        vec3 transformed = position;
        transformed.z -= displacement;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
    }
`;