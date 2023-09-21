import { concat, keccak256, recoverAddress, toUtf8Bytes } from 'ethers';
import { EIP1271DataOptions } from './common/options';
import { IVerifier } from './common/verifier';
/**
 * https://eips.ethereum.org/EIPS/eip-1271
 * @see [eip1271](https://eips.ethereum.org/EIPS/eip-1271)
 */
export class EIP1271 implements IVerifier {
  static readonly MAGICVALUE = '0x1626ba7e';
  static readonly MESSAGE_PREFIX = "\x19Ethereum Signed Message:\n";

  verify(data: EIP1271DataOptions): boolean {
    const result = recoverAddress(
      this.getSignatureDigest(data.message, {
        prefix: data.prefix, 
        suffix: data.suffix,
      }),
      data.signature,
    );

    return data.address === result;
  }

  private getSignatureDigest(message: string | Uint8Array, options?: {prefix?: string, suffix?: string}) {
    if (typeof message === 'string') {
      message = toUtf8Bytes(message);
    }

    return keccak256(concat([
      toUtf8Bytes(options?.prefix || EIP1271.MESSAGE_PREFIX),
      toUtf8Bytes(String(message.length)), 
      message,
      toUtf8Bytes(options?.suffix || ''),
    ]));
  }
}
