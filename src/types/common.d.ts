declare type CurrencyT = 'CLP' | any;
declare type CurrencySymbolT = '$' | any;
declare type PaymentMethodT = 'khipuwebpay' | any;
declare type PaymentMethodTitleT = 'WebPay' | 'PayPal' | any;
declare type ChannelT = 'woocommerce' | 'direct';
declare type LooseObject = {
  [key: string]: any;
};
declare type Exam = {
  id: string;
  title: string;
  price: number;
  description: string;
  resultTime: string;
  code: string;
  searchTags?: string[];
  tags?: string[];
  reason?: string;
  category?: string;
  enabled: boolean;
  highlight: boolean;
  isFast: boolean;
  isLabOnly: boolean;
  isCovid: boolean;
  completeTitle: string;
  user: UserT;
  userId: string;
  isVisible?: boolean;
};

declare type UserT = {
  rut: string;
  passport: string;
  name: string;
  lastName: string;
  secondLastName: string;
  birthdate: string;
  gender: string;
  phone: string;
  email: string;
  userId?: string;
  documentType: number;
};

declare type Booking = {
  stateName: string;
  province: string;
  address: string;
  addressDetail: string;
  addressNumber: string;
  blockId: string;
  start: string;
  end: string;
  date: string;
  isLab: boolean;
  isFast: boolean;
  isCovid: boolean;
};

declare type Order = {
  id: string;
  testReason: string;
  booking: Booking;
  exams: Exam[];
  payment: {
    amount: string;
    commerceOrder: string;
    paymentDate: string;
    status: number;
  };
  paymentMethod: string;
  isCanceled: boolean | null;
  orderNumber: number;
};
