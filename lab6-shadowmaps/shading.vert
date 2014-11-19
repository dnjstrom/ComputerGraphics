#version 130

in vec3 position;
in vec2 texCoordIn;
in vec3 normalIn;

out vec2 texCoord;
out vec3 viewSpaceNormal;
out vec3 viewSpacePosition;

uniform mat4 normalMatrix;	 
uniform mat4 modelViewMatrix;
uniform mat4 modelViewProjectionMatrix; 

uniform mat4 lightMatrix;
out vec4 shadowMapCoord;

void main() 
{
	gl_Position = modelViewProjectionMatrix * vec4(position,1.0);
	texCoord = texCoordIn; 
	viewSpaceNormal = (normalMatrix * vec4(normalIn,0.0)).xyz;
	viewSpacePosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
	
	shadowMapCoord = lightMatrix * vec4(viewSpacePosition, 1.0);
	//shadowMapCoord.xyz *= vec3(0.5, 0.5, 0.5);
	//shadowMapCoord.xyz += shadowMapCoord.w * vec3(0.5, 0.5, 0.5);
}
