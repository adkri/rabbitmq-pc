// Consumer process
const aqmp = require("amqplib");
const queueName = "tasks";

async function waitForMessage() {
  const conn = await aqmp.connect("amqp://localhost");
  const ch = await conn.createConfirmChannel();
  await ch.assertQueue(queueName);
  ch.consume(queueName, function(msg) {
    if (msg !== null) {
      console.log(msg.content.toString());
      ch.ack(msg);
    }
  });
}

waitForMessage();
