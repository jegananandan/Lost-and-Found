# Build stage using Maven and Eclipse Temurin JDK 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy pom.xml and backend source code
COPY backend/pom.xml .
COPY backend/src ./src

# Build production JAR
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre
WORKDIR /app

# Create data directory for persistent file database
RUN mkdir -p /app/data
VOLUME ["/app/data"]

# Copy built JAR from build stage
COPY --from=build /app/target/lostfound-backend-1.0.0.jar app.jar

# Expose port (default 8080)
EXPOSE 8080

# Run Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
