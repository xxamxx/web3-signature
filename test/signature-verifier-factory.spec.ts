import { Wallet, concat, keccak256, toUtf8Bytes } from "ethers";
import { SignatureVerifierFactory } from "../src";

describe("SignatureVerifierFactory", () => {
  const MESSAGE = "the test message";
  let signer;

  beforeAll(async () => {
    signer = Wallet.createRandom();
  });

  describe("EIP-191", () => {
    let verifier;

    beforeAll(() => {
      verifier = SignatureVerifierFactory.createVerifier("EIP191");
    });

    function hash(message: Uint8Array | string): string {
      if (typeof(message) === "string") { message = toUtf8Bytes(message); }
      return keccak256(concat([
          toUtf8Bytes(String(message.length)),
          message
      ]));
    }

    // TODO confirm 0x00 version sign way
    it("verify 0x00", () => {
      console.log('default sign', signer.signingKey.sign(hash(MESSAGE)).serialized);
      const result = verifier.verify({
        address: signer.address,
        signature: signer.signingKey.sign(hash(MESSAGE)).serialized,
        message: MESSAGE,
      });

      expect(result).toBeTruthy();
    });

    it("verify 0x45(personal sign)", () => {
      console.log('personal sign', signer.signMessageSync(MESSAGE));
      
      const result = verifier.verify({
        address: signer.address,
        signature: signer.signMessageSync(MESSAGE),
        message: MESSAGE,
      });

      expect(result).toBeTruthy();
    });
  });

  describe("EIP-712", () => {
    let verifier;

    beforeAll(() => {
      verifier = SignatureVerifierFactory.createVerifier("EIP712");
    });

    // https://github.com/centrehq/verite/blob/main/packages/verite/test/lib/verifier/result.test.ts#L46
    it("verify type data", async () => {
      const domain = {
        name: "VerificationRegistry",
        version: "1.0",
        chainId: 1337,
        verifyingContract: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      };
      const types = {
        VerificationResult: [
          { name: "schema", type: "string" },
          { name: "subject", type: "address" },
          { name: "expiration", type: "uint256" },
        ],
      };

      const expiration = Math.floor(Date.now() / 1000) + 300; // 5 mins

      const verificationResult = {
        schema: "centre.io/credentials/kyc",
        subject: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        expiration,
      };

      // sign the structured result
      const signature = await signer.signTypedData(
        domain,
        types,
        verificationResult
      );

      const result = verifier.verify({
        address: signer.address,
        signature,
        domain,
        types,
        message: verificationResult,
      });

      expect(result).toBeTruthy();
    });
  });

  describe("EIP-1271", () => {
    let verifier;

    beforeAll(() => {
      verifier = SignatureVerifierFactory.createVerifier("EIP1271");
    });

    it("verify message", () => {
      const result = verifier.verify({
        address: signer.address,
        signature: signer.signMessageSync(MESSAGE),
        message: MESSAGE,
      });

      expect(result).toBeTruthy();
    });
  });
});
