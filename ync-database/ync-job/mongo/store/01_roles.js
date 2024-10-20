use admin

db.createUser({
    user: "shop_manager",
    pwd: passwordPrompt(),
    roles: [
        { role: "dbOwner", db: "store" }  // 'dbOwner' gives full permissions
    ]
})

db.createUser({
    user: "shop_api",
    pwd: passwordPrompt(),
    roles: [
        { role: "readWrite", db: "store" }  // 'readWrite' allows SELECT and MODIFY
    ]
})
