FROM alpine:latest
WORKDIR /pb
# Variables
ARG PB_VERSION=0.16.5

# install dependencies
RUN apk add --no-cache \
    unzip \
    ca-certificates \
    build-base

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# copy startup program
COPY ./startup.c /pb/startup.c
RUN gcc -o /pb/startup /pb/startup.c
RUN chmod +x /pb/startup
COPY credentials.csv /pb/credentials.csv

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8050"]
