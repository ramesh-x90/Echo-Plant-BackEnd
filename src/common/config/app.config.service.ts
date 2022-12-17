import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-module/prisma.service';
import { SwaggerConfig } from './swaggerConfig/SwaggerConfig';
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';


@Injectable()
export class AppConfigService {
    constructor(
        private readonly swaggerConfig: SwaggerConfig,
        private readonly config: ConfigService) {

    }

    setUp(app: NestExpressApplication) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
        app.set('trust proxy', 1)
        this.swaggerConfig.setUp(app)
        app.use(cookieParser());
        app.use(cors({
            origin: this.getAllowedOrigins()
        }))
        const prismaService = app.get(PrismaService);
        prismaService.enableShutdownHooks(app);

    }

    getPort() {
        return this.config.get<number>("PORT") || 4000
    }

    getHost() { return this.config.get<string>("HOST") || "http://localhost" }

    getJwtAccessTokenExp() {
        return +this.config.get<number>("JWT_ACCESS_EXP")
    }

    getJwtRefreshTokenExp() {
        return +this.config.get<number>("JWT_REFRESH_EXP")
    }

    getClientID() {
        return this.config.get<string>("CLIENT_ID")
    }

    getClientSecret() {
        return this.config.get<string>("CLIENT_SECRET")
    }

    getRedirectUri() {
        return this.config.get<string>("REDIRECT_URI")
    }


    getServerSecret() {
        return this.config.get<string>("SERVER_SECRET")
    }

    getAllowedOrigins() {
        return JSON.parse(this.config.get<string>("ALLOWED_ORIGINS"))
    }
}