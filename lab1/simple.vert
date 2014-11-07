#version 130


in  vec3 position;
in  vec3 color;
out vec3 outColor;

void main() 
{
	outColor = color;
	gl_Position = vec4(position,1);
}