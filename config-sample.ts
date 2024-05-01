export const config = {
  username: 'test',
  password: 'test',
  database: 'test',
  aws: {
    s3: {
      region: 'eu-north-1',                     // AWS region where resources are located
      accessKey: 'test',                     // AWS Access Key(only for dev testing)
      secretAccessKey: 'test',         // Your AWS Secret Access Key(only for dev testing)
      bucketName: 'test',  // The name of S3 Bucket on AWS
      endpoint: 'https://s3.amazonaws.com',       // The endpoint for connecting to AWS services
    },
  },
}