data "aws_iam_policy_document" "handler_lambda" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "handler_lambda_exec" {
  name = "handler-lambda"

  assume_role_policy = data.aws_iam_policy_document.handler_lambda.json
}

resource "aws_iam_role_policy_attachment" "handler_lambda_policy" {
  role       = aws_iam_role.handler_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "handler" {
  function_name = "handler"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.handler_lambda.key
  handler   = "index.handler"
  runtime   = "nodejs18.x"

  role = aws_iam_role.handler_lambda_exec.arn
}

resource "aws_s3_object" "handler_lambda" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "handler-lambda.zip"
  source = "${path.cwd}/../packages/handler-example/dist/lambda.zip"
}
