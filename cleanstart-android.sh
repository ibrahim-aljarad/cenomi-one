watchman watch-del-all

cd android && ./gradlew clean && cd ..
rm -rf ~/.gradle/caches/ 
# rm -rf ~/.gradle

rm -rf android/.gradle android/app/build

# rm -rf yarn.lock package-lock.json node_modules

# yarn install
# yarn start --reset-cache