import { Stack, StackProps, aws_iam as iam } from "aws-cdk-lib";
import { Construct } from "constructs";

export class OpenidConnectAwsGithubStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new iam.CfnOIDCProvider(this, "GithubOidcProvider", {
      url: "https://token.actions.githubusercontent.com",
    });
  }
}
