/**
 * plaintext: message to encrypt
 * pubkey: public key of recipient
 * passphrase: passphrase for my private key
 *
 * Returns promise with ASCII armored PGP message
 */
var pgpEncrypt = function(plaintext, pubkey, passphrase) {
    var options = {
        data: plaintext,                             // input as String (or Uint8Array)
        publicKeys: openpgp.key.readArmored(pubkey).keys  // for encryption
    };

    return openpgp.encrypt(options).then(function(ciphertext) {
        return ciphertext.data;
    });
};

/**
 * ciphertext: ASCII armored PGP message
 * privkey: my private key
 * passphrase: passphrase for my private key
 *
 * Returns promise with plaintext string
 */
var pgpDecrypt = function(ciphertext, privkey, passphrase) {
    var privKeyObj = openpgp.key.readArmored(privkey).keys[0];
    privKeyObj.decrypt(passphrase);

    var options = {
        message: openpgp.message.readArmored(ciphertext),     // parse armored message
        privateKey: privKeyObj // for decryption
    };

    return openpgp.decrypt(options).then(function(plaintext) {
        return plaintext.data; // 'Hello, World!'
    });
};

$(function() {
    var pubkey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: BCPG C# v1.6.1.0

mQENBFj6XP0BCACbZFDa9jnLGqATZMpQRrYgyC/KSEbp6xHfKthWODaWeDu7WADV
c8vwoF7/lp1CkB/tJsNl0gz3cpJ8B564bnnyHleMLj1ZUPbc1uNOGe4250nv27nr
SwmmdEGjM6W+J8S0nC0AmSsv0umcrYHEEAzw2f3Mc0Xa/LokBrWRJTScw/SYQ87L
nxzMxvnViHhFye+kkzSx5EDlJ+mV2znRXFOlM6mCBhO10oLz5KsjRnetx2C4bMHp
0Hi9ja+B1dNYTr9mUcfCMQI2CZniIbzspmIy5yfsk5gs/0egndAwnauXc3QgEOrV
i91WFHk7F26ZoAtnq09vy1tOjgVBmLObxCrlABEBAAG0AIkBHAQQAQIABgUCWPpc
/QAKCRB5jY1P3TaX2wbiB/0edjkRN3fxDJN62FHtnUhFJ9jpQ1wT59r9fzJWEpOf
heeseE2l7ys4d5JG6eHXSof48T+y1rFVujBJu6avV8zdZc/LEVBFXg88IKl3uzA+
H2/YmeapyoCODqxBPx3/+95Bz+SLfPtBmthluFW3NXMVYxvPv/nqmbDkuifXkbLm
/TnPWCQpBEjh4a3f+LOmytmRBvrWQ08GdYujgto9vUG+JpkyFsRccp1mzK6t4OEY
dbeeQt2oA/8RBKmyaylak47PszZHcpyZyV8Ug9Q0d+QYYSJqMch2uqgp3w5FFk5z
fey4nbl056mu3PqmMrbOVWNClP5DjTqjm4q8MVoCcT8F
=xRD9
-----END PGP PUBLIC KEY BLOCK-----`;

    var privkey = `-----BEGIN PGP PRIVATE KEY BLOCK-----
Version: BCPG C# v1.6.1.0

lQOsBFj6XP0BCACbZFDa9jnLGqATZMpQRrYgyC/KSEbp6xHfKthWODaWeDu7WADV
c8vwoF7/lp1CkB/tJsNl0gz3cpJ8B564bnnyHleMLj1ZUPbc1uNOGe4250nv27nr
SwmmdEGjM6W+J8S0nC0AmSsv0umcrYHEEAzw2f3Mc0Xa/LokBrWRJTScw/SYQ87L
nxzMxvnViHhFye+kkzSx5EDlJ+mV2znRXFOlM6mCBhO10oLz5KsjRnetx2C4bMHp
0Hi9ja+B1dNYTr9mUcfCMQI2CZniIbzspmIy5yfsk5gs/0egndAwnauXc3QgEOrV
i91WFHk7F26ZoAtnq09vy1tOjgVBmLObxCrlABEBAAH/AwMCbT4Ps2DpaGxg6flo
o92JzZqjmkEaSDblW/kOwjL6ocYWxbqX/UrbCPpBZHghhi+E6B0YN67KEKkuiGXs
QX2yjWUv4/QD9veH34VnfpGRvaHlguk01ARmjxxFW8DT4s1udAScHLIm1ED1iVn3
MVsb5UfENck1XxRHqai9iM6qZCIER1oYPbKbgYY0mzqIN8O7tsRRtqdyiHRyjx/n
0Keg+j5jocY0CjsdnpuIXDdjPDJn/vyiPLZjpL6YcWPu2vKHoqzha+tCL39nPM1w
KemnMxUZHv0/kVEyv28kyZJl27m492SHAn21Jc7/7T2sV31Htcg7Oc1SYNwbX37L
y0PCdILi5XQ7dgyO5YOHWbVpaCnr1+/ntptYlU1dzVX3fn/GwHiLrYpa3hBwPyZq
DGg4ho3zfP6Y0Ds2jYAEetA0gfnvFW0z3aGLwnf66y6r9zJk5woXCyy8qWTzGSVC
pk9r+w5ku/ORtH8hQuWTshbnT3QXLZza0ItQYNEh1ZjAeUkA/7gHQK9B+lpCas4o
Jce9TIShW8HDvPbAB+tQc7sqFmGuwfa0ECKfcTPaWuGREWmwOVl2Sbj1mwHjaPt5
7bwOByQ3tKXQi6hggO7ry6SUJ/0N3ats1S4zz77pIltG1aY+WYDiFby51M8Dc6wJ
EVM+/L7XzLrk1f542SJW5nMBGXqotxsHPRRRrWICwPG8yW9wv2FKkRTm7OG6l+gL
Wc7k2N58OofGOlV8rUcuNTJf8MbcgbHnSJm8WWAfRL83f/P3pjX/gxVDbuWOl0oN
+KXBfKmnhQ/fGqIJEJcBeIST0K4+uzrs8kv/USmPvKIvLVpgFlYaVxF7qa2g5MvU
DsmRvotW6phWPPSXagOK+EIt98gtn8SA1cdXCAVOvLQAiQEcBBABAgAGBQJY+lz9
AAoJEHmNjU/dNpfbBuIH/R52ORE3d/EMk3rYUe2dSEUn2OlDXBPn2v1/MlYSk5+F
56x4TaXvKzh3kkbp4ddKh/jxP7LWsVW6MEm7pq9XzN1lz8sRUEVeDzwgqXe7MD4f
b9iZ5qnKgI4OrEE/Hf/73kHP5It8+0Ga2GW4Vbc1cxVjG8+/+eqZsOS6J9eRsub9
Oc9YJCkESOHhrd/4s6bK2ZEG+tZDTwZ1i6OC2j29Qb4mmTIWxFxynWbMrq3g4Rh1
t55C3agD/xEEqbJrKVqTjs+zNkdynJnJXxSD1DR35BhhImoxyHa6qCnfDkUWTnN9
7LiduXTnqa7c+qYyts5VY0KU/kONOqObirwxWgJxPwU=
=0hsu
-----END PGP PRIVATE KEY BLOCK-----`;

    var passphrase = ''; //what the privKey is encrypted with

    pgpEncrypt('Hello world 你好', pubkey, passphrase)
        .then(function(ciphertext) {
            return pgpDecrypt(ciphertext, privkey, passphrase);
        })
        .then(function(plaintext) {
        });
});
