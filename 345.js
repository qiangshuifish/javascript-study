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


const param = {
        "equipmentVesion": 11.399999618530273,
        "uid": "6a5d8dff-46a8-4a8c-8792-0664ce74d51c",
        "appVersion": "6.1.9",
        "interfaceVesion": "1.0",
        "cityCode": "110000",
        "productCode": "8a90a5f8593e65b501593e65b5200000",
        "uuid": "31B52CF5-A0BA-4206-A751-D378EFD78818",
        "timestamp": 1541161695247,
        "dataSource": "10",
        // "token": "c0f6ccd7-349e-48d3-993e-d0992565bfdf"
    }
;


const form = {
    //参数名称
    "2y5QfvAy":Encrypt(JSON.stringify(param)),
    //参数md5
    "hPtJ39Xs":CryptoJS.MD5(JSON.stringify(param)).toString()

};

console.log(form);
//测试环境地址
fetch('https://tmovessmsapis.ziroom.com/zrk/move/customerOrder/serviceItemList', { method: 'POST', body: form })
    .then(res => res.text())
    .then(body => console.log(Decrypt(body)));