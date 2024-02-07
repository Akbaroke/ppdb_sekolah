"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    if (configService.get('node_env') !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Portal')
            .setDescription('')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
    }
    app.setGlobalPrefix('api');
    app.enableCors({
        methods: '*',
        origin: configService.get('frontend_url', '*'),
    });
    const port = await configService.get('port', 3000);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map