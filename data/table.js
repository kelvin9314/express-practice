export const BookList = [
  {
    Book: '0001', //PK
    isbn: '', //PK
    totalQuantity: 1,
    availableQuantity: 1,
    title: '',
    author: '',
    yearOfPublication: '',
    status: '', // Free , Occupied or Disable
    category: '', // UCD, DEV, MNG , ENT, COD, MAG
    currentBorrowerId: '', //FK && this data only visible by Admin
    donorID: '', // FK
    remind: ''
  }
];

export const RentalRecord = [
  {
    rentalId: '', // PK
    startDate: moment(),
    endDate: moment(),
    bookId: '', //Fk
    borrower: '' // Fk
  }
];

export const User = [
  {
    employeeID: '', //PK
    name: '',
    email: '',
    password: ''
  }
];
