import * as dotenv from "dotenv"

const firebaseCert = () => {
  dotenv.config()

  if (process.env.MODE === "SANDBOX") {
    return {
      projectId: process.env.FCERT_PROJECT_ID_SB,
      private_key: process.env.FCERT_PRIVATE_KEY_SB.replace(/\\n/g, "\n"),
      client_email: process.env.FCERT_CLIENT_EMAIL_SB,
    }
  } else {
    return {
      projectId: process.env.FCERT_PROJECT_ID,
      private_key: process.env.FCERT_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FCERT_CLIENT_EMAIL,
    }
  }
}

export default firebaseCert()
