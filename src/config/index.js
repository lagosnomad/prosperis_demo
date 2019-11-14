export default {
    secret: process.env.TOKEN_SECRET || 'averylongandrandomstring',
    mongo: {
        DB_USER: process.env.DB_USER || 'prosperis',
        DB_PASS: process.env.DB_PASS || 'prosperis123' // should meet password requirements standards
    }
}