#
# Build stage
#
FROM 3.9-eclipse-temurin-22-alpine AS build
COPY . .
RUN mvn clean package -DskipTests

#
# Package stage
#
FROM eclipse-temurin:22-jdk-alpine
COPY --from=build /target/*.jar app.jar
# ENV PORT=8080
# EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]


#FROM eclipse-temurin:22-jdk-alpine
#VOLUME /tmp
#COPY target/*.jar app.jar
#ENTRYPOINT ["java","-jar","/app.jar"]
