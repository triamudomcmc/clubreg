import {string} from "prop-types";

export interface SmtpAPIService {
    providerUrl: string,
    key: string
}

export const initSmtpAPIService = (apiKey: string): SmtpAPIService => {
    return {
        providerUrl: "https://postal-esxi60-node.tucmc.dev/api/v1",
        key: apiKey
    }
}

export const sendEmail = async (service: SmtpAPIService, mailContent: {
    to: string[]
    from: string
    sender: string
    subject: string
    html_body: string
    plain_body: string
}): Promise<null | string> => {

    const response = await fetch(`${service.providerUrl}/send/message`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Server-API-Key": service.key
            },
            body: JSON.stringify(mailContent),
            credentials: "include",
        })


    const parsedResponse = await response.json()

    if (parsedResponse.status === "success") {
        return null
    }

    return parsedResponse.data.code
}