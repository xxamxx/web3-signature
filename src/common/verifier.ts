
export interface IVerifier {
  verify(data: any): boolean | Promise<boolean>;
}