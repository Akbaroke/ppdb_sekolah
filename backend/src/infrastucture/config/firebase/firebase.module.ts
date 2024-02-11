import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.getOrThrow('FIREBASE_TYPE'),
      project_id: configService.getOrThrow('FIREBASE_PROJECT_ID'),
      private_key_id: configService.getOrThrow('FIREBASE_PRIVATE_KEY_ID'),
      private_key: configService
        .getOrThrow('FIREBASE_PRIVATE_KEY')
        .split(String.raw`\n`)
        .join('\n'),
      client_email: configService.getOrThrow('FIREBASE_CLIENT_EMAIL'),
      client_id: configService.getOrThrow('FIREBASE_CLIENT_ID'),
      auth_uri: configService.getOrThrow('FIREBASE_AUTH_URI'),
      token_uri: configService.getOrThrow('FIREBASE_TOKEN_URI'),
      auth_provider_x509_cert_url: configService.getOrThrow(
        'FIREBASE_AUTH_CERT_URL',
      ),
      client_x509_cert_url: configService.getOrThrow(
        'FIREBASE_CLIENT_CERT_URL',
      ),
      universe_domain: configService.getOrThrow('FIREBASE_UNIVERSE_DOMAIN'),
    } as admin.ServiceAccount;

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      storageBucket: `portal-a72b5.appspot.com`,
    });
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
