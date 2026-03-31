// @ts-check
import { test, expect } from '@playwright/test'; 
import { faker } from '@faker-js/faker';
import { criarUsuario } from '../utils/apiHelper.js';

test.describe('Suite de Testes', () => {

  test('Deve criar um novo usuário com sucesso', async ({ request }) => {
    const response = await criarUsuario(request);
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.status).toBe('active');
  });

  test('Deve buscar os detalhes do usuário recém-criado', async ({ request }) => {
    // Setup
    const response_post = await criarUsuario(request);
    expect(response_post.status()).toBe(201); 
    const { id: userId } = await response_post.json(); 

    // Ação e Validação
    const response = await request.get(`users/${userId}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(userId);
  });

  test('Deve alterar os detalhes do usuário', async ({ request }) => {
    // Setup
    const response_post = await criarUsuario(request);
    expect(response_post.status()).toBe(201); 
    const { id: userId } = await response_post.json(); 

    // Ação e Validação
    const response = await request.put(`users/${userId}`, {
      data: {
        name: 'Eduardo Coutinho Atualizado',
        status: 'inactive'
      }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Eduardo Coutinho Atualizado');
    expect(body.status).toBe('inactive');
  });

  test('Deve excluir o usuário', async ({ request }) => {
    // Setup
    const response_post = await criarUsuario(request);
    expect(response_post.status()).toBe(201); 
    const { id: userId } = await response_post.json();

    // Ação e Validação
    const response = await request.delete(`users/${userId}`);
    expect(response.status()).toBe(204);
  });

  test('Tenta Criar user sem nome', async ({ request }) => {
    const response = await request.post('users', {
      data: {
        name: '',
        gender: 'male',
        email: faker.internet.email(),
        status: 'active'
      }
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body[0].field).toBe('name');
    expect(body[0].message).toBe("can't be blank");
  });

});