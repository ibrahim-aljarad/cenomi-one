env /usr/bin/arch -arm64 /bin/bash --login

arch -x86_64 yarn install

arch -x86_64 gem install ffi

arch -x86_64 pod install

adb reverse tcp:8081 tcp:8081

# to run locally
yarn start
