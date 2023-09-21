# Web3 Signature (In development)

The Web3 Signature is a utility library for verifying Ethereum signatures using multiple standards. It provides a unified interface to simplify the signature verification process in your Ethereum-related projects.

## Features

- Supports signature verification according to multiple standards.
  - EIP-191(`0x00` and `0x45` version)
  - EIP-712(`0x01` version)
  - EIP-1271
- Easy-to-use API for signature validation.
- Compatible with popular web3 libraries and Ethereum development tools.

## Installation

You can install this package via npm:
NPM:

```bash
npm install web3-signature
```

YARN:

```bash
yarn add web3-signature
```

## Usage

Here's a basic example of how to use the package to verify an Ethereum signature:

```typescript
import { SignatureVerifierFactory } from "web3-signature";

const verifier = SignatureVerifierFactory.createVerifier("EIP191");

// Sample signature and message
const address = '0x...'; // Replace with your wallet address
const signature = '0x...'; // Replace with your signature
const message = 'Hello, Ethereum!'; // Replace with your message

// Verify the signature
const isValid = verifier.verify({
  address,
  message, 
  signature,
});

if (isValid) {
  console.log('Signature is valid.');
} else {
  console.error('Signature is not valid.');
}
```

For more detailed usage instructions and examples, please refer to the documentation.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions and bug reports are welcome! Feel free to open an issue or submit a pull request on the GitHub repository.

## Acknowledgments

Special thanks to the Ethereum community for their contributions to the standards and libraries that make this package possible.
This package was inspired by [mention-other-related-libraries-or-tools].

## Contact

If you have any questions or suggestions, please [create an issue](https://github.com/xxamxx/web3-signature/issues/new).
