export type AmplifyDependentResourcesAttributes = {
  auth: {
    reportcarecee80c6fcee80c6f: {
      UserPoolId: "string";
      UserPoolArn: "string";
      UserPoolName: "string";
      AppClientIDWeb: "string";
      AppClientID: "string";
      CreatedSNSRole: "string";
    };
  };
  api: {
    reportcare: {
      GraphQLAPIIdOutput: "string";
      GraphQLAPIEndpointOutput: "string";
    };
  };
  storage: {
    s3clinicianrecords: {
      BucketName: "string";
      Region: "string";
    };
  };
  function: {
    reportcarelambdalayer: {
      Arn: "string";
    };
    patientassignmenthandler: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
    };
    s3clinicianrecordsbridge: {
      Name: "string";
      Arn: "string";
      Region: "string";
      LambdaExecutionRole: "string";
    };
  };
};
