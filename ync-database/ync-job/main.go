package main

import (
    "io/ioutil"
    "log"
    "os"
    "path/filepath"
)

func usage() {
    log.Fatal("T'as rien compris poto")
}

func main() {

    if len(os.Args) < 2 { usage() }

    job := os.Args[1]
    args := os.Args[2:]

    if job == "admin" {

        cluster := Connect(Address, "cassandra", "cassandra")

        session, err := cluster.CreateSession()
        if err != nil {
            log.Fatalf("Could not create session: %v", err)
        }
        CQLScript(session, filepath.Join(CQLPath, "user_admin.cql"))
        session.Close()

        cluster = Connect(Address, "admin", "admin")

        session, err = cluster.CreateSession()
        if err != nil {
            log.Fatalf("Could not create session: %v", err)
        }
        CQLScript(session, filepath.Join(CQLPath, "superuser.cql"))
        session.Close()


    } else if job == "keyspace" {

        if len(args) == 0 {
            log.Fatal("No keyspace specified")
            usage()
        }

        cluster := Connect(Address, "admin", "admin")

        if args[0] == "all" {
            // Initialize all keyspaces from each folder in "./cql"
            dirs, err := ioutil.ReadDir(CQLPath)
            if err != nil { log.Fatalf("Could not read directory: %v", err) }

            for _, dir := range dirs {
                if dir.IsDir() { 
                    fullPath := filepath.Join(CQLPath, dir.Name())
                    InitKeyspace(cluster, fullPath)
                }
            }

        } else {
            // Initialize specific keyspaces
            for _, ks := range args {
                dirPath := filepath.Join(CQLPath, ks)
                InitKeyspace(cluster, dirPath)
            }
        }

    }

}
