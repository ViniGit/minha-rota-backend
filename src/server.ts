import "reflect-metadata"

import './shared/container'
import './shared/container/providers/index'

import express, { Request, Response, NextFunction } from 'express'

import "express-async-errors"

import { router } from './routes'

import { AppDataSource } from "./database/data-source"
import { AppError } from "./errors/AppError"

import cors from 'cors'

const allowedOrigins = ['http://localhost:8080']

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

AppDataSource.initialize()
    .then(() => {

        console.log('Database initialized.')

        const app = express()

        app.use(cors(options))

        app.use(express.json())

        app.use(router)

        app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({
                    message: err.message
                })
            }
            response.status(500).json({
                status: "error",
                message: `Internal server error - ${err.message}`,
            })
        })

        return app.listen(3333, () => console.log("Server is running!🚀"))

    })
    .catch((error) => {
        console.error('An error occurred at startup', error)
    })

