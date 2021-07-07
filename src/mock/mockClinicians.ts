import { ClinicianRowGeneralDetails } from "models/PersonRowDetails";

interface IMockClinicianDetails {
  generalDetails: ClinicianRowGeneralDetails;
  checked: boolean;
}

export const mockClinician: IMockClinicianDetails = {
  generalDetails: {
    id: "samuel@gmail.com",
    name: "Dr Samuel",
    occupation: "EP",
    location: "Melbourne"
  },
  checked: true
};
