FROM node:current-alpine3.14
RUN apk --no-cache add git && apk --no-cache del && addgroup sechub && adduser -D -g "" -G sechub sechub

WORKDIR /home/sechub
USER sechub

RUN git clone -b main --single-branch https://github.com/CMSgov/security-hub-monitor && rm -rf /home/sechub/security-hub-monitor/.git
WORKDIR /home/sechub/security-hub-monitor/build
EXPOSE 8080
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8080/ || exit 1
ENTRYPOINT ["./server-linux"]



