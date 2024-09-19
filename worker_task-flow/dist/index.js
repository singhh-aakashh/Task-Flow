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
const processEmail_1 = require("./processEmail");
const redis = new ioredis_1.default({
    password: 'eLiaz1tGtZ9hUumOEEEAhV8umqPuL4ZO',
    host: 'redis-18240.c114.us-east-1-4.ec2.redns.redis-cloud.com',
    port: 18240
});
const streamName = "zap-events";
let lastid = "0";
const prisma = new client_1.PrismaClient();
const processEvent = (zapRunId) => __awaiter(void 0, void 0, void 0, function* () {
    if (zapRunId) {
        try {
            const zap = yield prisma.zapRun.findFirst({
                where: {
                    id: Number(zapRunId)
                },
                include: {
                    zap: {
                        include: {
                            zapSteps: {
                                include: {
                                    trigger: true,
                                    action: true
                                }
                            }
                        }
                    }
                }
            });
            if (zap) {
                return zap;
            }
            else {
                console.log("ZapRun is not avaialable for this id");
                return null;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    else {
        console.log("zapRunId is not present");
        return null;
    }
});
const consumer = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    while (true) {
        try {
            console.log("Worker started...");
            const events = yield redis.xread("BLOCK", 0, "STREAMS", streamName, lastid);
            if (events) {
                const [streamKey, eventList] = events[0];
                for (const [id, event] of eventList) {
                    console.log(`lastid is ${id} , zapRunId is ${event[1]} , stage is ${event[3]} , type of event`, typeof (event));
                    console.log("processing..");
                    const zap = yield processEvent(event[1]);
                    if (zap) {
                        // Avoiding trigger
                        if (Number(event[3]) !== 0) {
                            //   console.log("zap meta data is",zap?.metaData)
                            // Finding current action
                            const currentAction = zap.zap.zapSteps.find((action) => action.orderPosition === Number(event[3]));
                            if (((_a = currentAction === null || currentAction === void 0 ? void 0 : currentAction.action) === null || _a === void 0 ? void 0 : _a.name) === 'Email') {
                                //converting jsonValue to json
                                if (typeof currentAction.metaData === "string") {
                                    const value = JSON.parse(currentAction.metaData);
                                    yield (0, processEmail_1.processEmail)(value, zap.metaData);
                                }
                            }
                        }
                        // managing stages
                        // console.log("length of zapsteps ",zap?.zap.zapSteps.length)
                        if (Number(event[3]) !== (((_c = (_b = zap === null || zap === void 0 ? void 0 : zap.zap) === null || _b === void 0 ? void 0 : _b.zapSteps) === null || _c === void 0 ? void 0 : _c.length) - 1)) {
                            yield redis.xadd(streamName, "*", "zapRunId", event[1], "stage", Number(event[3]) + 1);
                        }
                    }
                    lastid = id;
                    yield redis.xdel(streamName, lastid);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
});
consumer().catch(console.error);
