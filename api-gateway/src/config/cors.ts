import cors from 'cors' 

const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['PUT', "PATCH", 'GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credientials: true,
}

const corsConfig = cors(corsOptions)
export { corsConfig }