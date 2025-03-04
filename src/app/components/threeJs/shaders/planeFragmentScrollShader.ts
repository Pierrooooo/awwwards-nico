export const planeFragmentScrollShader = `
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
        vec4 textureColor = texture2D(uTexture, vUv);

        float distortion = sin(vUv.y * 10.0) * 10;
        textureColor.rgb += distortion;

        gl_FragColor = textureColor;
    }
`