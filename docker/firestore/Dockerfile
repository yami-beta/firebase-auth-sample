FROM node:lts

RUN apt-get update && \
      apt-get install -y --no-install-recommends openjdk-8-jre openjdk-8-jdk && \
      rm -rf /var/lib/apt/lists/* && \
      curl -OL https://firebase.google.com/docs/firestore/downloads/cloud-firestore-emulator.jar

EXPOSE 8080

CMD ["java", "-jar", "cloud-firestore-emulator.jar", "--host", "0.0.0.0"]
