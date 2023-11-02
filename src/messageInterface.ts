import { MessageContent } from "./messageContentInterface";

export interface Message { 
    attributes: { key: string; }; 
    data: string; 
    messageId: string; 
    message_id: string; 
    publishTime: string; 
    publish_time: string; 
}
