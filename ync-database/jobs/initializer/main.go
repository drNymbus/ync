package main

import (
    "bufio"
    "fmt"
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

// Execute a CQL script against a Cassandra cluster
func exec_cql_script(session *gocql.Session, filename string) {
    file, err := os.Open(filename)
    if err != nil {
        log.Fatalf("Could not open CQL file: %v", err)
    }
    defer file.Close()

    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        cqlCommand := scanner.Text()
        if err := session.Query(cqlCommand).Exec(); err != nil {
            log.Printf("Failed to execute CQL command [%s]: %v", cqlCommand, err)
        } else {
            log.Printf("Successfully executed CQL command: %s", cqlCommand)
        }
    }

    if err := scanner.Err(); err != nil {
        log.Fatalf("Error while reading from CQL file: %v", err)
    }
}

// Execute all CQL scripts in a directory
func init_keyspace(session *gocql.ClusterConfig, dir string) {
    files, err := ioutil.ReadDir(dir)
    if err != nil {
        log.Fatalf("Could not read directory: %v", err)
    }

    for _, file := range files {
        if strings.HasSuffix(file.Name(), ".cql") {
            fullPath := filepath.Join(dir, file.Name())

            session, err := cluster.CreateSession()
            if err != nil {
                log.Fatalf("Could not create session: %v", err)
            }
            exec_cql_script(session, fullPath)
            session.Close()
        }
    }
}

func main() {
    // Replace with your actual Cassandra connection details
    address := os.Getenv("CASSANDRA_CONTACT_POINTS")
    auth := gocql.PasswordAuthenticator{
        Username: "admin",
        Password: os.Getenv("ADMIN_PASSWORD"),
    }

    // Connect to Cassandra
    cluster := connect(address, auth)

    args := os.Args[1:]
    if len(args) == 0 {
        log.Fatal("No keyspace specified")
    }

    if args[0] == "all" {
        // Initialize all keyspaces from each folder in "./cql"
        cql_path := "./../cql/"
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
            dirPath := fmt.Sprintf("./cql/%s", ks)
            init_keyspace(cluster, dirPath)
        }
    }
}
