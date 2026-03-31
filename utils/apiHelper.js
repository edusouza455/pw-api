// @ts-check
import { faker } from '@faker-js/faker';
import { appendFile } from 'fs/promises';
import path from 'path';

const logFile = path.join(process.cwd(), 'generated_users.log');

/**
 * Cria um novo usuário na API GoRest e registra o resultado em um arquivo de log.
 * @param {import('@playwright/test').APIRequestContext} request 
 * @returns {Promise<import('@playwright/test').APIResponse>}
 */

export async function criarUsuario(request) {
  const userData = {
    name: faker.person.fullName(),
    gender: faker.helpers.arrayElement(['male', 'female']),
    email: faker.internet.email(),
    status: 'active'
  };

  const response = await request.post('users', { data: userData });

  if (response.ok()) {
    const body = await response.json();
    const logEntry = `User Created: ID=${body.id}, Name=${body.name}, Email=${body.email}, Timestamp=${new Date().toISOString()}\n`;
    await appendFile(logFile, logEntry).catch(err => console.error('Failed to write to log file:', err));
  }

  return response;
}
