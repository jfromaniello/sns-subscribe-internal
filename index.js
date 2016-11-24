const request = require('request');

function finish(err, context){
  if (err) {
    console.log('ERROR:');
    console.dir(err);
    context.fail();
  } else {
    context.succeed();
  }
}

exports.handler = function (notification, context) {
  const sns = notification.Records[0].Sns;

  console.log("request Recieved.\nDetails:\n", JSON.stringify(notification));

  if (!process.env.ENDPOINT) {
    return finish(new Error('missing environment variable ENDPOINT', context));
  }

  console.log('delivering notification to ' + process.env.ENDPOINT);

  request.post({
    url:  process.env.ENDPOINT,
    json: sns,
    headers: {
      'x-amz-sns-message-type':     sns.Type,
      'x-amz-sns-message-id':       sns.MessageId,
      'x-amz-sns-topic-arn':        sns.TopicArn,
      'x-amz-sns-subscription-arn': notification.Records[0].EventSubscriptionArn
    },
    timeout: 8000
  }, (err, response, body) => {
    if (err) { return finish(err, context); }
    if (response.statusCode.toString()[0] !== '2') {
      console.log('invalid response status ' + response.statusCode, body);
      return finish(new Error('invalid response status code'), context);
    }
    finish(null, context);
  });
};
