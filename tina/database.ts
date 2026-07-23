import { createDatabase, createLocalDatabase } from '@tinacms/datalayer';
import { GitHubProvider } from 'tinacms-gitprovider-github';
import { RedisLevel } from 'upstash-redis-level';
import type { Level } from '@tinacms/graphql';

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        branch: process.env.GITHUB_BRANCH || 'main',
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
      }),
      // RedisLevel's TS types narrow its key format to `string` only, where
      // Tina's Level type allows `Buffer | Uint8Array | string`. RedisLevel
      // only ever actually uses strings, so this is a real (if unfortunately
      // common, for abstract-level-based packages) type-only mismatch, not a
      // runtime one — the cast is safe.
      databaseAdapter: new RedisLevel({
        redis: {
          url: process.env.UPSTASH_REDIS_REST_URL!,
          token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        },
      }) as unknown as Level,
    });
