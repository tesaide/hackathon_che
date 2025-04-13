plugins {
    id("java")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    // Добавляем зависимость для работы с JWT
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")
    implementation("com.auth0:java-jwt:4.2.1") // Используется в JwtUtil
    // Убедимся, что зависимости для JWT корректно подключены
    implementation("io.webtoken.jwt:jwt:9.1.0")
}

tasks.test {
    useJUnitPlatform()
}

