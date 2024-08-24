import { Stack, StackProps, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export class OidcAwsGithubStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const oidcProvider = new iam.CfnOIDCProvider(this, "GithubOidcProvider", {
      url: "https://token.actions.githubusercontent.com",
      clientIdList: ["sts.amazonaws.com"],
    });

    const conditions: iam.Conditions = {
      StringEquals: {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub":
          "repo:mellevanderlinde/oidc-aws-github:ref:refs/heads/main",
      },
    };

    const oidcRole = new iam.Role(this, "GithubOidcRole", {
      roleName: "github-oidc-role",
      assumedBy: new iam.WebIdentityPrincipal(oidcProvider.ref, conditions),
    });

    const lookupRole = iam.Role.fromRoleName(
      this,
      "LookupRole",
      `cdk-hnb659fds-lookup-role-${this.account}-${this.region}`,
    );

    lookupRole.grantAssumeRole(oidcRole);
  }
}
