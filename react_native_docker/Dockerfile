FROM node:20-slim

RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    default-jdk \
    && rm -rf /var/lib/apt/lists/*


RUN npm install -g expo-cli@6.3.10


WORKDIR /app

# Порти для Expo и Metro bundler
EXPOSE 8081 19000 19001 19002

CMD ["bash"]