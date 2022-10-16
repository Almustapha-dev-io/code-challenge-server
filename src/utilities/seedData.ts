// password
const defaultPassword =
  '$2b$10$Swg3VO4ZogzHn1RwzTAI2e4dJ2RieQVUVM3CKcrwVqvDJUMBBC/1m';
export const UserSeed = [
  {
    userName: 'frontdesk',
    firstName: 'Admin',
    lastName: 'Admin',
    role: 0,
    password: defaultPassword,
  },
  {
    userName: 'doctor1',
    firstName: 'Doctor 1',
    lastName: 'Doctor 1',
    role: 1,
    password: defaultPassword,
    specialization: 'General Medicine,Internal Medicine',
  },
  {
    userName: 'doctor2',
    firstName: 'Doctor 2',
    lastName: 'Doctor 2',
    role: 1,
    password: defaultPassword,
    specialization: 'General Medicine,Gastroenterology',
  },
  {
    userName: 'doctor3',
    firstName: 'Doctor 3',
    lastName: 'Doctor 3',
    role: 1,
    password: defaultPassword,
    specialization: 'General Medicine,Gastroenterology,Internal Medicine',
  },
];
