FROM alpine:latest
WORKDIR /pb
# Variables
ARG PB_VERSION=0.22.17

# install dependencies
RUN apk add --no-cache \
    unzip \
    ca-certificates

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/ && \
    rm /tmp/pb.zip

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8051"]