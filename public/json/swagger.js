const doc = {
    "info": {
        "title": "Swagger API SQL SERVER and Python - OpenAPI 3.0",
        "description": "Test",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "email": "mariosalazar.ms.10@gmail.com",
            phone: "0994532438"
        },
        "license": {
            "name": "ISC",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "1.0.11"
    },
    "servers": [
        {
            "url": "http://localhost:5000/users"
        }
    ],
    host: "", // Obtener el host dinámicamente desde Express
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: "User",
            description: "Endpoints"
        }
    ],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "X-API-KEY",
            description: "any description..."
        }
    },
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
            "description": "Everything about your Tsks",
            "externalDocs": {
                "description": "Find out more about our store",
                "url": "http://swagger.io"
            }
        }
    ],
    definitions: {
        User: {
            "_id": {
                "$oid": "6670391fbeeb19036d776118"
            },
            "username": "mariosalazar.ms.10",
            "email": "mariosalazar.ms.10e@gmail.com",
            "password": "$2a$10$IxFw9A6HY0LxxC6C274EGec3dc13HNgofpCfldRzaE8QJZzAFze9K",
            "createdAt": {
                "$date": "2024-06-17T13:24:47.867Z"
            },
            "updatedAt": {
                "$date": "2024-06-17T13:24:47.867Z"
            },
            "__v": 0
        },
        AddUser: {
            username: "mariosalazar.ms.10",
            password: "password-mario",
            email: "mariosalazar.ms.10e@gmail.com"
        },
        Login: {
            password: "password-mario",
            email: "mariosalazar.ms.10e@gmail.com"
        },
        Task: {
            "title": "Task 3",
            "description": "Description task 3",
            "date": "2024-06-15T20:47:08.593Z",
            "user": "666dd0b6e7ae934109d8a6f2",
            "_id": "666dfdcc1f196948e117cd87",
            "createdAt": "2024-06-15T20:47:08.610Z",
            "updatedAt": "2024-06-15T20:47:08.610Z",
            "__v": 0
        },
        AddTask: {
            "title": "Task 3",
            "description": "Description task 3"
        }
    }
};

export default doc
