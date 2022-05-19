declare type OrderStatusT =
  | 'pending'
  | 'processing'
  | 'on-hold'
  | 'completed'
  | 'cancelled'
  | 'refunded'
  | 'failed'
  | 'trash';
declare type OrderReasonT =
  | 'Viaje'
  | 'Otro'
  | 'Sospecha por contacto estrecho'
  | 'Sospecha por síntomas';

declare type OrderDocumentT = 'rut';
declare type OrderUserT = {
  fullname: string;
  document: OrderDocumentT;
  rut: string;
  passport: string;
  birthday: string;
  gender: string;
  phone: string;
  email: string;
};
declare type OrderBillingT = {
  firstName: string;
  lastname: string;
  address1: string;
  address2: string;
  state: string;
  city: string;
  email: string;
  phone: string;
  paymentMethod: PaymentMethodT;
  paymentMethodTitle: PaymentMethodTitleT;
};
declare type OrderItemT = {
  id: number;
  name: string;
  productId: number;
  quantity: number;
  subtotal: string;
  total: string;
  price: number;
};
declare type OrderT = {
  orderId: string;
  orderNumber: string;
  datePaid: string | null;
  status: OrderStatusT;
  total: string;
  billing: OrderBillingT;
  contactInfo: {
    fullname: string;
    phone: string;
    email: string;
    totalAmount: string;
    reason: OrderReasonT;
  };
  items: OrderItemT[];
  users: OrderUserT[];
  wooDateCreated?: string;
  wooDateModified?: string;
};
