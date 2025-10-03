// Flight Order Types
export interface Airport {
  Gate: string | null;
  Terminal: string | null;
  AirportName: string;
  CodeContext: string | null;
  LocationCode: string;
}

export interface Equipment {
  AirEquipType: string;
  ChangeofGauge: string | null;
  AircraftTailNumber: string;
}

export interface MarketingAirline {
  Code: string;
  CompanyShortName: string;
}

export interface OperatingAirline {
  Code: string;
  CompanyShortName: string;
  FlightNumber: string;
}

export interface BaggageAllowance {
  UnitOfMeasure: string;
  UnitOfMeasureCode: string;
  UnitOfMeasureQuantity: string;
}

export interface FlightLoadInfo {
  AuthorizedSeatQty: string | null;
  NRSA_StandbyPaxQty: string | null;
  RevenuePaxQty: string | null;
}

export interface MarketingCabin {
  BaggageAllowance: BaggageAllowance;
  FlightLoadInfo: FlightLoadInfo;
  Meal: string | null;
}

export interface TPAExtensions {
  AgencyCode: string | null;
  Destination: string;
  DestinationFa: string;
  FlightType: string;
  IsCharter: boolean;
  IsForeign: boolean;
  IsLock: boolean;
  Origin: string;
  OriginFa: string;
  Stop: number;
}

export interface BookingClassAvail {
  Meal: string | null;
  ResBookDesigCode: string | null;
  ResBookDesigQuantity: string | null;
  ResBookDesigStatusCode: string | null;
}

export interface FlightSegmentTPAExtensions {
  AirlineNameFa: string;
  ArrivalDateG: string;
  ArrivalDateJ: string;
  ArrivalTime: string;
  DepartureDateG: string;
  DepartureDateJ: string;
  Destination: string;
  DestinationFa: string;
  FlightTime: string;
  Origin: string;
  OriginFa: string;
}

export interface FlightSegment {
  ArrivalAirport: Airport;
  ArrivalDateTime: string;
  BookingClassAvail: BookingClassAvail;
  CabinClassCode: string;
  Comment: string;
  ConnectionTime: string;
  ConnectionTimePerMinute: number;
  DepartureAirport: Airport;
  DepartureDateTime: string;
  Equipment: Equipment;
  FlightNumber: string;
  JourneyDuration: string;
  JourneyDurationPerMinute: number;
  MarketingAirline: MarketingAirline;
  MarketingCabin: MarketingCabin;
  OperatingAirline: OperatingAirline;
  ResBookDesigCode: string;
  SeatsRemaining: number;
  TPA_Extensions: FlightSegmentTPAExtensions;
}

export interface OriginDestinationInformation {
  ArrivalDateTime: string;
  DepartureDateJ: string;
  DepartureDateTime: string;
  DestinationLocation: string;
  FlightSegment: FlightSegment[];
  JourneyDuration: string;
  JourneyDurationPerMinute: number;
  OriginLocation: string;
  TPA_Extensions: TPAExtensions;
}

export interface Passenger {
  BirthDate: string;
  Comment: string;
  Email: string;
  Gender: string;
  GivenName: string;
  Id: string;
  Mobile: string;
  MobileCode: string;
  NamePrefix: string;
  NationalId: string;
  Nationality: string;
  PassengerId: string;
  PassengerTypeCode: string;
  PassportExpireDate: string;
  PassportNO: string;
  ReferenceId: string;
  SurName: string;
}

export interface OfferData {
  OriginDestinationInformation: OriginDestinationInformation;
  Passengers: Passenger[];
  TotalPrice: string;
}

export interface FlightOrder {
  created_at: string;
  offer_data: OfferData;
  status: number;
}

// Hotel Order Types
export interface HotelInfo {
  Address: string;
  CheckInDate: string;
  CheckOutDate: string;
  CityName: string;
  CountryCode: string;
  CorrectName: {
    en: string;
    fa: string;
  };
  HotelId: string;
  HotelName: string;
  HotelPicture: string[];
  Lat: string;
  Lng: string;
  Rating: number;
  Residence: number;
  TripAdvisorRating: number;
  TripAdvisorReviewUrl: string;
  Type: string;
}

export interface HotelContacts {
  Email: string;
  SendToProvider: boolean;
  Telephone: string;
  sendDetails: boolean;
}

export interface HotelRoom {
  MaxInfantAge: number;
  MealTypeSubSystem: string;
  Promotion: string;
  RoomType: string;
  RoomTypeId: number;
  RoomTypeName: string;
  UsedExtra: number;
}

export interface HotelRoomCombination {
  Rooms: HotelRoom[];
}

export interface HotelItem {
  Items: {
    Combinations: HotelRoomCombination[];
  };
}

export interface HotelOrderDetail {
  Items: HotelItem[];
}

export interface HotelOfferData {
  HotelInfo: HotelInfo;
  NumberOfRooms: number;
  Passengers: Passenger[];
  TotalPrice: string;
  contacts: HotelContacts;
}

export interface HotelOrder {
  offer_data: HotelOfferData;
  order_detail: HotelOrderDetail;
  status: number;
}
