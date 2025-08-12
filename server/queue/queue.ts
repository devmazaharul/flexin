import redisConnection from "../config/redis";
import {Queue} from "bullmq"

const queueService=new Queue("flexinqueue",{
  connection:redisConnection
})

export {queueService}