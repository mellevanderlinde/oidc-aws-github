import { App } from "aws-cdk-lib";
import { OidcAwsGithubStack } from "../lib/oidc-aws-github-stack";

const app = new App();
new OidcAwsGithubStack(app, "OidcAwsGithubStack", {
  env: { region: "eu-west-1" },
});
