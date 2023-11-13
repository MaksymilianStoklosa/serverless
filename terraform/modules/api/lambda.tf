data "aws_iam_policy_document" "api_lambda" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "api_lambda_exec" {
  name = "api-lambda"

  assume_role_policy = data.aws_iam_policy_document.api_lambda.json
}

resource "aws_iam_role_policy_attachment" "api_lambda_policy" {
  role       = aws_iam_role.api_lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_lambda_function" "api" {
  function_name = "api"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.lambda_api.key
  handler   = "index.handler"
  runtime   = "nodejs18.x"

  role = aws_iam_role.api_lambda_exec.arn
}

resource "aws_cloudwatch_log_group" "api" {
  name = "/aws/lambda/${aws_lambda_function.api.function_name}"

  retention_in_days = 14
}

resource "aws_s3_object" "lambda_api" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "api-lambda.zip"
  source = "${path.cwd}/../packages/api-example/dist/lambda.zip"
}
