#version 130


// required by GLSL spec Sect 4.5.3 (though nvidia does not, amd does)
precision highp float;

in vec2 texCoord;
in vec3 viewSpaceNormal; 
in vec3 viewSpacePosition; 

out vec4 fragmentColor;


uniform vec3 viewSpaceLightPosition;
uniform int has_diffuse_texture; 
uniform vec3 material_diffuse_color; 
uniform sampler2D diffuse_texture;

in vec4 shadowMapCoord;
uniform sampler2D shadowMapTex;

void main() 
{
	vec3 diffuseColor = (has_diffuse_texture == 1) ? 
		texture(diffuse_texture, texCoord.xy).xyz : material_diffuse_color; 

	vec3 posToLight = normalize(viewSpaceLightPosition - viewSpacePosition);
	float diffuseReflectance = max(0.0, dot(posToLight, normalize(viewSpaceNormal)));

	float depth = texture( shadowMapTex, shadowMapCoord.xy / shadowMapCoord.w ).x;
	float visibility = (depth >= (shadowMapCoord.z/shadowMapCoord.w)) ? 1.0 : 0.0;
	fragmentColor = vec4(diffuseColor * diffuseReflectance * visibility, 1.0);
}
