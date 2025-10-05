import type { StackProps } from "aws-cdk-lib";
import type {
  Conditions,
} from "aws-cdk-lib/aws-iam";
import type { Construct } from "constructs";
import { Stack } from "aws-cdk-lib";
import {
  CfnOIDCProvider,
  Role,
  WebIdentityPrincipal,
} from "aws-cdk-lib/aws-iam";

export class OidcAwsGithubStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const oidcProvider = new CfnOIDCProvider(this, "GithubOidcProvider", {
      url: "https://token.actions.githubusercontent.com",
      clientIdList: ["sts.amazonaws.com"],
    });

    const conditions: Conditions = {
      StringEquals: {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub":
          "repo:mellevanderlinde/oidc-aws-github:ref:refs/heads/main",
      },
    };

    const oidcRole = new Role(this, "GithubOidcRole", {
      roleName: "github-oidc-role",
      assumedBy: new WebIdentityPrincipal(oidcProvider.ref, conditions),
    });

    const lookupRole = Role.fromRoleName(
      this,
      "LookupRole",
      `cdk-hnb659fds-lookup-role-${this.account}-${this.region}`,
    );

    lookupRole.grantAssumeRole(oidcRole);
  }
}
