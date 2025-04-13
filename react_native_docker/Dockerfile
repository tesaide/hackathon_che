FROM node:20-slim

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*


RUN npm install -g expo-cli@6.3.10

RUN useradd -u 3371 -r -g 0 -s /sbin/nologin \
-c "Default Application User" postgres

WORKDIR /app

USER 3371

EXPOSE 8081 19000 19001 19002

CMD ["bash"]