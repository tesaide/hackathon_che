# Stage 1: Build
FROM python:3.12-slim as build

WORKDIR /app


RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends gcc g++ libpq-dev curl && \
    rm -rf /var/lib/apt/lists/*


COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Final
FROM python:3.12-slim

WORKDIR /app


RUN useradd -u 1271 -r -g 0 -s /sbin/nologin -c "Default Application User" postgres


COPY --from=build /usr/local/lib/python3.12 /usr/local/lib/python3.12
COPY . /app/

USER 1271
EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]
