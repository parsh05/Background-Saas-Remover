# Stage 1: Build stage
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy Maven descriptor files first to leverage Docker layer caching
COPY pom.xml .

# Download dependencies only
RUN mvn dependency:go-offline

# Now copy full source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:21-jre

# Set working directory
WORKDIR /app

# Copy jar file from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar backend.jar

# Expose port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "backend.jar"]
