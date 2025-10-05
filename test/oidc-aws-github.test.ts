import { App, DefaultStackSynthesizer } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { beforeAll, describe, expect, it } from "vitest";
import { OidcAwsGithubStack } from "../lib/oidc-aws-github-stack";

describe("oidc stack", () => {
  let template: Template;

  beforeAll(() => {
    const defaultStackSynthesizer = new DefaultStackSynthesizer({ generateBootstrapVersionRule: false });
    const app = new App({ defaultStackSynthesizer });
    const stack = new OidcAwsGithubStack(app, "OidcAwsGithubStack");
    template = Template.fromStack(stack);
  });

  it("matches snapshot", () => {
    expect(template).toMatchSnapshot();
  });

  it("has an OIDC Provider", () => {
    template.hasResourceProperties("AWS::IAM::OIDCProvider", {
      Url: "https://token.actions.githubusercontent.com",
      ClientIdList: ["sts.amazonaws.com"],
    });
  });

  it("has a role that trusts a GitHub repository branch", () => {
    template.hasResourceProperties("AWS::IAM::Role", {
      AssumeRolePolicyDocument: {
        Statement: [
          {
            Action: "sts:AssumeRoleWithWebIdentity",
            Condition: {
              StringEquals: {
                "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
                "token.actions.githubusercontent.com:sub": "repo:mellevanderlinde/oidc-aws-github:ref:refs/heads/main",
              },
            },
            Effect: "Allow",
            Principal: {
              Federated: {
                Ref: "GithubOidcProvider",
              },
            },
          },
        ],
        Version: "2012-10-17",
      },
    });
  });
});
