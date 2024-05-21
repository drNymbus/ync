package main

import (
    "os"

    "io"
    "io/ioutil"
    "path/filepath"

    "log"

    "strings"
    "regexp"
    "encoding/hex"

    "github.com/gocql/gocql"
)

var (
    Address string = os.Getenv("CASSANDRA_CONTACT_POINTS")
    // Address string = "127.0.0.1"
    CQLPath string = os.Getenv("CQL_PATH")
    // CQLPath string = "./cql/"
)

// Connect to a Cassandra cluster
func Connect(address string, usr string, pwd string) *gocql.ClusterConfig {
    cluster := gocql.NewCluster(address) // Cluster accepts multiple addresses separated by commas
    cluster.Authenticator = gocql.PasswordAuthenticator{
        Username: usr,
        Password: pwd,
    }
    return cluster
}

// Open file and return content as a string
func file_bytes(filename string) []byte {
    file, err := os.Open(filename)
    if err != nil {
        log.Fatalf("Could not open file (%s): %v", filename, err)
    }
    defer file.Close()

    content, err := io.ReadAll(file)
    if err != nil {
        log.Fatal("Could not read file: %v", err)
    }

    return content
}

func prepare_query(query string) string {
    // BLOB function
    pattern, err := regexp.Compile("BLOB\\(.*\\)")
    if err != nil {
        log.Fatalf("Could not compile regex pattern: %v", err)
    }

    blob_fns := pattern.FindStringSubmatch(query)
    // for each "LOAD_FILE"
    for _, instruction := range blob_fns {
        // get path in "LOAD_FILE"
        filename := instruction[6:len(instruction)-2]
        // open filepath in filepath.Join(cql_path, path)
        content := file_bytes(filepath.Join(CQLPath, filename))

        replacement := strings.Join([]string{"0x", hex.EncodeToString(content)}, "")
        query = strings.ReplaceAll(query, instruction, replacement)
    }

    return query
}

// Execute a CQL script against a Cassandra cluster
func CQLScript(session *gocql.Session, filename string) {
    text := string(file_bytes(filename))

    queries := strings.Split(text, ";")
    queries = queries[:len(queries)-1]

    for _, query := range queries {
        if query == "" {
            log.Printf("Empty string is no valid query.")
        } else {
            query = prepare_query(query)
            err := session.Query(query).Exec()
            if  err != nil {
                log.Printf("Failed to execute CQL command [%s]: %v", query, err)
            }
        }
    }
}

// Execute all CQL scripts in a directory
func InitKeyspace(cluster *gocql.ClusterConfig, dir string) {
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
            CQLScript(session, fullPath)

            session.Close()
        }
    }
}