# Invoke AWS from GitHub Actions using OpenID Connect

This repository demonstrates how to allow a specific GitHub repository to invoke actions on AWS from GitHub Actions using OpenID Connect (OIDC).

## Deploy to AWS

To install the project's dependencies and deploy the OIDC provider and required IAM role to AWS, run the following:

```
npm ci
npx cdk deploy
```

## Run GitHub Actions

Next, the GitHub Actions workflow can be used to invoke actions on AWS. For an example implementation, see `.github/workflows/oidc.yml`.

## Resources

- [How OpenID Connect Works](https://openid.net/developers/how-connect-works/)
- [Configuring OpenID Connect in Amazon Web Services](https://docs.github.com/en/actions/security-for-github-actions/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)
- [Use IAM roles to connect GitHub Actions to actions in AWS](https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/)