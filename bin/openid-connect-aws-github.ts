#!/opt/homebrew/opt/node/bin/node
import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { OpenidConnectAwsGithubStack } from "../lib/openid-connect-aws-github-stack";

const app = new App();
new OpenidConnectAwsGithubStack(app, "OpenidConnectAwsGithubStack");
