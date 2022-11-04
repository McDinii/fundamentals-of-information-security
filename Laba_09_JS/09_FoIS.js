 const array = new Uint8Array(1);
for (let i=0; i<5; ++i) {
 console.log(crypto.getRandomValues(array));
}
 (async function(){
  const params = {name:'AES-GCM',length:128};
  const keyUsages = ['encrypt','decrypt'];
  const key = await crypto.subtle.generateKey(params,true,keyUsages);
  console.log(key);
 const original = new TextEncoder().encode('Nechay-Nitsevich');
 const encrypted = {name:'AES-GCM',iv:new Uint8Array(16)};
 const ciphtext = await crypto.subtle.encrypt(encrypted,key,original);
 console.log(ciphtext);
 const decrypted= await crypto.subtle.decrypt(encrypted,key,ciphtext);
 console.log(new TextDecoder().decode(decrypted));
 })();

const text ="Nechay-Nitsevich";
async function digestMessage(message){
 const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hash = await crypto.subtle.digest('SHA-384',data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2,'0')).join('');
    return hashHex;
}
digestMessage(text).then((digestBuffer) => console.log(digestBuffer));

(async function() {
 const keyFormat = 'raw';
 const extractable = true;
 const wrappingKeyAlgoIdentifier = 'AES-KW';
 const wrappingKeyUsages = ['wrapKey', 'unwrapKey'];
 const wrappingKeyParams = {
 name: wrappingKeyAlgoIdentifier,
 length: 256};
 const keyAlgoIdentifier = 'AES-GCM';
 const keyUsages = ['encrypt'];
 const keyParams = {
 name: keyAlgoIdentifier,
 length: 256};
 const wrappingKey = await crypto.subtle.generateKey(wrappingKeyParams,
 extractable, wrappingKeyUsages);
 console.log(wrappingKey);
const key = await crypto.subtle.generateKey(keyParams, extractable, keyUsages);
 console.log(key);
const wrappedKey = await crypto.subtle.wrapKey(keyFormat, key, wrappingKey,
 wrappingKeyAlgoIdentifier);
 console.log(wrappedKey);
const unwrappedKey = await crypto.subtle.unwrapKey(keyFormat, wrappedKey,
 wrappingKey, wrappingKeyParams, keyParams, extractable, keyUsages);
 console.log(unwrappedKey);
})()
