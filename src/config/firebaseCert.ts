import * as dotenv from 'dotenv'

const firebaseCert = () => {

    dotenv.config()

    return {
        projectId: process.env.FCERT_PROJECT_ID_SB,
        private_key: process.env.FCERT_PRIVATE_KEY_SB.replace(/\\n/g, '\n'),
        client_email: process.env.FCERT_CLIENT_EMAIL_SB
    }
}

export default firebaseCert()