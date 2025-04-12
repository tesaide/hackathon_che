FROM eclipse-temurin:21-jdk

WORKDIR /app


RUN apt-get update && apt-get install -y \
    git \
    curl \
    maven \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -u 1231 -r -g 0 -s /sbin/nologin \
-c "Default Application User" postgres
  
USER 1231  

EXPOSE 8080


CMD ["sh", "-c", "while true; do sleep 3600; done"]