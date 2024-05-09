package main

import (
    "bufio"
    "log"
    "os"

    "github.com/gocql/gocql"
)

// Connect to a Cassandra cluster
func connect(address string, auth gocql.PasswordAuthenticator) *gocql.Session {
    cluster := gocql.NewCluster(address) // Cluster accepts multiple addresses separated by commas
    cluster.Authenticator = auth
    session, err := cluster.CreateSession()
    if err != nil {
        log.Fatalf("Could not create session: %v", err)
    }
    return session
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

func main() {
    // Replace with your actual Cassandra connection details
    address := os.Getenv("CASSANDRA_CONTACT_POINTS")
    auth := gocql.PasswordAuthenticator{
        Username: "cassandra",
        Password: "cassandra",
    }

    session := connect(address, auth)
    exec_cql_script(session, "./../cql/user_admin.cql")
    session.Close()

    auth = gocql.PasswordAuthenticator{
        Username: "admin",
        Password: "admin",
    }
    session = connect(address, auth)
    exec_cql_script(session, "./../cql/superuser.cql")
    session.Close()

}
