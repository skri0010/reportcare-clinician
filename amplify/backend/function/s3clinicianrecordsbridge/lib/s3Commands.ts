// Reference: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html#s3-create-presigendurl-put
// Import the required AWS SDK clients and commands for Node.js
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { EventResponse } from "./types";

// Set the AWS Region.
const REGION = process.env.REGION!;

// Set bucket name
const BUCKET_NAME = process.env.STORAGE_S3CLINICIANRECORDS_BUCKETNAME!;

// Set expiry in seconds
const EXPIRY_TIME = 300;

// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

// Create Amazon S3 client imported from "aws-sdk"
const S3Instance = new S3();

// Get presigned url for uploading specified object in path
export const getPresignedUploadUrl: (path: string) => Promise<EventResponse> =
  async (path): Promise<EventResponse> => {
    let returnObject: EventResponse = {
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
          data: signedUrl
        };
      } else {
        throw Error(`Failed to create upload presigned url for ${path}`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }

    return returnObject;
  };

// Get presigned url for downloading specified object in path
export const getPresignedDownloadUrl = async (
  path: string
): Promise<EventResponse> => {
  let returnObject: EventResponse = {
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
        data: signedUrl
      };
    } else {
      throw Error(`Failed to create download presigned url for ${path}`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  return returnObject;
};

// Delete object
export const deleteObject: (path: string) => Promise<boolean> = async (
  path
) => {
  let success = false;

  // Declare parameters
  const parameters = {
    Bucket: BUCKET_NAME,
    Key: path
  };

  const response = await S3Instance.deleteObject(parameters).promise();

  if (response.DeleteMarker) {
    success = true;
  }

  return success;
};
