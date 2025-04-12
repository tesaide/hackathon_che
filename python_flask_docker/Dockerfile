FROM python:3.12-slim
WORKDIR /app

# Update system packages - focus on fixing zlib1g and perl-base
RUN apt update && \
    apt upgrade -y && \
    apt install -y --only-upgrade zlib1g perl-base && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

# Rest of your Dockerfile remains the same
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir flask flask-restful flask-sqlalchemy psycopg2-binary python-dotenv gunicorn
RUN pip install --no-cache-dir geopandas shapely numpy pandas scikit-learn pillow spacy
RUN mkdir -p /app/api /app/static /app/templates /app/models
RUN useradd -u 1271 -r -g 0 -s /sbin/nologin \
    -c "Default Application User" postgres
COPY . /app/
USER 1271
EXPOSE 5000
CMD ["flask", "run", "--host=0.0.0.0"]