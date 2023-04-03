import { post } from "./api-client";

const ENDPOINT = "/tickets";

function createTicket(ticket) {
    return post(ENDPOINT, ticket);
}

const TicketService = {
    createTicket
}

export default TicketService;