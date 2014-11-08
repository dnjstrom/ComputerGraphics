#version 130

in vec3		position;
in vec3		color;
in vec2		texCoordIn; // incoming texcoord from the texcoord array

out vec3	outColor;
out vec2	texCoord; // outgoing interpolated texcoord to fragshader

uniform mat4 projectionMatrix; 

void main() 
{
	gl_Position = projectionMatrix * vec4(position, 1);
	outColor = color;
	texCoord = texCoordIn;
}