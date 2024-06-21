package main

import (
    "os"
    "strings"

    "net/http"
    "github.com/gin-gonic/gin"
)

var (
    port string = os.Getenv("API_PORT")
)

func main() {
    router := gin.Default()

    shop := router.Group("/shop") {
        shop.GET("/confirm", )
        shop.POST("/confirm", confirmOrder)
    }

    router.Run(strings.Join([]string{"localhost", port}, ":"))
}