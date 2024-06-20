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
            }
        ],
        "tags": [
            {
                "name": "language",
                "description": "Everything about your Programming Languages",
                "externalDocs": {
                    "description": "Find out more",
                    "url": "http://swagger.io"
                }
            },
            {
                "name": "store",
                "description": "Access to Petstore orders",
                "externalDocs": {
                    "description": "Find out more about our store",
                    "url": "http://swagger.io"
                }
            },
            {
                "name": "users",
                "description": "Operations about users"
            }
        ],
        "paths": {
            "/api/auth/register": {
                "post": {
                    "description": "Register new users",
                    "tags": ["users"],
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
                    "tags": ["users"],
                    "description": "Login for our users",
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
                            "format": "password",
                            "type": "string",
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
                    "description": "Verify toke of users",
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
                    "description": "Logout users",
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
                    "description": "Get profile users",
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
                    "description": "Create new Tasks",
                    "tags": ["tasks"],
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
                    "description": "Get task by Id",
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
                "delete": {
                    "description": "Delete a Task",
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
                "Order": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int64",
                            "example": 10
                        },
                        "petId": {
                            "type": "integer",
                            "format": "int64",
                            "example": 198772
                        },
                        "quantity": {
                            "type": "integer",
                            "format": "int32",
                            "example": 7
                        },
                        "shipDate": {
                            "type": "string",
                            "format": "date-time"
                        },
                        "status": {
                            "type": "string",
                            "description": "Order Status",
                            "example": "approved",
                            "enum": [
                                "placed",
                                "approved",
                                "delivered"
                            ]
                        },
                        "complete": {
                            "type": "boolean"
                        }
                    },
                    "xml": {
                        "name": "order"
                    }
                },
                "Languages": {
                    "type": "object",
                    "properties": {
                        "knowledge_level": {
                            "type": "integer",
                            "format": "int64",
                            "example": 10
                        },
                        "description": {
                            "type": "string",
                            "example": "Write a detailed description about the programming language!"
                        },
                        "user_language": {
                            "type": "integer",
                            "format": "int32",
                            "example": 1
                        },
                        "language_programming": {
                            "type": "integer",
                            "format": "int32",
                            "example": 15
                        }
                    },
                    "xml": {
                        "name": "language"
                    }
                },
                "Customer": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int64",
                            "example": 100000
                        },
                        "username": {
                            "type": "string",
                            "example": "fehguy"
                        },
                        "address": {
                            "type": "array",
                            "xml": {
                                "name": "addresses",
                                "wrapped": true
                            },
                            "items": {
                                "$ref": "#/components/schemas/Address"
                            }
                        }
                    },
                    "xml": {
                        "name": "customer"
                    }
                },
                "Address": {
                    "type": "object",
                    "properties": {
                        "street": {
                            "type": "string",
                            "example": "437 Lytton"
                        },
                        "city": {
                            "type": "string",
                            "example": "Palo Alto"
                        },
                        "state": {
                            "type": "string",
                            "example": "CA"
                        },
                        "zip": {
                            "type": "string",
                            "example": "94301"
                        }
                    },
                    "xml": {
                        "name": "address"
                    }
                },
                "Category": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int64",
                            "example": 1
                        },
                        "name": {
                            "type": "string",
                            "example": "Dogs"
                        }
                    },
                    "xml": {
                        "name": "category"
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
                "Tag": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int64"
                        },
                        "name": {
                            "type": "string"
                        }
                    },
                    "xml": {
                        "name": "tag"
                    }
                },
                "Pet": {
                    "required": [
                        "name",
                        "photoUrls"
                    ],
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int64",
                            "example": 10
                        },
                        "name": {
                            "type": "string",
                            "example": "doggie"
                        },
                        "category": {
                            "$ref": "#/components/schemas/Category"
                        },
                        "photoUrls": {
                            "type": "array",
                            "xml": {
                                "wrapped": true
                            },
                            "items": {
                                "type": "string",
                                "xml": {
                                    "name": "photoUrl"
                                }
                            }
                        },
                        "tags": {
                            "type": "array",
                            "xml": {
                                "wrapped": true
                            },
                            "items": {
                                "$ref": "#/components/schemas/Tag"
                            }
                        },
                        "status": {
                            "type": "string",
                            "description": "pet status in the store",
                            "enum": [
                                "available",
                                "pending",
                                "sold"
                            ]
                        }
                    },
                    "xml": {
                        "name": "pet"
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
