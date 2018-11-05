const CryptoJS = require('crypto-js');
const fetch = require('node-fetch');

const key = CryptoJS.enc.Utf8.parse("vpRZ1kmU");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('EbpU4WtY');   //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.DES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.DES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
};


const form = {
    //参数名称
    "2y5QfvAy":Encrypt("{\n" +
        "\n" +
        "\t\"productCode\": \"8a90a5f8593e65b501593e65b5200000\",\n" +
        "\n" +
        "\t\"cityCode\": \"110000\",\n" +
        "\n" +
        "\t\"dataSource\": \"11\",\n" +
        "\n" +
        "\t\"timestamp\": 1443001019683,\n" +
        "\t\n" +
        "\t\"uuid\": \"asdsadsadsaq\"\n" +
        "}\n"),
    //参数md5
    "hPtJ39Xs":CryptoJS.MD5("{\n" +
        "\n" +
        "\t\"productCode\": \"8a90a5f8593e65b501593e65b5200000\",\n" +
        "\n" +
        "\t\"cityCode\": \"110000\",\n" +
        "\n" +
        "\t\"dataSource\": \"11\",\n" +
        "\n" +
        "\t\"timestamp\": 1443001019683,\n" +
        "\t\n" +
        "\t\"uuid\": \"asdsadsadsaq\"\n" +
        "}\n").toString()
};

console.log(form);
//测试环境地址
fetch('https://tmovessmsapis.ziroom.com/zrk/move/customerOrder/serviceItemList', { method: 'POST', body: form })
    .then(res => res.text())
    .then(body => console.log(Decrypt(body)));