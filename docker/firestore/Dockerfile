FROM node:lts

RUN apt-get update && \
      apt-get install -y --no-install-recommends openjdk-8-jre openjdk-8-jdk && \
      rm -rf /var/lib/apt/lists/* && \
      npm install -g firebase-tools && \
      firebase setup:emulators:firestore

WORKDIR /root/.cache/firebase/emulators

ENV FIRESTORE_EMULATOR_VERSION v1.3.0

EXPOSE 8080

# firebase serve --only firestore では --host オプションが jar に渡されないため直接実行
CMD ["/bin/bash", "-c", "java -jar cloud-firestore-emulator-${FIRESTORE_EMULATOR_VERSION}.jar --host 0.0.0.0"]
