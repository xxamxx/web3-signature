import { concat, keccak256, recoverAddress, toUtf8Bytes, verifyMessage } from "ethers";
import { EIP191DataOptions } from "./common/options";
import { IVerifier } from "./common/verifier";

/**
 * https://eips.ethereum.org/EIPS/eip-191
 * @see [eip191](https://eips.ethereum.org/EIPS/eip-191)
 */
export class EIP191 implements IVerifier{

  verify(data: EIP191DataOptions): boolean {
    return data.validator ? this.verify0x00Signature(data) : this.verify0x45Signature(data);
  }
  
  private verify0x45Signature(data: EIP191DataOptions) {
    const result = verifyMessage(data.message, data.signature);
    
    return data.address === result;
  }

  private verify0x00Signature(data: EIP191DataOptions) {
    const result = recoverAddress(this.getSignatureDigest(data.address, data.message), data.signature);
    
    return data.address === result;
  }

  private getSignatureDigest(address: string, message: string | Uint8Array, options?: {prefix?: string, suffix?: string}) {
    if (typeof message === 'string') {
      message = toUtf8Bytes(message);
    }

    return keccak256(concat([
      toUtf8Bytes(options?.prefix || ''),
      toUtf8Bytes('0x19'),
      toUtf8Bytes('0'), 
      toUtf8Bytes(address),
      message,
      toUtf8Bytes(options?.suffix || ''),
    ]));
  }

}