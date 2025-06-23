
import { type Greeting } from '../schema';

export const getGreeting = async (): Promise<Greeting> => {
    // This is a placeholder declaration! Real code should be implemented here.
    // The goal of this handler is fetching a default greeting message for the hello button.
    return Promise.resolve({
        id: 1,
        message: "hello",
        created_at: new Date()
    } as Greeting);
}
