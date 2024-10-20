use store

db.session.drop()  // Drop collection if it exists
db.createCollection("session")
// Insert a document as an example
    // db.session.insert({
        // cookie: UUID(),  // MongoDB doesn't have UUID type by default, but BSON UUID or strings can be used
        // unperishable: true,
        // last_update: new Date()
    // })

db.basket.drop()
db.createCollection("basket")
    // db.basket.insert({
        // cookie: UUID(),
        // items: { "item1": 10, "item2": 5 }
    // })

db.user_order.drop()
db.createCollection("user_order")
    // db.user_order.insert({
    //     cookie: UUID(),
    //     id: UUID(),
    //     items: { "item1": 1, "item2": 3 },
    //     price: 5000,
    //     address: "123 Example Street",
    //     postal_code: "12345",
    //     country: "US",
    //     name: "Doe",
    //     first_name: "John",
    //     mail: "johndoe@example.com",
    //     phone: "+1234567890",
    //     paid: false,
    //     processed: false
    // })

db.item.drop()
db.createCollection("item")
    // db.item.insert({
    //     id: "dummy",
    //     category: "None",
    //     image: BinData(0, "base64string"),
    //     display_name: "Test",
    //     description: "Lorem ipsum dolor sit amet, consectetur adip",
    //     basket_description: "This should not be in a basket, how did you come so far?",
    //     price: NumberDecimal("10.99")
    // })

db.mailing.drop()
db.createCollection("mailing")
    // db.mailing.insert({
    //     mail: "johndoe@example.com",
    //     phone: "+1234567890",
    //     name: "Doe",
    //     first_name: "John",
    //     address: "123 Example Street",
    //     postal_code: "12345",
    //     country: "US"
    // })
