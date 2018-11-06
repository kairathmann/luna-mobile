# Luna Mobile

Steps to do after first pull of repository: (those steps are done in order to replace placeholder values with Fabric.IO Api Keys during checkout and ensure that during commiting they are changed right back to placeholders)

1. Add `LUNA_FABRIC_API_KEY` env variable to your global settings, preferable `.bash_profile`
2. Add `LUNA_FABRIC_BUILD_SECRET` env variable to your global settings, preferable `.bash_profile`  
   You can get key pair from `Luna` organisation in `Fabric.io`
3. Run:

```
git config --global filter.update-fabric-keys.clean path/to/repo/clean.sh
git config --global filter.update-fabric-keys.smudge path/to/repo/smudge.sh
```

4. Recheckout all files in order to make custom filter kick in:

```
rm android/app/src/main/AndroidManifest.xml
git checkout android/app/src/main/AndroidManifest.xml

rm android/app/fabric.properties
git checkout android/app/fabric.properties

rm ios/lunamobile.xcodeproj/project.pbxproj
git checkout ios/lunamobile.xcodeproj/project.pbxproj

rm ios/lunamobile/Info.plist
git checkout ios/lunamobile/Info.plist
```

Now keys should be inserted, during commiting, keys will be automatically switch back to placeholders (note: that won't change in files themselves, you just won't have any differences in those files therefore you won't commit it. On remote branch there will always be placeholders)

5. Run:

```
cd node_modules/react-native/scripts && ./ios-install-third-party.sh && cd ../../../
cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```

# Android:

## Basic development setup:

1. Install [Android Studio](https://developer.android.com/studio/)
2. Install Android 6.0 (Marshmallow) SDK from Android SDK Manager
3. Install Android SDK Build-Tools 23, exactly 23.0.1 from Android SDK Manager
4. Add `ANDROID_HOME` env variable pointing to SDK location (this is used by react-native to locate SDK):  
   `echo 'export ANDROID_HOME=/Users/$USER/Library/Android/sdk' >> ~/.bash_profile`  
   `source ~/.bash_profile`
5. Add Android Platform Tools to your path:  
   `echo 'export PATH=${PATH}:/Users/$USER/Library/Android/sdk/tools:/Users/$USER/Library/Android/sdk/platform-tools' >> ~/.bash_profile`  
   `source ~/.bash_profile`
6. Now you should be able to use `adb devices` command to list connected devices.
   After connecting your Android device and running `adb devices` you should see ID of your device and `device` label in the right column. That means the device is connected. You must have only one device connected at a time. Also if this is real device, please make sure to enable USB Debugging and accept fingerprint of your development machine
7. Install `Fabric for Android Studio` plugin from Plugin Repository in order to be able to deploy new builds for internal team

## Launching dev version:

1. Execute `npm install`
2. Execute one of the following commands:  
   `npm run android-dev` to build project with environment variables set in `.env.development` and deploy it to connected device / emulator.  
   `npm run android-staging` to build project with environment variables set in `.env.staging` and deploy it to connected device / emulator.  
   `npm run android-production` to build project with environment variables set in `.env.production` and deploy it to connected device / emulator.
3. After those steps app should launch on your connected device / emulator.

## Building debug APK file for Android:

1. Execute one of the following commands:  
   `npm run build-debug-android-dev` - this will create offline APK file inside `dist` directory named: `luna-android-debug.apk` that uses environment variables from `.env.development`  
   `npm run build-debug-android-staging` - this will create offline APK file inside `dist` directory named: `luna-android-debug.apk` that uses environment variables from `.env.staging`  
   `npm run build-debug-android-production` - this will create offline APK file inside `dist` directory named: `luna-android-debug.apk` that uses environment variables from `.env.production`
2. Use your terminal to `cd` into `dist` and execute `adb install luna-android-debug.apk` in order to install that APK file on your connected device.

## Building production signed APK file for Android:

1. Export new env variable: `LUNA_KEYSTORE_PASSWORD`. **WRAP VALUE IN DOUBLE QUOTES AS PASSWORD MIGHT CONTAIN SPECIAL CHARACTERS**
2. Export new env variable: `LUNA_KEYSTORE_KEY_PASSWORD`. **WRAP VALUE IN DOUBLE QUOTES AS PASSWORD MIGHT CONTAIN SPECIAL CHARACTERS**
3. Run: `git config --global filter.update-luna-keystore.clean path/to/repo/clean-keystore.sh`
4. Run: `git config --global filter.update-luna-keystore.smudge path/to/repo/smudge-keystore.sh`
5. Execute: `chmod +x clean-keystore.sh`
6. Execute: `chmod +x smudge-keystore.sh`
7. Recheckout all files in order to make custom filter kick in:
   ```
    rm android/gradle.properties
    git checkout android/gradle.properties
   ```
8. Make sure that `repo/android/gradle.properties` have proper values instead of placeholders
9. Copy `android.jks` storefile to `repo/android/app`
10. Execute: `npm run build-release-android`
11. Signed, release build will be created under name: `luna-android-release.apk` in directory: `repo/dist`

---

# IOS:

## Basic development setup:

1. Install [XCode](https://developer.apple.com/xcode/)
2. Download the [Crashlytics SDK](https://fabric.io/kits/ios/crashlytics/manual-install), extract it and place the two frameworks in a directory called `Crashlytics` in the ios directory.
3. Install [Fabric for Mac App](https://www.fabric.io/downloads/apple) in order to be able to deploy new builds for internal team

## Launching dev version:

1. Execute `npm install`
2. Open Project file `ios/Luna.xcodeproj` in XCode.
3. In Xcode select one of available schemas:  
   `Dev` - build project with environment variables set in `.env.development`  
   `Staging` - build project with environment variables set in `.env.staging`  
   `Production` - build project with environment variables set in `.env.production`
4. Run build
5. After those steps app should launch on your connected device / emulator.

## Run in Xcode

The following steps are temporary until Luna registers its own company development account.

1. Open Project file `ios/Luna.xcodeproj` in Xcode.
2. In `Xcode` -> `Preferences` -> `Accounts` have an account, such as your Apple ID. Your Apple ID needs to be part
   of the (free) Apple developer program.
3. In Xcode's Project navigator, click on the top entry named `Luna` to open project settings. Under `General`, set
   `Team` to the account you set in the previous step. If you get a warning "Failed to create provisioning profile.",
   change the `Bundle Identifier` by appending your name, for example to `com.rspective.luna.testing.johnsmith`.
4. After connecting your iOS device to your Mac, select it as the active scheme, and then build and run.

## Building debug APP file for IOS:

1. Open Project file `ios/Luna.xcodeproj` in XCode.
2. In Xcode select one of available schemas:  
   `Dev` - build project with environment variables set in `.env.development`  
   `Staging` - build project with environment variables set in `.env.staging`  
   `Production` - build project with environment variables set in `.env.production`
3. Go to `Product` -> `Archive`

## Building production signed APP file for IOS:

Upon creating an Archive, you have the option to upload it to App Store Connect.

# Inspecting React Elements, JavaScript breakpoints:

**Your phone needs to be in the same local network as your development machine when launching on real device**

## Remotely debugging JavaScript code:

Available only when running local buld with Metro Bundler in the background (`npm run ios` or `npm run android`)  
Beware: activating remote debug will slow packaging and everything down so enable it only when you really need it and disable afterwards

1. In running app on your mobile device, use `shake gesture` (note: your device needs a really good shake in order for it to work, so if nothing happens, shake some more : ) )
2. After detecting shake gesture app will open up debug menu where you can activate: `Debug JS Remotely`
3. This will open new tab instance in Chrome on your developer machine, you can go ahead and open `Dev Tools` from that tab
4. Go to `Sources` -> `debuggerWorker.js` -> `localhost:8081` and here you have your source code and from here you can setup breakpoints as you would on regular website

## Inspecting React Elements, React State, React Props:

Available only when running local buld with Metro Bundler in the background (`npm run ios` or `npm run android`)  
Beware: activating remote debug will slow packaging and everything down so enable it only when you really need it and disable afterwards

1. In running app on your mobile device, use `shake gesture` (note: your device needs a really good shake in order for it to work, so if nothing happens, shake some more : ) )
2. After detecting shake gesture app will open up debug menu where you can activate: `Debug JS Remotely`
3. **ONLY WHEN LAUNCHING ON REAL ANDROID DEVICE** - Run `adb reverse tcp:8097 tcp:8097` to redirect outgoing traffic on your device to your development machine. The port 8097 is used by `React Dev Tools`
4. Launch `npm run react-devtools` - this will open up standalone version of `React Dev Tools`
5. Open debug menu on running app instance by making `shake gesture`
6. Click `Toggle Inspector`, this will connect automatically to React Devtools on your developer machine from where you can insepect elements's state and props.

# Providing translations for mobile app - step by step guide:

Mobile app uses `i18n` standard. Locale files are located at path: `lunamobile/locales`.  
Each language file should be placed in code-languages named JS file for example: `en.js` or `de.js`.  
After adding **new** file please import it in `lunamobile/locales/i18n.js` and assign it to `I18n.translations`:

```
import de from './de';
import en from './en';
import pl from './pl';

I18n.locale = Languages.language
I18n.fallbacks = true;
I18n.translations = {
  de,
  en,
  pl
};
```

**Important: Additional steps for IOS when creating new localization file**  
Since IOS 11+, all supported localizations must be included in project settings:

1. Select project in explorer on the left side
2. From the top bar select `Basic info`
3. Add new supported localization by clicking: `+` button under `Localizations` section

# Providing new custom fonts for mobile app - step by step guide:

Open font that you wish to add to app in `Font Book` App on your MacOS or use any app / cli that allows you to get details about font. After loading font, select `Info` and take a note of `PostScript name` value.
For example, let's assume that your font file is named `My Font.ttf` and value of `PostScript name` is `My-Font`

**Android is using file name as `fontFamily` while IOS is using `PostScript name` value** that is why you have to rename your file to match value of `PostScript name` so rename `My Font.ttf` to `My-Font.ttf`.

1. Rename font file name to matching PostScript name
2. Copy font into `assets/fonts` directory of repo
3. Run `react-native link` command inside `mobile` directory. You need to have `react-native-cli` installed
4. Use your font in app by using `fontFamily` style property
