import express from 'express';
import verifyEmail from './routes/verifyEmailRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import allowedOrigins from './url/url.js';
// import Swagger
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

dotenv.config();
const app = express();

// configuration de CORPS
    const corsOptions = {
      origin: (origin, callback) => {
        // Vérifier si l'origine est autorisée
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true); // Autoriser la requête
        } else {
          callback(new Error('Origine non autorisée par CORS')); // Bloquer la requête
        }
      },
      optionsSuccessStatus: 200, // Renvoyer un statut 200 pour les requêtes OPTIONS
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
    };

    app.options('*', cors(corsOptions)); // Autoriser les requêtes OPTIONS pour toutes les routes
    app.use(cors(corsOptions));


// Configuration de Swagger
    const PORT = process.env.PORT ;
    const swaggerOptions = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Kairos notifys service API',
          version: '1.0.0',
          description: 'API Documentation for Kairos notifys service',
          contact: {
            name: 'Papa_dollar',
          },
          servers: [`http://localhost:${PORT}`], 
        },
      },
      apis: ['./routes/*.js'], // Chemin vers vos fichiers de routes
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api/documentations', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// les routes de l'api
    app.use(express.json());
    app.use('/service-email-notify', verifyEmail);



export default app;
