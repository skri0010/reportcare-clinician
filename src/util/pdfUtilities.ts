/* eslint-disable no-console */
import {
  getClinicianRecord,
  getPresignedUrlForClinicianRecords,
  PresignedUrlRecordType
} from "aws";
import { ClinicianRecord } from "aws/API";
import axios from "axios";
import { ClinicianRecordInput } from "rc_agents/model";
import { v4 as uuidv4 } from "uuid";

// Reads files (File)
const readFile: (file: File) => Promise<string | ArrayBuffer | null> = (
  file
) => {
  const promise: Promise<string | ArrayBuffer | null> = new Promise(
    (resolve, reject) => {
      const reader = new FileReader();

      reader.onabort = () =>
        reject(Error(`File ${file.name} reading was rejected`));
      reader.onerror = () => reject(Error(`File ${file.name} reading failed`));
      reader.onload = () => {
        // Process file into a binary string
        const binaryStr = reader.result;
        resolve(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    }
  );
  return promise;
};

// Generate a unique PDF document ID
const createPDFDocumentID: (fileName: string) => string = (fileName) => {
  const replacedTitle = fileName.replace(".pdf", "");
  const generatedID = uuidv4();
  return `${replacedTitle}-${generatedID}.pdf`;
};

interface RequestPDFParameters {
  method: "GET" | "POST" | "PUT";
  url: string;
  data: string | ArrayBuffer;
}

// Use axios to perform a GET/POST/PUT request
const axiosRequestForPDF: (
  parameters: RequestPDFParameters
) => Promise<boolean> = async ({ method, url, data }) => {
  let success = false;
  const response = await axios({
    method: method,
    url: url,
    data: data,
    headers: {
      "Content-Type": "application/pdf"
    }
  });

  if (response.status) {
    success = true;
  }
  return success;
};

interface UploadPDFParameters {
  recordInput: ClinicianRecordInput;
  recordType: PresignedUrlRecordType;
}

interface DownloadPDFParameters {
  clinicianRecord: ClinicianRecord;
}

export const uploadPDF: (
  parameters: UploadPDFParameters
) => Promise<ClinicianRecord | undefined> = async ({
  recordInput,
  recordType
}) => {
  let returnClinicianRecord: ClinicianRecord | undefined;
  const { title, file, patientID } = recordInput;
  try {
    // Convert file into ArrayBuffer
    const fileBinaryStr = await readFile(file);
    if (fileBinaryStr) {
      const documentID = createPDFDocumentID(file.name);
      // Lambda resolver: Get a presigned upload link
      const uploadResponse = await getPresignedUrlForClinicianRecords({
        recordType: recordType,
        operation: "Upload",
        patientID: patientID,
        documentID: documentID,
        documentTitle: title
      });

      if (uploadResponse.success && uploadResponse.url) {
        // Upload to S3
        const requestSuccess = await axiosRequestForPDF({
          method: "PUT",
          url: uploadResponse.url,
          data: fileBinaryStr
        });

        if (requestSuccess) {
          // Lamdba resolver: Acknowledge upload
          const acknowledgeResponse = await getPresignedUrlForClinicianRecords({
            patientID: patientID,
            operation: "Acknowledge",
            documentID: documentID,
            documentTitle: title,
            recordType: "Medical"
          });

          if (acknowledgeResponse.success) {
            // Get medical record details
            const getResult = await getClinicianRecord({
              patientID: patientID,
              documentID: documentID
            });
            if (getResult.data.getClinicianRecord) {
              returnClinicianRecord = getResult.data.getClinicianRecord;
            } else {
              throw Error("Failed to retrieve new record");
            }
          } else {
            throw Error("Failed to acknowledge upload");
          }
        } else {
          throw Error("Failed to upload via axios");
        }
      } else {
        throw Error("Failed to get upload url");
      }
    } else {
      throw Error(`Failed to convert ${file.name} to ArrayBuffer`);
    }
  } catch (error) {
    console.log(error);
  }
  return returnClinicianRecord;
};

export const downloadPDF: (
  parameters: DownloadPDFParameters
) => Promise<string | undefined> = async ({ clinicianRecord }) => {
  const { patientID, documentID, title, type } = clinicianRecord;
  let downloadUrl: string | undefined;
  try {
    const downloadResponse = await getPresignedUrlForClinicianRecords({
      patientID: patientID,
      operation: "Download",
      documentID: documentID,
      documentTitle: title,
      recordType: type as PresignedUrlRecordType
    });
    if (downloadResponse.success && downloadResponse.url) {
      downloadUrl = downloadResponse.url;
    } else {
      throw Error("Failed to get download url");
    }
  } catch (error) {
    console.log(error);
  }
  return downloadUrl;
};
