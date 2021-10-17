// Reference: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html#s3-create-presigendurl-put
// Import the required AWS SDK clients and commands for Node.js
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client
} from "@aws-sdk/client-s3";
import { AWSError, S3 } from "aws-sdk";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectOutput } from "aws-sdk/clients/s3";
import { createNewEventResponse, EventResponse, prettify } from "./api/shared";

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
    let eventResponse = createNewEventResponse();

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
        // Successful event response
        console.log(`Created upload presigned url for ${path}`);
        eventResponse = {
          success: true,
          data: signedUrl
        };
      } else {
        throw Error(`Failed to create upload presigned url for ${path}`);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }

    return eventResponse;
  };

// Get presigned url for downloading specified object in path
export const getPresignedDownloadUrl = async (
  path: string
): Promise<EventResponse> => {
  let eventResponse = createNewEventResponse();

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
      // Successful event response
      console.log(`Created download presigned url for ${path}`);
      eventResponse = {
        success: true,
        data: signedUrl
      };
    } else {
      throw Error(`Failed to create download presigned url for ${path}`);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }

  return eventResponse;
};

// Delete object
export const deleteObject: (path: string) => Promise<EventResponse> = async (
  path
) => {
  let eventResponse = createNewEventResponse();

  // Declare parameters
  const parameters = {
    Bucket: BUCKET_NAME,
    Key: path
  };

  try {
    const response: DeleteObjectOutput = await new Promise(
      (resolve, reject) => {
        const callback = (error: AWSError, data: DeleteObjectOutput) => {
          if (error) {
            reject(prettify(error));
          } else {
            // Note: The response is actually {} with no fields
            // Issue: https://github.com/aws/aws-sdk-js/issues/1197#issuecomment-258919580
            resolve(data);
          }
        };
        S3Instance.deleteObject(parameters, callback);
      }
    );

    // Can assume that if an error is not thrown, it was successful
    if (response) {
      // Successful event response
      eventResponse = {
        success: true
      };
    }
  } catch (error) {
    console.log(error);
  }

  return eventResponse;
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

  try {
    const response: DeleteObjectOutput = await new Promise(
      (resolve, reject) => {
        const callback = (error: AWSError, data: DeleteObjectOutput) => {
          if (error) {
            reject(prettify(error));
          } else {
            // Note: The response is actually {} with no fields
            // Issue: https://github.com/aws/aws-sdk-js/issues/1197#issuecomment-258919580
            resolve(data);
          }
        };
        S3Instance.deleteObject(parameters, callback);
      }
    );

    // Can assume that if an error is not thrown, it was successful
    if (response) {
      success = true;
    }
  } catch (error) {
    console.log(error);
  }

  return success;
};
