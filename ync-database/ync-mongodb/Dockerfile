FROM mongo:latest

# Environment variables to create a default admin user
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=admin

# Expose the default MongoDB port
EXPOSE 27017

# Start MongoDB
CMD ["mongod"]
