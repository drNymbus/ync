FROM golang:1.22.3

WORKDIR /job

COPY go.* ./
RUN go mod download

COPY *.go ./

# ENV CASSANDRA_CONTACT_POINTS="127.0.0.1"
# ENV CQL_PATH="/job/cql"

RUN go build -o /ync-mail-api
ENTRYPOINT ["/ync-mail-api"]