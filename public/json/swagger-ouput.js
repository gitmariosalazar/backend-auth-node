const ouput = {
    "swagger": "2.0",
    "info": {
        "title": "Swagger API SQL SERVER and Python - OpenAPI 3.0",
        "description": "Test",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "email": "mariosalazar.ms.10@gmail.com",
            "phone": "0994532438"
        },
        "license": {
            "name": "ISC",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "1.0.11"
    },
    "host": "",
    "servers": [
        {
            "url": "http://localhost:5000/users"
        }
    ],
    "basePath": "/",
    "tags": [
        {
            "name": "users",
            "description": "Everything about your Users",
            "externalDocs": {
                "description": "Find out more",
                "url": "http://swagger.io"
            }
        },
        {
            "name": "tasks",
            "description": "Everything about your Task",
            "externalDocs": {
                "description": "Find out more about our store",
                "url": "http://swagger.io"
            }
        }
    ],
    "schemes": [
        "http",
        "https"
    ],
    "securityDefinitions": {
        "apiKeyAuth": {
            "type": "apiKey",
            "in": "header",
            "name": "X-API-KEY",
            "description": "any description..."
        }
    },
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/": {
            "get": {
                "description": "",
                "responses": {
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/auth/register": {
            "post": {
                "description": "",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "username": {
                                    "example": "any"
                                },
                                "email": {
                                    "example": "any"
                                },
                                "password": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/auth/login/{email}/{password}": {
            "post": {
                "description": "",
                "parameters": [
                    {
                        "name": "email",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    },
                    {
                        "name": "password",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/auth/verify": {
            "post": {
                "description": "",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    }
                }
            }
        },
        "/api/auth/logout": {
            "post": {
                "description": "",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/auth/profile": {
            "get": {
                "description": "",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "403": {
                        "description": "Forbidden"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/tasks": {
            "get": {
                "description": "",
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "403": {
                        "description": "Forbidden"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "post": {
                "description": "",
                "parameters": [
                    {
                        "name": "body",
                        "in": "body",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "example": "any"
                                },
                                "description": {
                                    "example": "any"
                                },
                                "date": {
                                    "example": "any"
                                }
                            }
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "400": {
                        "description": "Bad Request"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "403": {
                        "description": "Forbidden"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        },
        "/api/tasks/{id}": {
            "get": {
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "403": {
                        "description": "Forbidden"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "put": {
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "403": {
                        "description": "Forbidden"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            },
            "delete": {
                "description": "",
                "parameters": [
                    {
                        "name": "id",
                        "in": "path",
                        "required": true,
                        "type": "string"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK"
                    },
                    "401": {
                        "description": "Unauthorized"
                    },
                    "403": {
                        "description": "Forbidden"
                    },
                    "404": {
                        "description": "Not Found"
                    },
                    "500": {
                        "description": "Internal Server Error"
                    }
                }
            }
        }
    },
    "definitions": {
        "User": {
            "type": "object",
            "properties": {
                "_id": {
                    "type": "object",
                    "properties": {
                        "oid": {
                            "type": "string",
                            "example": "6670391fbeeb19036d776118"
                        }
                    },
                    "required": [
                        "oid"
                    ]
                },
                "username": {
                    "type": "string",
                    "example": "mariosalazar.ms.10"
                },
                "email": {
                    "type": "string",
                    "example": "mariosalazar.ms.10e@gmail.com"
                },
                "password": {
                    "type": "string",
                    "example": "$2a$10$IxFw9A6HY0LxxC6C274EGec3dc13HNgofpCfldRzaE8QJZzAFze9K"
                },
                "createdAt": {
                    "type": "object",
                    "properties": {
                        "date": {
                            "type": "string",
                            "example": "2024-06-17T13:24:47.867Z"
                        }
                    },
                    "required": [
                        "date"
                    ]
                },
                "updatedAt": {
                    "type": "object",
                    "properties": {
                        "date": {
                            "type": "string",
                            "example": "2024-06-17T13:24:47.867Z"
                        }
                    },
                    "required": [
                        "date"
                    ]
                },
                "__v": {
                    "type": "number",
                    "example": 0
                }
            }
        },
        "AddUser": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string",
                    "example": "mariosalazar.ms.10"
                },
                "password": {
                    "type": "string",
                    "example": "password-mario"
                },
                "email": {
                    "type": "string",
                    "example": "mariosalazar.ms.10e@gmail.com"
                }
            }
        },
        "Login": {
            "type": "object",
            "properties": {
                "password": {
                    "type": "string",
                    "example": "password-mario"
                },
                "email": {
                    "type": "string",
                    "example": "mariosalazar.ms.10e@gmail.com"
                }
            }
        },
        "Task": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "example": "Task 3"
                },
                "description": {
                    "type": "string",
                    "example": "Description task 3"
                },
                "date": {
                    "type": "string",
                    "example": "2024-06-15T20:47:08.593Z"
                },
                "user": {
                    "type": "string",
                    "example": "666dd0b6e7ae934109d8a6f2"
                },
                "_id": {
                    "type": "string",
                    "example": "666dfdcc1f196948e117cd87"
                },
                "createdAt": {
                    "type": "string",
                    "example": "2024-06-15T20:47:08.610Z"
                },
                "updatedAt": {
                    "type": "string",
                    "example": "2024-06-15T20:47:08.610Z"
                },
                "__v": {
                    "type": "number",
                    "example": 0
                }
            }
        },
        "AddTask": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string",
                    "example": "Task 3"
                },
                "description": {
                    "type": "string",
                    "example": "Description task 3"
                }
            }
        }
    }
}

export default ouput