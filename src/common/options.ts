import { SignatureLike, TypedDataDomain, TypedDataField } from "ethers";

export type EIP1271DataOptions = {
  address: string;
  signature: string | SignatureLike;
  message: string | Uint8Array;
  prefix?: string, 
  suffix?: string
}


export type EIP712DataOptions = {
  address: string,
  signature: string | SignatureLike,
  domain?: TypedDataDomain, 
  types?: Record<string, Array<TypedDataField>>,
  message?: Record<string, any>,
}


export type EIP191DataOptions = {
  address: string,
  signature: string | SignatureLike,
  message: string | Uint8Array,
  validator?: string,
  nonce?: string,
}

// type CreateMutable<Type> = {
//   -readonly [Property in keyof Type]: Type[Property];
// };

type StandardDataTypes = {
  eip191: EIP191DataOptions
  EIP191: EIP191DataOptions
}

// type VerifierStandardMapping<Type, Property> = Type[Property];


// export type VerifierDataOptions<T extends SignatureStandard> = VerifierStandardMapping;