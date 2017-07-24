module.exports = {
    port: Number(process.env.PORT || 3000),
    environment: 'PRODUCTION',
    dbConfig: {
        user: "PersonalityML",
        password: "Colombia10",
        server: "personalityml.database.windows.net",
        database: "PersonalityML",
        options: {
            encrypt: true // Use this if you're on Windows Azure 
        }
    },
    SECRET_TOKEN: 'personality_insights2017Ml'
}