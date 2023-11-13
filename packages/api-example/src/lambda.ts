import { APIGatewayEvent, Context, APIGatewayProxyResultV2 } from "aws-lambda";
import { api } from "./api";

export async function handler(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResultV2> {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const result = await api.run(event, context);

  return {
    statusCode: result.statusCode,
    body: result.body,
    headers: {
      ...Object.keys(result.multiValueHeaders).reduce((accumulator, headerName) => {
        // @ts-expect-error - multiValueHeaders is not typed correctly
        accumulator[headerName] = result.multiValueHeaders[headerName][0];
        return accumulator;
      }, {}),
    },
    isBase64Encoded: result.isBase64Encoded,
  };
}
