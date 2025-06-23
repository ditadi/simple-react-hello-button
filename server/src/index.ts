
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

import { createGreetingInputSchema, recordInteractionInputSchema } from './schema';
import { getGreeting } from './handlers/get_greeting';
import { createGreeting } from './handlers/create_greeting';
import { recordInteraction } from './handlers/record_interaction';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),
  getGreeting: publicProcedure
    .query(() => getGreeting()),
  createGreeting: publicProcedure
    .input(createGreetingInputSchema)
    .mutation(({ input }) => createGreeting(input)),
  recordInteraction: publicProcedure
    .input(recordInteractionInputSchema)
    .mutation(({ input }) => recordInteraction(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`TRPC server listening at port: ${port}`);
}

start();
