// Producer process
const aqmp = require("amqplib");
const queueName = "tasks";

async function sendMessage(body) {
  const conn = await aqmp.connect("amqp://localhost");
  const ch = await conn.createConfirmChannel();
  await ch.assertQueue(queueName);
  await ch.sendToQueue(queueName, Buffer.from(body), {
    persistent: true
  });
  await ch.waitForConfirms();
  process.exit(0);
}

var message = "Hello";
sendMessage(message);
