"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ioredis_1 = __importDefault(require("ioredis"));
const prisma = new client_1.PrismaClient();
const redis = new ioredis_1.default({
    password: 'eLiaz1tGtZ9hUumOEEEAhV8umqPuL4ZO',
    host: 'redis-18240.c114.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 18240
});
const streamName = "zap-events";
const producer = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        try {
            const pendingRows = yield prisma.zapRunOutBox.findMany({
                where: {},
                take: 10
            });
            for (const row of pendingRows) {
                console.log(`zap Id is ${row.zapRunId}`);
                console.log(typeof row.zapRunId);
                yield redis.xadd(streamName, '*', "zapRunId", row.zapRunId, "stage", 1);
                console.log(`Event added to ${streamName}`);
            }
            yield prisma.zapRunOutBox.deleteMany({
                where: {
                    id: {
                        in: pendingRows.map(x => x.id)
                    }
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
});
producer().catch(console.error);
