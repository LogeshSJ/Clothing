export interface Address {
  id?: number;
  name: string;
  address: string;
  city: string;
  zipcode: string;
  userId?: number;
  selected?: boolean;
  phoneNumber: number;
}

// "userId":1,
//     "address":"Kathan Street",
//     "city":"Chengalpattu",
//     "zipcode":603002
