// Reference: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html#s3-create-presigendurl-put
// Import the required AWS SDK clients and commands for Node.js
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PresignedUrlObjectResponse } from "./types";

// Set the AWS Region.
const REGION = "ap-southeast-1";

// Set bucket name
const BUCKET_NAME = "clinicianrecords213733-dev";

// Set expiry in seconds
const EXPIRY_TIME = 300;

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

export const getPresignedUploadUrl = async (
  path: string
): Promise<PresignedUrlObjectResponse> => {
  let returnObject: PresignedUrlObjectResponse = {
    success: false
  };

  try {
    // Set the bucket parameters
    const bucketParameters = {
      Bucket: BUCKET_NAME,
      Key: path
    };

    // Create the command.
    const command = new PutObjectCommand(bucketParameters);

    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: EXPIRY_TIME
    });

    if (signedUrl) {
      console.log(`Created upload presigned url for ${path}`);
      returnObject = {
        success: true,
        url: signedUrl
      };
    } else {
      throw Error(`Failed to create upload presigned url for ${path}`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  return returnObject;
};

export const getPresignedDownloadUrl = async (
  path: string
): Promise<PresignedUrlObjectResponse> => {
  let returnObject: PresignedUrlObjectResponse = {
    success: false
  };

  try {
    // Set the bucket parameters
    const bucketParameters = {
      Bucket: BUCKET_NAME,
      Key: path
    };

    // Create the command.
    const command = new GetObjectCommand(bucketParameters);

    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: EXPIRY_TIME
    });

    if (signedUrl) {
      console.log(`Created download presigned url for ${path}`);
      returnObject = {
        success: true,
        url: signedUrl
      };
    } else {
      throw Error(`Failed to create download presigned url for ${path}`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  return returnObject;
};
