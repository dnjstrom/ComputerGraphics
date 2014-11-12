#version 130

in vec3		position;
in vec3		color;
out vec4	outColor;
in	vec2	texCoordIn;	// incoming texcoord from the texcoord array
out	vec2	texCoord;	// outgoing interpolated texcoord to fragshader

uniform mat4 modelViewMatrix;
uniform mat4 normalMatrix;

uniform mat4 modelViewProjectionMatrix; 

out vec3 viewSpaceNormal;
out vec3 viewSpacePosition;
in vec3 normalIn;

void main() 
{
	gl_Position = modelViewProjectionMatrix * vec4(position,1);
	outColor = vec4(color,1); 
	texCoord = texCoordIn;

	viewSpaceNormal = (normalMatrix * vec4(normalIn,0.0)).xyz;
	viewSpacePosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
}