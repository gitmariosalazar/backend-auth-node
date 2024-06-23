import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Especificación OpenAPI
const swaggerOptions = {
    swaggerDefinition: {
        "openapi": "3.0.0",
        "info": {
            "title": "API Node JS & Mongo DB",
            "description": "Hi, my name is Mario Salazar, The next project is about users and Tasks (CRUD) and Login users.",
            "termsOfService": "http://swagger.io/terms/",
            "contact": {
                "email": "mariosalazar.ms.10@gmail.com",
                "phone": "0994532438"
            },
            "license": {
                "name": "ISC",
                "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            "version": "1.0.0"
        },
        "externalDocs": {
            "description": "Find out more about Project's Mario Salazar",
            "url": "https://e-shop-mariosalazar.vercel.app/"
        },
        "servers": [

            {
                "url": ""
            }, {
                "url": "http://localhost:4000"
            },
            {
                "url": "https://jf36d5k0-4000.use2.devtunnels.ms"
            }
        ],
        "tags": [
            {
                "name": "tasks",
                "description": "Everything about your Programming Languages",
                "externalDocs": {
                    "description": "Find out more",
                    "url": "http://swagger.io"
                }
            },
            {
                "name": "users",
                "description": "Access to Petstore orders",
                "externalDocs": {
                    "description": "Find out more about our store",
                    "url": "http://swagger.io"
                }
            }
        ],
        "paths": {
            "/api/auth/register": {
                "post": {
                    "tags": ["users"],
                    "summary": "Register new user ✅",
                    "description": "Register a new user to access, you need an email and password",
                    "operationId": "RegisterUser",
                    "requestBody": {
                        "description": "Created new user",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/CreateUser"
                                }
                            },
                            "application/xml": {
                                "schema": {
                                    "$ref": "#/components/schemas/CreateUser"
                                }
                            },
                            "application/x-www-form-urlencoded": {
                                "schema": {
                                    "$ref": "#/components/schemas/CreateUser"
                                }
                            }
                        }
                    },

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
                    "tags": ["users"],
                    "description": "Login for our users",
                    "summary": "Login users ✅",
                    "parameters": [
                        {
                            "name": "email",
                            "in": "path",
                            "description": "The user name for login",
                            "required": true,
                            "schema": {
                                "type": "string",
                                "format": "email"
                            }
                        },
                        {
                            "name": "password",
                            "in": "path",
                            "description": "The password for login in clear text",
                            "required": true,
                            "schema": {
                                "type": "string",
                                "format": "password"
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
            "/api/auth/verify": {
                "get": {
                    "summary": "Verify user token ✅",
                    "description": "Verify if an user it logged",
                    "tags": ["users"],
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
                    "summary": "Logout user ✅",
                    "description": "End all sessions",
                    "tags": ["users"],
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
                    "summary": "Get user profile ✅",
                    "description": "Get data information of user logged",
                    "tags": ["users"],
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
                    "description": "Get Tasks by users logged",
                    "summary": "Get a task ✅",
                    "tags": ["tasks"],
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
                    "description": "Create my Tasks",
                    "summary": "Register new task ✅",
                    "tags": ["tasks"],
                    "requestBody": {
                        "description": "Created user task",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Task"
                                }
                            },
                            "application/xml": {
                                "schema": {
                                    "$ref": "#/components/schemas/Task"
                                }
                            },
                            "application/x-www-form-urlencoded": {
                                "schema": {
                                    "$ref": "#/components/schemas/Task"
                                }
                            }
                        }
                    },
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
                    "description": "Get task by Id",
                    "summary": "Get a task by id ✅",
                    "tags": ["tasks"],
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
                    "description": "Update Task",
                    "summary": "Update a task ✅",
                    "tags": ["tasks"],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "type": "string"
                        }
                    ],
                    "requestBody": {
                        "description": "Update task object",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/UpdateTask"
                                }
                            },
                            "application/xml": {
                                "schema": {
                                    "$ref": "#/components/schemas/UpdateTask"
                                }
                            },
                            "application/x-www-form-urlencoded": {
                                "schema": {
                                    "$ref": "#/components/schemas/UpdateTask"
                                }
                            }
                        }
                    },
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
                    "description": "Delete a Task",
                    "summary": "Remove a task ✅",
                    "tags": ["tasks"],
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
        "components": {
            "schemas": {
                "CreateUser": {
                    "type": "object",
                    "properties": {
                        "username": {
                            "type": "string",
                            "format": "string",
                            "example": "mariosalazar"
                        },
                        "email": {
                            "type": "string",
                            "example": "mariosalazar.1995@gmail.com"
                        },
                        "password": {
                            "type": "string",
                            "format": "password",
                            "example": "password-mario"
                        },
                    },
                    "xml": {
                        "name": "CreateUser"
                    }
                },
                "User": {
                    "type": "object",
                    "properties": {
                        "id_user": {
                            "type": "integer",
                            "format": "int64",
                            "example": 10
                        },
                        "user_name": {
                            "type": "string",
                            "example": "PRE-100101010"
                        },
                        "first_name": {
                            "type": "string",
                            "example": "John"
                        },
                        "last_name": {
                            "type": "string",
                            "example": "James"
                        },
                        "email": {
                            "type": "string",
                            "example": "john@email.com"
                        },
                        "password": {
                            "type": "string",
                            "example": "12345"
                        },
                        "phone": {
                            "type": "string",
                            "example": "12345"
                        },
                        "date_born": {
                            "type": "string",
                            "example": "02/02/1995"
                        },
                        "register_date": {
                            "type": "string",
                            "example": "02/02/1995"
                        },
                        "address": {
                            "type": "string",
                            "description": "Address",
                            "format": "int32",
                            "example": "El Tejar - Ibarra"
                        },
                        "card_id_person": {
                            "type": "string",
                            "description": "Rol User",
                            "example": "1003938477"
                        },
                        "gender": {
                            "type": "integer",
                            "description": "Gender",
                            "format": "int32",
                            "example": 1
                        },
                        "id_rol": {
                            "type": "integer",
                            "description": "Rol User",
                            "format": "int32",
                            "example": 1
                        },
                        "user_state": {
                            "type": "integer",
                            "description": "User Status",
                            "format": "int32",
                            "example": 1
                        },
                        "user_delete": {
                            "type": "integer",
                            "description": "User Delete",
                            "format": "int32",
                            "example": 1
                        }
                    },
                    "xml": {
                        "name": "user"
                    }
                },
                "UpdateUser": {
                    "type": "object",
                    "properties": {
                        "first_name": {
                            "type": "string",
                            "example": "John"
                        },
                        "last_name": {
                            "type": "string",
                            "example": "James"
                        },
                        "email": {
                            "type": "string",
                            "example": "john@email.com"
                        },
                        "phone": {
                            "type": "string",
                            "example": "12345"
                        },
                        "date_born": {
                            "type": "string",
                            "example": "02/02/1995"
                        },
                        "address": {
                            "type": "string",
                            "description": "Address",
                            "example": "El Tejar - Ibarra"
                        },
                        "card_id_person": {
                            "type": "string",
                            "description": "Rol User",
                            "example": "1003938477"
                        },
                        "gender": {
                            "type": "integer",
                            "description": "Gender",
                            "format": "int32",
                            "example": 1
                        },
                        "id_rol": {
                            "type": "integer",
                            "description": "Rol User",
                            "format": "int32",
                            "example": 1
                        }
                    },
                    "xml": {
                        "name": "updateuser"
                    }
                },
                "ChangePassword": {
                    "type": "object",
                    "properties": {
                        "lastpassword": {
                            "type": "string",
                            "description": "Enter the last password",
                            "example": "********************"
                        },
                        "new_password": {
                            "type": "string",
                            "description": "Enter the new password",
                            "example": "*******************"
                        },
                        "rep_password": {
                            "type": "string",
                            "description": "Repeat the new password to confirm",
                            "example": "*******************"
                        }
                    },
                    "xml": {
                        "name": "ChangePassword"
                    }
                },
                "Task": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "example": "My first task"
                        },
                        "description": {
                            "type": "string",
                            "example": "Write a detailed description about your task!"
                        },
                    },
                    "xml": {
                        "name": "Task"
                    }
                },
                "UpdateTask": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "example": "My first task"
                        },
                        "description": {
                            "type": "string",
                            "example": "Write a detailed description about your task!"
                        },
                    },
                    "xml": {
                        "name": "UpdateTask"
                    }
                },
                "ApiResponse": {
                    "type": "object",
                    "properties": {
                        "code": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "type": {
                            "type": "string"
                        },
                        "message": {
                            "type": "string"
                        }
                    },
                    "xml": {
                        "name": "##default"
                    }
                }
            },
            "requestBodies": {
                "Pet": {
                    "description": "Pet object that needs to be added to the store",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Pet"
                            }
                        },
                        "application/xml": {
                            "schema": {
                                "$ref": "#/components/schemas/Pet"
                            }
                        }
                    }
                },

                "UserArray": {
                    "description": "List of user object",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/User"
                                }
                            }
                        }
                    }
                }
            },
            "securitySchemes": {
                "jwt": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        },
        "security": [
            {
                "jwt": []
            }
        ]
    },
    // Apunta al archivo donde deseas que se genere la documentación Swagger JSON
    apis: ['./routes/auth.routes.js', './routes/tasks.routes.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export {swaggerSpec, swaggerUi};
