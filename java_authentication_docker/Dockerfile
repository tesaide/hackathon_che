FROM oraclelinux:9


# Install required tools and OpenJDK 8
RUN dnf install -y oraclelinux-developer-release-el9 \
    && dnf config-manager --enable ol9_developer \
    && dnf install -y \
        java-1.8.0-openjdk-devel \
        git \
        curl \
        maven \
        shadow-utils \
    && dnf clean all \
    && rm -rf /var/cache/dnf

# Set JAVA_HOME and update PATH
ENV JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk \
    PATH=$JAVA_HOME/bin:$PATH

# Create working directory
WORKDIR /app

# Create non-root application user with fixed UID 1331
RUN useradd -u 1331 -r -g 0 -s /sbin/nologin \
    -c "Default Application User" postgres

# Use the non-root user
USER 1331

# Expose port 8080 for the app
EXPOSE 8080

# Keep container running for testing purposes (you can replace this with actual CMD later)
CMD ["sh", "-c", "while true; do sleep 3600; done"]