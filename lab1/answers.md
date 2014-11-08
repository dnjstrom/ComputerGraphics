Answers Lab 1
=============

# Exercise 1
1) Generate buffer ID ("name") --> (b) glGenBuffers()
2) Select currently active buffer --> (c) glBindBuffer()
3) Copy data to currently active buffer --> (a) glBufferData()

# Exercise 2
ARRAY BUFFER, ELEMENT ARRAY BUFFER, PIXEL UNPACK BUFFER, or PIXEL PACK BUFFER

# Exercise 3
positionBuffer: Buffer Object
colorBuffer: Buffer Object
vertexArrayObject: Vertex Array Object

Links: 2, 4, 1, 3

# Exercise 4
(b) by name

# Exercise 5
Vertex Shader: Once for each vertex (9 times)
Fragment Shader: Approximately once for each drawn pixel in the image

# Exercise 6
vertexShader: glCompileShader()
fragmentShader: glCompileShader()
shaderProgram: glCreateProgram()

C: glLinkProgram()
A: glCompileShader()
B: glCompileShader()
1: glShaderSource()
2: glShaderSource()
3: glAttachShader()
4: glAttachShader()