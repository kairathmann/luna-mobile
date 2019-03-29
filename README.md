# Luna Mobile App for IOS and Android

# Launching Mobile application

## Requirements:  
1. `Node 8.15+`
2. `Java JDK 1.8`
3. `Android Studio` for building and launching app on your Android device / emulator
4. `XCode 9+` for building and launching app on your IOS device / emulator

## Launching dev build on Android (steps for Mac):  
1. Run `npm ci`
2. Add ANDROID_HOME env variable pointing to SDK location (this is used by react-native to locate SDK): `echo 'export ANDROID_HOME=/Users/$USER/Library/Android/sdk' >> ~/.bash_profilesource ~/.bash_profile`
3. Add Android Platform Tools to your path: `echo 'export PATH=${PATH}:/Users/$USER/Library/Android/sdk/tools:/Users/$USER/Library/Android/sdk/platform-tools' >> ~/.bash_profilesource ~/.bash_profile`
4. Now you should be able to run `adb` commands. Try `adb devices` to see if any output comes out.
5. Connect your device via USB, enable `USB debugging` and check if `adb devices` shows your device.
6. Change `APP_AXIOS_BASE_URL=` in `.env.development` to IP address of your machine running the backend, for example: `APP_AXIOS_BASE_URL=http://192.168.0.1:8001/api-helios`
7. Change `APP_URL_BASE` in `.env.development` to IP address of your machine running the nginx instance, for example: `APP_URL_BASE=http://10.0.0.208:8002/`
8. Run `npm run android-dev` to start dev build and app on connected device / emulator.

## Launching dev build on IOS (steps for Mac):  
1. Run `npm ci`
2. Change `APP_AXIOS_BASE_URL=` in `.env.development` to IP address of your machine running the backend, for example: `APP_AXIOS_BASE_URL=http://192.168.0.1:8001`
3. Change `APP_URL_BASE` in `.env.development` to IP address of your machine running the nginx instance, for example: `APP_URL_BASE=http://10.0.0.208:8002/`
4. Launch XCode project (`ios/lunamobile.xcodeproj`)
5. Connect your device / use emulator
6. Configure signing options
7. Select `Dev` scheme in XCode and Run it

Additional steps for XCode 10+ (**do after building the app for the first time and every time that you reinstall node_modules**):  
1. Run `cd ./node_modules/react-native/third-party/glog-0.3.5 && ../../scripts/ios-configure-glog.sh` in repo root directory
2. Add references to `libfishhook`: https://user-images.githubusercontent.com/637225/41004316-d626d112-68ef-11e8-8a5e-397a55777bc4.png
