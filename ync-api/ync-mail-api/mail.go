package main

import (
    "os"
    "strings"

    "github.com/gin-gonic/gin"
    "github.com/gocql/gocql"
)

func getSession() *gocql.Session {
    // Cluster accepts multiple addresses separated by commas
    cluster := gocql.NewCluster(os.Getenv("CASSANDRA_CONTACT_POINTS"))
    cluster.Authenticator = gocql.PasswordAuthenticator{
        Username: os.Getenv("CASSANDRA_USERNAME"),
        Password: os.Getenv("CASSANDRA_PASSWORD")
    }

    session, err := cluster.CreateSession()
    if err != nil {
        log.Fatalf("Could not create session: %v", err)
    }
    return session
}

type Mail struct {
    Mail string,
    Phone string,
    Name string,
    FirstName string,
    Address string,
    PostalCode string,
    Country string
}

func getMail(mail string) {
    session := getSession()
    query := strings.Join([]string{"SELECT * FROM store.mailing WHERE id = ", mail})
    iter := session.Query(query).Iter()
}

type Basket struct {
    Names []string,
    Count []string
}

type Order struct {
    ID string
    Items Basket,
    Price int,
    Address string,
    PostalCode string,
    Country string,
    Name string,
    FirstName string,
    Mail string,
    Phone string,
    Paid bool,
    Processed bool
}

func getOrder(order string) {
    session := getSession()
    query := strings.Join([]string{"SELECT * FROM store.user_order WHERE id = ", order})
    iter := session.Query(query).Iter()
}

func ConfirmOrder (c *gin.Context) {
    // format mail from "template/shop-confirm"
    order := getOrder(session);

    sendMail(order.Mail);
}

func SendNewsletter(c *gin.Context) {
    // for each mail in db
        // user := getMailingList()
        // format mail from "template/newsletter
        // sendMail("user@mail", text, html);
}

func sendMail(mail string, text string, html string) {
    mail := getMail(mail);
}