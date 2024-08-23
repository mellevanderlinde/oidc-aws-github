import { Stack, StackProps, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export class OpenidConnectAwsGithubStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const oidcProvider = new iam.CfnOIDCProvider(this, "GithubOidcProvider", {
      url: "https://token.actions.githubusercontent.com",
    });

    const conditions: iam.Conditions = {
      StringEquals: {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub":
          "repo:mellevanderlinde/openid-connect-aws-github:ref:refs/heads/non-existing-branch", // TODO change to main branch, first verify that this fails
      },
    };

    new iam.Role(this, "GithubOidcRole", {
      roleName: "github-oidc-role",
      assumedBy: new iam.WebIdentityPrincipal(oidcProvider.ref, conditions),
    });
  }
}
