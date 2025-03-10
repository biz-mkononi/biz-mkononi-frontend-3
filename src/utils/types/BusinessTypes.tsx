type Owner = {
  name: string;
  id: string;
  email: string;
  phone: string;
};

export interface BusinessResponse {
  name: string;
  businessEmail: string;
  businessPhone: string;
  description: string;
  latitude: number;
  longitude: number;
  location: string;
  locationDetails: string;
  productType: string;
  id: string;
  owner: Owner;
}
export type AddBusinessFormInputs = {
  businessPhone: string;
  name: string;
  businessEmail: string;
  location: string;
  locationDetails: string;
  productType: string;
  description: string;
  longitude: number;
  latitude: number;
};
