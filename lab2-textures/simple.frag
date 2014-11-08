#version 130

// required by GLSL spec Sect 4.5.3 (though nvidia does not, amd does)
precision highp float;

in vec3 outColor;
in vec2 texCoord;

out vec4 fragmentColor;

uniform sampler2D colortexture;

void main() 
{
	fragmentColor = texture2D(colortexture, texCoord.xy);
}