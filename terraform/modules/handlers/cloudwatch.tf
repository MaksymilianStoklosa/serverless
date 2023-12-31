resource "aws_cloudwatch_log_group" "handler" {
  name = "/aws/lambda/${aws_lambda_function.handler.function_name}"
}

resource "aws_cloudwatch_event_rule" "every_one_minute" {
  name                = "every-one-minute"
  description         = "Fires every one minute"
  schedule_expression = "rate(1 minute)"
}

resource "aws_cloudwatch_event_target" "run_one_minute" {
  rule      = aws_cloudwatch_event_rule.every_one_minute.name
  target_id = "handler"
  arn       = aws_lambda_function.handler.arn
}

resource "aws_lambda_permission" "allow_cloudwatch_to_call_translations" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.handler.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.every_one_minute.arn
}
