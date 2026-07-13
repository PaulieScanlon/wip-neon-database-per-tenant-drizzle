import { Command } from 'commander';
import { createNeonClient } from '@neon/sdk';
import 'dotenv/config';

const program = new Command();
const neonApi = createNeonClient({
  apiKey: process.env.NEON_API_KEY,
  throwOnError: true,
});

program.option('-n, --name <name>', 'name of the company').parse(process.argv);

const options = program.opts();

if (options.name) {
  console.log(`Company Name: ${options.name}`);
  console.log(typeof options.name);

  const project = await neonApi.projects.create({
    name: options.name,
    pg_version: 16,
    region_id: 'aws-us-east-1',
    // org_id: '',
  });

  console.log(project);
} else {
  console.log('No company name provided');
}
