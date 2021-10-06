export const schema = {
    "models": {
        "PatientInfo": {
            "name": "PatientInfo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "address": {
                    "name": "address",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "deviceNo": {
                    "name": "deviceNo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "diagnosisInfo": {
                    "name": "diagnosisInfo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "NHYAclass": {
                    "name": "NHYAclass",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "cardiologist": {
                    "name": "cardiologist",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "hospitalName": {
                    "name": "hospitalName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "hospitalLocation": {
                    "name": "hospitalLocation",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "targetWeight": {
                    "name": "targetWeight",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "targetActivity": {
                    "name": "targetActivity",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "riskLevel": {
                    "name": "riskLevel",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "gender": {
                    "name": "gender",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "birthDate": {
                    "name": "birthDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "language": {
                    "name": "language",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "emergencyContactName": {
                    "name": "emergencyContactName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "emergencyContactNumber": {
                    "name": "emergencyContactNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "fluidIntakeGoal": {
                    "name": "fluidIntakeGoal",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "configured": {
                    "name": "configured",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "PatientInfos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "patientID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read",
                                    "update"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "MedicationInfo": {
            "name": "MedicationInfo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "dosage": {
                    "name": "dosage",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "frequency": {
                    "name": "frequency",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "records": {
                    "name": "records",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "active": {
                    "name": "active",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "MedicationInfos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "medicationInfosByPatientID",
                        "fields": [
                            "patientID"
                        ],
                        "queryField": "listMedicationInfosByPatientID"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "patientID",
                                "allow": "owner",
                                "operations": [
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read",
                                    "update"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "ActivityInfo": {
            "name": "ActivityInfo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Actname": {
                    "name": "Actname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "Location": {
                    "name": "Location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "expectedFrequency": {
                    "name": "expectedFrequency",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "expectedDays": {
                    "name": "expectedDays",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "expectedDurationMinutes": {
                    "name": "expectedDurationMinutes",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "recordDateTime": {
                    "name": "recordDateTime",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ActivityInfos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "activityInfosByPatientID",
                        "fields": [
                            "patientID"
                        ],
                        "queryField": "listActivityInfosByPatientID"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "MedCompliant": {
            "name": "MedCompliant",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "MedId": {
                    "name": "MedId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "MedicationInfo": {
                    "name": "MedicationInfo",
                    "isArray": false,
                    "type": {
                        "model": "MedicationInfo"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "MedId"
                    }
                },
                "Verification": {
                    "name": "Verification",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "Date": {
                    "name": "Date",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "MedCompliants",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "medCompliantsByPatientID",
                        "fields": [
                            "patientID"
                        ],
                        "queryField": "listMedCompliantsByPatientID"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "medCompliantsByDate",
                        "fields": [
                            "patientID",
                            "Date"
                        ],
                        "queryField": "listMedCompliantsByDate"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "ReportSymptom": {
            "name": "ReportSymptom",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ActId": {
                    "name": "ActId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "ActivityInfo": {
                    "name": "ActivityInfo",
                    "isArray": false,
                    "type": {
                        "model": "ActivityInfo"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "ActId"
                    }
                },
                "Name": {
                    "name": "Name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "Severity": {
                    "name": "Severity",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "DateTime": {
                    "name": "DateTime",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "Summary": {
                    "name": "Summary",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ReportSymptoms",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "reportSymptomsByPatientID",
                        "fields": [
                            "patientID"
                        ],
                        "queryField": "listReportSymptomsByPatientID"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "reportSymptomsByDateTime",
                        "fields": [
                            "patientID",
                            "DateTime"
                        ],
                        "queryField": "listReportSymptomsByDateTime"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "ReportVitals": {
            "name": "ReportVitals",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "Temperature": {
                    "name": "Temperature",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Humidity": {
                    "name": "Humidity",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Weight": {
                    "name": "Weight",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "BPSys": {
                    "name": "BPSys",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "BPDi": {
                    "name": "BPDi",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "NoSteps": {
                    "name": "NoSteps",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "OxySat": {
                    "name": "OxySat",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "FluidIntake": {
                    "name": "FluidIntake",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "DateTime": {
                    "name": "DateTime",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ReportVitals",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "reportVitalsByPatientID",
                        "fields": [
                            "patientID"
                        ],
                        "queryField": "listReportVitalsByPatientID"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "reportVitalsByDateTime",
                        "fields": [
                            "patientID",
                            "DateTime"
                        ],
                        "queryField": "listReportVitalsByDateTime"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "MedicalRecord": {
            "name": "MedicalRecord",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "clinicianID": {
                    "name": "clinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "fileKey": {
                    "name": "fileKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "MedicalRecords",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "medicalRecordsByPatientID",
                        "fields": [
                            "patientID"
                        ],
                        "queryField": "listMedicalRecordsByPatientID"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "clinicianID",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "IcdCrtRecord": {
            "name": "IcdCrtRecord",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "clinicianID": {
                    "name": "clinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "dateTime": {
                    "name": "dateTime",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "fileKey": {
                    "name": "fileKey",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "IcdCrtRecords",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "icdCrtRecordsByDateTime",
                        "fields": [
                            "patientID",
                            "dateTime"
                        ],
                        "queryField": "listIcdCrtRecordsByDateTime"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "clinicianID",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        },
        "ClinicianInfo": {
            "name": "ClinicianInfo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "clinicianID": {
                    "name": "clinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "hospitalName": {
                    "name": "hospitalName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "role": {
                    "name": "role",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "contactNumber": {
                    "name": "contactNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "protectedInfo": {
                    "name": "protectedInfo",
                    "isArray": false,
                    "type": {
                        "model": "ClinicianProtectedInfo"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "clinicianID",
                        "targetName": "clinicianID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "ClinicianInfos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "clinicianID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "clinicianID",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Patients"
                                ],
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "EPs",
                                    "Nurses",
                                    "HFSpecialists",
                                    "MedicalOfficers",
                                    "Pharmacists"
                                ],
                                "operations": [
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ClinicianProtectedInfo": {
            "name": "ClinicianProtectedInfo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "clinicianID": {
                    "name": "clinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "facts": {
                    "name": "facts",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "APS": {
                    "name": "APS",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "DTA": {
                    "name": "DTA",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "UXSA": {
                    "name": "UXSA",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "NWA": {
                    "name": "NWA",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "ALA": {
                    "name": "ALA",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "MHA": {
                    "name": "MHA",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "CAM": {
                    "name": "CAM",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ClinicianProtectedInfos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "clinicianID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "clinicianID",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ClinicianPatientMap": {
            "name": "ClinicianPatientMap",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "clinicianInfo": {
                    "name": "clinicianInfo",
                    "isArray": false,
                    "type": {
                        "model": "ClinicianInfo"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "clinicianID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "ClinicianPatientMaps",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "clinicianID",
                            "patientID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "clinicianMappingsByPatientID",
                        "fields": [
                            "patientID",
                            "clinicianID"
                        ],
                        "queryField": "listClinicianMappingsByPatientID"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "clinicianID",
                                "allow": "owner",
                                "operations": [
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "patientID",
                                "allow": "owner",
                                "operations": [
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "provider": "iam",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "PatientAssignment": {
            "name": "PatientAssignment",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "clinicianID": {
                    "name": "clinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "patientName": {
                    "name": "patientName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "pending": {
                    "name": "pending",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "resolution": {
                    "name": "resolution",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "reassignToClinicianID": {
                    "name": "reassignToClinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "adminReassignFromClinicianID": {
                    "name": "adminReassignFromClinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "adminCompleted": {
                    "name": "adminCompleted",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "PatientAssignments",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "patientID",
                            "clinicianID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "pendingPatientAssignments",
                        "fields": [
                            "clinicianID",
                            "pending"
                        ],
                        "queryField": "listPendingPatientAssignments"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "patientID",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "clinicianID",
                                "allow": "owner",
                                "operations": [
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "allow": "private",
                                "provider": "iam",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Alert": {
            "name": "Alert",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "patientName": {
                    "name": "patientName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "dateTime": {
                    "name": "dateTime",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "summary": {
                    "name": "summary",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "colorCode": {
                    "name": "colorCode",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "triageValue": {
                    "name": "triageValue",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "vitalsReportID": {
                    "name": "vitalsReportID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "vitalsReport": {
                    "name": "vitalsReport",
                    "isArray": false,
                    "type": {
                        "model": "ReportVitals"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "vitalsReportID"
                    }
                },
                "symptomReportID": {
                    "name": "symptomReportID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "symptomReport": {
                    "name": "symptomReport",
                    "isArray": false,
                    "type": {
                        "model": "ReportSymptom"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "symptomReportID"
                    }
                },
                "pending": {
                    "name": "pending",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "completed": {
                    "name": "completed",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Alerts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "patientAlertsByDateTime",
                        "fields": [
                            "patientID",
                            "dateTime"
                        ],
                        "queryField": "listPatientAlertsByDateTime"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "pendingAlertsByDateTime",
                        "fields": [
                            "pending",
                            "dateTime"
                        ],
                        "queryField": "listPendingAlertsByDateTime"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "pendingRiskAlerts",
                        "fields": [
                            "pending",
                            "colorCode"
                        ],
                        "queryField": "listPendingRiskAlerts"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "completedRiskAlerts",
                        "fields": [
                            "completed",
                            "colorCode"
                        ],
                        "queryField": "listCompletedRiskAlerts"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read",
                                    "update"
                                ],
                                "groupField": "groups"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Patients"
                                ],
                                "operations": [
                                    "create"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "Todo": {
            "name": "Todo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "clinicianID": {
                    "name": "clinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "patientName": {
                    "name": "patientName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "notes": {
                    "name": "notes",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "lastModified": {
                    "name": "lastModified",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "alertID": {
                    "name": "alertID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "alert": {
                    "name": "alert",
                    "isArray": false,
                    "type": {
                        "model": "Alert"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "alertID"
                    }
                },
                "pending": {
                    "name": "pending",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "completed": {
                    "name": "completed",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Todos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "pendingTodosByLastModifiedDate",
                        "fields": [
                            "pending",
                            "lastModified"
                        ],
                        "queryField": "listPendingTodosByLastModifiedDate"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "completedTodosByLastModifiedDate",
                        "fields": [
                            "completed",
                            "lastModified"
                        ],
                        "queryField": "listCompletedTodosByLastModifiedDate"
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "todosByAlertID",
                        "fields": [
                            "clinicianID",
                            "alertID"
                        ],
                        "queryField": "listTodosByAlertID"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "operations": [
                                    "read",
                                    "update"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "EPs",
                                    "Nurses",
                                    "HFSpecialists",
                                    "MedicalOfficers",
                                    "Pharmacists"
                                ],
                                "operations": [
                                    "create"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "AlertNotification": {
            "name": "AlertNotification",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "alertID": {
                    "name": "alertID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "AlertNotifications",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Patients"
                                ],
                                "operations": [
                                    "create",
                                    "read"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "EPs",
                                    "Nurses",
                                    "HFSpecialists",
                                    "MedicalOfficers",
                                    "Pharmacists"
                                ],
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "ClinicianRecord": {
            "name": "ClinicianRecord",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "patientID": {
                    "name": "patientID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "documentID": {
                    "name": "documentID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "title": {
                    "name": "title",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "path": {
                    "name": "path",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "uploaderClinicianID": {
                    "name": "uploaderClinicianID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "uploadDateTime": {
                    "name": "uploadDateTime",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "ClinicianRecords",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "patientID",
                            "documentID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "uploadedClinicianRecordsByPatientID",
                        "fields": [
                            "patientID",
                            "uploadDateTime"
                        ],
                        "queryField": "listUploadedClinicianRecordsByPatientID"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groups": [
                                    "Admin"
                                ],
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "provider": "iam",
                                "operations": [
                                    "create",
                                    "read",
                                    "update"
                                ]
                            },
                            {
                                "groupClaim": "cognito:groups",
                                "provider": "userPools",
                                "allow": "groups",
                                "groupsField": "patientID",
                                "operations": [
                                    "read"
                                ],
                                "groupField": "groups"
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "7a4b1e187562b6aa352560662c961929"
};