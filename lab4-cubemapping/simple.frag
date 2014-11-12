#version 130

// required by GLSL spec Sect 4.5.3 (though nvidia does not, amd does)
precision highp float;

uniform float material_shininess = 25.0;
uniform vec3 material_diffuse_color = vec3(1.0); 
uniform vec3 material_specular_color = vec3(0.0); 
uniform vec3 material_emissive_color = vec3(0.0); 

uniform int has_diffuse_texture = 1;
uniform sampler2D diffuse_texture;

in vec4 outColor;
in vec2 texCoord;

uniform vec3 viewSpaceLightPosition;
uniform vec3 scene_ambient_light = vec3(0.05, 0.05, 0.05);
uniform vec3 scene_light = vec3(0.6, 0.6, 0.6);

uniform samplerCube environmentMap;
uniform mat4 inverseViewNormalMatrix;

out vec4 fragmentColor;

in vec3 viewSpaceNormal;
in vec3 viewSpacePosition;

vec3 calculateAmbient(vec3 ambientLight, vec3 materialAmbient)
{
	return materialAmbient * ambientLight;
}

vec3 calculateDiffuse(vec3 diffuseLight, vec3 materialDiffuse, vec3 normal, vec3 directionToLight)
{
	return diffuseLight * materialDiffuse * max(0, dot(normal, directionToLight));
}

vec3 calculateSpecular(vec3 specularLight, vec3 materialSpecular, float materialShininess, vec3 normal, vec3 directionToLight, vec3 directionFromEye)
{
	vec3 h = normalize(directionToLight - directionFromEye);
	float normalizationFactor = ((materialShininess + 2.0) / 8.0);
	return normalizationFactor * specularLight * materialSpecular * pow(max(0, dot(h, normal)), materialShininess);
}

vec3 calculateFresnel(vec3 materialSpecular, vec3 normal, vec3 directionFromEye)
{
	return materialSpecular + (vec3(1.0) - materialSpecular) * pow(clamp(1.0 + dot(directionFromEye, normal), 0.0, 1.0), 5.0);
}

/**
 * Helper function to sample the diffuse texture, if it is present. This needed is to support materials
 * which do not supply a texture, e.g. the space ship in lab 4 and 5. Another way would be to make 
 * OBJModel supply a default texture which is all-white, but this was deemed somewhat more obscure.
 */
vec3 sampleDiffuseTexture()
{
	if (has_diffuse_texture == 1) 
	{
		return texture(diffuse_texture, texCoord).xyz;
	}
	return vec3(1.0);
}

void main() 
{
	vec3 ambient = material_diffuse_color * sampleDiffuseTexture();
	vec3 diffuse = sampleDiffuseTexture() * material_diffuse_color;
	vec3 specular = material_specular_color;
	vec3 emissive = sampleDiffuseTexture() * material_emissive_color;

	vec3 normal = normalize(viewSpaceNormal);
	vec3 directionToLight = normalize(viewSpaceLightPosition - viewSpacePosition);
	vec3 directionFromEye = normalize(viewSpacePosition);
	vec3 reflectionVector = (inverseViewNormalMatrix * vec4(reflect(directionFromEye, normal), 0.0)).xyz;
	vec3 envMapSample = texture(environmentMap, reflectionVector).rgb;
	vec3 fresnelSpecular = calculateFresnel(specular, normal, directionFromEye);

	vec3 shading = calculateAmbient(scene_ambient_light, ambient)
				 + calculateDiffuse(scene_light, diffuse, normal, directionToLight)
				 + calculateSpecular(scene_light, specular, material_shininess, normal, directionToLight, directionFromEye)
				 + emissive
				 + envMapSample * specular;

	fragmentColor = vec4(shading, 1.0);
}
