package main

import (
    "io"
    "io/ioutil"
    "log"
    "os"
    "path/filepath"
    "strings"

    "github.com/gocql/gocql"
)

// Connect to a Cassandra cluster
func connect(address string, auth gocql.PasswordAuthenticator) *gocql.ClusterConfig {
    cluster := gocql.NewCluster(address) // Cluster accepts multiple addresses separated by commas
    cluster.Authenticator = auth
    return cluster
}

// Open file and return content as a string
func file_to_string(filename string) string {
    file, err := os.Open(filename)
    if err != nil {
        log.Fatalf("Could not open CQL file: %v", err)
    }
    defer file.Close()

    text, err := io.ReadAll(file)
    if err != nil {
        log.Fatal("Could not read CQL file: %v", err)
    }

    return string(text)
}

func prepare_query(query string) string {
    // for each "LOAD_FILE"
        // get path in "LOAD_FILE"
        // open filepath in filepath.Join(cql_path, path)
        // put bytes in query
    return ""
}

// Execute a CQL script against a Cassandra cluster
func exec_cql_script(session *gocql.Session, filename string) {
    text := file_to_string(filename)

    for _, query := range strings.Split(text, ";") {
        query := prepare_query(query)

        if err := session.Query(query).Exec(); err != nil {
            log.Printf("Failed to execute CQL command [%s]: %v", query, err)
        } else {
            log.Printf("Successfully executed CQL command: %s", query)
        }

    }
}

// Execute all CQL scripts in a directory
func init_keyspace(cluster *gocql.ClusterConfig, dir string) {
    files, err := ioutil.ReadDir(dir)
    if err != nil {
        log.Fatalf("Could not read directory: %v", err)
    }

    for _, file := range files {
        if strings.HasSuffix(file.Name(), ".cql") {
            session, err := cluster.CreateSession()
            if err != nil {
                log.Fatalf("Could not create session: %v", err)
            }

            fullPath := filepath.Join(dir, file.Name())
            exec_cql_script(session, fullPath)

            session.Close()
        }
    }
}
