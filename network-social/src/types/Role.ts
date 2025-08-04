export interface IAccount {
  id?: number; // deixa opcional OU só number se sempre vier
  role: string; // ou 'ADMIN' | 'USER' se quiser mais estrito
}
