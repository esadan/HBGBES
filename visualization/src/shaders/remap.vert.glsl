#version 300 es

layout(std140) uniform;

layout(location=0) in vec4 a;

uniform ConfigUniforms {
    float time;
    float daniel0;
    float daniel1;
};

out vec3 vColor;

void main() {
    vec4 p0 = vec4(2.0 * a.y - 1.0, 2.0 * a.x - 1.0, 0.0, 1.0);
    vec4 p1 = vec4(2.0 * a.z - 1.0, 2.0 * a.w - 1.0, 0.0, 1.0);
    
    //float s = 0.5 + sin(time / 1900.0) / 2.0;
    float s = smoothstep(daniel0, daniel1, time);
    vColor = vec3(a.x, a.y, a.z);

    gl_Position = mix(p0, p1, s);
    gl_PointSize = 2.0;
}