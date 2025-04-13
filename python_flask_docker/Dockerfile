FROM python:3.12

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get install -y \
    build-essential \
    curl \
    git \
    gcc \
    g++ \
    libpq-dev \
    libgeos-dev \
    python3-dev \
    python3-pip \
    python3-venv \
    python3-wheel \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir \
        flask \
        flask-restful \
        flask-sqlalchemy \
        psycopg2-binary \
        python-dotenv \
        gunicorn \
        geopandas \
        shapely \
        numpy \
        pandas \
        scikit-learn \
        pillow \
        spacy

RUN mkdir -p /app/api /app/static /app/templates /app/models

RUN useradd -u 1271 -r -g 0 -s /sbin/nologin -c "Default Application User" postgres

COPY . /app/

USER 1271

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]
