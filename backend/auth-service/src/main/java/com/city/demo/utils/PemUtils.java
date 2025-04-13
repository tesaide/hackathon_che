package com.city.demo.utils;

import java.io.FileReader;
import java.security.Security;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.bouncycastle.asn1.pkcs.PrivateKeyInfo;
import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
import org.bouncycastle.openssl.PEMKeyPair;
import org.bouncycastle.openssl.PEMParser;
import org.bouncycastle.openssl.jcajce.JcaPEMKeyConverter;

public class PemUtils {
    public static RSAPrivateKey loadPrivateKey(String filepath) throws Exception{
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());

        try (PEMParser pemParser = new PEMParser(new FileReader(filepath))) {
            Object object = pemParser.readObject();
            JcaPEMKeyConverter converter = new JcaPEMKeyConverter().setProvider("BC");

            if (object instanceof PEMKeyPair) {
                return (RSAPrivateKey) converter.getKeyPair((PEMKeyPair) object).getPrivate();
            } else if (object instanceof PrivateKeyInfo) {
                return (RSAPrivateKey) converter.getPrivateKey((PrivateKeyInfo) object);
            } else {
                throw new IllegalArgumentException("Unsupported private key format.");
            }
        }
    }

    public static RSAPublicKey loadPublicKey(String filepath) throws Exception{
        Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());

        try (PEMParser pemParser = new PEMParser(new FileReader(filepath))) {
            Object object = pemParser.readObject();
            JcaPEMKeyConverter converter = new JcaPEMKeyConverter().setProvider("BC");

            if (object instanceof SubjectPublicKeyInfo) {
                return (RSAPublicKey) converter.getPublicKey((SubjectPublicKeyInfo) object);
            } else {
                throw new IllegalArgumentException("Unsupported public key format.");
            }
        }
    }
}
