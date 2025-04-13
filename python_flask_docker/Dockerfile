FROM oraclelinux:9

ENV PYTHONUNBUFFERED=1 \
    FLASK_APP=app.py \
    FLASK_RUN_PORT=5000 \
    FLASK_RUN_HOST=0.0.0.0

# Enable EPEL and CodeReady Builder repo
RUN dnf install -y oraclelinux-release-el9 epel-release && \
    dnf config-manager --enable ol9_codeready_builder && \
    dnf clean all && \
    rm -rf /var/cache/dnf

# Install system dependencies
RUN dnf install -y \
        python3.12 python3.12-devel python3.12-pip \
        gcc gcc-c++ make \
        geos geos-devel \
        proj proj-devel \
        gdal gdal-devel \
        postgresql-devel \
        libjpeg-turbo-devel \
        cairo cairo-devel \
        redhat-rpm-config \
        shadow-utils \
    && alternatives --install /usr/bin/python3 python3 /usr/bin/python3.12 1 \
    && python3 -m pip install --upgrade pip \
    && dnf clean all \
    && rm -rf /var/cache/dnf

# Create application directories
WORKDIR /app
RUN mkdir -p /app/api /app/static /app/templates /app/models

# Copy and install Python requirements
COPY requirements.txt .
RUN python3 -m pip install --no-cache-dir -r requirements.txt

# Add application user
RUN useradd -u 1271 -r -g 0 -s /sbin/nologin \
    -c "Default Application User" postgres

COPY . /app/

USER 1271

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]