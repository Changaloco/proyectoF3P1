// configure the Swagger UI
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Movies API",
            version: "1.0.0",
            description:
                "Una api de node js acerca de peliculas",
            contact: {
                name: "Swagger",
                url: "https://swagger.io",
                email: ""
            },
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
            }
        },
        servers: [
            {
                url: "https://proyectof3p1-production.up.railway.app/",
            },
        ],
    },

    apis: ["./routes/*.js"]
}

module.exports = options