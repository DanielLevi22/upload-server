import * as aws from '@pulumi/aws'
import * as awsx from '@pulumi/awsx'
import * as pulumi from '@pulumi/pulumi'

// Create an AWS resource (S3 Bucket)

const bucket = new aws.s3.BucketV2('upload-server', {
  bucket: `upload-server-${pulumi.getStack()}-${pulumi.getProject()}`,
  tags: {
    IAC: 'true',
  },
})

// Export the name of the bucket
export const bucketName = bucket.id
export const bucketArn = bucket.arn
export const bucketInfo = bucket.bucket
