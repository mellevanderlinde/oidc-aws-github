import { App } from "aws-cdk-lib";
import { OidcAwsGithubStack } from "../lib/oidc-aws-github-stack";
import { Template } from "aws-cdk-lib/assertions";

test("Match with snapshot", () => {
  const app = new App();
  const stack = new OidcAwsGithubStack(app, "OidcAwsGithubStack");
  const template = Template.fromStack(stack);
  expect(template).toMatchSnapshot();
});
