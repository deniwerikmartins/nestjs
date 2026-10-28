import { beforeAll, beforeEach, afterAll } from 'vitest';
import {rm} from 'fs/promises';
import {join} from 'path';


beforeAll(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (e) {
    console.error(e);
  }
});