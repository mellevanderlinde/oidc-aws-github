import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { expect, it } from "vitest";
import { OidcAwsGithubStack } from "../lib/oidc-aws-github-stack";

it("matches snapshot", () => {
  const app = new App();
  const stack = new OidcAwsGithubStack(app, "OidcAwsGithubStack");
  const template = Template.fromStack(stack);
  expect(template).toMatchSnapshot();
});
