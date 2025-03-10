export const planeVertexScrollShader = `
    uniform float uScrollProgress;
    varying vec2 vUv;

    void main() {
    vUv = uv;

    vec3 newPosition = position;

    // Appliquer la déformation seulement lorsque uScrollProgress > 0
    float deformation = -pow(newPosition.x, 2.0) * 0.005 * uScrollProgress;
    newPosition.y += deformation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`;

// export const planeVertexScrollShader = `
//     uniform float uScrollProgress;
//     uniform float uScrollSpeed;
//     varying vec2 vUv;

//     void main() {
//         vUv = uv;
        
//         vec3 newPosition = position;

//         if (uScrollSpeed == 0) {
//         } else {
//             float deformation = -pow(newPosition.x, 2.0) * 0.005 * uScrollProgress;
//             newPosition.y += deformation;
//         }

//         gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//     }


// `;
