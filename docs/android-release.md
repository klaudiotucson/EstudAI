# Android Release - EstudAI

Artefatos gerados em 2026-05-31:

- APK release: `dist/android/EstudAI-1.0-release.apk`
- AAB release: `dist/android/EstudAI-1.0-release.aab`

Identidade Android:

- App name: `EstudAI`
- Application ID: `com.estudai.app`
- Version code: `1`
- Version name: `1.0`
- Min SDK: `24`
- Target SDK: `36`

Assinatura:

- Keystore local: `android/keystores/estudai-upload-keystore.jks`
- Config local: `android/keystore.properties`
- O APK foi verificado com `apksigner` usando APK Signature Scheme v2.
- O AAB foi verificado com `jarsigner`.

Importante:

- Faca backup seguro do keystore e do `keystore.properties`. Sem esses arquivos nao sera possivel publicar atualizacoes usando a mesma chave de upload.
- O app Android atualmente carrega a URL configurada em `capacitor.config.ts`: `https://quero-elaborar-um-aplicativo-de-est.vercel.app`.
- Antes de enviar para producao, confirme que essa URL esta atualizada, com Supabase/Auth/variaveis configuradas e politica de privacidade publicada.
- No Google Play Console, envie o arquivo `.aab`, nao o `.apk`.
