![](http://joseoncode.com.s3.amazonaws.com/github/sns-subscribe-internal.png)

SNS support HTTP/HTTPS subscription but the endpoint needs to be exposed to the internet.

This lambda function allows you to subscribe an **SNS Topic** to an **internal endpoint**.

The trick is that you need to deploy the lambda inside the VPC.

Only one environment variable is needed `ENDPOINT`.

Instead of subscribing the "webhook" to the SNS Topic, you need to subscribe this lambda to the SNS Topic and provide an `ENDPOINT` environment variable pointing to the webhook.
