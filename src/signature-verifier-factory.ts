import { SignatureStandard } from "./common/standard";
import { IVerifier } from "./common/verifier";
import { EIP1271 } from "./eip1271";
import { EIP191 } from "./eip191";
import { EIP712 } from "./eip712";

/**
 * signature verifier factory
 * @see [supported standard](./common/standard.ts)
 */
export class SignatureVerifierFactory {
  
  static createVerifier(standard: SignatureStandard): IVerifier | null {
    switch (standard.toUpperCase()) {
      case 'EIP191':
        return new EIP191();

      case 'EIP712':
        return new EIP712();
        
      case 'EIP1271':
        return new EIP1271();

      default:
        return null;
    }
  }
  
}
