# Invoke AWS from GitHub Actions using OpenID Connect

This repository allows a specific GitHub repository to invoke actions on an AWS account using OpenID Connect (OIDC).

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