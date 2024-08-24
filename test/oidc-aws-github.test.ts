import { App, assertions } from "aws-cdk-lib";
import { OidcAwsGithubStack } from "../lib/oidc-aws-github-stack";

test("Match with snapshot", () => {
  const app = new App();
  const stack = new OidcAwsGithubStack(app, "OidcAwsGithubStack");
  const template = assertions.Template.fromStack(stack);
  expect(template).toMatchSnapshot();
});
