package main

import (
    // "io"
    "io/ioutil"
    "log"
    "os"
    "path/filepath"
    // "strings"
    // "./cqlutil"

    "github.com/gocql/gocql"
)

var (
    cql_path = "./cql/"
    // cql_path = os.Getenv("CQL_DIR") string

    address = "127.0.0.1"
    // address = os.Getenv("CASSANDRA_CONTACT_POINTS") string

)

func main() {
    job := os.Args[1]
    args := os.Args[2:]

    if job == "superuser" {
        
    } else if job == "keyspace" {

        auth := gocql.PasswordAuthenticator{
            Username: "admin",
            Password: "admin",
            // Password: os.Getenv("ADMIN_PASSWORD"),
        }
        cluster := connect(address, auth)

        if len(args) == 0 {
            log.Fatal("No keyspace specified")
        }

        if args[0] == "all" {
            // Initialize all keyspaces from each folder in "./cql"
            dirs, err := ioutil.ReadDir(cql_path)
            if err != nil {
                log.Fatalf("Could not read directory: %v", err)
            }

            for _, dir := range dirs {
                if dir.IsDir() {
                    init_keyspace(cluster, filepath.Join(cql_path, dir.Name()))
                }
            }

        } else {
            // Initialize specific keyspaces
            for _, ks := range args {
                dirPath := filepath.Join(cql_path, ks)
                init_keyspace(cluster, dirPath)
            }
        }

    }

}
