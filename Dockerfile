FROM alpine:3.14
RUN addgroup sechub && adduser -D -g "" -G sechub sechub
WORKDIR /home/sechub
USER sechub
COPY build/ /home/sechub/app
WORKDIR /home/sechub/app
EXPOSE 8080
HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8080/ || exit 1
ENTRYPOINT ["./server-linux"]
