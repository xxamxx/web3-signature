import { SignatureLike, TypedDataDomain, TypedDataField, verifyMessage, verifyTypedData } from "ethers";
import { EIP712DataOptions } from "./common/options";
import { IVerifier } from "./common/verifier";

type MessageOptions = {
  address: string,
  signature: SignatureLike,
  message: string | Uint8Array,
}

type TypedDataOptions = {
  address: string,
  signature: SignatureLike,
  domain: TypedDataDomain, 
  types: Record<string, Array<TypedDataField>>,
  message: Record<string, any>,
}

/**
 * https://eips.ethereum.org/EIPS/eip-712
 * @see [eip712](https://eips.ethereum.org/EIPS/eip-712)
 */
export class EIP712 implements IVerifier {

  verify(data: EIP712DataOptions): boolean {
    return this.verifyTypedData(data as TypedDataOptions);
  }
  
  private verifyMessage(data: MessageOptions) {
    const result = verifyMessage(data.message, data.signature);
    
    return data.address === result;
  }

  private verifyTypedData(data: TypedDataOptions) {
    const result = verifyTypedData(data.domain, data.types, data.message, data.signature);
    
    return data.address === result;
  }

}