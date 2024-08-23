import { App, assertions } from "aws-cdk-lib";
import { OpenidConnectAwsGithubStack } from "../lib/openid-connect-aws-github-stack";

test("Match with snapshot", () => {
  const app = new App();
  const stack = new OpenidConnectAwsGithubStack(
    app,
    "OpenidConnectAwsGithubStack",
  );
  const template = assertions.Template.fromStack(stack);
  expect(template).toMatchSnapshot();
});
