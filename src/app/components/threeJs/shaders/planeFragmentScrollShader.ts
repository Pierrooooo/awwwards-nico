export const planeFragmentScrollShader = `
    varying vec2 vUv;
    uniform sampler2D uTexture;

    void main() {
        // Récupération de la couleur de la texture en fonction des UV
        vec4 color = texture2D(uTexture, vUv);

        // Appliquer directement la couleur sans animation ni effet dynamique
        gl_FragColor = color;
    }
`;